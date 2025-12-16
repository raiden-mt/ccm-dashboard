"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { dashboardStats } from "~/lib/mock-data";
import { Users, Home, Flame, ClipboardCheck } from "lucide-react";

export function StatCards() {
  const stats = dashboardStats;

  return (
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
  );
}

