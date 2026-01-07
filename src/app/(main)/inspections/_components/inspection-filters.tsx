"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Calendar } from "~/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Filter, Download, ChevronDownIcon } from "lucide-react";

import { parseAsIsoDate, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadSearchParams } from "~/lib/search-params";
import type { FilterNames } from "./inspection-data-wrapper";

export function InspectionFilters(filterNames: FilterNames) {
  const searchParams = useSearchParams();
  const { year } = loadSearchParams(searchParams);
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year, 11, 31);

  const [dateFromOpen, setDateFromOpen] = useState(false);
  const [dateFrom, setDateFrom] = useQueryState(
    "inspectionDateFrom",
    parseAsIsoDate
      .withDefault(new Date(year, 0, 1))
      .withOptions({ shallow: false }),
  );

  const [dateToOpen, setDateToOpen] = useState(false);
  const [dateTo, setDateTo] = useQueryState(
    "inspectionDateTo",
    parseAsIsoDate
      .withDefault(new Date(year, 11, 31))
      .withOptions({ shallow: false }),
  );

  const [vpaFilter, setVpaFilter] = useQueryState(
    "inspectionVpa",
    parseAsString.withDefault("all").withOptions({ shallow: false }),
  );
  const [conditionFilter, setConditionFilter] = useQueryState(
    "inspectionStoveCondition",
    parseAsString.withDefault("all").withOptions({ shallow: false }),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Request Inspection Data
        </CardTitle>
        <CardDescription>
          Filter inspections by date, VPA, or result
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-2">
            <Label>Date From</Label>
            <Popover open={dateFromOpen} onOpenChange={setDateFromOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-from-button"
                  className="w-48 justify-between font-normal"
                >
                  {dateFrom ? dateFrom.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  defaultMonth={dateFrom ?? startOfYear}
                  disabled={[{ before: startOfYear }, { after: endOfYear }]}
                  onSelect={(date) => {
                    void setDateFrom(date ?? startOfYear);
                    setDateFromOpen(false);
                  }}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Date To</Label>
            <Popover open={dateToOpen} onOpenChange={setDateToOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-from-button"
                  className="w-48 justify-between font-normal"
                >
                  {dateTo ? dateTo.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={dateTo}
                  disabled={[{ before: startOfYear }, { after: endOfYear }]}
                  onSelect={(date) => {
                    void setDateTo(date ?? endOfYear);
                    setDateToOpen(false);
                  }}
                  defaultMonth={dateTo ?? endOfYear}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>VPA Area</Label>
            <Select value={vpaFilter} onValueChange={setVpaFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All VPAs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All VPAs</SelectItem>
                {filterNames.vpa.map((v) => (
                  <SelectItem key={v.id} value={v.name}>
                    {v.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Stove Condition</Label>
            <Select value={conditionFilter} onValueChange={setConditionFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                {filterNames.conditions.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button className="w-full gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
