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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Checkbox } from "~/components/ui/checkbox";
import { Badge } from "~/components/ui/badge";
import {
  Download,
  Database,
  Filter,
  FileSpreadsheet,
  Table,
} from "lucide-react";
import {
  vpaAreas,
  districts,
  householders,
  inspections,
  usageSurveys,
  staff,
} from "~/lib/mock-data";

type DatasetType =
  | "householders"
  | "inspections"
  | "usage_surveys"
  | "kpt_surveys"
  | "sdg_surveys"
  | "staff";

interface FieldOption {
  id: string;
  label: string;
  selected: boolean;
}

export function DataExtraction() {
  const [selectedDataset, setSelectedDataset] =
    useState<DatasetType>("householders");
  const [selectedVPA, setSelectedVPA] = useState<string>("all");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [exportFormat, setExportFormat] = useState<"csv" | "json" | "excel">(
    "csv",
  );

  const [householderFields, setHouseholderFields] = useState<FieldOption[]>([
    { id: "id", label: "Householder ID", selected: true },
    { id: "firstName", label: "First Name", selected: true },
    { id: "middleName", label: "Middle Name", selected: true },
    { id: "lastName", label: "Last Name", selected: true },
    { id: "cvAreaId", label: "CV Area", selected: true },
    { id: "familyCount", label: "Family Count", selected: true },
    { id: "stoveType", label: "Stove Type", selected: true },
    { id: "stoveBuildDate", label: "Stove Build Date", selected: false },
    { id: "hasKitchen", label: "Has Kitchen", selected: false },
    { id: "latitude", label: "Latitude", selected: true },
    { id: "longitude", label: "Longitude", selected: true },
    { id: "gpsAccuracy", label: "GPS Accuracy", selected: false },
    { id: "inspectionStatus", label: "Inspection Status", selected: true },
    { id: "lastInspectionDate", label: "Last Inspection Date", selected: true },
    { id: "isArchived", label: "Is Archived", selected: false },
  ]);

  const toggleField = (fieldId: string) => {
    setHouseholderFields((prev) =>
      prev.map((f) => (f.id === fieldId ? { ...f, selected: !f.selected } : f)),
    );
  };

  const selectAllFields = () => {
    setHouseholderFields((prev) => prev.map((f) => ({ ...f, selected: true })));
  };

  const deselectAllFields = () => {
    setHouseholderFields((prev) =>
      prev.map((f) => ({ ...f, selected: false })),
    );
  };

  const getRecordCount = () => {
    switch (selectedDataset) {
      case "householders":
        return householders.length;
      case "inspections":
        return inspections.length;
      case "usage_surveys":
        return usageSurveys.length;
      case "staff":
        return staff.length;
      default:
        return 0;
    }
  };

  const handleExport = () => {
    alert(
      `Exporting ${getRecordCount()} records as ${exportFormat.toUpperCase()}`,
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground text-2xl font-semibold">
          Data Extraction
        </h2>
        <p className="text-muted-foreground">
          Extract data from the CCM database with customizable filters and field
          selection
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Dataset Selection - Updated styling */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="text-primary h-5 w-5" />
              Select Dataset
            </CardTitle>
            <CardDescription>
              Choose the data you want to extract
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Dataset Type</Label>
              <Select
                value={selectedDataset}
                onValueChange={(value) =>
                  setSelectedDataset(value as DatasetType)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="householders">Householders</SelectItem>
                  <SelectItem value="inspections">Inspections</SelectItem>
                  <SelectItem value="usage_surveys">Usage Surveys</SelectItem>
                  <SelectItem value="kpt_surveys">KPT Surveys</SelectItem>
                  <SelectItem value="sdg_surveys">SDG Surveys</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-action-beige rounded-lg p-4">
              <div className="text-foreground/70 text-sm">
                Estimated Records
              </div>
              <div className="text-foreground text-3xl font-bold">
                {getRecordCount().toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="text-primary h-5 w-5" />
              Filters
            </CardTitle>
            <CardDescription>Narrow down your data extraction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>District</Label>
                <Select
                  value={selectedDistrict}
                  onValueChange={setSelectedDistrict}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Districts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    {districts.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>VPA Area</Label>
                <Select value={selectedVPA} onValueChange={setSelectedVPA}>
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
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Field Selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Table className="text-primary h-5 w-5" />
                Field Selection
              </CardTitle>
              <CardDescription>
                Choose which fields to include in the export
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={selectAllFields}
                className="bg-action-beige text-foreground hover:bg-action-beige/80 border-action-beige"
              >
                Select All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={deselectAllFields}
                className="bg-transparent"
              >
                Deselect All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {householderFields.map((field) => (
              <div key={field.id} className="flex items-center space-x-2">
                <Checkbox
                  id={field.id}
                  checked={field.selected}
                  onCheckedChange={() => toggleField(field.id)}
                />
                <label
                  htmlFor={field.id}
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {field.label}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="text-primary h-5 w-5" />
            Export Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-2">
              <Label>Export Format</Label>
              <Select
                value={exportFormat}
                onValueChange={(value) =>
                  setExportFormat(value as "csv" | "json" | "excel")
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleExport}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              <Download className="h-4 w-4" />
              Export Data
            </Button>

            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Badge className="bg-action-mint text-foreground">
                {householderFields.filter((f) => f.selected).length} fields
                selected
              </Badge>
              <Badge className="bg-status-blue text-foreground">
                {getRecordCount()} records
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Export Presets */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Export Presets</CardTitle>
          <CardDescription>
            Common data extraction configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="bg-action-beige/50 border-action-beige hover:bg-action-beige h-auto flex-col gap-1 py-4"
            >
              <span className="text-foreground font-semibold">
                All Householders by VPA
              </span>
              <span className="text-muted-foreground text-xs">
                Full dataset with location data
              </span>
            </Button>
            <Button
              variant="outline"
              className="bg-action-mint/50 border-action-mint hover:bg-action-mint h-auto flex-col gap-1 py-4"
            >
              <span className="text-foreground font-semibold">
                Monthly Inspection Report
              </span>
              <span className="text-muted-foreground text-xs">
                This month&apos;s inspections
              </span>
            </Button>
            <Button
              variant="outline"
              className="bg-status-green/50 border-status-green hover:bg-status-green h-auto flex-col gap-1 py-4"
            >
              <span className="text-foreground font-semibold">
                Active Stoves Summary
              </span>
              <span className="text-muted-foreground text-xs">
                Currently in-use stoves
              </span>
            </Button>
            <Button
              variant="outline"
              className="bg-status-blue/50 border-status-blue hover:bg-status-blue h-auto flex-col gap-1 py-4"
            >
              <span className="text-foreground font-semibold">
                Staff Performance
              </span>
              <span className="text-muted-foreground text-xs">
                Staff metrics and assignments
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
