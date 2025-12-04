"use client";

import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { vpaAreas, districts } from "~/lib/mock-data";
import { CalendarIcon, Download, RotateCcw, Filter } from "lucide-react";
import { format } from "date-fns";

export interface FilterState {
  vpa: string;
  district: string;
  areaManager: string;
  coordinator: string;
  lcv: string;
  cv: string;
  timePeriod: string;
  sortBy: string;
  dateFrom?: Date;
  dateTo?: Date;
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onExport?: () => void;
  showInspectionFilter?: boolean;
}

const timePeriodOptions = [
  { value: "all", label: "All Time" },
  { value: "year", label: "This Year" },
  { value: "3months", label: "Last 3 Months" },
  { value: "6months", label: "Last 6 Months" },
  { value: "9months", label: "Last 9 Months" },
  { value: "custom", label: "Date Range" },
];

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "a-z", label: "A to Z" },
  { value: "z-a", label: "Z to A" },
  { value: "asc", label: "Ascending Numbers" },
  { value: "desc", label: "Descending Numbers" },
  { value: "recent", label: "Most Recent" },
];

const inspectionPeriodOptions = [
  { value: "all", label: "All" },
  { value: "0-3", label: "0 - 3 months" },
  { value: "3-6", label: "3 - 6 months" },
  { value: "6+", label: "6 months +" },
];

// Mock area managers, coordinators, LCVs, CVs
const areaManagers = [
  { value: "all", label: "All Area Managers" },
  { value: "am-001", label: "Peter Banda" },
  { value: "am-002", label: "Grace Phiri" },
];

const coordinators = [
  { value: "all", label: "All Coordinators" },
  { value: "coord-001", label: "Glory Choo" },
  { value: "coord-002", label: "Flora Banda" },
  { value: "coord-003", label: "Annette Karambo" },
  { value: "coord-004", label: "Wanangwa Chimphepo" },
];

const lcvs = [
  { value: "all", label: "All LCVs" },
  { value: "lcv-001", label: "Chimwemwe Kumwenda" },
  { value: "lcv-002", label: "Daud Mpofu" },
  { value: "lcv-003", label: "Aaron Moyo" },
];

const cvs = [
  { value: "all", label: "All CVs" },
  { value: "cv-001", label: "Jim Mwamwatandala" },
  { value: "cv-002", label: "Laston Nyasulu" },
  { value: "cv-003", label: "Justice Chibalaza" },
];

export function FilterBar({
  filters,
  onFilterChange,
  onExport,
  showInspectionFilter,
}: FilterBarProps) {
  const handleFilterChange = (
    key: keyof FilterState,
    value: string | Date | undefined,
  ) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFilterChange({
      vpa: "all",
      district: "all",
      areaManager: "all",
      coordinator: "all",
      lcv: "all",
      cv: "all",
      timePeriod: "all",
      sortBy: "default",
      dateFrom: undefined,
      dateTo: undefined,
    });
  };

  return (
    <div className="bg-card-cream space-y-4 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="text-muted-foreground h-4 w-4" />
          <span className="text-foreground text-sm font-medium">
            Filters & Sort
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="bg-action-beige text-foreground hover:bg-action-beige/80"
          >
            <RotateCcw className="mr-1 h-3 w-3" />
            Reset
          </Button>
          {onExport && (
            <Button
              size="sm"
              onClick={onExport}
              className="bg-action-mint text-foreground hover:bg-action-mint/80"
            >
              <Download className="mr-1 h-3 w-3" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Filter Row 1: Location hierarchy */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <Select
          value={filters.district}
          onValueChange={(v) => handleFilterChange("district", v)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="District" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Districts</SelectItem>
            {districts.map((d) => (
              <SelectItem key={d.id} value={d.id}>
                {d.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.vpa}
          onValueChange={(v) => handleFilterChange("vpa", v)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="VPA" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All VPAs</SelectItem>
            {vpaAreas.map((vpa) => (
              <SelectItem key={vpa.id} value={vpa.id}>
                {vpa.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.areaManager}
          onValueChange={(v) => handleFilterChange("areaManager", v)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Area Manager" />
          </SelectTrigger>
          <SelectContent>
            {areaManagers.map((am) => (
              <SelectItem key={am.value} value={am.value}>
                {am.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.coordinator}
          onValueChange={(v) => handleFilterChange("coordinator", v)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Coordinator" />
          </SelectTrigger>
          <SelectContent>
            {coordinators.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.lcv}
          onValueChange={(v) => handleFilterChange("lcv", v)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="LCV" />
          </SelectTrigger>
          <SelectContent>
            {lcvs.map((l) => (
              <SelectItem key={l.value} value={l.value}>
                {l.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.cv}
          onValueChange={(v) => handleFilterChange("cv", v)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="CV" />
          </SelectTrigger>
          <SelectContent>
            {cvs.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Filter Row 2: Time and Sort */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Select
          value={filters.timePeriod}
          onValueChange={(v) => handleFilterChange("timePeriod", v)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            {timePeriodOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {filters.timePeriod === "custom" && (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-background justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateFrom
                    ? format(filters.dateFrom, "PPP")
                    : "From date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.dateFrom}
                  onSelect={(date) => handleFilterChange("dateFrom", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-background justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateTo ? format(filters.dateTo, "PPP") : "To date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.dateTo}
                  onSelect={(date) => handleFilterChange("dateTo", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </>
        )}

        {showInspectionFilter && (
          <Select>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Last Inspected" />
            </SelectTrigger>
            <SelectContent>
              {inspectionPeriodOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Select
          value={filters.sortBy}
          onValueChange={(v) => handleFilterChange("sortBy", v)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
