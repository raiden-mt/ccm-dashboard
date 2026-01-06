"use client";

import { useState } from "react";
import { InspectionFilters } from "./inspection-filters";
import { InspectionRecordsTable } from "./inspection-records-table";

interface Filters {
  dateFrom: string;
  dateTo: string;
  vpaFilter: string;
  conditionFilter: string;
}

export function InspectionDataSection() {
  const [filters, setFilters] = useState<Filters>({
    dateFrom: "",
    dateTo: "",
    vpaFilter: "all",
    conditionFilter: "all",
  });

  return (
    <>
      <InspectionFilters onFiltersChange={setFilters} />
      <InspectionRecordsTable filters={filters} />
    </>
  );
}

