import { ProjectSummarySkeleton } from "~/components/project-summary-wrapper";
import { InspectionStatCardsSkeleton } from "./_components/inspection-stat-cards";
import { InspectionStatusDistributionSkeleton } from "../(overview)/_components/inspection-status-distribution";
import { MonthlyInspectionsChartSkeleton } from "./_components/monthly-inspections-chart";
import { InspectionDataWrapperSkeleton } from "./_components/inspection-data-wrapper";

export default function InspectionsLoading() {
  return (
    <div className="bg-background p-2 md:p-4">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-2xl font-semibold">
              Inspections
            </h2>
            <p className="text-muted-foreground">
              Request inspection data and results per period
            </p>
          </div>
          <ProjectSummarySkeleton variant="dialog" />
        </div>

        {/* Summary Cards Skeleton */}
        <InspectionStatCardsSkeleton />

        {/* Charts Row Skeleton */}
        <div className="grid gap-4 md:grid-cols-2">
          <InspectionStatusDistributionSkeleton />
          <MonthlyInspectionsChartSkeleton />
        </div>

        {/* Filters & Table Skeleton */}
        <InspectionDataWrapperSkeleton />
      </div>
    </div>
  );
}
