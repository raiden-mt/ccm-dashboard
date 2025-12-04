"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { FilterBar, type FilterState } from "./filter-bar";
import { CheckCircle2, AlertTriangle, Calendar, User } from "lucide-react";

const defaultFilters: FilterState = {
  vpa: "all",
  district: "all",
  areaManager: "all",
  coordinator: "all",
  lcv: "all",
  cv: "all",
  timePeriod: "3months",
  sortBy: "recent",
};

// Mock coordinator monthly reports
const coordinatorReports = [
  {
    id: "report-001",
    coordinator: "Glory Choo",
    month: "November 2025",
    submittedDate: "2025-11-28",
    successes: [
      "Exceeded inspection target by 12%",
      "Trained 3 new CVs",
      "Completed community outreach in 5 villages",
    ],
    challenges: [
      "Transportation issues in Mzimba North",
      "Two CVs requiring additional training",
    ],
    status: "submitted",
  },
  {
    id: "report-002",
    coordinator: "Flora Banda",
    month: "November 2025",
    submittedDate: "2025-11-27",
    successes: [
      "100% household coverage achieved",
      "Resolved 8 stove repair cases",
    ],
    challenges: [
      "Rainy season affecting field visits",
      "Need more rain protection supplies",
    ],
    status: "submitted",
  },
  {
    id: "report-003",
    coordinator: "Annette Karambo",
    month: "November 2025",
    submittedDate: "2025-11-29",
    successes: [
      "Successfully onboarded 2 new households",
      "Completed all KPT surveys",
    ],
    challenges: [
      "One CV resigned - need replacement",
      "GPS device malfunction",
    ],
    status: "submitted",
  },
  {
    id: "report-004",
    coordinator: "Wanangwa Chimphepo",
    month: "November 2025",
    submittedDate: null,
    successes: [],
    challenges: [],
    status: "pending",
  },
  {
    id: "report-005",
    coordinator: "Glory Choo",
    month: "October 2025",
    submittedDate: "2025-10-30",
    successes: ["Met all inspection targets", "Zero data quality issues"],
    challenges: ["Limited fuel availability"],
    status: "submitted",
  },
  {
    id: "report-006",
    coordinator: "Flora Banda",
    month: "October 2025",
    submittedDate: "2025-10-29",
    successes: [
      "Conducted 2 community training sessions",
      "Improved CV performance by 15%",
    ],
    challenges: ["Communication network issues in remote areas"],
    status: "submitted",
  },
];

export function CoordinatorReports() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const handleExport = () => {
    alert("Exporting coordinator reports...");
  };

  const pendingReports = coordinatorReports.filter(
    (r) => r.status === "pending",
  ).length;
  const submittedReports = coordinatorReports.filter(
    (r) => r.status === "submitted",
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground text-2xl font-semibold">
          Coordinator Monthly Reports
        </h2>
        <p className="text-muted-foreground">
          Field feedback on challenges and successes from Coordinators
        </p>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        onExport={handleExport}
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-ripple-green border-l-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Submitted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-ripple-green text-2xl font-bold">
              {submittedReports}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-status-tan border-l-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#B8860B]">
              {pendingReports}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-primary border-l-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Total Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-primary text-2xl font-bold">
              {coordinatorReports.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {coordinatorReports.map((report) => (
          <Card
            key={report.id}
            className={report.status === "pending" ? "border-status-tan" : ""}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="text-muted-foreground h-4 w-4" />
                    {report.coordinator}
                  </CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {report.month}
                    </span>
                    {report.submittedDate && (
                      <span className="text-xs">
                        Submitted: {report.submittedDate}
                      </span>
                    )}
                  </CardDescription>
                </div>
                <Badge
                  className={
                    report.status === "submitted"
                      ? "bg-status-green text-foreground"
                      : "bg-status-tan text-foreground"
                  }
                >
                  {report.status === "submitted" ? "Submitted" : "Pending"}
                </Badge>
              </div>
            </CardHeader>
            {report.status === "submitted" && (
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Successes */}
                  <div className="bg-status-green/30 rounded-lg p-4">
                    <h4 className="text-ripple-green mb-2 flex items-center gap-2 font-semibold">
                      <CheckCircle2 className="h-4 w-4" />
                      Successes
                    </h4>
                    <ul className="space-y-1">
                      {report.successes.map((success, idx) => (
                        <li key={idx} className="text-foreground text-sm">
                          - {success}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges */}
                  <div className="bg-status-salmon/30 rounded-lg p-4">
                    <h4 className="mb-2 flex items-center gap-2 font-semibold text-[#C75050]">
                      <AlertTriangle className="h-4 w-4" />
                      Challenges
                    </h4>
                    <ul className="space-y-1">
                      {report.challenges.map((challenge, idx) => (
                        <li key={idx} className="text-foreground text-sm">
                          - {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
