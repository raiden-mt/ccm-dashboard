"use client";

import { useSearchParams } from "next/navigation";
import { loadSearchParams } from "~/lib/search-params";
import { useEffect, useRef, useState } from "react";
import { createClient } from "~/lib/services/supabase/client";
import type { RealtimeChannel, Session } from "@supabase/supabase-js";
import type { InspectionRecord } from "~/app/(main)/inspections/_components/inspection-data-wrapper";

export interface RealtimeInspectionUpdate {
  type: "INSERT";
  record: InspectionRecord;
  year: number;
}

export interface UseRealtimeInspectionRecordsResult {
  newRecords: InspectionRecord[];
  clearNewRecords: () => void;
}

/**
 * Hook to receive realtime updates for inspection records.
 * New records are accumulated and can be merged with existing data.
 */
export function useRealtimeInspectionRecords(): UseRealtimeInspectionRecordsResult {
  const searchParams = useSearchParams();
  const year = Number(loadSearchParams(searchParams).year);

  const [newRecords, setNewRecords] = useState<InspectionRecord[]>([]);
  const channelRef = useRef<RealtimeChannel | null>(null);

  const clearNewRecords = () => {
    setNewRecords([]);
  };

  useEffect(() => {
    const supabase = createClient();
    let authSubscription: { unsubscribe: () => void } | null = null;
    let cancelled = false;

    // Reset new records when year changes
    setNewRecords([]);

    async function subscribeToChannel(session: Session | null) {
      if (cancelled || !session) return;

      try {
        // Keep Realtime auth fresh
        await supabase.realtime.setAuth(session.access_token);
        if (cancelled) return;

        // Check if already subscribed
        if (channelRef.current?.state === "subscribed") return;

        // Clean up existing channel if any
        if (channelRef.current) {
          await supabase.removeChannel(channelRef.current);
          channelRef.current = null;
        }

        // Create private channel for inspection records scoped by year
        const channel = supabase.channel(`inspection_records:${year}`, {
          config: {
            broadcast: { self: true, ack: true },
            private: true,
          },
        });

        channelRef.current = channel;

        // Listen for broadcast events from database triggers
        channel.on(
          "broadcast",
          { event: "inspection_inserted" },
          (payload: { payload: RealtimeInspectionUpdate }) => {
            const update = payload.payload;

            // Only process records for the current year
            if (update.year !== year) return;

            setNewRecords((prev) => {
              // Avoid duplicates by checking if record already exists
              if (prev.some((r) => r.id === update.record.id)) {
                return prev;
              }
              // Add new record at the beginning (most recent first)
              return [update.record, ...prev];
            });
          },
        );

        // Subscribe to the channel
        channel.subscribe((status, err) => {
          if (status === "CHANNEL_ERROR") {
            console.error("Realtime channel error: inspection_records", err);
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
    newRecords,
    clearNewRecords,
  };
}

