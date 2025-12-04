"use client";

import { Card, CardContent } from "~/components/ui/card";
import { dashboardStats } from "~/lib/mock-data";
import {
  Flame,
  Activity,
  ThumbsUp,
  Home,
  Wind,
  CloudRain,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";

export function ProjectSummary() {
  const stats = dashboardStats;

  const summaryItems = [
    {
      label: "Total CCMs Built",
      value: stats.totalStoves.toLocaleString(),
      percent: null,
      icon: Flame,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Total CCMs In Use",
      value: stats.activeStoves.toLocaleString(),
      percent: `${((stats.activeStoves / stats.totalStoves) * 100).toFixed(0)}%`,
      icon: Activity,
      color: "text-ripple-green",
      bgColor: "bg-ripple-green/10",
    },
    {
      label: "Condition Good/Average",
      value: stats.conditionGood.toLocaleString(),
      percent: `${((stats.conditionGood / stats.totalStoves) * 100).toFixed(0)}%`,
      icon: ThumbsUp,
      color: "text-ripple-green",
      bgColor: "bg-status-green",
    },
    {
      label: "Total Kitchens",
      value: stats.totalKitchens.toLocaleString(),
      percent: `${((stats.totalKitchens / stats.totalHouseholders) * 100).toFixed(0)}%`,
      icon: Home,
      color: "text-[#4A90A4]",
      bgColor: "bg-status-blue",
    },
    {
      label: "Well Ventilated",
      value: stats.wellVentilated.toLocaleString(),
      percent: `${((stats.wellVentilated / stats.totalKitchens) * 100).toFixed(0)}%`,
      icon: Wind,
      color: "text-ripple-green",
      bgColor: "bg-action-mint/50",
    },
    {
      label: "Protected from Rain",
      value: stats.rainProtected.toLocaleString(),
      percent: `${((stats.rainProtected / stats.totalKitchens) * 100).toFixed(0)}%`,
      icon: CloudRain,
      color: "text-[#4A90A4]",
      bgColor: "bg-status-blue",
    },
    {
      label: "Inspected 0-3 months",
      value: stats.inspected0to3Months.toLocaleString(),
      percent: `${stats.greenStatusPercent}%`,
      icon: CheckCircle2,
      color: "text-ripple-green",
      bgColor: "bg-status-green",
    },
    {
      label: "Inspected 3-6 months",
      value: stats.inspected3to6Months.toLocaleString(),
      percent: `${stats.yellowStatusPercent}%`,
      icon: AlertCircle,
      color: "text-[#B8860B]",
      bgColor: "bg-status-tan",
    },
    {
      label: "Inspected > 6 months",
      value: stats.inspected6PlusMonths.toLocaleString(),
      percent: `${stats.redStatusPercent}%`,
      icon: XCircle,
      color: "text-[#C75050]",
      bgColor: "bg-status-salmon",
    },
  ];

  return (
    <Card className="bg-card-cream border-0 shadow-sm">
      <CardContent className="p-4">
        <h3 className="text-foreground mb-4 text-lg font-semibold">
          CCM Project Summary
        </h3>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-5 lg:grid-cols-9">
          {summaryItems.map((item) => (
            <div
              key={item.label}
              className={`flex flex-col items-center rounded-lg p-3 text-center ${item.bgColor}`}
            >
              <item.icon className={`mb-1 h-5 w-5 ${item.color}`} />
              <span className="text-foreground text-lg font-bold">
                {item.value}
              </span>
              {item.percent && (
                <span className="text-muted-foreground text-xs font-medium">
                  {item.percent}
                </span>
              )}
              <span className="text-muted-foreground mt-1 text-xs leading-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
