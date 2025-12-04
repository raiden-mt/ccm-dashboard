import { createLoader, parseAsInteger } from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const yearSearchParams = {
  year: parseAsInteger.withDefault(2025),
};

export const loadSearchParams = createLoader(yearSearchParams);
