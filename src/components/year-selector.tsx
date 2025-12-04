"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import { useSearchParams } from "next/navigation";
import { ChevronDown, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { loadSearchParams } from "~/lib/search-params";

export default function YearSelector({ years }: { years: number[] }) {
  const searchParams = useSearchParams();
  const currentYear = loadSearchParams(searchParams).year;

  const [year, setYear] = useQueryState(
    "year",
    parseAsInteger.withDefault(currentYear).withOptions({ shallow: false }),
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground gap-2"
        >
          <Calendar className="h-4 w-4" />
          {year}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {years.map((year) => (
          <DropdownMenuItem key={year} onClick={() => setYear(year)}>
            {year}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
