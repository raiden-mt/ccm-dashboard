import { createAdminClient } from "~/lib/services/supabase/server";
import { InspectionDataClient } from "./inspection-data-client";

export async function InspectionDataWrapper() {
  const { data: filterNames, error: filterNamesError } = await getFilterNames();
  if (filterNamesError || !filterNames) {
    return <div>Error fetching filter names</div>;
  }

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
