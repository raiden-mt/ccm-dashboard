"use client";

import { useSearchParams } from "next/navigation";
import { parseAsIsoDate, parseAsString, useQueryState } from "nuqs";

import type {
  FilterNames,
  InspectionData,
  InspectionRecord,
} from "./inspection-data-wrapper";
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
  const { recordsById, insertedById } = useRealtimeInspectionRecords() as {
    recordsById: Record<string, InspectionRecord>;
    insertedById: Record<string, true>;
  };

  const recordMatchesFilters = (record: InspectionRecord) => {
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
  };

  // Merge realtime records with server-fetched records
  const existingIds = new Set(
    inspectionData.inspectionRecords.map((r) => r.id),
  );

  // Apply updates (overrides) to any records already in the server-provided page
  const serverRecordsWithOverrides = inspectionData.inspectionRecords.map(
    (r) => recordsById[r.id] ?? r,
  );

  // Only prepend records that were inserted while the page is open
  const insertedRecords: InspectionRecord[] = Object.keys(insertedById)
    .map((id) => recordsById[id])
    .filter((r): r is InspectionRecord => Boolean(r))
    .filter(recordMatchesFilters)
    .filter((r) => !existingIds.has(r.id));

  // Combine: new records first (sorted by date desc), then existing records
  const combined = [...insertedRecords, ...serverRecordsWithOverrides];

  // Sort by inspection_date descending to maintain order
  const mergedInspections = combined.sort((a, b) => {
    const dateA = new Date(a.inspection_date);
    const dateB = new Date(b.inspection_date);
    return dateB.getTime() - dateA.getTime();
  });

  // Update total count to include new realtime records
  const totalCount =
    inspectionData.inspectionRecordsCount + insertedRecords.length;

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
