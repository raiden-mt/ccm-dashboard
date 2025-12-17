import { StatCard } from "~/components/ui/stat-card";
import { Users, Home, Flame, ClipboardCheck } from "lucide-react";
import { createAdminClient } from "~/lib/services/supabase/server";

interface DashboardStats {
  archivedHouseholds: number;
  activeHouseholds: number;
  totalStoves: number;
  activeStoves: number;
  totalStaff: number;
  activeStaff: number;
  inspectionsThisMonth: number;
  inspectionsThisYear: number;
}

interface HouseholdStatsResult {
  archived_households: number;
  active_households: number;
}

interface StoveStatsResult {
  total_stoves: number;
  active_stoves: number;
}

interface StaffStatsResult {
  total_staff: number;
  active_staff: number;
}

interface InspectionStatsResult {
  inspections_this_month: number;
  inspections_this_year: number;
}

async function getDashboardStats({
  year,
}: {
  year: string;
}): Promise<DashboardStats> {
  const supabase = createAdminClient();

  const [householdStats, stoveStats, staffStats, inspectionStats] =
    await Promise.all([
      supabase.rpc("get_household_stats", { p_year: year }),
      supabase.rpc("get_active_stoves_count", { p_year: year }),
      supabase.rpc("get_staff_stats", { p_year: year }),
      supabase.rpc("get_inspection_stats", { p_year: year }),
    ]);

  const defaultHousehold: HouseholdStatsResult = {
    archived_households: 0,
    active_households: 0,
  };
  const defaultStove: StoveStatsResult = { total_stoves: 0, active_stoves: 0 };
  const defaultStaff: StaffStatsResult = { total_staff: 0, active_staff: 0 };
  const defaultInspection: InspectionStatsResult = {
    inspections_this_month: 0,
    inspections_this_year: 0,
  };

  const householdData = householdStats.data as HouseholdStatsResult[] | null;
  const stoveData = stoveStats.data as StoveStatsResult[] | null;
  const staffData = staffStats.data as StaffStatsResult[] | null;
  const inspectionData = inspectionStats.data as InspectionStatsResult[] | null;

  const household = householdData?.[0] ?? defaultHousehold;
  const stove = stoveData?.[0] ?? defaultStove;
  const staff = staffData?.[0] ?? defaultStaff;
  const inspection = inspectionData?.[0] ?? defaultInspection;

  return {
    archivedHouseholds: Number(household.archived_households),
    activeHouseholds: Number(household.active_households),
    totalStoves: Number(stove.total_stoves),
    activeStoves: Number(stove.active_stoves),
    totalStaff: Number(staff.total_staff),
    activeStaff: Number(staff.active_staff),
    inspectionsThisMonth: Number(inspection.inspections_this_month),
    inspectionsThisYear: Number(inspection.inspections_this_year),
  };
}

export async function StatCardsWrapper({ year }: { year: string }) {
  const stats = await getDashboardStats({ year });

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
