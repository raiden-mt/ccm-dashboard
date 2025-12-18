import { createAdminClient } from "~/lib/services/supabase/server";
import DashboardStatCardsClient from "./dashboard-stat-cards-client";

export interface DashboardStats {
  archivedHouseholds: number;
  activeHouseholds: number;
  totalStoves: number;
  activeStoves: number;
  totalStaff: number;
  activeStaff: number;
  inspectionsThisMonth: number;
  inspectionsThisYear: number;
}

export interface HouseholdStatsResult {
  archived_households: number;
  active_households: number;
}

export interface StoveStatsResult {
  total_stoves: number;
  active_stoves: number;
}

export interface StaffStatsResult {
  total_staff: number;
  active_staff: number;
}

export interface InspectionStatsResult {
  inspections_this_month: number;
  inspections_this_year: number;
}

export async function StatCardsWrapper({ year }: { year: string }) {
  const stats = await getDashboardStats({ year });

  return <DashboardStatCardsClient stats={stats} />;
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
