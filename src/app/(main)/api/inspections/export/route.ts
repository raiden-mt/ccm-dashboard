import { createAdminClient } from "~/lib/services/supabase/server";
import * as XLSX from "xlsx";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const serializedFormData = {
      dateFrom: formData.get("dateFrom") as string,
      dateTo: formData.get("dateTo") as string,
      vpa: formData.get("vpa") as string,
      condition: formData.get("condition") as string,
    };

    const { data: inspectionRecords, error } =
      await getInspectionData(serializedFormData);

    if (error || !inspectionRecords) {
      return Response.json(
        { error: error || "Failed to fetch inspection records" },
        { status: 500 },
      );
    }

    const worksheet = XLSX.utils.json_to_sheet(inspectionRecords as unknown[]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inspection Records");
    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    }) as ArrayBuffer;

    // Generate filename with date range
    const { dateFrom, dateTo } = serializedFormData;
    const filename = `inspection-records-${dateFrom}-${dateTo}.xlsx`;

    return new Response(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
      status: 200,
    });
  } catch (error) {
    console.error("Export error:", error);
    return Response.json(
      { error: "Failed to export inspection data" },
      { status: 500 },
    );
  }
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
