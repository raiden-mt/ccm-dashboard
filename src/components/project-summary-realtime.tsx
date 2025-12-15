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
import { useState } from "react";
import { createClient } from "~/lib/services/supabase/client";

export function ProjectSummaryRealtime() {
  const searchParams = useSearchParams();
  const year = loadSearchParams(searchParams).year;

  const [ccmsBuiltResult, setCCMsBuiltResult] = useState<number>(0);
  const [ccmsInUseResult, setCCMsInUseResult] = useState<number>(0);
  const [conditionGoodResult, setConditionGoodResult] = useState<number>(0);
  const [kitchensResult, setKitchensResult] = useState<number>(0);
  const [wellVentilatedResult, setWellVentilatedResult] = useState<number>(0);
  const [rainProtectedResult, setRainProtectedResult] = useState<number>(0);
  const [inspected0to3MonthsResult, setInspected0to3MonthsResult] =
    useState<number>(0);
  const [inspected3to6MonthsResult, setInspected3to6MonthsResult] =
    useState<number>(0);
  const [inspectedOver6MonthsResult, setInspectedOver6MonthsResult] =
    useState<number>(0);
  //   const [
  //     ccmsBuiltResult,
  //     ccmsInUseResult,
  //     conditionGoodResult,
  //     kitchensResult,
  //     wellVentilatedResult,
  //     rainProtectedResult,
  //     inspected0to3MonthsResult,
  //     inspected3to6MonthsResult,
  //     inspectedOver6MonthsResult,
  //   ] = await Promise.all([
  //     getTotalCCMsBuilt({ year }),
  //     getTotalCCMsInUse({ year }),
  //     getConditionGoodCCMs({ year }),
  //     getTotalKitchens({ year }),
  //     getWellVentilated({ year }),
  //     getRainProtected({ year }),
  //     getInspected0To3Months({ year }),
  //     getInspected3To6Months({ year }),
  //     getInspectedOver6Months({ year }),
  //   ]);

  const summaryItems = [
    {
      label: "Total CCMs Built",
      value: ccmsBuiltResult.toLocaleString(),
      percent: null,
      icon: Flame,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Total CCMs In Use",
      value: ccmsInUseResult.toLocaleString(),
      percent:
        ccmsBuiltResult === 0
          ? null
          : `${((ccmsInUseResult / ccmsBuiltResult) * 100).toFixed(0)}%`,
      icon: Activity,
      color: "text-ripple-green",
      bgColor: "bg-ripple-green/10",
    },
    {
      label: "Condition Good/Average",
      value: conditionGoodResult.toLocaleString(),
      percent:
        ccmsBuiltResult === 0
          ? null
          : `${((conditionGoodResult / ccmsBuiltResult) * 100).toFixed(0)}%`,
      icon: ThumbsUp,
      color: "text-ripple-green",
      bgColor: "bg-status-green",
    },
    {
      label: "Total Kitchens",
      value: kitchensResult.toLocaleString(),
      percent:
        ccmsBuiltResult === 0
          ? null
          : `${((kitchensResult / ccmsBuiltResult) * 100).toFixed(0)}%`,
      icon: Home,
      color: "text-[#4A90A4]",
      bgColor: "bg-status-blue",
    },
    {
      label: "Well Ventilated",
      value: wellVentilatedResult.toLocaleString(),
      percent:
        ccmsBuiltResult === 0
          ? null
          : `${((wellVentilatedResult / ccmsBuiltResult) * 100).toFixed(0)}%`,
      icon: Wind,
      color: "text-ripple-green",
      bgColor: "bg-action-mint/50",
    },
    {
      label: "Protected from Rain",
      value: rainProtectedResult.toLocaleString(),
      percent:
        ccmsBuiltResult === 0
          ? null
          : `${((rainProtectedResult / kitchensResult) * 100).toFixed(0)}%`,
      icon: CloudRain,
      color: "text-[#4A90A4]",
      bgColor: "bg-status-blue",
    },
    {
      label: "Inspected 0-3 months",
      value: inspected0to3MonthsResult.toLocaleString(),
      percent:
        ccmsBuiltResult === 0
          ? null
          : `${((inspected0to3MonthsResult / ccmsBuiltResult) * 100).toFixed(0)}%`,
      icon: CheckCircle2,
      color: "text-ripple-green",
      bgColor: "bg-status-green",
    },
    {
      label: "Inspected 3-6 months",
      value: inspected3to6MonthsResult.toLocaleString(),
      percent:
        ccmsBuiltResult === 0
          ? null
          : `${((inspected3to6MonthsResult / ccmsBuiltResult) * 100).toFixed(0)}%`,
      icon: AlertCircle,
      color: "text-[#B8860B]",
      bgColor: "bg-status-tan",
    },
    {
      label: "Inspected > 6 months",
      value: inspectedOver6MonthsResult.toLocaleString(),
      percent:
        ccmsBuiltResult === 0
          ? null
          : `${((inspectedOver6MonthsResult / ccmsBuiltResult) * 100).toFixed(0)}%`,
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

// async function getTotalCCMsBuilt({
//   year,
// }: {
//   year: number;
// }): Promise<
//   { error: true; message: string } | { error: false; total: number }
// > {
//   const supabase = createAdminClient();
//   const { count, error } = await supabase
//     .from("householders")
//     .select("*", { count: "exact", head: true })
//     .gte("stove_build_date", `${year}-01-01`)
//     .lte("stove_build_date", `${year}-12-31`);

//   if (error || count == null)
//     return { error: true, message: "Failed to get total CCMs built" };

//   return { error: false, total: count };
// }

// async function getTotalCCMsInUse({
//   year,
// }: {
//   year: number;
// }): Promise<
//   { error: true; message: string } | { error: false; total: number }
// > {
//   const supabase = createAdminClient();
//   const { data, error } = await supabase.rpc("get_ccms_in_use_count", {
//     year_param: year,
//   });

//   if (error || data == null || typeof data !== "number") {
//     return { error: true, message: "Failed to get total CCMs in use" };
//   }

//   return { error: false, total: data };
// }

// async function getConditionGoodCCMs({
//   year,
// }: {
//   year: number;
// }): Promise<
//   { error: true; message: string } | { error: false; count: number }
// > {
//   const supabase = createAdminClient();
//   const { data, error } = await supabase.rpc("get_condition_good_count", {
//     year_param: year,
//   });

//   if (error || data == null || typeof data !== "number") {
//     return {
//       error: true,
//       message: "Failed to get condition good count",
//     };
//   }

//   return { error: false, count: data };
// }

// async function getTotalKitchens({
//   year,
// }: {
//   year: number;
// }): Promise<
//   { error: true; message: string } | { error: false; total: number }
// > {
//   const supabase = createAdminClient();
//   const { data, error } = await supabase.rpc("get_total_kitchens", {
//     year_param: year,
//   });

//   if (error || data == null || typeof data !== "number") {
//     return { error: true, message: "Failed to get total kitchens" };
//   }

//   return { error: false, total: data };
// }

// async function getWellVentilated({
//   year,
// }: {
//   year: number;
// }): Promise<
//   { error: true; message: string } | { error: false; total: number }
// > {
//   const supabase = createAdminClient();
//   const { data, error } = await supabase.rpc("get_well_ventilated_count", {
//     year_param: year,
//   });

//   if (error || data == null || typeof data !== "number") {
//     return { error: true, message: "Failed to get well ventilated count" };
//   }

//   return { error: false, total: data };
// }

// async function getRainProtected({
//   year,
// }: {
//   year: number;
// }): Promise<
//   { error: true; message: string } | { error: false; total: number }
// > {
//   const supabase = createAdminClient();
//   const { data, error } = await supabase.rpc("get_rain_protected_count", {
//     year_param: year,
//   });

//   if (error || data == null || typeof data !== "number") {
//     return { error: true, message: "Failed to get rain protected count" };
//   }

//   return { error: false, total: data };
// }

// async function getInspected0To3Months({
//   year,
// }: {
//   year: number;
// }): Promise<
//   { error: true; message: string } | { error: false; count: number }
// > {
//   const supabase = createAdminClient();
//   const { data, error } = await supabase.rpc(
//     "get_inspected_0_to_3_months_count",
//     {
//       year_param: year,
//     },
//   );

//   if (error || data == null || typeof data !== "number") {
//     return {
//       error: true,
//       message: "Failed to get inspected 0-3 months count",
//     };
//   }

//   return { error: false, count: data };
// }

// async function getInspected3To6Months({
//   year,
// }: {
//   year: number;
// }): Promise<
//   { error: true; message: string } | { error: false; count: number }
// > {
//   const supabase = createAdminClient();
//   const { data, error } = await supabase.rpc(
//     "get_inspected_3_to_6_months_count",
//     {
//       year_param: year,
//     },
//   );

//   if (error || data == null || typeof data !== "number") {
//     return {
//       error: true,
//       message: "Failed to get inspected 3-6 months count",
//     };
//   }

//   return { error: false, count: data };
// }

// async function getInspectedOver6Months({
//   year,
// }: {
//   year: number;
// }): Promise<
//   { error: true; message: string } | { error: false; count: number }
// > {
//   const supabase = createAdminClient();
//   const { data, error } = await supabase.rpc(
//     "get_inspected_over_6_months_count",
//     {
//       year_param: year,
//     },
//   );

//   if (error || data == null || typeof data !== "number") {
//     return {
//       error: true,
//       message: "Failed to get inspected over 6 months count",
//     };
//   }

//   return { error: false, count: data };
// }
