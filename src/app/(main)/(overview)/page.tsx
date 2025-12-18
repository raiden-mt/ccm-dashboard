import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/services/supabase/lib/getCurrentUser";
import { loadSearchParams } from "~/lib/search-params";
import type { SearchParams } from "nuqs/server";
import { ProjectSummaryWrapper } from "~/components/project-summary-wrapper";
import { StatCardsWrapper } from "./_components/dashboard-stat-cards";
import { InspectionStatusDistribution } from "./_components/inspection-status-distribution";
import { ActiveStovesByVPA } from "./_components/active-stoves-by-vpa";
import { SurveyCompletion } from "./_components/survey-completion";
import { DataQualityAlerts } from "./_components/data-quality-alerts";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function DashboardPage({ searchParams }: PageProps) {
  const { year } = await loadSearchParams(searchParams);

  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="bg-background p-2 md:p-6">
      <div className="space-y-6 p-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-2xl font-semibold">
              Dashboard Overview
            </h2>
            <p className="text-muted-foreground hidden md:block">
              Complete overview of CCM database operations
            </p>
          </div>

          <ProjectSummaryWrapper year={year} />
        </div>

        {/* Key Metrics */}
        <StatCardsWrapper year={String(year)} />

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <InspectionStatusDistribution />
          <ActiveStovesByVPA />
        </div>

        {/* Survey Stats & Data Quality */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SurveyCompletion />
          <DataQualityAlerts />
        </div>
      </div>
    </div>
  );
}
