"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { vpaStoveSummary } from "~/lib/mock-data";

export function ActiveStovesByVPASkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Stoves by VPA</CardTitle>
        <CardDescription>
          Current vs target stove counts per VPA area
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] space-y-4 py-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-4 w-20 shrink-0" />
              <Skeleton className="h-6 flex-1" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export function ActiveStovesByVPA() {
  const vpaData = vpaStoveSummary.map((vpa) => ({
    name: vpa.vpaName.replace(" VPA", ""),
    active: vpa.activeStoves,
    target: vpa.targetStoves,
  }));

  return (
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
  );
}

