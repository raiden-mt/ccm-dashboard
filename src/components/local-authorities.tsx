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
import { FilterBar, type FilterState } from "./filter-bar";

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

// Mock data for local authorities
const localAuthorities = [
  {
    id: "ta-001",
    type: "Traditional Authority",
    name: "T/A Mzikubola",
    district: "Mzimba",
    ccmCount: 2450,
    villages: 12,
  },
  {
    id: "ta-002",
    type: "Traditional Authority",
    name: "T/A Mtwalo",
    district: "Mzimba",
    ccmCount: 1890,
    villages: 8,
  },
  {
    id: "ta-003",
    type: "Traditional Authority",
    name: "T/A Mzukuzuku",
    district: "Mzimba",
    ccmCount: 1675,
    villages: 10,
  },
  {
    id: "chief-001",
    type: "Chief",
    name: "Chief Mhango",
    district: "Mzimba",
    ccmCount: 845,
    villages: 4,
  },
  {
    id: "chief-002",
    type: "Chief",
    name: "Chief Nyirenda",
    district: "Mzimba",
    ccmCount: 720,
    villages: 3,
  },
  {
    id: "chief-003",
    type: "Chief",
    name: "Chief Gondwe",
    district: "Mzimba",
    ccmCount: 560,
    villages: 3,
  },
  {
    id: "ta-004",
    type: "Traditional Authority",
    name: "T/A Kabunduli",
    district: "Nkhata Bay",
    ccmCount: 1420,
    villages: 7,
  },
  {
    id: "ta-005",
    type: "Traditional Authority",
    name: "T/A Fukamapiri",
    district: "Nkhata Bay",
    ccmCount: 1180,
    villages: 6,
  },
  {
    id: "chief-004",
    type: "Chief",
    name: "Chief Mkandawire",
    district: "Nkhata Bay",
    ccmCount: 490,
    villages: 2,
  },
  {
    id: "ta-006",
    type: "Traditional Authority",
    name: "T/A Chikulamayembe",
    district: "Rumphi",
    ccmCount: 980,
    villages: 5,
  },
];

export function LocalAuthorities() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const handleExport = () => {
    alert("Exporting local authorities data...");
  };

  const totalCCMs = localAuthorities.reduce((sum, la) => sum + la.ccmCount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground text-2xl font-semibold">
          Local Authorities
        </h2>
        <p className="text-muted-foreground">
          Chiefs and Traditional Authorities with their CCM household counts
        </p>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        onExport={handleExport}
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-primary border-l-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Traditional Authorities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-primary text-2xl font-bold">
              {
                localAuthorities.filter(
                  (la) => la.type === "Traditional Authority",
                ).length
              }
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-ripple-green border-l-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Chiefs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-ripple-green text-2xl font-bold">
              {localAuthorities.filter((la) => la.type === "Chief").length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-status-blue border-l-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Total CCMs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#4A90A4]">
              {totalCCMs.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Local Authority List</CardTitle>
          <CardDescription>
            Up-to-date list of Chiefs and Traditional Authorities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-status-blue/50">
                  <TableHead>Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Villages</TableHead>
                  <TableHead className="text-right">CCM Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {localAuthorities.map((la) => (
                  <TableRow key={la.id} className="hover:bg-action-beige/30">
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          la.type === "Traditional Authority"
                            ? "bg-primary/10 text-primary"
                            : "bg-ripple-green/10 text-ripple-green"
                        }`}
                      >
                        {la.type}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">{la.name}</TableCell>
                    <TableCell>{la.district}</TableCell>
                    <TableCell>{la.villages}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {la.ccmCount.toLocaleString()}
                    </TableCell>
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
