"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const monthlyData = [
  { month: "Jun", inspections: 380, pass: 340, issues: 40 },
  { month: "Jul", inspections: 420, pass: 375, issues: 45 },
  { month: "Aug", inspections: 395, pass: 355, issues: 40 },
  { month: "Sep", inspections: 450, pass: 410, issues: 40 },
  { month: "Oct", inspections: 410, pass: 370, issues: 40 },
  { month: "Nov", inspections: 428, pass: 385, issues: 43 },
];

export function InspectionTrendsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inspection Trends</CardTitle>
        <CardDescription>Monthly inspection counts and results</CardDescription>
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
  );
}

