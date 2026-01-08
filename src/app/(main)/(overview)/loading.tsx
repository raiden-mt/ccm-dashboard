import { ProjectSummarySkeleton } from "~/components/project-summary-wrapper";
import { StatCardsSkeleton } from "./_components/dashboard-stat-cards";
import { InspectionStatusDistributionSkeleton } from "./_components/inspection-status-distribution";
import { ActiveStovesByVPASkeleton } from "./_components/active-stoves-by-vpa";
import { SurveyCompletionSkeleton } from "./_components/survey-completion";
import { DataQualityAlertsSkeleton } from "./_components/data-quality-alerts";

export default function DashboardLoading() {
  return (
    <div className="bg-background p-2 md:p-4">
      <div className="space-y-6">
        <div>
          <h2 className="text-foreground text-2xl font-semibold">
            Dashboard Overview
          </h2>
          <p className="text-muted-foreground hidden md:block">
            Complete overview of CCM database operations
          </p>
        </div>

        {/* Project Summary Stats - Inline Skeleton */}
        <ProjectSummarySkeleton variant="inline" />

        {/* Key Metrics Skeleton */}
        <StatCardsSkeleton />

        {/* Charts Row Skeleton */}
        <div className="grid gap-6 lg:grid-cols-2">
          <InspectionStatusDistributionSkeleton />
          <ActiveStovesByVPASkeleton />
        </div>

        {/* Survey Stats & Data Quality Skeleton */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SurveyCompletionSkeleton />
          <DataQualityAlertsSkeleton />
        </div>
      </div>
    </div>
  );
}
