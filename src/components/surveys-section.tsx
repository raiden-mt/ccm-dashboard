"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Badge } from "~/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  FileBarChart,
  Download,
  Filter,
  Flame,
  ThermometerSun,
  Users,
} from "lucide-react";
import {
  usageSurveys,
  kptSurveys,
  sdgSurveys,
  staff,
  householders,
  vpaAreas,
} from "~/lib/mock-data";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

type SurveyType = "usage" | "kpt" | "sdg";

interface SurveysSectionProps {
  type: SurveyType;
}

export function SurveysSection({ type }: SurveysSectionProps) {
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [vpaFilter, setVpaFilter] = useState<string>("all");

  const getStaffName = (id: string) =>
    staff.find((s) => s.id === id)?.name ?? "Unknown";
  const getHouseholderName = (id: string) => {
    const hh = householders.find((h) => h.id === id);
    return hh ? `${hh.firstName} ${hh.lastName}` : "Unknown";
  };

  const titles: Record<
    SurveyType,
    { title: string; desc: string; req: string }
  > = {
    usage: {
      title: "Usage Surveys",
      desc: "Request usage survey data collected during field visits",
      req: "Requirement #15",
    },
    kpt: {
      title: "KPT Surveys",
      desc: "Kitchen Performance Test data including fuel consumption and emissions",
      req: "Requirement #14",
    },
    sdg: {
      title: "SDG Surveys",
      desc: "Sustainable Development Goals impact survey results",
      req: "Requirement #16",
    },
  };

  // Usage Survey specific content
  if (type === "usage") {
    const ccmInUseCount = usageSurveys.filter((s) => s.ccmInUse).length;
    const otherStovesCount = usageSurveys.filter(
      (s) => s.otherStovesPresent,
    ).length;

    const usageData = [
      { name: "CCM In Use", value: ccmInUseCount, color: "#22c55e" },
      {
        name: "CCM Not In Use",
        value: usageSurveys.length - ccmInUseCount,
        color: "#ef4444",
      },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-foreground text-2xl font-semibold">
            {titles[type].title}
          </h2>
          <p className="text-muted-foreground">
            {titles[type].desc} ({titles[type].req})
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Surveys
              </CardTitle>
              <FileBarChart className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageSurveys.length}</div>
              <p className="text-muted-foreground text-xs">
                Completed this year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">CCM In Use</CardTitle>
              <Flame className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {((ccmInUseCount / usageSurveys.length) * 100).toFixed(1)}%
              </div>
              <p className="text-muted-foreground text-xs">
                {ccmInUseCount} households
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">CCM Warm</CardTitle>
              <ThermometerSun className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {usageSurveys.filter((s) => s.ccmWarm).length}
              </div>
              <p className="text-muted-foreground text-xs">
                Evidence of recent use
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Other Stoves Present
              </CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{otherStovesCount}</div>
              <p className="text-muted-foreground text-xs">
                Multi-stove households
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle>CCM Usage Status</CardTitle>
            <CardDescription>
              Survey results for CCM stove usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={usageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {usageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Request Survey Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label>Date From</Label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Date To</Label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>VPA Area</Label>
                <Select value={vpaFilter} onValueChange={setVpaFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All VPAs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All VPAs</SelectItem>
                    {vpaAreas.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Survey Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Householder</TableHead>
                  <TableHead>Surveyor</TableHead>
                  <TableHead>CCM In Use</TableHead>
                  <TableHead>CCM Warm</TableHead>
                  <TableHead>Other Stoves</TableHead>
                  <TableHead>Cooking Freq.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usageSurveys.slice(0, 10).map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.surveyDate}</TableCell>
                    <TableCell className="font-medium">
                      {getHouseholderName(s.householderId)}
                    </TableCell>
                    <TableCell>{getStaffName(s.staffId)}</TableCell>
                    <TableCell>
                      <Badge variant={s.ccmInUse ? "default" : "secondary"}>
                        {s.ccmInUse ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>{s.ccmWarm ? "Yes" : "No"}</TableCell>
                    <TableCell>{s.otherStovesPresent ? "Yes" : "No"}</TableCell>
                    <TableCell>{s.cookingFrequency ?? "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  // KPT Survey specific content
  if (type === "kpt") {
    const avgFuelSavings =
      kptSurveys.reduce((sum, s) => sum + s.fuelSavings, 0) / kptSurveys.length;
    const avgEmissionsReduction =
      kptSurveys.reduce((sum, s) => sum + s.emissionsReduction, 0) /
      kptSurveys.length;

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-foreground text-2xl font-semibold">
            {titles[type].title}
          </h2>
          <p className="text-muted-foreground">
            {titles[type].desc} ({titles[type].req})
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total KPT Surveys
              </CardTitle>
              <FileBarChart className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kptSurveys.length}</div>
              <p className="text-muted-foreground text-xs">
                Completed this year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Fuel Savings
              </CardTitle>
              <Flame className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {avgFuelSavings.toFixed(1)}%
              </div>
              <p className="text-muted-foreground text-xs">
                Compared to baseline
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Emissions Reduction
              </CardTitle>
              <ThermometerSun className="text-primary h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {avgEmissionsReduction.toFixed(1)}%
              </div>
              <p className="text-muted-foreground text-xs">Average reduction</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Cook Time
              </CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(
                  kptSurveys.reduce((sum, s) => sum + s.cookingTime, 0) /
                  kptSurveys.length
                ).toFixed(0)}{" "}
                min
              </div>
              <p className="text-muted-foreground text-xs">
                Per cooking session
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Request KPT Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label>Date From</Label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Date To</Label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>VPA Area</Label>
                <Select value={vpaFilter} onValueChange={setVpaFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All VPAs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All VPAs</SelectItem>
                    {vpaAreas.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>KPT Survey Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Householder</TableHead>
                  <TableHead>Surveyor</TableHead>
                  <TableHead className="text-right">Wood (kg)</TableHead>
                  <TableHead className="text-right">Cook Time (min)</TableHead>
                  <TableHead className="text-right">Fuel Savings %</TableHead>
                  <TableHead className="text-right">Emissions Red. %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kptSurveys.slice(0, 10).map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.surveyDate}</TableCell>
                    <TableCell className="font-medium">
                      {getHouseholderName(s.householderId)}
                    </TableCell>
                    <TableCell>{getStaffName(s.staffId)}</TableCell>
                    <TableCell className="text-right">
                      {s.woodConsumption.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-right">
                      {s.cookingTime.toFixed(0)}
                    </TableCell>
                    <TableCell className="text-right text-green-600">
                      {s.fuelSavings.toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-primary text-right">
                      {s.emissionsReduction.toFixed(1)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  // SDG Survey specific content
  const healthImproved = sdgSurveys.filter(
    (s) => s.healthImpact === "improved",
  ).length;
  const incomeIncreased = sdgSurveys.filter(
    (s) => s.incomeImpact === "increased",
  ).length;
  const genderImproved = sdgSurveys.filter(
    (s) => s.genderEmpowerment === "improved",
  ).length;

  const sdgImpactData = [
    {
      name: "Health",
      improved: healthImproved,
      same: sdgSurveys.filter((s) => s.healthImpact === "same").length,
    },
    {
      name: "Income",
      improved: incomeIncreased,
      same: sdgSurveys.filter((s) => s.incomeImpact === "same").length,
    },
    {
      name: "Education",
      improved: sdgSurveys.filter((s) => s.educationAccess === "improved")
        .length,
      same: sdgSurveys.filter((s) => s.educationAccess === "same").length,
    },
    {
      name: "Gender",
      improved: genderImproved,
      same: sdgSurveys.filter((s) => s.genderEmpowerment === "same").length,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground text-2xl font-semibold">
          {titles[type].title}
        </h2>
        <p className="text-muted-foreground">
          {titles[type].desc} ({titles[type].req})
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total SDG Surveys
            </CardTitle>
            <FileBarChart className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sdgSurveys.length}</div>
            <p className="text-muted-foreground text-xs">Completed this year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Health Improved
            </CardTitle>
            <Flame className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {((healthImproved / sdgSurveys.length) * 100).toFixed(0)}%
            </div>
            <p className="text-muted-foreground text-xs">
              {healthImproved} households
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Income Increased
            </CardTitle>
            <ThermometerSun className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((incomeIncreased / sdgSurveys.length) * 100).toFixed(0)}%
            </div>
            <p className="text-muted-foreground text-xs">
              {incomeIncreased} households
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Time Freed
            </CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                sdgSurveys.reduce((sum, s) => sum + s.timeFreedUp, 0) /
                sdgSurveys.length
              ).toFixed(0)}{" "}
              min
            </div>
            <p className="text-muted-foreground text-xs">Per day</p>
          </CardContent>
        </Card>
      </div>

      {/* Impact Chart */}
      <Card>
        <CardHeader>
          <CardTitle>SDG Impact Summary</CardTitle>
          <CardDescription>
            Improvement rates across SDG indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sdgImpactData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="improved" fill="#22c55e" name="Improved" />
                <Bar dataKey="same" fill="#94a3b8" name="Same" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Request SDG Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label>Date From</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Date To</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>VPA Area</Label>
              <Select value={vpaFilter} onValueChange={setVpaFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All VPAs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All VPAs</SelectItem>
                  {vpaAreas.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>SDG Survey Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Householder</TableHead>
                <TableHead>Surveyor</TableHead>
                <TableHead>Health</TableHead>
                <TableHead>Income</TableHead>
                <TableHead>Education</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead className="text-right">Time Freed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sdgSurveys.slice(0, 10).map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.surveyDate}</TableCell>
                  <TableCell className="font-medium">
                    {getHouseholderName(s.householderId)}
                  </TableCell>
                  <TableCell>{getStaffName(s.staffId)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        s.healthImpact === "improved" ? "default" : "secondary"
                      }
                      className={
                        s.healthImpact === "improved" ? "bg-green-500" : ""
                      }
                    >
                      {s.healthImpact}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        s.incomeImpact === "increased" ? "default" : "secondary"
                      }
                      className={
                        s.incomeImpact === "increased" ? "bg-green-500" : ""
                      }
                    >
                      {s.incomeImpact}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        s.educationAccess === "improved"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        s.educationAccess === "improved" ? "bg-green-500" : ""
                      }
                    >
                      {s.educationAccess}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        s.genderEmpowerment === "improved"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        s.genderEmpowerment === "improved" ? "bg-green-500" : ""
                      }
                    >
                      {s.genderEmpowerment}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {s.timeFreedUp} min
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
