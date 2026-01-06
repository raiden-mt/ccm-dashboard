import {
  createLoader,
  parseAsInteger,
  parseAsIsoDate,
  parseAsString,
} from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const yearSearchParams = {
  year: parseAsInteger.withDefault(2025),

  // Inspection search params
  inspectionDateFrom: parseAsIsoDate,
  inspectionDateTo: parseAsIsoDate.withDefault(new Date()),
  inspectionVpa: parseAsString.withDefault("all"),
  inspectionStoveCondition: parseAsString.withDefault("all"),
};

export const loadSearchParams = createLoader(yearSearchParams);
