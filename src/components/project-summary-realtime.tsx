"use client";

import { Card, CardContent } from "~/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  Flame,
  Activity,
  ThumbsUp,
  Home,
  Wind,
  CloudRain,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { loadSearchParams } from "~/lib/search-params";
import { useEffect, useRef, useState } from "react";
import { createClient } from "~/lib/services/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";

export function ProjectSummaryRealtime({
  ccmsBuiltCount: initialCCMsBuiltCount,
  ccmsInUseCount: initialCCMsInUseCount,
  conditionGoodCount: initialConditionGoodCount,
  kitchensCount: initialKitchensCount,
  wellVentilatedCount: initialWellVentilatedCount,
  rainProtectedCount: initialRainProtectedCount,
  inspected0to3MonthsCount: initialInspected0to3MonthsCount,
  inspected3to6MonthsCount: initialInspected3to6MonthsCount,
  inspectedOver6MonthsCount: initialInspectedOver6MonthsCount,
}: {
  ccmsBuiltCount: number;
  ccmsInUseCount: number;
  conditionGoodCount: number;
  kitchensCount: number;
  wellVentilatedCount: number;
  rainProtectedCount: number;
  inspected0to3MonthsCount: number;
  inspected3to6MonthsCount: number;
  inspectedOver6MonthsCount: number;
}) {
  const {
    ccmsBuiltCount: realtimeCCMsBuiltCount,
    ccmsInUseCount: realtimeCCMsInUseCount,
    conditionGoodCount: realtimeConditionGoodCount,
    kitchensCount: realtimeKitchensCount,
    wellVentilatedCount: realtimeWellVentilatedCount,
    rainProtectedCount: realtimeRainProtectedCount,
    inspected0to3MonthsCount: realtimeInspected0to3MonthsCount,
    inspected3to6MonthsCount: realtimeInspected3to6MonthsCount,
    inspectedOver6MonthsCount: realtimeInspectedOver6MonthsCount,
  } = useRealtimeProjectSummary();

  const ccmsBuiltCount = initialCCMsBuiltCount + realtimeCCMsBuiltCount;
  const ccmsInUseCount = initialCCMsInUseCount + realtimeCCMsInUseCount;
  const conditionGoodCount =
    initialConditionGoodCount + realtimeConditionGoodCount;
  const kitchensCount = initialKitchensCount + realtimeKitchensCount;
  const wellVentilatedCount =
    initialWellVentilatedCount + realtimeWellVentilatedCount;
  const rainProtectedCount =
    initialRainProtectedCount + realtimeRainProtectedCount;
  const inspected0to3MonthsCount =
    initialInspected0to3MonthsCount + realtimeInspected0to3MonthsCount;
  const inspected3to6MonthsCount =
    initialInspected3to6MonthsCount + realtimeInspected3to6MonthsCount;
  const inspectedOver6MonthsCount =
    initialInspectedOver6MonthsCount + realtimeInspectedOver6MonthsCount;

  const summaryItems = [
    {
      label: "Total CCMs Built",
      value: ccmsBuiltCount.toLocaleString(),
      percent: null,
      icon: Flame,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Total CCMs In Use",
      value: ccmsInUseCount.toLocaleString(),
      percent:
        ccmsBuiltCount === 0
          ? null
          : `${((ccmsInUseCount / ccmsBuiltCount) * 100).toFixed(0)}%`,
      icon: Activity,
      color: "text-ripple-green",
      bgColor: "bg-ripple-green/10",
    },
    {
      label: "Condition Good/Average",
      value: conditionGoodCount.toLocaleString(),
      percent:
        ccmsBuiltCount === 0
          ? null
          : `${((conditionGoodCount / ccmsBuiltCount) * 100).toFixed(0)}%`,
      icon: ThumbsUp,
      color: "text-ripple-green",
      bgColor: "bg-status-green",
    },
    {
      label: "Total Kitchens",
      value: kitchensCount.toLocaleString(),
      percent:
        ccmsBuiltCount === 0
          ? null
          : `${((kitchensCount / ccmsBuiltCount) * 100).toFixed(0)}%`,
      icon: Home,
      color: "text-[#4A90A4]",
      bgColor: "bg-status-blue",
    },
    {
      label: "Well Ventilated",
      value: wellVentilatedCount.toLocaleString(),
      percent:
        ccmsBuiltCount === 0
          ? null
          : `${((wellVentilatedCount / ccmsBuiltCount) * 100).toFixed(0)}%`,
      icon: Wind,
      color: "text-ripple-green",
      bgColor: "bg-action-mint/50",
    },
    {
      label: "Protected from Rain",
      value: rainProtectedCount.toLocaleString(),
      percent:
        ccmsBuiltCount === 0
          ? null
          : `${((rainProtectedCount / kitchensCount) * 100).toFixed(0)}%`,
      icon: CloudRain,
      color: "text-[#4A90A4]",
      bgColor: "bg-status-blue",
    },
    {
      label: "Inspected 0-3 months",
      value: inspected0to3MonthsCount.toLocaleString(),
      percent:
        ccmsBuiltCount === 0
          ? null
          : `${((inspected0to3MonthsCount / ccmsBuiltCount) * 100).toFixed(0)}%`,
      icon: CheckCircle2,
      color: "text-ripple-green",
      bgColor: "bg-status-green",
    },
    {
      label: "Inspected 3-6 months",
      value: inspected3to6MonthsCount.toLocaleString(),
      percent:
        ccmsBuiltCount === 0
          ? null
          : `${((inspected3to6MonthsCount / ccmsBuiltCount) * 100).toFixed(0)}%`,
      icon: AlertCircle,
      color: "text-[#B8860B]",
      bgColor: "bg-status-tan",
    },
    {
      label: "Inspected > 6 months",
      value: inspectedOver6MonthsCount.toLocaleString(),
      percent:
        ccmsBuiltCount === 0
          ? null
          : `${((inspectedOver6MonthsCount / ccmsBuiltCount) * 100).toFixed(0)}%`,
      icon: XCircle,
      color: "text-[#C75050]",
      bgColor: "bg-status-salmon",
    },
  ];

  return (
    <Card className="bg-card-cream border-0 p-0 shadow-sm">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="project-summary">
          <AccordionTrigger className="px-4 py-4">
            <h3 className="text-foreground text-lg font-semibold">
              CCM Project Summary
            </h3>
          </AccordionTrigger>
          <AccordionContent>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-5 lg:grid-cols-9">
                {summaryItems.map((item) => (
                  <div
                    key={item.label}
                    className={`flex flex-col items-center rounded-lg p-3 text-center ${item.bgColor}`}
                  >
                    <item.icon className={`mb-1 h-5 w-5 ${item.color}`} />
                    <span className="text-foreground text-lg font-bold">
                      {item.value}
                    </span>
                    {item.percent && (
                      <span className="text-muted-foreground text-xs font-medium">
                        {item.percent}
                      </span>
                    )}
                    <span className="text-muted-foreground mt-1 text-xs leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

function useRealtimeProjectSummary() {
  const searchParams = useSearchParams();
  const year = Number(loadSearchParams(searchParams).year);

  const yearRef = useRef<number>(year);
  yearRef.current = year;

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

    async function setupChannel() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session || cancelled) return;

        // Ensures Postgres changes are authorized under the current user's RLS.
        await supabase.realtime.setAuth(session.access_token);
        if (cancelled) return;

        // Public channel; we filter events client-side by selected year.
        channel = supabase.channel("project_summary");

        // Postgres changes drive the UI updates (inserts).
        channel.on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "householders" },
          (payload) => {
            const row =
              (payload as { new?: Record<string, unknown> }).new ?? {};

            const eventYear = yearFromDate(row.stove_build_date);
            if (eventYear !== yearRef.current) return;

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
            if (eventYear !== yearRef.current) return;

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
            if (eventYear !== yearRef.current) return;

            if (row.ccm_in_use === true) setCCMsInUseCount((prev) => prev + 1);
          },
        );

        void channel.subscribe();
      } catch (error) {
        console.error("Error setting up realtime channel: ", error);
      }
    }
    void setupChannel();

    return () => {
      cancelled = true;
      if (channel) void supabase.removeChannel(channel);
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
