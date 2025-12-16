"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { dashboardStats } from "~/lib/mock-data";
import {
  ResponsiveContainer,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

export function InspectionStatusDistribution() {
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

  return (
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
  );
}

