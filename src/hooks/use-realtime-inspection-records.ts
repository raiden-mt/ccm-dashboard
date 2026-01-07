"use client";

import { useSearchParams } from "next/navigation";
import { loadSearchParams } from "~/lib/search-params";
import { useEffect, useRef, useState } from "react";
import { createClient } from "~/lib/services/supabase/client";
import type { RealtimeChannel, Session } from "@supabase/supabase-js";
import type { InspectionRecord } from "~/app/(main)/inspections/_components/inspection-data-wrapper";

export interface RealtimeInspectionUpdate {
  type: "INSERT" | "UPDATE";
  record: InspectionRecord;
  year: number;
}

export interface UseRealtimeInspectionRecordsResult {
  /** Latest version of any inspection record we've received via realtime, keyed by inspection id */
  recordsById: Record<string, InspectionRecord>;
  /** Set of inspection ids that were inserted (used to adjust counts / prepend new rows) */
  insertedById: Record<string, true>;
  clearRealtimeRecords: () => void;
}

/**
 * Hook to receive realtime updates for inspection records.
 * New records are accumulated and can be merged with existing data.
 */
export function useRealtimeInspectionRecords(): UseRealtimeInspectionRecordsResult {
  const searchParams = useSearchParams();
  const year = Number(loadSearchParams(searchParams).year);

  const [recordsById, setRecordsById] = useState<
    Record<string, InspectionRecord>
  >({});
  const [insertedById, setInsertedById] = useState<Record<string, true>>({});
  const channelRef = useRef<RealtimeChannel | null>(null);
  const handlersBoundRef = useRef<boolean>(false);

  const clearRealtimeRecords = () => {
    setRecordsById({});
    setInsertedById({});
  };

  useEffect(() => {
    const supabase = createClient();
    let authSubscription: { unsubscribe: () => void } | null = null;
    let cancelled = false;

    // Reset whenever year changes
    setRecordsById({});
    setInsertedById({});
    handlersBoundRef.current = false;

    async function subscribeToChannel(session: Session | null) {
      if (cancelled || !session) return;

      try {
        // Keep Realtime auth fresh
        await supabase.realtime.setAuth(session.access_token);
        if (cancelled) return;

        const channelName = `inspection_records:${year}`;
        channelRef.current ??= supabase.channel(channelName, {
          config: {
            broadcast: { self: true, ack: true },
            private: true,
          },
        });

        const channel = channelRef.current;
        if (!channel) return;
        if ((channel as unknown as { state?: string }).state === "subscribed") {
          return;
        }

        const handleInspectionMessage = (message: unknown) => {
          const envelope = message as Record<string, unknown>;
          const payload =
            (envelope.payload as Record<string, unknown> | undefined) ??
            envelope;

          const payloadYear = Number(payload.year);
          if (!Number.isFinite(payloadYear) || payloadYear !== year) return;

          const record = payload.record as InspectionRecord | undefined;
          if (!record || typeof record !== "object" || !("id" in record))
            return;

          const id = typeof record.id === "string" ? record.id : null;
          if (!id) return;

          setRecordsById((prev) => ({ ...prev, [id]: record }));

          const type = typeof payload.type === "string" ? payload.type : null;
          if (type === "INSERT") {
            setInsertedById((prev) =>
              prev[id] ? prev : { ...prev, [id]: true },
            );
          }
        };

        if (!handlersBoundRef.current) {
          channel.on(
            "broadcast",
            { event: "inspection_inserted" },
            handleInspectionMessage,
          );
          channel.on(
            "broadcast",
            { event: "inspection_updated" },
            handleInspectionMessage,
          );
          handlersBoundRef.current = true;
        }

        // Subscribe to the channel
        channel.subscribe((status) => {
          if ((status as string) === "CHANNEL_ERROR") {
            console.error("Realtime channel error: inspection_records");
          }
        });
      } catch (error) {
        console.error("Error setting up inspection records realtime:", error);
      }
    }

    async function setup() {
      // Register auth state listener first to avoid missing INITIAL_SESSION
      const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
        if (cancelled) return;
        void subscribeToChannel(newSession ?? null);
      });
      authSubscription = data.subscription;

      // Get current session and subscribe
      const {
        data: { session },
      } = await supabase.auth.getSession();

      await subscribeToChannel(session);
    }

    void setup();

    return () => {
      cancelled = true;
      if (channelRef.current) {
        void supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
      if (authSubscription) authSubscription.unsubscribe();
    };
  }, [year]);

  return {
    recordsById,
    insertedById,
    clearRealtimeRecords,
  };
}
