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
import { householders } from "~/lib/mock-data";

const defaultFilters: FilterState = {
  vpa: "all",
  district: "all",
  areaManager: "all",
  coordinator: "all",
  lcv: "all",
  cv: "all",
  timePeriod: "all",
  sortBy: "default",
};

export function HouseholdsSection() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const activeHouseholders = householders.filter((h) => !h.isArchived);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "green":
        return (
          <Badge className="bg-status-green text-foreground">0-3 months</Badge>
        );
      case "yellow":
        return (
          <Badge className="bg-status-tan text-foreground">3-6 months</Badge>
        );
      case "red":
        return (
          <Badge className="bg-status-salmon text-foreground">6+ months</Badge>
        );
      default:
        return (
          <Badge className="bg-status-blue text-foreground">Uninspected</Badge>
        );
    }
  };

  const handleExport = () => {
    alert("Exporting households data...");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground text-2xl font-semibold">Households</h2>
        <p className="text-muted-foreground">
          View and manage all registered households with CCM stoves
        </p>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        onExport={handleExport}
        showInspectionFilter
      />

      <Card>
        <CardHeader>
          <CardTitle>Registered Households</CardTitle>
          <CardDescription>
            Showing {activeHouseholders.length} active households
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-status-blue/50">
                  <TableHead>Name</TableHead>
                  <TableHead>Family Size</TableHead>
                  <TableHead>Has Kitchen</TableHead>
                  <TableHead>Well Ventilated</TableHead>
                  <TableHead>Rain Protected</TableHead>
                  <TableHead>CCM Condition</TableHead>
                  <TableHead>Last Inspection</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeHouseholders.slice(0, 15).map((hh) => (
                  <TableRow key={hh.id} className="hover:bg-action-beige/30">
                    <TableCell className="font-medium">
                      {hh.firstName} {hh.middleName} {hh.lastName}
                    </TableCell>
                    <TableCell>{hh.familyCount}</TableCell>
                    <TableCell>
                      {hh.hasKitchen ? (
                        <span className="text-ripple-green">Yes</span>
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {hh.kitchenWellVentilated ? (
                        <span className="text-ripple-green">Yes</span>
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {hh.kitchenRainproof ? (
                        <span className="text-ripple-green">Yes</span>
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="capitalize">
                        {hh.lastCcmCondition ?? "N/A"}
                      </span>
                    </TableCell>
                    <TableCell>{hh.lastInspectionDate ?? "Never"}</TableCell>
                    <TableCell>{getStatusBadge(hh.inspectionStatus)}</TableCell>
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
