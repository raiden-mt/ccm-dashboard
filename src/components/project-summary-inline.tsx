"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useRealtimeProjectSummary } from "~/hooks/use-realtime-project-summary";
import {
  getSummaryItems,
  ProjectSummaryStatsGrid,
  type ProjectSummaryData,
} from "./project-summary-stats";

export function ProjectSummaryInline({
  ccmsBuiltCount: initialCCMsBuiltCount,
  ccmsInUseCount: initialCCMsInUseCount,
  conditionGoodCount: initialConditionGoodCount,
  kitchensCount: initialKitchensCount,
  wellVentilatedCount: initialWellVentilatedCount,
  rainProtectedCount: initialRainProtectedCount,
  inspected0to3MonthsCount: initialInspected0to3MonthsCount,
  inspected3to6MonthsCount: initialInspected3to6MonthsCount,
  inspectedOver6MonthsCount: initialInspectedOver6MonthsCount,
}: ProjectSummaryData) {
  const realtimeDeltas = useRealtimeProjectSummary();

  // Combine initial server data with realtime deltas
  const data: ProjectSummaryData = {
    ccmsBuiltCount: initialCCMsBuiltCount + realtimeDeltas.ccmsBuiltCount,
    ccmsInUseCount: initialCCMsInUseCount + realtimeDeltas.ccmsInUseCount,
    conditionGoodCount:
      initialConditionGoodCount + realtimeDeltas.conditionGoodCount,
    kitchensCount: initialKitchensCount + realtimeDeltas.kitchensCount,
    wellVentilatedCount:
      initialWellVentilatedCount + realtimeDeltas.wellVentilatedCount,
    rainProtectedCount:
      initialRainProtectedCount + realtimeDeltas.rainProtectedCount,
    inspected0to3MonthsCount:
      initialInspected0to3MonthsCount + realtimeDeltas.inspected0to3MonthsCount,
    inspected3to6MonthsCount:
      initialInspected3to6MonthsCount + realtimeDeltas.inspected3to6MonthsCount,
    inspectedOver6MonthsCount:
      initialInspectedOver6MonthsCount +
      realtimeDeltas.inspectedOver6MonthsCount,
  };

  const summaryItems = getSummaryItems(data);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">
          CCM Project Summary
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Realtime snapshot of project metrics for the selected year.
        </p>
      </CardHeader>
      <CardContent>
        <ProjectSummaryStatsGrid
          items={summaryItems}
          className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9"
        />
      </CardContent>
    </Card>
  );
}
