"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { inspections, staff, householders } from "~/lib/mock-data";

interface InspectionRecordsTableProps {
  filters?: {
    dateFrom: string;
    dateTo: string;
    vpaFilter: string;
    conditionFilter: string;
  };
}

export function InspectionRecordsTable({
  filters,
}: InspectionRecordsTableProps) {
  const getStaffName = (id: string) =>
    staff.find((s) => s.id === id)?.name ?? "Unknown";

  const getHouseholderName = (id: string) => {
    const hh = householders.find((h) => h.id === id);
    return hh ? `${hh.firstName} ${hh.lastName}` : "Unknown";
  };

  const filteredInspections = inspections.filter((i) => {
    if (filters?.conditionFilter && filters.conditionFilter !== "all" && i.ccmCondition !== filters.conditionFilter)
      return false;
    if (filters?.dateFrom && i.inspectionDate < filters.dateFrom) return false;
    if (filters?.dateTo && i.inspectionDate > filters.dateTo) return false;
    return true;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inspection Records</CardTitle>
        <CardDescription>
          Showing {Math.min(filteredInspections.length, 15)} of{" "}
          {filteredInspections.length} inspections
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 z-10 bg-background">
                  Householder
                </TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Inspector</TableHead>
                <TableHead>Chief</TableHead>
                <TableHead>Lead CV</TableHead>
                <TableHead>CCM In Use</TableHead>
                <TableHead>Stove Condition</TableHead>
                <TableHead>Wood Use Quality</TableHead>
                <TableHead>Has Kitchen</TableHead>
                <TableHead>Well Ventilated</TableHead>
                <TableHead>Rainproof</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInspections.slice(0, 15).map((i) => (
                <TableRow key={i.id}>
                  <TableCell className="sticky left-0 z-10 bg-background font-medium whitespace-nowrap">
                    {getHouseholderName(i.householderId)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {i.inspectionDate}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getStaffName(i.staffId)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {i.chiefName}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {i.leadCvName}
                  </TableCell>
                  <TableCell>
                    <Badge variant={i.ccmInUse ? "default" : "secondary"}>
                      {i.ccmInUse ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        i.ccmCondition === "good"
                          ? "default"
                          : i.ccmCondition === "needs_repair"
                            ? "secondary"
                            : "destructive"
                      }
                      className={
                        i.ccmCondition === "good"
                          ? "bg-green-500 hover:bg-green-600"
                          : i.ccmCondition === "needs_repair"
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : ""
                      }
                    >
                      {i.ccmCondition.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        i.woodUseQuality === "good"
                          ? "default"
                          : i.woodUseQuality === "fair"
                            ? "secondary"
                            : "destructive"
                      }
                      className={
                        i.woodUseQuality === "good"
                          ? "bg-green-500 hover:bg-green-600"
                          : i.woodUseQuality === "fair"
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : ""
                      }
                    >
                      {i.woodUseQuality}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={i.hasKitchen ? "default" : "outline"}>
                      {i.hasKitchen ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={i.kitchenWellVentilated ? "default" : "outline"}
                    >
                      {i.kitchenWellVentilated ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={i.kitchenRainproof ? "default" : "outline"}>
                      {i.kitchenRainproof ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

