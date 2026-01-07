"use client";

import type { FilterNames, InspectionData } from "./inspection-data-wrapper";
import { InspectionFilters } from "./inspection-filters";
import { InspectionRecordsTable } from "./inspection-records-table";

export function InspectionDataClient({
  filterNames,
  inspectionData,
}: {
  filterNames: FilterNames;
  inspectionData: InspectionData;
}) {
  return (
    <>
      <InspectionFilters {...filterNames} />
      <InspectionRecordsTable
        inspections={inspectionData.inspectionRecords}
        totalInspections={inspectionData.inspectionRecordsCount}
      />
    </>
  );
}
