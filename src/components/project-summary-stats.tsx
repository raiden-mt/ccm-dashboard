"use client";

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

export interface ProjectSummaryData {
  ccmsBuiltCount: number;
  ccmsInUseCount: number;
  conditionGoodCount: number;
  kitchensCount: number;
  wellVentilatedCount: number;
  rainProtectedCount: number;
  inspected0to3MonthsCount: number;
  inspected3to6MonthsCount: number;
  inspectedOver6MonthsCount: number;
}

export interface SummaryItem {
  label: string;
  value: string;
  percent: string | null;
  icon: typeof Flame;
  color: string;
  bgColor: string;
}

export function getSummaryItems(data: ProjectSummaryData): SummaryItem[] {
  const {
    ccmsBuiltCount,
    ccmsInUseCount,
    conditionGoodCount,
    kitchensCount,
    wellVentilatedCount,
    rainProtectedCount,
    inspected0to3MonthsCount,
    inspected3to6MonthsCount,
    inspectedOver6MonthsCount,
  } = data;

  return [
    {
      label: "Total CCMs Built",
      value: ccmsBuiltCount.toLocaleString(),
      percent: null,
      icon: Flame,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Total CCMs In Use",
      value: ccmsInUseCount.toLocaleString(),
      percent:
        ccmsBuiltCount === 0
          ? null
          : `${((ccmsInUseCount / ccmsBuiltCount) * 100).toFixed(0)}%`,
      icon: Activity,
      color: "text-ripple-green",
      bgColor: "bg-ripple-green/10",
    },
    {
      label: "Condition Good/Average",
      value: conditionGoodCount.toLocaleString(),
      percent:
        ccmsBuiltCount === 0
          ? null
          : `${((conditionGoodCount / ccmsBuiltCount) * 100).toFixed(0)}%`,
      icon: ThumbsUp,
      color: "text-ripple-green",
      bgColor: "bg-status-green",
    },
    {
      label: "Total Kitchens",
      value: kitchensCount.toLocaleString(),
      percent:
        ccmsBuiltCount === 0
          ? null
          : `${((kitchensCount / ccmsBuiltCount) * 100).toFixed(0)}%`,
      icon: Home,
      color: "text-[#4A90A4]",
      bgColor: "bg-status-blue",
    },
    {
      label: "Well Ventilated",
      value: wellVentilatedCount.toLocaleString(),
      percent:
        ccmsBuiltCount === 0
          ? null
          : `${((wellVentilatedCount / ccmsBuiltCount) * 100).toFixed(0)}%`,
      icon: Wind,
      color: "text-ripple-green",
      bgColor: "bg-action-mint/50",
    },
    {
      label: "Protected from Rain",
      value: rainProtectedCount.toLocaleString(),
      percent:
        kitchensCount === 0
          ? null
          : `${((rainProtectedCount / kitchensCount) * 100).toFixed(0)}%`,
      icon: CloudRain,
      color: "text-[#4A90A4]",
      bgColor: "bg-status-blue",
    },
    {
      label: "Inspected 0-3 months",
      value: inspected0to3MonthsCount.toLocaleString(),
      percent:
        ccmsBuiltCount === 0
          ? null
          : `${((inspected0to3MonthsCount / ccmsBuiltCount) * 100).toFixed(0)}%`,
      icon: CheckCircle2,
      color: "text-ripple-green",
      bgColor: "bg-status-green",
    },
    {
      label: "Inspected 3-6 months",
      value: inspected3to6MonthsCount.toLocaleString(),
      percent:
        ccmsBuiltCount === 0
          ? null
          : `${((inspected3to6MonthsCount / ccmsBuiltCount) * 100).toFixed(0)}%`,
      icon: AlertCircle,
      color: "text-[#B8860B]",
      bgColor: "bg-status-tan",
    },
    {
      label: "Inspected > 6 months",
      value: inspectedOver6MonthsCount.toLocaleString(),
      percent:
        ccmsBuiltCount === 0
          ? null
          : `${((inspectedOver6MonthsCount / ccmsBuiltCount) * 100).toFixed(0)}%`,
      icon: XCircle,
      color: "text-[#C75050]",
      bgColor: "bg-status-salmon",
    },
  ];
}

export function ProjectSummaryStatsGrid({
  items,
  className,
}: {
  items: SummaryItem[];
  className?: string;
}) {
  return (
    <div
      className={
        className ??
        "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
      }
    >
      {items.map((item) => (
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
  );
}
