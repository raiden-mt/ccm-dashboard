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
import { Button } from "~/components/ui/button";
import { FilterBar, type FilterState } from "~/components/filter-bar";
import { Archive, RotateCcw } from "lucide-react";

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

// Mock archived records
const archivedRecords = [
  {
    id: "arch-001",
    type: "household",
    name: "John Moved Away",
    archivedDate: "2025-09-15",
    archivedBy: "Glory Choo",
    reason: "Relocated",
  },
  {
    id: "arch-002",
    type: "household",
    name: "Grace Phiri",
    archivedDate: "2025-08-20",
    archivedBy: "Flora Banda",
    reason: "Deceased",
  },
  {
    id: "arch-003",
    type: "inspection",
    name: "Inspection #1234",
    archivedDate: "2025-07-10",
    archivedBy: "System",
    reason: "Duplicate entry",
  },
  {
    id: "arch-004",
    type: "survey",
    name: "Usage Survey #567",
    archivedDate: "2025-06-05",
    archivedBy: "System",
    reason: "Invalid data",
  },
  {
    id: "arch-005",
    type: "household",
    name: "Peter Banda",
    archivedDate: "2025-10-05",
    archivedBy: "Annette Karambo",
    reason: "Stove collapsed",
  },
  {
    id: "arch-006",
    type: "staff",
    name: "Chimwemwe Gondwe",
    archivedDate: "2025-03-15",
    archivedBy: "Sarah Tembo",
    reason: "Resigned",
  },
];

export function ArchivedSection() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const handleExport = () => {
    alert("Exporting archived data...");
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "household":
        return <Badge className="bg-primary/20 text-primary">Household</Badge>;
      case "inspection":
        return (
          <Badge className="bg-ripple-green/20 text-ripple-green">
            Inspection
          </Badge>
        );
      case "survey":
        return <Badge className="bg-status-blue text-foreground">Survey</Badge>;
      case "staff":
        return <Badge className="bg-status-tan text-foreground">Staff</Badge>;
      default:
        return <Badge className="bg-muted text-muted-foreground">Other</Badge>;
    }
  };

  const typeCounts = {
    household: archivedRecords.filter((r) => r.type === "household").length,
    inspection: archivedRecords.filter((r) => r.type === "inspection").length,
    survey: archivedRecords.filter((r) => r.type === "survey").length,
    staff: archivedRecords.filter((r) => r.type === "staff").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground text-2xl font-semibold">Archived</h2>
        <p className="text-muted-foreground">
          Historical records that have been removed from active data
        </p>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        onExport={handleExport}
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-primary border-l-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Households
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-primary text-2xl font-bold">
              {typeCounts.household}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-ripple-green border-l-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Inspections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-ripple-green text-2xl font-bold">
              {typeCounts.inspection}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-status-blue border-l-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Surveys
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#4A90A4]">
              {typeCounts.survey}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-status-tan border-l-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Staff
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#B8860B]">
              {typeCounts.staff}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Archive className="text-muted-foreground h-5 w-5" />
            Archived Records
          </CardTitle>
          <CardDescription>
            Showing {archivedRecords.length} archived records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-status-blue/50">
                  <TableHead>Type</TableHead>
                  <TableHead>Name/ID</TableHead>
                  <TableHead>Archived Date</TableHead>
                  <TableHead>Archived By</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {archivedRecords.map((record) => (
                  <TableRow
                    key={record.id}
                    className="hover:bg-action-beige/30"
                  >
                    <TableCell>{getTypeBadge(record.type)}</TableCell>
                    <TableCell className="font-medium">{record.name}</TableCell>
                    <TableCell>{record.archivedDate}</TableCell>
                    <TableCell>{record.archivedBy}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {record.reason}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-action-beige text-foreground hover:bg-action-beige/80"
                      >
                        <RotateCcw className="mr-1 h-3 w-3" />
                        Restore
                      </Button>
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
