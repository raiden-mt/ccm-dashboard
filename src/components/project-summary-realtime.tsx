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
import { useEffect, useState } from "react";
import { createClient } from "~/lib/services/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";

export function ProjectSummaryRealtime() {
  const {
    ccmsBuiltCount,
    ccmsInUseCount,
    conditionGoodCount,
    kitchensCount,
    wellVentilatedCount,
    rainProtectedCount,
    inspected0to3MonthsCount,
    inspected3to6MonthsCount,
    inspectedOver6MonthsCount,
  } = useRealtimeProjectSummary();

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
  const year = loadSearchParams(searchParams).year;

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
    let newChannel: RealtimeChannel | null = null;
    let cancel = false;

    function monthsSince(dateString: string | null): number | null {
      if (!dateString) return null;
      const now = new Date();
      const then = new Date(dateString);
      const diffMs = now.getTime() - then.getTime();
      return diffMs < 0 ? 0 : diffMs / (1000 * 60 * 60 * 24 * 30);
    }

    async function setupChannel() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session || cancel) return;

        // Ensure Realtime auth is set for private channels
        await supabase.realtime.setAuth(session.access_token);

        newChannel = supabase.channel(`project_summary:${year}`, {
          config: {
            private: true,
          },
        });

        newChannel.on("broadcast", { event: "*" }, (payload) => {
          if (cancel) return;
          const message = payload.payload as {
            table?: string;
            year?: number;
            data?: Record<string, unknown>;
          };
          if (message?.year !== year || !message?.table) return;

          const data = message.data ?? {};
          const table = message.table;

          if (table === "householders") {
            setCCMsBuiltCount((prev) => prev + 1);

            if (data.has_kitchen === true) {
              setKitchensCount((prev) => prev + 1);
            }
            if (data.kitchen_well_ventilated === true) {
              setWellVentilatedCount((prev) => prev + 1);
            }
            if (data.kitchen_rainproof === true) {
              setRainProtectedCount((prev) => prev + 1);
            }
            if (data.last_ccm_in_use === true) {
              setCCMsInUseCount((prev) => prev + 1);
            }
            if (data.last_ccm_condition === "good") {
              setConditionGoodCount((prev) => prev + 1);
            }

            const months = monthsSince(
              (data.last_inspection_date as string | null) ?? null,
            );
            if (months != null) {
              if (months <= 3) {
                setInspected0to3MonthsCount((prev) => prev + 1);
              } else if (months <= 6) {
                setInspected3to6MonthsCount((prev) => prev + 1);
              } else {
                setInspectedOver6MonthsCount((prev) => prev + 1);
              }
            }
          }

          if (table === "inspections") {
            const months = monthsSince(
              (data.inspection_date as string | null) ?? null,
            );
            if (months != null) {
              if (months <= 3) {
                setInspected0to3MonthsCount((prev) => prev + 1);
              } else if (months <= 6) {
                setInspected3to6MonthsCount((prev) => prev + 1);
              } else {
                setInspectedOver6MonthsCount((prev) => prev + 1);
              }
            }

            if (data.ccm_in_use === true) {
              setCCMsInUseCount((prev) => prev + 1);
            }
            if (data.ccm_condition === "good") {
              setConditionGoodCount((prev) => prev + 1);
            }
            if (data.kitchen_well_ventilated === true) {
              setWellVentilatedCount((prev) => prev + 1);
            }
            if (data.kitchen_rainproof === true) {
              setRainProtectedCount((prev) => prev + 1);
            }
          }

          if (table === "usage_surveys") {
            if (data.ccm_in_use === true) {
              setCCMsInUseCount((prev) => prev + 1);
            }
          }
        });

        void newChannel.subscribe();
      } catch (error) {
        console.error("Error setting up realtime channel: ", error);
      }
    }
    void setupChannel();

    return () => {
      cancel = true;
      if (newChannel) {
        void supabase.removeChannel(newChannel);
      }
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
