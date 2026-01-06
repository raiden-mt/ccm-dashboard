"use client";

import type { FilterNames } from "./inspection-data-wrapper";
import { InspectionFilters } from "./inspection-filters";
import { InspectionRecordsTable } from "./inspection-records-table";

export function InspectionDataClient(filterNames: FilterNames) {
  return (
    <>
      <InspectionFilters {...filterNames} />
      <InspectionRecordsTable />
    </>
  );
}
