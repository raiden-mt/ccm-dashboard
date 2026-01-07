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

import type { InspectionRecord } from "./inspection-data-wrapper";

export function InspectionRecordsTable({
  inspections,
  totalInspections,
}: {
  inspections: InspectionRecord[];
  totalInspections: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inspection Records</CardTitle>
        <CardDescription>
          Showing {inspections.length} of {totalInspections} inspections
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-background sticky left-0 z-10">
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
              {inspections.map((i) => (
                <TableRow key={i.id}>
                  <TableCell className="bg-background sticky left-0 z-10 font-medium whitespace-nowrap">
                    {i.householder_name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {i.inspection_date}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {i.inspector_name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {i.chief_name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {i.lead_cv_name}
                  </TableCell>
                  <TableCell>
                    <Badge variant={i.ccm_in_use ? "default" : "secondary"}>
                      {i.ccm_in_use ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        i.ccm_condition === "good"
                          ? "default"
                          : i.ccm_condition === "needs_repair"
                            ? "secondary"
                            : "destructive"
                      }
                      className={
                        i.ccm_condition === "good"
                          ? "bg-green-500 hover:bg-green-600"
                          : i.ccm_condition === "needs_repair"
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : ""
                      }
                    >
                      {i.ccm_condition}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={i.wood_use ? "default" : "destructive"}>
                      {i.wood_use ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={i.has_kitchen ? "default" : "outline"}>
                      {i.has_kitchen ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        i.kitchen_well_ventilated ? "default" : "outline"
                      }
                    >
                      {i.kitchen_well_ventilated ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={i.kitchen_rainproof ? "default" : "outline"}
                    >
                      {i.kitchen_rainproof ? "Yes" : "No"}
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
