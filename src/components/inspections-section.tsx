"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Badge } from "~/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  ClipboardCheck,
  TrendingUp,
  Download,
  Filter,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { inspections, staff, householders, vpaAreas } from "~/lib/mock-data";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export function InspectionsSection() {
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [vpaFilter, setVpaFilter] = useState<string>("all");
  const [conditionFilter, setConditionFilter] = useState<string>("all");

  const getStaffName = (id: string) =>
    staff.find((s) => s.id === id)?.name ?? "Unknown";
  const getHouseholderName = (id: string) => {
    const hh = householders.find((h) => h.id === id);
    return hh ? `${hh.firstName} ${hh.lastName}` : "Unknown";
  };

  const filteredInspections = inspections.filter((i) => {
    if (conditionFilter !== "all" && i.ccmCondition !== conditionFilter)
      return false;
    if (dateFrom && i.inspectionDate < dateFrom) return false;
    if (dateTo && i.inspectionDate > dateTo) return false;
    return true;
  });

  const goodConditionCount = inspections.filter(
    (i) => i.ccmCondition === "good",
  ).length;
  const needsRepairCount = inspections.filter(
    (i) => i.ccmCondition === "needs_repair",
  ).length;
  const damagedCount = inspections.filter(
    (i) => i.ccmCondition === "damaged" || i.ccmCondition === "replaced",
  ).length;

  // Mock monthly data for chart
  const monthlyData = [
    { month: "Jun", inspections: 380, pass: 340, issues: 40 },
    { month: "Jul", inspections: 420, pass: 375, issues: 45 },
    { month: "Aug", inspections: 395, pass: 355, issues: 40 },
    { month: "Sep", inspections: 450, pass: 410, issues: 40 },
    { month: "Oct", inspections: 410, pass: 370, issues: 40 },
    { month: "Nov", inspections: 428, pass: 385, issues: 43 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground text-2xl font-semibold">Inspections</h2>
        <p className="text-muted-foreground">
          Request inspection data and results per period (Requirements #10, #11)
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Inspections
            </CardTitle>
            <ClipboardCheck className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inspections.length}</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              +12% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Good Condition</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {((goodConditionCount / inspections.length) * 100).toFixed(1)}%
            </div>
            <p className="text-muted-foreground text-xs">
              {goodConditionCount} stoves in good condition
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Needs Repair
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {needsRepairCount}
            </div>
            <p className="text-muted-foreground text-xs">Requiring maintenance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Damaged/Replaced</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{damagedCount}</div>
            <p className="text-muted-foreground text-xs">
              Stoves damaged or replaced
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Inspection Trends</CardTitle>
          <CardDescription>
            Monthly inspection counts and results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="inspections"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Total"
                />
                <Line
                  type="monotone"
                  dataKey="pass"
                  stroke="#22c55e"
                  strokeWidth={2}
                  name="Passed"
                />
                <Line
                  type="monotone"
                  dataKey="issues"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Issues"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
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
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Date To</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>VPA Area</Label>
              <Select value={vpaFilter} onValueChange={setVpaFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All VPAs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All VPAs</SelectItem>
                  {vpaAreas.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
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
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="needs_repair">Needs Repair</SelectItem>
                  <SelectItem value="damaged">Damaged</SelectItem>
                  <SelectItem value="replaced">Replaced</SelectItem>
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

      {/* Inspections Table */}
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
    </div>
  );
}
