"use client";

import { StatCard } from "~/components/ui/stat-card";
import { Users, Home, Flame, ClipboardCheck } from "lucide-react";
import type { DashboardStats } from "./dashboard-stat-cards";

export default function DashboardStatCardsClient({
  stats,
}: {
  stats: DashboardStats;
}) {
  const utilizationPercent =
    stats.totalStoves > 0
      ? ((stats.activeStoves / stats.totalStoves) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Archived Households"
        value={stats.archivedHouseholds}
        subtitle={`${stats.activeHouseholds.toLocaleString()} active`}
        icon={Home}
        color="ripple-green"
      />

      <StatCard
        title="Active Stoves"
        value={stats.activeStoves}
        subtitle={`${utilizationPercent}% utilization`}
        icon={Flame}
        color="primary"
      />

      <StatCard
        title="Active Staff"
        value={stats.activeStaff}
        subtitle={`${stats.totalStaff} total staff`}
        icon={Users}
        color="status-blue"
      />

      <StatCard
        title="Inspections (Month)"
        value={stats.inspectionsThisMonth}
        subtitle={`${stats.inspectionsThisYear.toLocaleString()} this year`}
        icon={ClipboardCheck}
        color="action-mint"
      />
    </div>
  );
}
