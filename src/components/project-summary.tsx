import { Card, CardContent } from "~/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { dashboardStats } from "~/lib/mock-data";
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
import { createAdminClient } from "~/lib/services/supabase/server";

export async function ProjectSummary({ year }: { year: number }) {
  const stats = dashboardStats;
  const [
    ccmsBuiltResult,
    ccmsInUseResult,
    conditionGoodResult,
    kitchensResult,
    wellVentilatedResult,
    rainProtectedResult,
  ] = await Promise.all([
    getTotalCCMsBuilt({ year }),
    getTotalCCMsInUse({ year }),
    getConditionGoodCCMs({ year }),
    getTotalKitchens({ year }),
    getWellVentilated({ year }),
    getRainProtected({ year }),
  ]);

  const summaryItems = [
    {
      label: "Total CCMs Built",
      value: ccmsBuiltResult.error
        ? "N/A"
        : ccmsBuiltResult.total.toLocaleString(),
      percent: null,
      icon: Flame,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Total CCMs In Use",
      value: ccmsInUseResult.error
        ? "N/A"
        : ccmsInUseResult.total.toLocaleString(),
      percent:
        ccmsBuiltResult.error || ccmsInUseResult.error
          ? null
          : `${((ccmsInUseResult.total / ccmsBuiltResult.total) * 100).toFixed(0)}%`,
      icon: Activity,
      color: "text-ripple-green",
      bgColor: "bg-ripple-green/10",
    },
    {
      label: "Condition Good/Average",
      value: conditionGoodResult.error
        ? "N/A"
        : conditionGoodResult.count.toLocaleString(),
      percent:
        conditionGoodResult.error || ccmsBuiltResult.error
          ? null
          : `${((conditionGoodResult.count / ccmsBuiltResult.total) * 100).toFixed(0)}%`,
      icon: ThumbsUp,
      color: "text-ripple-green",
      bgColor: "bg-status-green",
    },
    {
      label: "Total Kitchens",
      value: kitchensResult.error
        ? "N/A"
        : kitchensResult.total.toLocaleString(),
      percent:
        kitchensResult.error || ccmsBuiltResult.error
          ? null
          : `${((kitchensResult.total / ccmsBuiltResult.total) * 100).toFixed(0)}%`,
      icon: Home,
      color: "text-[#4A90A4]",
      bgColor: "bg-status-blue",
    },
    {
      label: "Well Ventilated",
      value: wellVentilatedResult.error
        ? "N/A"
        : wellVentilatedResult.total.toLocaleString(),
      percent:
        wellVentilatedResult.error || kitchensResult.error
          ? null
          : `${((wellVentilatedResult.total / kitchensResult.total) * 100).toFixed(0)}%`,
      icon: Wind,
      color: "text-ripple-green",
      bgColor: "bg-action-mint/50",
    },
    {
      label: "Protected from Rain",
      value: rainProtectedResult.error
        ? "N/A"
        : rainProtectedResult.total.toLocaleString(),
      percent:
        rainProtectedResult.error || kitchensResult.error
          ? null
          : `${((rainProtectedResult.total / kitchensResult.total) * 100).toFixed(0)}%`,
      icon: CloudRain,
      color: "text-[#4A90A4]",
      bgColor: "bg-status-blue",
    },
    {
      label: "Inspected 0-3 months",
      value: stats.inspected0to3Months.toLocaleString(),
      percent: `${stats.greenStatusPercent}%`,
      icon: CheckCircle2,
      color: "text-ripple-green",
      bgColor: "bg-status-green",
    },
    {
      label: "Inspected 3-6 months",
      value: stats.inspected3to6Months.toLocaleString(),
      percent: `${stats.yellowStatusPercent}%`,
      icon: AlertCircle,
      color: "text-[#B8860B]",
      bgColor: "bg-status-tan",
    },
    {
      label: "Inspected > 6 months",
      value: stats.inspected6PlusMonths.toLocaleString(),
      percent: `${stats.redStatusPercent}%`,
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

async function getTotalCCMsBuilt({
  year,
}: {
  year: number;
}): Promise<
  { error: true; message: string } | { error: false; total: number }
> {
  const supabase = createAdminClient();
  const { count, error } = await supabase
    .from("householders")
    .select("*", { count: "exact", head: true })
    .gte("stove_build_date", `${year}-01-01`)
    .lte("stove_build_date", `${year}-12-31`);

  if (error || count == null)
    return { error: true, message: "Failed to get total CCMs built" };

  return { error: false, total: count };
}

async function getTotalCCMsInUse({
  year,
}: {
  year: number;
}): Promise<
  { error: true; message: string } | { error: false; total: number }
> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc("get_ccms_in_use_count", {
    year_param: year,
  });

  if (error || data == null || typeof data !== "number") {
    return { error: true, message: "Failed to get total CCMs in use" };
  }

  return { error: false, total: data };
}

async function getConditionGoodCCMs({
  year,
}: {
  year: number;
}): Promise<
  { error: true; message: string } | { error: false; count: number }
> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc("get_condition_good_count", {
    year_param: year,
  });

  if (error || data == null || typeof data !== "number") {
    return {
      error: true,
      message: "Failed to get condition good count",
    };
  }

  return { error: false, count: data };
}

async function getTotalKitchens({
  year,
}: {
  year: number;
}): Promise<
  { error: true; message: string } | { error: false; total: number }
> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc("get_total_kitchens", {
    year_param: year,
  });

  if (error || data == null || typeof data !== "number") {
    return { error: true, message: "Failed to get total kitchens" };
  }

  return { error: false, total: data };
}

async function getWellVentilated({
  year,
}: {
  year: number;
}): Promise<
  { error: true; message: string } | { error: false; total: number }
> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc("get_well_ventilated_count", {
    year_param: year,
  });

  if (error || data == null || typeof data !== "number") {
    return { error: true, message: "Failed to get well ventilated count" };
  }

  return { error: false, total: data };
}

async function getRainProtected({
  year,
}: {
  year: number;
}): Promise<
  { error: true; message: string } | { error: false; total: number }
> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc("get_rain_protected_count", {
    year_param: year,
  });

  if (error || data == null || typeof data !== "number") {
    return { error: true, message: "Failed to get rain protected count" };
  }

  return { error: false, total: data };
}
