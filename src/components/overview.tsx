"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { dashboardStats, vpaStoveSummary } from "~/lib/mock-data";
import {
  Users,
  Home,
  Flame,
  ClipboardCheck,
  AlertTriangle,
} from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

interface OverviewProps {
  isExecutive: boolean;
}

export function DashboardOverview({ isExecutive }: OverviewProps) {
  const stats = dashboardStats;

  const statusData = [
    {
      name: "Green (0-3 mo)",
      value: stats.greenStatusPercent,
      color: "#BDE5C2",
    },
    {
      name: "Yellow (3-6 mo)",
      value: stats.yellowStatusPercent,
      color: "#E8D0A5",
    },
    { name: "Red (6+ mo)", value: stats.redStatusPercent, color: "#F8B9AA" },
    { name: "Uninspected", value: stats.uninspectedPercent, color: "#D0E5F1" },
  ];

  const vpaData = vpaStoveSummary.map((vpa) => ({
    name: vpa.vpaName.replace(" VPA", ""),
    active: vpa.activeStoves,
    target: vpa.targetStoves,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground text-2xl font-semibold">
          {isExecutive ? "Executive Dashboard" : "Dashboard Overview"}
        </h2>
        <p className="text-muted-foreground">
          {isExecutive
            ? "High-level statistics for reporting and marketing purposes"
            : "Complete overview of CCM database operations"}
        </p>
      </div>

      {/* Key Metrics - Cards use cream background with subtle colored accents */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-ripple-green border-l-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Total Households
            </CardTitle>
            <Home className="text-ripple-green h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-ripple-green text-2xl font-bold">
              {stats.totalHouseholders.toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">
              {stats.activeHouseholders.toLocaleString()} active
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-primary border-l-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Active Stoves
            </CardTitle>
            <Flame className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-primary text-2xl font-bold">
              {stats.activeStoves.toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">
              {((stats.activeStoves / stats.totalStoves) * 100).toFixed(1)}%
              utilization
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-status-blue border-l-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Active Staff
            </CardTitle>
            <Users className="h-4 w-4 text-[#4A90A4]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#4A90A4]">
              {stats.activeStaff}
            </div>
            <p className="text-muted-foreground text-xs">
              {stats.totalStaff} total staff
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-action-mint border-l-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Inspections (Month)
            </CardTitle>
            <ClipboardCheck className="text-ripple-green h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-ripple-green text-2xl font-bold">
              {stats.inspectionsThisMonth}
            </div>
            <p className="text-muted-foreground text-xs">
              {stats.inspectionsThisYear.toLocaleString()} this year
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inspection Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Inspection Status Distribution</CardTitle>
            <CardDescription>
              Current status of all households based on last inspection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="#FDFBF4"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Percentage"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* VPA Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Active Stoves by VPA</CardTitle>
            <CardDescription>
              Current vs target stove counts per VPA area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vpaData} layout="vertical">
                  <XAxis type="number" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={100}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="active"
                    fill="#2E7D32"
                    name="Active"
                    radius={[0, 4, 4, 0]}
                  />
                  <Bar
                    dataKey="target"
                    fill="#E8D0A5"
                    name="Target"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Survey Stats & Data Quality */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Survey Completion</CardTitle>
            <CardDescription>Total surveys completed this year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Usage Surveys
                </span>
                <span className="font-semibold">
                  {stats.usageSurveysCompleted.toLocaleString()}
                </span>
              </div>
              <div className="bg-muted h-2 rounded-full">
                <div
                  className="bg-ripple-green h-2 rounded-full"
                  style={{ width: "78%" }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  KPT Surveys
                </span>
                <span className="font-semibold">
                  {stats.kptSurveysCompleted.toLocaleString()}
                </span>
              </div>
              <div className="bg-muted h-2 rounded-full">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: "54%" }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  SDG Surveys
                </span>
                <span className="font-semibold">
                  {stats.sdgSurveysCompleted.toLocaleString()}
                </span>
              </div>
              <div className="bg-muted h-2 rounded-full">
                <div
                  className="bg-status-blue h-2 rounded-full"
                  style={{ width: "40%" }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="text-primary h-5 w-5" />
              Data Quality Alerts
            </CardTitle>
            <CardDescription>Issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-status-salmon flex items-center justify-between rounded-lg p-3">
                <div>
                  <p className="text-foreground font-medium">
                    Duplicates Detected
                  </p>
                  <p className="text-foreground/70 text-sm">
                    Weekly scan found potential duplicates
                  </p>
                </div>
                <span className="text-foreground text-2xl font-bold">
                  {stats.duplicatesDetected}
                </span>
              </div>

              <div className="bg-status-tan flex items-center justify-between rounded-lg p-3">
                <div>
                  <p className="text-foreground font-medium">Missing Data</p>
                  <p className="text-foreground/70 text-sm">
                    Records with incomplete GPS data
                  </p>
                </div>
                <span className="text-foreground text-2xl font-bold">
                  {stats.missingDataCount}
                </span>
              </div>

              <div className="bg-status-green flex items-center justify-between rounded-lg p-3">
                <div>
                  <p className="text-foreground font-medium">Anomalies</p>
                  <p className="text-foreground/70 text-sm">
                    Data points outside normal ranges
                  </p>
                </div>
                <span className="text-foreground text-2xl font-bold">
                  {stats.anomaliesDetected}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
