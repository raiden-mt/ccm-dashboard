import { StatCard } from "~/components/ui/stat-card";
import { dashboardStats } from "~/lib/mock-data";
import { Users, Home, Flame, ClipboardCheck } from "lucide-react";

export function StatCardsWrapper() {
  const stats = dashboardStats;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Households"
        value={stats.totalHouseholders}
        subtitle={`${stats.activeHouseholders.toLocaleString()} active`}
        icon={Home}
        color="ripple-green"
      />

      <StatCard
        title="Active Stoves"
        value={stats.activeStoves}
        subtitle={`${((stats.activeStoves / stats.totalStoves) * 100).toFixed(1)}% utilization`}
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
