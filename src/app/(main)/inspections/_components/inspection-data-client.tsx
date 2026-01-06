"use client";

import { InspectionFilters } from "./inspection-filters";
import { InspectionRecordsTable } from "./inspection-records-table";

export function InspectionDataClient() {
  return (
    <>
      <InspectionFilters />
      <InspectionRecordsTable />
    </>
  );
}
