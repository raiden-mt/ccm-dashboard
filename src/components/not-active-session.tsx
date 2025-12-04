"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { FilterBar, type FilterState } from "./filter-bar";

const defaultFilters: FilterState = {
  vpa: "all",
  district: "all",
  areaManager: "all",
  coordinator: "all",
  lcv: "all",
  cv: "all",
  timePeriod: "all",
  sortBy: "recent",
};

// Mock not active householders with reasons
const notActiveHouseholders = [
  {
    id: "na-001",
    name: "John Moved Away",
    reason: "moved",
    deactivatedDate: "2025-09-15",
    notes: "Relocated to Lilongwe",
  },
  {
    id: "na-002",
    name: "Grace Phiri",
    reason: "deceased",
    deactivatedDate: "2025-08-20",
    notes: "Passed away",
  },
  {
    id: "na-003",
    name: "Peter Banda",
    reason: "stove_destroyed",
    deactivatedDate: "2025-10-05",
    notes: "Stove collapsed, household declined rebuild",
  },
  {
    id: "na-004",
    name: "Mary Tembo",
    reason: "opted_out",
    deactivatedDate: "2025-07-12",
    notes: "Household chose to stop using CCM",
  },
  {
    id: "na-005",
    name: "James Nyirenda",
    reason: "moved",
    deactivatedDate: "2025-11-01",
    notes: "Moved to South Africa",
  },
  {
    id: "na-006",
    name: "Dorothy Mwale",
    reason: "deceased",
    deactivatedDate: "2025-06-30",
    notes: "Passed away",
  },
  {
    id: "na-007",
    name: "Chikondi Gondwe",
    reason: "duplicate",
    deactivatedDate: "2025-05-18",
    notes: "Duplicate entry - merged with HH-045",
  },
];

export function NotActiveSection() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const handleExport = () => {
    alert("Exporting not active data...");
  };

  const getReasonBadge = (reason: string) => {
    switch (reason) {
      case "moved":
        return <Badge className="bg-status-blue text-foreground">Moved</Badge>;
      case "deceased":
        return (
          <Badge className="bg-status-salmon text-foreground">Deceased</Badge>
        );
      case "stove_destroyed":
        return (
          <Badge className="bg-status-tan text-foreground">
            Stove Destroyed
          </Badge>
        );
      case "opted_out":
        return (
          <Badge className="bg-muted text-muted-foreground">Opted Out</Badge>
        );
      case "duplicate":
        return <Badge className="bg-primary/20 text-primary">Duplicate</Badge>;
      default:
        return <Badge className="bg-muted text-muted-foreground">Other</Badge>;
    }
  };

  const reasonCounts = {
    moved: notActiveHouseholders.filter((h) => h.reason === "moved").length,
    deceased: notActiveHouseholders.filter((h) => h.reason === "deceased")
      .length,
    stove_destroyed: notActiveHouseholders.filter(
      (h) => h.reason === "stove_destroyed",
    ).length,
    opted_out: notActiveHouseholders.filter((h) => h.reason === "opted_out")
      .length,
    duplicate: notActiveHouseholders.filter((h) => h.reason === "duplicate")
      .length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground text-2xl font-semibold">Not Active</h2>
        <p className="text-muted-foreground">
          CCM households that are no longer active (moved, deceased, or other
          reasons)
        </p>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        onExport={handleExport}
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="border-l-status-blue border-l-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Moved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#4A90A4]">
              {reasonCounts.moved}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-status-salmon border-l-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Deceased
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#C75050]">
              {reasonCounts.deceased}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-status-tan border-l-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Stove Destroyed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#B8860B]">
              {reasonCounts.stove_destroyed}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-muted border-l-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Opted Out
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-2xl font-bold">
              {reasonCounts.opted_out}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-primary border-l-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Duplicates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-primary text-2xl font-bold">
              {reasonCounts.duplicate}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Not Active Households</CardTitle>
          <CardDescription>
            Showing {notActiveHouseholders.length} households no longer in the
            active program
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-status-blue/50">
                  <TableHead>Name</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Deactivated Date</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notActiveHouseholders.map((hh) => (
                  <TableRow key={hh.id} className="hover:bg-action-beige/30">
                    <TableCell className="font-medium">{hh.name}</TableCell>
                    <TableCell>{getReasonBadge(hh.reason)}</TableCell>
                    <TableCell>{hh.deactivatedDate}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {hh.notes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
