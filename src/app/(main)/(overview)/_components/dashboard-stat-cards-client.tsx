"use client";

import { StatCard } from "~/components/ui/stat-card";
import { Users, Home, Flame, ClipboardCheck } from "lucide-react";
import type { DashboardStats } from "./dashboard-stat-cards";
import { useSearchParams } from "next/navigation";
import { loadSearchParams } from "~/lib/search-params";
import { useEffect, useRef, useState } from "react";
import { createClient } from "~/lib/services/supabase/client";
import type { RealtimeChannel, Session } from "@supabase/supabase-js";

export default function DashboardStatCardsClient({
  stats: initialStats,
}: {
  stats: DashboardStats;
}) {
  const realtimeStats = useRealtimeDashboardStats();
  const stats = realtimeStats ?? initialStats;

  const utilizationPercent =
    stats.totalStoves > 0
      ? ((stats.activeStoves / stats.totalStoves) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Archived Households"
        value={stats.archivedHouseholds}
        subtitle={`${stats.activeHouseholds.toLocaleString()} active`}
        icon={Home}
        color="ripple-green"
      />

      <StatCard
        title="Active Stoves"
        value={stats.activeStoves}
        subtitle={`${utilizationPercent}% utilization`}
        icon={Flame}
        color="primary"
      />

      <StatCard
        title="Active Staff"
        value={stats.activeStaff}
        subtitle={`${stats.totalStaff} total staff`}
        icon={Users}
        color="status-blue"
      />

      <StatCard
        title="Inspections (Month)"
        value={stats.inspectionsThisMonth}
        subtitle={`${stats.inspectionsThisYear.toLocaleString()} this year`}
        icon={ClipboardCheck}
        color="action-mint"
      />
    </div>
  );
}

function useRealtimeDashboardStats(): DashboardStats | null {
  const searchParams = useSearchParams();
  const year = Number(loadSearchParams(searchParams).year);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const handlersBoundRef = useRef<boolean>(false);

  const [realtimeStats, setRealtimeStats] = useState<DashboardStats | null>(
    null,
  );

  useEffect(() => {
    const supabase = createClient();
    let authSubscription: { unsubscribe: () => void } | null = null;
    let cancelled = false;

    // Reset whenever year changes; initial server stats will render immediately.
    setRealtimeStats(null);
    handlersBoundRef.current = false;

    async function subscribeToChannel(session: Session | null) {
      if (cancelled || !session) return;

      try {
        // Keep Realtime auth fresh; if we already have a channel, just refresh auth.
        await supabase.realtime.setAuth(session.access_token);
        if (cancelled) return;

        const channelName = `dashboard_stats:${year}`;
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

        if (!handlersBoundRef.current) {
          channel.on(
            "broadcast",
            { event: "dashboard_stats_updated" },
            (message: unknown) => {
              const envelope = message as Record<string, unknown>;
              const payload =
                (envelope.payload as Record<string, unknown> | undefined) ??
                envelope;

              const payloadYear = Number(payload.year);
              if (!Number.isFinite(payloadYear) || payloadYear !== year) return;

              const statsPayload = (payload.stats ?? {}) as Record<
                string,
                unknown
              >;

              setRealtimeStats({
                archivedHouseholds: Number(
                  statsPayload.archivedHouseholds ?? 0,
                ),
                activeHouseholds: Number(statsPayload.activeHouseholds ?? 0),
                totalStoves: Number(statsPayload.totalStoves ?? 0),
                activeStoves: Number(statsPayload.activeStoves ?? 0),
                totalStaff: Number(statsPayload.totalStaff ?? 0),
                activeStaff: Number(statsPayload.activeStaff ?? 0),
                inspectionsThisMonth: Number(
                  statsPayload.inspectionsThisMonth ?? 0,
                ),
                inspectionsThisYear: Number(
                  statsPayload.inspectionsThisYear ?? 0,
                ),
              });
            },
          );
          handlersBoundRef.current = true;
        }

        channel.subscribe((status) => {
          if ((status as string) === "CHANNEL_ERROR") {
            console.error("Realtime channel error: dashboard_stats");
          }
        });
      } catch (error) {
        console.error("Error setting up realtime channel: ", error);
      }
    }

    async function setup() {
      // Register listener first to avoid missing INITIAL_SESSION.
      const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
        if (cancelled) return;
        void subscribeToChannel(newSession ?? null);
      });
      authSubscription = data.subscription;

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

  return realtimeStats;
}
