import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/services/supabase/lib/getCurrentUser";
import { InspectionStatCards } from "./_components/inspection-stat-cards";
import { InspectionTrendsChart } from "./_components/inspection-trends-chart";
import { InspectionDataWrapper } from "./_components/inspection-data-wrapper";

export default async function InspectionsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="bg-background p-2 md:p-4">
      <div className="space-y-6">
        <div>
          <h2 className="text-foreground text-2xl font-semibold">
            Inspections
          </h2>
          <p className="text-muted-foreground">
            Request inspection data and results per period (Requirements #10,
            #11)
          </p>
        </div>

        {/* Summary Cards */}
        <InspectionStatCards />

        {/* Trend Chart */}
        <InspectionTrendsChart />

        {/* Filters & Table */}
        <InspectionDataWrapper />
      </div>
    </div>
  );
}
