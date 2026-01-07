"use client";

import { useSearchParams } from "next/navigation";
import { parseAsIsoDate, parseAsString, useQueryState } from "nuqs";

import type { FilterNames, InspectionData } from "./inspection-data-wrapper";
import { InspectionFilters } from "./inspection-filters";
import { InspectionRecordsTable } from "./inspection-records-table";
import { useRealtimeInspectionRecords } from "~/hooks/use-realtime-inspection-records";
import { loadSearchParams } from "~/lib/search-params";

export function InspectionDataClient({
  filterNames,
  inspectionData,
}: {
  filterNames: FilterNames;
  inspectionData: InspectionData;
}) {
  const searchParams = useSearchParams();
  const { year } = loadSearchParams(searchParams);

  // Get filter values to check if new records match current filters
  const [dateFrom] = useQueryState(
    "inspectionDateFrom",
    parseAsIsoDate.withDefault(new Date(year, 0, 1)),
  );
  const [dateTo] = useQueryState(
    "inspectionDateTo",
    parseAsIsoDate.withDefault(new Date(year, 11, 31)),
  );
  const [vpaFilter] = useQueryState(
    "inspectionVpa",
    parseAsString.withDefault("all"),
  );
  const [conditionFilter] = useQueryState(
    "inspectionStoveCondition",
    parseAsString.withDefault("all"),
  );

  // Subscribe to realtime inspection record updates
  const { newRecords } = useRealtimeInspectionRecords();

  // Filter realtime records to match current filter criteria
  const filteredNewRecords = newRecords.filter((record) => {
    // Check date range
    const recordDate = new Date(record.inspection_date);
    if (dateFrom && recordDate < dateFrom) return false;
    if (dateTo && recordDate > dateTo) return false;

    // Check VPA filter
    if (vpaFilter !== "all" && record.vpa_name !== vpaFilter) return false;

    // Check condition filter
    if (conditionFilter !== "all" && record.ccm_condition !== conditionFilter)
      return false;

    return true;
  });

  // Merge realtime records with server-fetched records
  // New records go at the top since they're most recent
  // Get IDs of existing records to avoid duplicates
  const existingIds = new Set(
    inspectionData.inspectionRecords.map((r) => r.id),
  );

  // Filter out any realtime records that already exist in server data
  const uniqueNewRecords = filteredNewRecords.filter(
    (r) => !existingIds.has(r.id),
  );

  // Combine: new records first (sorted by date desc), then existing records
  const combined = [...uniqueNewRecords, ...inspectionData.inspectionRecords];

  // Sort by inspection_date descending to maintain order
  const mergedInspections = combined.sort((a, b) => {
    const dateA = new Date(a.inspection_date);
    const dateB = new Date(b.inspection_date);
    return dateB.getTime() - dateA.getTime();
  });

  // Update total count to include new realtime records
  const totalCount =
    inspectionData.inspectionRecordsCount + filteredNewRecords.length;

  return (
    <>
      <InspectionFilters {...filterNames} />
      <InspectionRecordsTable
        inspections={mergedInspections}
        totalInspections={totalCount}
      />
    </>
  );
}
