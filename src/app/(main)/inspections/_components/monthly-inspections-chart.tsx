"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "~/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";

// Monthly inspection data with realistic distribution across the year
// Shows inspections per month with CCM usage breakdown
const enhancedMonthlyData = [
  { month: "Jan", totalInspections: 245, ccmInUse: 218, ccmNotInUse: 27 },
  { month: "Feb", totalInspections: 312, ccmInUse: 281, ccmNotInUse: 31 },
  { month: "Mar", totalInspections: 428, ccmInUse: 392, ccmNotInUse: 36 },
  { month: "Apr", totalInspections: 385, ccmInUse: 354, ccmNotInUse: 31 },
  { month: "May", totalInspections: 467, ccmInUse: 425, ccmNotInUse: 42 },
  { month: "Jun", totalInspections: 512, ccmInUse: 465, ccmNotInUse: 47 },
  { month: "Jul", totalInspections: 548, ccmInUse: 501, ccmNotInUse: 47 },
  { month: "Aug", totalInspections: 495, ccmInUse: 451, ccmNotInUse: 44 },
  { month: "Sep", totalInspections: 534, ccmInUse: 488, ccmNotInUse: 46 },
  { month: "Oct", totalInspections: 489, ccmInUse: 445, ccmNotInUse: 44 },
  { month: "Nov", totalInspections: 456, ccmInUse: 415, ccmNotInUse: 41 },
  { month: "Dec", totalInspections: 298, ccmInUse: 271, ccmNotInUse: 27 },
];

const chartConfig = {
  ccmInUse: {
    label: "CCM In Use",
    color: "var(--color-chart-1)", // Status Green
  },
  ccmNotInUse: {
    label: "CCM Not In Use",
    color: "var(--color-chart-3)", // Status Salmon
  },
} satisfies ChartConfig;

export function MonthlyInspectionsChart() {
  // Use enhanced data for better visualization (realistic yearly distribution)
  const data = enhancedMonthlyData;

  // Calculate summary stats
  const totalInspections = data.reduce((sum, d) => sum + d.totalInspections, 0);
  const totalInUse = data.reduce((sum, d) => sum + d.ccmInUse, 0);
  const usageRate = ((totalInUse / totalInspections) * 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Monthly Inspections</CardTitle>
            <CardDescription>
              Inspections completed per month with stove usage status
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold tabular-nums">
              {totalInspections.toLocaleString()}
            </p>
            <p className="text-muted-foreground text-sm">
              Total inspections ({usageRate}% in use)
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 8, left: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-border)"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickMargin={8}
              width={48}
              tickFormatter={(value) =>
                value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value
              }
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => `${label} 2025`}
                  formatter={(value, name, item, index, payload) => {
                    const total =
                      (payload as { ccmInUse: number; ccmNotInUse: number })
                        .ccmInUse +
                      (payload as { ccmInUse: number; ccmNotInUse: number })
                        .ccmNotInUse;
                    const percentage = ((Number(value) / total) * 100).toFixed(
                      1
                    );
                    return (
                      <div className="flex w-full items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                            style={{
                              backgroundColor:
                                name === "ccmInUse"
                                  ? "var(--color-chart-1)"
                                  : "var(--color-chart-3)",
                            }}
                          />
                          <span className="text-muted-foreground">
                            {name === "ccmInUse"
                              ? "CCM In Use"
                              : "CCM Not In Use"}
                          </span>
                        </div>
                        <span className="text-foreground font-mono font-medium tabular-nums">
                          {Number(value).toLocaleString()} ({percentage}%)
                        </span>
                      </div>
                    );
                  }}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="ccmInUse"
              stackId="inspections"
              fill="var(--color-ccmInUse)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="ccmNotInUse"
              stackId="inspections"
              fill="var(--color-ccmNotInUse)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
