"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ClipboardCheck,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { inspections } from "~/lib/mock-data";

export function InspectionStatCards() {
  const goodConditionCount = inspections.filter(
    (i) => i.ccmCondition === "good",
  ).length;
  const needsRepairCount = inspections.filter(
    (i) => i.ccmCondition === "needs_repair",
  ).length;
  const damagedCount = inspections.filter(
    (i) => i.ccmCondition === "damaged" || i.ccmCondition === "replaced",
  ).length;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Total Inspections
          </CardTitle>
          <ClipboardCheck className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inspections.length}</div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <TrendingUp className="h-3 w-3" />
            +12% from last period
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Good Condition</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {((goodConditionCount / inspections.length) * 100).toFixed(1)}%
          </div>
          <p className="text-muted-foreground text-xs">
            {goodConditionCount} stoves in good condition
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Needs Repair</CardTitle>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">
            {needsRepairCount}
          </div>
          <p className="text-muted-foreground text-xs">Requiring maintenance</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Damaged/Replaced</CardTitle>
          <XCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{damagedCount}</div>
          <p className="text-muted-foreground text-xs">
            Stoves damaged or replaced
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

