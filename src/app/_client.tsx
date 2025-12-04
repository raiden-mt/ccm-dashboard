"use client";

import { useState } from "react";
import { DashboardSidebar } from "~/components/sidebar";
import { ProjectSummary } from "~/components/project-summary";
import { DashboardOverview } from "~/components/overview";
import { DataExtraction } from "~/components/data-extraction";
import { AutomatedChecks } from "~/components/automated-checks";
import { StovesPerVPA } from "~/components/stoves-per-vpa";
import { StaffTraining } from "~/components/staff-training";
import { InspectionsSection } from "~/components/inspections-section";
import { SurveysSection } from "~/components/surveys-section";
import { HouseholdsSection } from "~/components/households-section";
import { LocalAuthorities } from "~/components/local-authorities";
import { CVPerformance } from "~/components/cv-performance";
import { CoordinatorReports } from "~/components/coordinator-reports";
import { NotActiveSection } from "~/components/not-active-section";
import { ArchivedSection } from "~/components/archived-section";

export default function DashboardPageClient() {
  const [activeSection, setActiveSection] = useState("main");

  const isFullAccess = true;

  const renderContent = () => {
    switch (activeSection) {
      case "main":
        return <DashboardOverview isExecutive={!isFullAccess} />;
      case "households":
        return <HouseholdsSection />;
      case "data-extraction":
        return isFullAccess ? (
          <DataExtraction />
        ) : (
          <DashboardOverview isExecutive={true} />
        );
      case "automated-checks":
        return <AutomatedChecks />;
      case "stoves-per-vpa":
        return <StovesPerVPA />;
      case "staff":
        return <StaffTraining />;
      case "inspections":
        return <InspectionsSection />;
      case "usage-surveys":
        return <SurveysSection type="usage" />;
      case "kpt-surveys":
        return <SurveysSection type="kpt" />;
      case "sdg-surveys":
        return <SurveysSection type="sdg" />;
      case "local-authorities":
        return <LocalAuthorities />;
      case "cv-performance":
        return <CVPerformance />;
      case "coordinator-reports":
        return <CoordinatorReports />;
      case "not-active":
        return <NotActiveSection />;
      case "archived":
        return <ArchivedSection />;
      default:
        return <DashboardOverview isExecutive={!isFullAccess} />;
    }
  };

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <div className="border-border border-b px-6 py-4">
        <ProjectSummary />
      </div>
      <div className="flex flex-1">
        <DashboardSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isFullAccess={isFullAccess}
        />
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
