import { InspectionStatusDistribution } from "../../(overview)/_components/inspection-status-distribution";
import { MonthlyInspectionsChart } from "./monthly-inspections-chart";

export default function ChartSectionWrapper() {
  return (
    <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
      <InspectionStatusDistribution />
      <MonthlyInspectionsChart />
    </div>
  );
}
