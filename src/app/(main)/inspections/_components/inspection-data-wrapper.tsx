import { createAdminClient } from "~/lib/services/supabase/server";
import { InspectionDataClient } from "./inspection-data-client";
import { InspectionDataErrorState } from "./inspection-data-error-state";
import { inspectionSearchParamsCache } from "~/lib/search-params";

export async function InspectionDataWrapper() {
  const { data: filterNames, error: filterNamesError } = await getFilterNames();
  if (filterNamesError || !filterNames) {
    return (
      <InspectionDataErrorState
        title="Unable to load inspection filters"
        description="We couldn’t fetch the filter options needed to request inspection data."
        error={filterNamesError ?? "No filter options were returned."}
      />
    );
  }

  // await getInspectionData();

  return <InspectionDataClient {...filterNames} />;
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
    inspectionDateFrom: dateFrom,
    inspectionDateTo: dateTo,
    inspectionVpa: vpa,
    inspectionStoveCondition: stoveCondition,
    inspectionTablePage: page,
  } = inspectionSearchParamsCache.all();

  const dateFromStr = dateFrom.toISOString().split("T")[0];
  const dateToStr = dateTo.toISOString().split("T")[0];

  const supabase = createAdminClient();
  const [inspectionRecordsResult, inspectionCountResult] = await Promise.all([
    supabase.rpc("get_inspection_records", {
      p_date_from: dateFromStr,
      p_date_to: dateToStr,
      p_vpa: vpa,
      p_stove_condition: stoveCondition,
      p_limit: limit,
      p_offset: (page - 1) * limit,
    }),
    supabase.rpc("get_inspection_records_count", {
      p_date_from: dateFromStr,
      p_date_to: dateToStr,
      p_vpa: vpa,
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
