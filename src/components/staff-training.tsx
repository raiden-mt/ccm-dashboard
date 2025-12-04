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
import { Users, GraduationCap, Download, Filter } from "lucide-react";
import { staff, type StaffPosition } from "~/lib/mock-data";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

export function StaffTraining() {
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [positionFilter, setPositionFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const filteredStaff = staff.filter((s) => {
    if (statusFilter === "active" && !s.isActive) return false;
    if (statusFilter === "inactive" && s.isActive) return false;
    if (positionFilter !== "all" && s.position !== positionFilter) return false;
    return true;
  });

  const activeStaff = staff.filter((s) => s.isActive);
  const totalTrainingHours = staff.reduce(
    (sum, s) => sum + (s.trainingHours ?? 0),
    0,
  );

  const positionLabels: Record<StaffPosition, string> = {
    project_manager: "Project Manager",
    district_manager: "District Manager",
    area_manager: "Area Manager",
    coordinator: "Coordinator",
    lead_community_volunteer: "Lead CV",
    community_volunteer: "Community Volunteer",
  };

  const staffByPosition = [
    {
      position: "PM",
      count: staff.filter((s) => s.position === "project_manager").length,
      color: "#3b82f6",
    },
    {
      position: "DM",
      count: staff.filter((s) => s.position === "district_manager").length,
      color: "#8b5cf6",
    },
    {
      position: "AM",
      count: staff.filter((s) => s.position === "area_manager").length,
      color: "#06b6d4",
    },
    {
      position: "Coord",
      count: staff.filter((s) => s.position === "coordinator").length,
      color: "#10b981",
    },
    {
      position: "LCV",
      count: staff.filter((s) => s.position === "lead_community_volunteer")
        .length,
      color: "#f59e0b",
    },
    {
      position: "CV",
      count: staff.filter((s) => s.position === "community_volunteer").length,
      color: "#ef4444",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground text-2xl font-semibold">
          Staff & Training
        </h2>
        <p className="text-muted-foreground">
          Request staff data and training hours per period (Requirements #7, #8,
          #9)
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff.length}</div>
            <p className="text-muted-foreground text-xs">All positions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {activeStaff.length}
            </div>
            <p className="text-muted-foreground text-xs">
              Currently employed (Req. #7)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Inactive Staff
            </CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {staff.length - activeStaff.length}
            </div>
            <p className="text-muted-foreground text-xs">
              Former employees (Req. #8)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Training Hours
            </CardTitle>
            <GraduationCap className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTrainingHours}</div>
            <p className="text-muted-foreground text-xs">
              Total recorded (Req. #9)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Staff by Position Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Distribution by Position</CardTitle>
          <CardDescription>
            Number of staff members at each level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={staffByPosition}>
                <XAxis dataKey="position" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="Staff Count">
                  {staffByPosition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Request Staff Data
          </CardTitle>
          <CardDescription>Filter and export staff information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={statusFilter}
                onValueChange={(v) =>
                  setStatusFilter(v as "all" | "active" | "inactive")
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Staff</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="inactive">Inactive Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Position</Label>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="project_manager">
                    Project Manager
                  </SelectItem>
                  <SelectItem value="district_manager">
                    District Manager
                  </SelectItem>
                  <SelectItem value="area_manager">Area Manager</SelectItem>
                  <SelectItem value="coordinator">Coordinator</SelectItem>
                  <SelectItem value="lead_community_volunteer">
                    Lead CV
                  </SelectItem>
                  <SelectItem value="community_volunteer">
                    Community Volunteer
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Period From</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Period To</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
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

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staff List</CardTitle>
          <CardDescription>
            Showing {filteredStaff.length} of {staff.length} staff members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead className="text-right">Training Hours</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.slice(0, 15).map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{positionLabels[s.position]}</TableCell>
                  <TableCell>{s.phone}</TableCell>
                  <TableCell className="capitalize">{s.gender}</TableCell>
                  <TableCell className="text-right">
                    {s.trainingHours ?? 0}
                  </TableCell>
                  <TableCell>
                    <Badge variant={s.isActive ? "default" : "secondary"}>
                      {s.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredStaff.length > 15 && (
            <div className="text-muted-foreground mt-4 text-center text-sm">
              Showing 15 of {filteredStaff.length} results. Export to see all.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
