import {
  InspectionStatusDistribution,
  InspectionStatusDistributionSkeleton,
} from "../../(overview)/_components/inspection-status-distribution";
import {
  MonthlyInspectionsChart,
  MonthlyInspectionsChartSkeleton,
} from "./monthly-inspections-chart";

// Skeleton export
export function ChartSectionWrapperSkeleton() {
  return (
    <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
      <InspectionStatusDistributionSkeleton />
      <MonthlyInspectionsChartSkeleton />
    </div>
  );
}

export default function ChartSectionWrapper() {
  return (
    <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
      <InspectionStatusDistribution />
      <MonthlyInspectionsChart />
    </div>
  );
}
