"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { FilterBar, type FilterState } from "./filter-bar";
import { Progress } from "~/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const defaultFilters: FilterState = {
  vpa: "all",
  district: "all",
  areaManager: "all",
  coordinator: "all",
  lcv: "all",
  cv: "all",
  timePeriod: "all",
  sortBy: "default",
};

// Mock CV performance data
const cvPerformance = [
  {
    id: "cv-001",
    name: "Jim Mwamwatandala",
    coordinator: "Glory Choo",
    inspections: 145,
    target: 150,
    rating: 97,
    trend: "up",
  },
  {
    id: "cv-002",
    name: "Laston Nyasulu",
    coordinator: "Glory Choo",
    inspections: 138,
    target: 150,
    rating: 92,
    trend: "up",
  },
  {
    id: "cv-003",
    name: "Justice Chibalaza",
    coordinator: "Flora Banda",
    inspections: 142,
    target: 150,
    rating: 95,
    trend: "stable",
  },
  {
    id: "cv-004",
    name: "Dorica Chaura",
    coordinator: "Flora Banda",
    inspections: 128,
    target: 150,
    rating: 85,
    trend: "down",
  },
  {
    id: "cv-005",
    name: "Charles Munthali",
    coordinator: "Annette Karambo",
    inspections: 151,
    target: 150,
    rating: 100,
    trend: "up",
  },
  {
    id: "cv-006",
    name: "Solomon Munthali",
    coordinator: "Annette Karambo",
    inspections: 89,
    target: 150,
    rating: 59,
    trend: "down",
  },
  {
    id: "cv-007",
    name: "Glory Nyirenda",
    coordinator: "Wanangwa Chimphepo",
    inspections: 134,
    target: 150,
    rating: 89,
    trend: "stable",
  },
  {
    id: "cv-008",
    name: "Colles Kumwenda",
    coordinator: "Wanangwa Chimphepo",
    inspections: 156,
    target: 150,
    rating: 100,
    trend: "up",
  },
  {
    id: "cv-009",
    name: "Emily Kanyenda",
    coordinator: "Glory Choo",
    inspections: 72,
    target: 150,
    rating: 48,
    trend: "down",
  },
];

export function CVPerformance() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const handleExport = () => {
    alert("Exporting CV performance data...");
  };

  const getRatingBadge = (rating: number) => {
    if (rating >= 90)
      return (
        <Badge className="bg-status-green text-foreground">Excellent</Badge>
      );
    if (rating >= 70)
      return <Badge className="bg-status-tan text-foreground">Good</Badge>;
    if (rating >= 50)
      return (
        <Badge className="bg-status-salmon text-foreground">
          Needs Improvement
        </Badge>
      );
    return (
      <Badge className="bg-destructive text-destructive-foreground">Poor</Badge>
    );
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up")
      return <TrendingUp className="text-ripple-green h-4 w-4" />;
    if (trend === "down")
      return <TrendingDown className="text-destructive h-4 w-4" />;
    return <Minus className="text-muted-foreground h-4 w-4" />;
  };

  const excellentCount = cvPerformance.filter((cv) => cv.rating >= 90).length;
  const needsImprovementCount = cvPerformance.filter(
    (cv) => cv.rating < 70,
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground text-2xl font-semibold">
          CV Performance
        </h2>
        <p className="text-muted-foreground">
          Monitor Community Volunteer performance and identify areas for
          improvement
        </p>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        onExport={handleExport}
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-ripple-green border-l-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Total CVs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-ripple-green text-2xl font-bold">
              {cvPerformance.length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-status-green border-l-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Excellent (90%+)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-ripple-green text-2xl font-bold">
              {excellentCount}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-status-salmon border-l-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Needs Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-destructive text-2xl font-bold">
              {needsImprovementCount}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-primary border-l-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Avg Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-primary text-2xl font-bold">
              {Math.round(
                cvPerformance.reduce((sum, cv) => sum + cv.rating, 0) /
                  cvPerformance.length,
              )}
              %
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>CV Performance Overview</CardTitle>
          <CardDescription>
            Inspection targets and performance ratings for all Community
            Volunteers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-status-blue/50">
                  <TableHead>CV Name</TableHead>
                  <TableHead>Coordinator</TableHead>
                  <TableHead>Inspections</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cvPerformance.map((cv) => (
                  <TableRow key={cv.id} className="hover:bg-action-beige/30">
                    <TableCell className="font-medium">{cv.name}</TableCell>
                    <TableCell>{cv.coordinator}</TableCell>
                    <TableCell>{cv.inspections}</TableCell>
                    <TableCell>{cv.target}</TableCell>
                    <TableCell className="w-32">
                      <div className="flex items-center gap-2">
                        <Progress
                          value={Math.min(
                            (cv.inspections / cv.target) * 100,
                            100,
                          )}
                          className="h-2"
                        />
                        <span className="text-muted-foreground text-xs">
                          {Math.round((cv.inspections / cv.target) * 100)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {cv.rating}%
                    </TableCell>
                    <TableCell>{getTrendIcon(cv.trend)}</TableCell>
                    <TableCell>{getRatingBadge(cv.rating)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
