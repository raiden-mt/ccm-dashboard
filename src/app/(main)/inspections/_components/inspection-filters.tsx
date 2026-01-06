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
import { Filter, Download } from "lucide-react";
import { vpaAreas } from "~/lib/mock-data";

interface InspectionFiltersProps {
  onFiltersChange?: (filters: {
    dateFrom: string;
    dateTo: string;
    vpaFilter: string;
    conditionFilter: string;
  }) => void;
}

export function InspectionFilters({ onFiltersChange }: InspectionFiltersProps) {
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [vpaFilter, setVpaFilter] = useState<string>("all");
  const [conditionFilter, setConditionFilter] = useState<string>("all");

  const handleDateFromChange = (value: string) => {
    setDateFrom(value);
    onFiltersChange?.({ dateFrom: value, dateTo, vpaFilter, conditionFilter });
  };

  const handleDateToChange = (value: string) => {
    setDateTo(value);
    onFiltersChange?.({ dateFrom, dateTo: value, vpaFilter, conditionFilter });
  };

  const handleVpaChange = (value: string) => {
    setVpaFilter(value);
    onFiltersChange?.({ dateFrom, dateTo, vpaFilter: value, conditionFilter });
  };

  const handleConditionChange = (value: string) => {
    setConditionFilter(value);
    onFiltersChange?.({ dateFrom, dateTo, vpaFilter, conditionFilter: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Request Inspection Data
        </CardTitle>
        <CardDescription>
          Filter inspections by date, VPA, or result
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-2">
            <Label>Date From</Label>
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => handleDateFromChange(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Date To</Label>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => handleDateToChange(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>VPA Area</Label>
            <Select value={vpaFilter} onValueChange={handleVpaChange}>
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
            <Label>Stove Condition</Label>
            <Select value={conditionFilter} onValueChange={handleConditionChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="needs_repair">Needs Repair</SelectItem>
                <SelectItem value="damaged">Damaged</SelectItem>
                <SelectItem value="replaced">Replaced</SelectItem>
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
  );
}

