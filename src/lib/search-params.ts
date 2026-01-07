import {
  createLoader,
  createSearchParamsCache,
  parseAsInteger,
  parseAsIsoDate,
  parseAsString,
} from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const yearSearchParams = {
  year: parseAsInteger.withDefault(2025),
};

export const inspectionSearchParamsCache = createSearchParamsCache({
  year: parseAsInteger.withDefault(2025),
  inspectionDateFrom: parseAsIsoDate,
  inspectionDateTo: parseAsIsoDate,
  inspectionVpa: parseAsString.withDefault("all"),
  inspectionStoveCondition: parseAsString.withDefault("all"),
  inspectionTablePage: parseAsInteger.withDefault(1),
});

export const loadSearchParams = createLoader(yearSearchParams);
