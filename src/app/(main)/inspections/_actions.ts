"use server";

import { createAdminClient } from "~/lib/services/supabase/server";

export async function exportInspectionData(formData: FormData) {
  const serializedFormData = {
    dateFrom: formData.get("dateFrom") as string,
    dateTo: formData.get("dateTo") as string,
    vpa: formData.get("vpa") as string,
    condition: formData.get("condition") as string,
  };

  const { data: inspectionRecords, error } =
    await getInspectionData(serializedFormData);

  if (error || !inspectionRecords) {
    console.error(error);
  }
  console.log(inspectionRecords);
}

async function getInspectionData({
  dateFrom,
  dateTo,
  vpa,
  condition,
}: {
  dateFrom: string;
  dateTo: string;
  vpa: string;
  condition: string;
}) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc("get_inspection_records", {
    p_date_from: dateFrom,
    p_date_to: dateTo,
    p_vpa_name: vpa,
    p_stove_condition: condition,
  });

  if (error || !data) {
    return {
      error: error
        ? "Failed to fetch inspection records"
        : "Failed to fetch inspection records count",
      data: null,
    };
  }

  return {
    data,
    error: null,
  };
}
