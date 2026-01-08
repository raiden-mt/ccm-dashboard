import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/services/supabase/lib/getCurrentUser";
import { InspectionStatCards } from "./_components/inspection-stat-cards";
import {
  InspectionDataWrapper,
  InspectionDataWrapperSkeleton,
} from "./_components/inspection-data-wrapper";
import { ProjectSummaryWrapper } from "~/components/project-summary-wrapper";
import ChartSectionWrapper, {
  ChartSectionWrapperSkeleton,
} from "./_components/chart-section-wrapper";

import { inspectionSearchParamsCache } from "~/lib/search-params";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function InspectionsPage({ searchParams }: PageProps) {
  const { year } = await inspectionSearchParamsCache.parse(searchParams);
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

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
          <ProjectSummaryWrapper variant="dialog" year={year} />
        </div>

        {/* Summary Cards */}
        <InspectionStatCards />

        {/* Charts Section */}
        <Suspense fallback={<ChartSectionWrapperSkeleton />}>
          <ChartSectionWrapper />
        </Suspense>

        {/* Filters & Table */}
        <Suspense fallback={<InspectionDataWrapperSkeleton />}>
          <InspectionDataWrapper />
        </Suspense>
      </div>
    </div>
  );
}
