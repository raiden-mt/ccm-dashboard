import { createAdminClient } from "~/lib/services/supabase/server";
import { ProjectSummaryRealtime } from "./project-summary-realtime";
import { ProjectSummaryInline } from "./project-summary-inline";
import { Skeleton } from "~/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export type ProjectSummaryVariant = "dialog" | "inline";

export function ProjectSummarySkeleton({
  variant = "dialog",
}: {
  variant?: ProjectSummaryVariant;
}) {
  if (variant === "inline") {
    return (
      <Card className="gap-2">
        <CardHeader className="py-0">
          <CardTitle className="text-lg font-semibold">
            CCM Project Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="py-0">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="space-y-2 p-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-7 w-12" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Dialog variant - just a button skeleton
  return <Skeleton className="h-10 w-36" />;
}

export async function ProjectSummaryWrapper({
  year,
  variant = "dialog",
}: {
  year: number;
  variant?: ProjectSummaryVariant;
}) {
  const [
    ccmsBuiltResult,
    ccmsInUseResult,
    conditionGoodResult,
    kitchensResult,
    wellVentilatedResult,
    rainProtectedResult,
    inspected0to3MonthsResult,
    inspected3to6MonthsResult,
    inspectedOver6MonthsResult,
  ] = await Promise.all([
    getTotalCCMsBuilt({ year }),
    getTotalCCMsInUse({ year }),
    getConditionGoodCCMs({ year }),
    getTotalKitchens({ year }),
    getWellVentilated({ year }),
    getRainProtected({ year }),
    getInspected0To3Months({ year }),
    getInspected3To6Months({ year }),
    getInspectedOver6Months({ year }),
  ]);

  if (
    ccmsBuiltResult.error ||
    ccmsInUseResult.error ||
    conditionGoodResult.error ||
    kitchensResult.error ||
    wellVentilatedResult.error ||
    rainProtectedResult.error ||
    inspected0to3MonthsResult.error ||
    inspected3to6MonthsResult.error ||
    inspectedOver6MonthsResult.error
  ) {
    return <div>Error loading project summary</div>;
  }

  const props = {
    ccmsBuiltCount: ccmsBuiltResult.total,
    ccmsInUseCount: ccmsInUseResult.total,
    conditionGoodCount: conditionGoodResult.count,
    kitchensCount: kitchensResult.total,
    wellVentilatedCount: wellVentilatedResult.total,
    rainProtectedCount: rainProtectedResult.total,
    inspected0to3MonthsCount: inspected0to3MonthsResult.count,
    inspected3to6MonthsCount: inspected3to6MonthsResult.count,
    inspectedOver6MonthsCount: inspectedOver6MonthsResult.count,
  };

  if (variant === "inline") {
    return <ProjectSummaryInline {...props} />;
  }

  return <ProjectSummaryRealtime {...props} />;
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

async function getInspected0To3Months({
  year,
}: {
  year: number;
}): Promise<
  { error: true; message: string } | { error: false; count: number }
> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc(
    "get_inspected_0_to_3_months_count",
    {
      year_param: year,
    },
  );

  if (error || data == null || typeof data !== "number") {
    return {
      error: true,
      message: "Failed to get inspected 0-3 months count",
    };
  }

  return { error: false, count: data };
}

async function getInspected3To6Months({
  year,
}: {
  year: number;
}): Promise<
  { error: true; message: string } | { error: false; count: number }
> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc(
    "get_inspected_3_to_6_months_count",
    {
      year_param: year,
    },
  );

  if (error || data == null || typeof data !== "number") {
    return {
      error: true,
      message: "Failed to get inspected 3-6 months count",
    };
  }

  return { error: false, count: data };
}

async function getInspectedOver6Months({
  year,
}: {
  year: number;
}): Promise<
  { error: true; message: string } | { error: false; count: number }
> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc(
    "get_inspected_over_6_months_count",
    {
      year_param: year,
    },
  );

  if (error || data == null || typeof data !== "number") {
    return {
      error: true,
      message: "Failed to get inspected over 6 months count",
    };
  }

  return { error: false, count: data };
}
