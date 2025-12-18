import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { cn } from "~/lib/utils";
import type { LucideIcon } from "lucide-react";

export type StatCardColor =
  | "primary"
  | "ripple-green"
  | "status-green"
  | "status-tan"
  | "status-salmon"
  | "status-blue"
  | "action-mint"
  | "muted"
  | "destructive";

const colorMap: Record<
  StatCardColor,
  { border: string; icon: string; value: string }
> = {
  primary: {
    border: "border-l-primary",
    icon: "text-primary",
    value: "text-primary",
  },
  "ripple-green": {
    border: "border-l-ripple-green",
    icon: "text-ripple-green",
    value: "text-ripple-green",
  },
  "status-green": {
    border: "border-l-status-green",
    icon: "text-ripple-green",
    value: "text-ripple-green",
  },
  "status-tan": {
    border: "border-l-status-tan",
    icon: "text-foreground/70",
    value: "text-foreground",
  },
  "status-salmon": {
    border: "border-l-status-salmon",
    icon: "text-destructive",
    value: "text-destructive",
  },
  "status-blue": {
    border: "border-l-status-blue",
    icon: "text-[#4A90A4]",
    value: "text-[#4A90A4]",
  },
  "action-mint": {
    border: "border-l-action-mint",
    icon: "text-ripple-green",
    value: "text-ripple-green",
  },
  muted: {
    border: "border-l-muted",
    icon: "text-muted-foreground",
    value: "text-muted-foreground",
  },
  destructive: {
    border: "border-l-destructive",
    icon: "text-destructive",
    value: "text-destructive",
  },
};

export interface StatCardProps {
  /** The title displayed at the top of the card */
  title: string;
  /** The main value/number to display */
  value: string | number;
  /** Optional subtitle/secondary info below the value */
  subtitle?: string;
  /** Lucide icon component to display */
  icon: LucideIcon;
  /** Color theme for the card - affects border, icon, and value colors */
  color?: StatCardColor;
  /** Override the default icon color with a custom class */
  iconColorClass?: string;
  /** Override the default value color with a custom class */
  valueColorClass?: string;
  /** Additional className for the card wrapper */
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "primary",
  iconColorClass,
  valueColorClass,
  className,
}: StatCardProps) {
  const colors = colorMap[color];

  return (
    <Card className={cn(colors.border, "border-l-4", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className={cn("h-4 w-4", iconColorClass ?? colors.icon)} />
      </CardHeader>
      <CardContent>
        <div
          className={cn("text-2xl font-bold", valueColorClass ?? colors.value)}
        >
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
        {subtitle && (
          <p className="text-muted-foreground text-xs">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
