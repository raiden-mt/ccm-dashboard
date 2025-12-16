"use client";

import { StatCards } from "./_components/stat-cards";
import { InspectionStatusDistribution } from "./_components/inspection-status-distribution";
import { ActiveStovesByVPA } from "./_components/active-stoves-by-vpa";
import { SurveyCompletion } from "./_components/survey-completion";
import { DataQualityAlerts } from "./_components/data-quality-alerts";

export default function DashboardPageClient() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <div className="flex flex-1">
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-foreground text-2xl font-semibold">
                Dashboard Overview
              </h2>
              <p className="text-muted-foreground">
                Complete overview of CCM database operations
              </p>
            </div>

            {/* Key Metrics */}
            <StatCards />

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
        </main>
      </div>
    </div>
  );
}
