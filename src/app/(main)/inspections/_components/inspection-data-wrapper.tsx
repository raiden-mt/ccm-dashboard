import { createAdminClient } from "~/lib/services/supabase/server";
import { InspectionDataClient } from "./inspection-data-client";
import { InspectionDataErrorState } from "./inspection-data-error-state";
import { inspectionSearchParamsCache } from "~/lib/search-params";
import { Skeleton } from "~/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export function InspectionDataWrapperSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters skeleton */}
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Table skeleton */}
        <div className="rounded-md border">
          {/* Table header */}
          <div className="bg-muted/50 flex gap-4 border-b p-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-4 flex-1" />
            ))}
          </div>
          {/* Table rows */}
          {Array.from({ length: 8 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex gap-4 border-b p-4 last:border-b-0"
            >
              {Array.from({ length: 7 }).map((_, colIndex) => (
                <Skeleton key={colIndex} className="h-4 flex-1" />
              ))}
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export async function InspectionDataWrapper() {
  const [filterNamesResult, inspectionDataResult] = await Promise.all([
    getFilterNames(),
    getInspectionData({ limit: 15 }),
  ]);

  if (
    filterNamesResult.error ||
    !filterNamesResult.data ||
    inspectionDataResult.error ||
    !inspectionDataResult.data
  ) {
    return inspectionDataResult.error || !inspectionDataResult.data ? (
      <InspectionDataErrorState
        title="Unable to load inspection data"
        description="We couldn’t fetch the inspection data needed to display the inspection records."
        error={inspectionDataResult.error}
      />
    ) : (
      <InspectionDataErrorState
        title="Unable to load inspection filters"
        description="We couldn’t fetch the filter options needed to request inspection data."
        error={filterNamesResult.error ?? "No filter options were returned."}
      />
    );
  }

  return (
    <InspectionDataClient
      filterNames={filterNamesResult.data}
      inspectionData={inspectionDataResult.data}
    />
  );
}

async function getFilterNames(): Promise<FilterNamesResult> {
  const supabase = createAdminClient();

  const [vpaResult, conditionResult] = await Promise.all([
    supabase.rpc("get_vpa_names"),
    supabase.rpc("get_stove_condition_names"),
  ]);

  if (vpaResult.error || conditionResult.error) {
    return {
      error: vpaResult.error
        ? "Failed to fetch VPA names"
        : "Failed to fetch stove condition names",
      data: null,
    };
  }

  return {
    data: {
      vpa: vpaResult.data,
      conditions: conditionResult.data,
    },
    error: null,
  };
}

async function getInspectionData({
  limit = 15,
}: {
  limit?: number;
}): Promise<InspectionDataResult> {
  const {
    year,
    inspectionDateFrom: dateFrom,
    inspectionDateTo: dateTo,
    inspectionVpa: vpa,
    inspectionStoveCondition: stoveCondition,
    inspectionTablePage: page,
  } = inspectionSearchParamsCache.all();
  const dateFromStr = dateFrom
    ? dateFrom.toISOString().split("T")[0]
    : new Date(year, 0, 1).toISOString().split("T")[0];
  const dateToStr = dateTo
    ? dateTo.toISOString().split("T")[0]
    : new Date(year, 11, 31).toISOString().split("T")[0];

  const supabase = createAdminClient();
  const [inspectionRecordsResult, inspectionCountResult] = await Promise.all([
    supabase.rpc("get_inspection_records", {
      p_date_from: dateFromStr,
      p_date_to: dateToStr,
      p_vpa_name: vpa,
      p_stove_condition: stoveCondition,
      p_limit: limit,
      p_offset: (page - 1) * limit,
    }),
    supabase.rpc("get_inspection_records_count", {
      p_date_from: dateFromStr,
      p_date_to: dateToStr,
      p_vpa_name: vpa,
      p_stove_condition: stoveCondition,
    }),
  ]);

  if (inspectionRecordsResult.error || inspectionCountResult.error) {
    return {
      error: inspectionRecordsResult.error
        ? "Failed to fetch inspection records"
        : "Failed to fetch inspection records count",
      data: null,
    };
  }

  return {
    data: {
      inspectionRecords: inspectionRecordsResult.data ?? [],
      inspectionRecordsCount: inspectionCountResult.data ?? 0,
    },
    error: null,
  };
}

// Type definitions
export type FilterNames = {
  vpa: Array<{ id: string; name: string }>;
  conditions: Array<{ value: string; label: string }>;
};

type FilterNamesResult =
  | {
      data: {
        vpa: Array<{ id: string; name: string }>;
        conditions: Array<{ value: string; label: string }>;
      };
      error: null;
    }
  | {
      data: null;
      error: string;
    };

export type InspectionRecord = {
  id: string;
  householder_name: string;
  inspection_date: string;
  inspector_name: string;
  chief_name: string;
  lead_cv_name: string;
  ccm_in_use: boolean;
  ccm_condition: string;
  wood_use: boolean;
  has_kitchen: boolean;
  kitchen_well_ventilated: boolean;
  kitchen_rainproof: boolean;
  vpa_name: string;
};

export type InspectionData = {
  inspectionRecords: InspectionRecord[];
  inspectionRecordsCount: number;
};

type InspectionDataResult =
  | {
      data: InspectionData;
      error: null;
    }
  | {
      data: null;
      error: string;
    };
