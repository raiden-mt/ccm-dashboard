"use client";

import { useSearchParams } from "next/navigation";
import { loadSearchParams } from "~/lib/search-params";
import { useEffect, useState } from "react";
import { createClient } from "~/lib/services/supabase/client";
import type { RealtimeChannel, Session } from "@supabase/supabase-js";

export interface RealtimeProjectSummaryDeltas {
  ccmsBuiltCount: number;
  ccmsInUseCount: number;
  conditionGoodCount: number;
  kitchensCount: number;
  wellVentilatedCount: number;
  rainProtectedCount: number;
  inspected0to3MonthsCount: number;
  inspected3to6MonthsCount: number;
  inspectedOver6MonthsCount: number;
}

export function useRealtimeProjectSummary(): RealtimeProjectSummaryDeltas {
  const searchParams = useSearchParams();
  const year = Number(loadSearchParams(searchParams).year);

  const [ccmsBuiltCount, setCCMsBuiltCount] = useState<number>(0);
  const [ccmsInUseCount, setCCMsInUseCount] = useState<number>(0);
  const [conditionGoodCount, setConditionGoodCount] = useState<number>(0);
  const [kitchensCount, setKitchensCount] = useState<number>(0);
  const [wellVentilatedCount, setWellVentilatedCount] = useState<number>(0);
  const [rainProtectedCount, setRainProtectedCount] = useState<number>(0);
  const [inspected0to3MonthsCount, setInspected0to3MonthsCount] =
    useState<number>(0);
  const [inspected3to6MonthsCount, setInspected3to6MonthsCount] =
    useState<number>(0);
  const [inspectedOver6MonthsCount, setInspectedOver6MonthsCount] =
    useState<number>(0);

  useEffect(() => {
    const supabase = createClient();
    let channel: RealtimeChannel | null = null;
    let authSubscription: { unsubscribe: () => void } | null = null;
    let cancelled = false;

    const resetDeltas = () => {
      setCCMsBuiltCount(0);
      setCCMsInUseCount(0);
      setConditionGoodCount(0);
      setKitchensCount(0);
      setWellVentilatedCount(0);
      setRainProtectedCount(0);
      setInspected0to3MonthsCount(0);
      setInspected3to6MonthsCount(0);
      setInspectedOver6MonthsCount(0);
    };

    resetDeltas();

    function monthsSince(dateString: string | null): number | null {
      if (!dateString) return null;
      const now = new Date();
      const then = new Date(dateString);
      const diffMs = now.getTime() - then.getTime();
      return diffMs < 0 ? 0 : diffMs / (1000 * 60 * 60 * 24 * 30);
    }

    function yearFromDate(dateString: unknown): number | null {
      if (typeof dateString !== "string" || !dateString) return null;
      const d = new Date(dateString);
      const y = d.getFullYear();
      return Number.isFinite(y) ? y : null;
    }

    async function subscribeToChannel(session: Session | null) {
      if (cancelled || !session) return;

      try {
        // Keep Realtime auth fresh; if we already have a channel, just refresh auth.
        await supabase.realtime.setAuth(session.access_token);
        if (cancelled) return;

        if (channel) return;

        // Public channel; we filter events client-side by selected year.
        channel = supabase.channel(`project_summary:${year}`);

        // Postgres changes drive the UI updates (inserts).
        channel.on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "householders" },
          (payload) => {
            const row =
              (payload as { new?: Record<string, unknown> }).new ?? {};

            const eventYear = yearFromDate(row.stove_build_date);
            if (eventYear !== year) return;

            setCCMsBuiltCount((prev) => prev + 1);
            if (row.has_kitchen === true) setKitchensCount((prev) => prev + 1);
            if (row.kitchen_well_ventilated === true)
              setWellVentilatedCount((prev) => prev + 1);
            if (row.kitchen_rainproof === true)
              setRainProtectedCount((prev) => prev + 1);
            if (row.last_ccm_in_use === true)
              setCCMsInUseCount((prev) => prev + 1);
            if (row.last_ccm_condition === "good")
              setConditionGoodCount((prev) => prev + 1);

            const months = monthsSince(
              (row.last_inspection_date as string | null) ?? null,
            );
            if (months != null) {
              if (months <= 3) setInspected0to3MonthsCount((prev) => prev + 1);
              else if (months <= 6)
                setInspected3to6MonthsCount((prev) => prev + 1);
              else setInspectedOver6MonthsCount((prev) => prev + 1);
            }
          },
        );

        channel.on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "inspections" },
          (payload) => {
            const row =
              (payload as { new?: Record<string, unknown> }).new ?? {};

            const eventYear = yearFromDate(row.inspection_date);
            if (eventYear !== year) return;

            const months = monthsSince(
              (row.inspection_date as string | null) ?? null,
            );
            if (months != null) {
              if (months <= 3) setInspected0to3MonthsCount((prev) => prev + 1);
              else if (months <= 6)
                setInspected3to6MonthsCount((prev) => prev + 1);
              else setInspectedOver6MonthsCount((prev) => prev + 1);
            }

            if (row.ccm_in_use === true) setCCMsInUseCount((prev) => prev + 1);
            if (row.ccm_condition === "good")
              setConditionGoodCount((prev) => prev + 1);
            if (row.kitchen_well_ventilated === true)
              setWellVentilatedCount((prev) => prev + 1);
            if (row.kitchen_rainproof === true)
              setRainProtectedCount((prev) => prev + 1);
          },
        );

        channel.on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "usage_surveys" },
          (payload) => {
            const row =
              (payload as { new?: Record<string, unknown> }).new ?? {};

            const eventYear = yearFromDate(row.survey_date);
            if (eventYear !== year) return;

            if (row.ccm_in_use === true) setCCMsInUseCount((prev) => prev + 1);
          },
        );

        void channel.subscribe((status) => {
          if ((status as string) === "CHANNEL_ERROR") {
            console.error("Realtime channel error: project_summary");
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
      if (channel) void supabase.removeChannel(channel);
      if (authSubscription) authSubscription.unsubscribe();
    };
  }, [year]);

  return {
    ccmsBuiltCount,
    ccmsInUseCount,
    conditionGoodCount,
    kitchensCount,
    wellVentilatedCount,
    rainProtectedCount,
    inspected0to3MonthsCount,
    inspected3to6MonthsCount,
    inspectedOver6MonthsCount,
  };
}

