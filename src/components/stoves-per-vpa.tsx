"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Flame, TrendingUp, Target, CheckCircle } from "lucide-react";
import { vpaStoveSummary } from "~/lib/mock-data";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export function StovesPerVPA() {
  const totalActive = vpaStoveSummary.reduce(
    (sum, v) => sum + v.activeStoves,
    0,
  );
  const totalTarget = vpaStoveSummary.reduce(
    (sum, v) => sum + v.targetStoves,
    0,
  );
  const totalGreen = vpaStoveSummary.reduce((sum, v) => sum + v.greenStatus, 0);

  const chartData = vpaStoveSummary.map((vpa) => ({
    name: vpa.vpaName.replace(" VPA", ""),
    green: vpa.greenStatus,
    yellow: vpa.yellowStatus,
    red: vpa.redStatus,
    uninspected: vpa.uninspected,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground text-2xl font-semibold">
          Total Active Stoves per VPA
        </h2>
        <p className="text-muted-foreground">
          Monthly monitoring of stove counts to ensure maximum carbon credits
          (Requirement #5)
        </p>
      </div>

      {/* Summary Cards - Updated with warm theme colors */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-primary border-l-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Active Stoves
            </CardTitle>
            <Flame className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-primary text-2xl font-bold">
              {totalActive.toLocaleString()}
            </div>
            <div className="text-ripple-green flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3" />
              +3.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-status-tan border-l-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Target Stoves</CardTitle>
            <Target className="text-foreground/70 h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalTarget.toLocaleString()}
            </div>
            <div className="text-muted-foreground text-xs">
              {((totalActive / totalTarget) * 100).toFixed(1)}% achieved
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-status-green border-l-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Green Status</CardTitle>
            <CheckCircle className="text-ripple-green h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-ripple-green text-2xl font-bold">
              {totalGreen.toLocaleString()}
            </div>
            <div className="text-muted-foreground text-xs">
              {((totalGreen / totalActive) * 100).toFixed(1)}% of active
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-ripple-green border-l-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Credits Potential
            </CardTitle>
            <TrendingUp className="text-ripple-green h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-ripple-green text-2xl font-bold">
              {(totalActive * 2.5).toLocaleString()}
            </div>
            <div className="text-muted-foreground text-xs">
              Estimated tCO2e/year
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Inspection Status by VPA</CardTitle>
          <CardDescription>
            Distribution of household inspection statuses across VPA areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="green"
                  stackId="a"
                  fill="#BDE5C2"
                  name="Green (0-3 mo)"
                />
                <Bar
                  dataKey="yellow"
                  stackId="a"
                  fill="#E8D0A5"
                  name="Yellow (3-6 mo)"
                />
                <Bar
                  dataKey="red"
                  stackId="a"
                  fill="#F8B9AA"
                  name="Red (6+ mo)"
                />
                <Bar
                  dataKey="uninspected"
                  stackId="a"
                  fill="#D0E5F1"
                  name="Uninspected"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>VPA Detail Report</CardTitle>
          <CardDescription>
            Comprehensive stove statistics per VPA area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-status-blue/50">
                <TableHead className="text-foreground">VPA Area</TableHead>
                <TableHead className="text-foreground text-right">
                  Active
                </TableHead>
                <TableHead className="text-foreground text-right">
                  Target
                </TableHead>
                <TableHead className="text-foreground text-center">
                  Progress
                </TableHead>
                <TableHead className="text-foreground text-right">
                  Green
                </TableHead>
                <TableHead className="text-foreground text-right">
                  Yellow
                </TableHead>
                <TableHead className="text-foreground text-right">
                  Red
                </TableHead>
                <TableHead className="text-foreground text-right">
                  Uninspected
                </TableHead>
                <TableHead className="text-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vpaStoveSummary.map((vpa) => {
                const progress = (vpa.activeStoves / vpa.targetStoves) * 100;
                const status =
                  progress >= 90
                    ? "On Track"
                    : progress >= 70
                      ? "Behind"
                      : "At Risk";
                const statusClass =
                  progress >= 90
                    ? "bg-status-green text-foreground"
                    : progress >= 70
                      ? "bg-status-tan text-foreground"
                      : "bg-status-salmon text-foreground";

                return (
                  <TableRow key={vpa.vpaId}>
                    <TableCell className="font-medium">{vpa.vpaName}</TableCell>
                    <TableCell className="text-right">
                      {vpa.activeStoves.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {vpa.targetStoves.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={progress} className="h-2 w-20" />
                        <span className="text-muted-foreground text-sm">
                          {progress.toFixed(0)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-ripple-green text-right font-medium">
                      {vpa.greenStatus}
                    </TableCell>
                    <TableCell className="text-right font-medium text-[#B8860B]">
                      {vpa.yellowStatus}
                    </TableCell>
                    <TableCell className="text-right font-medium text-[#CD5C5C]">
                      {vpa.redStatus}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-right">
                      {vpa.uninspected}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusClass}>{status}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Monthly Check Status */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Check Status</CardTitle>
          <CardDescription>
            Automated monthly verification of stove counts per VPA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-status-green rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-ripple-green h-6 w-6" />
              <div>
                <div className="text-foreground font-semibold">
                  Last Check: November 1, 2025
                </div>
                <div className="text-foreground/70 text-sm">
                  All VPA areas verified. Total stoves within expected range.
                  Next check: December 1, 2025
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
