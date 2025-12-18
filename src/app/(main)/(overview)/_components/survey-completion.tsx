"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { dashboardStats } from "~/lib/mock-data";

export function SurveyCompletion() {
  const stats = dashboardStats;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Survey Completion</CardTitle>
        <CardDescription>Total surveys completed this year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Usage Surveys</span>
            <span className="font-semibold">
              {stats.usageSurveysCompleted.toLocaleString()}
            </span>
          </div>
          <div className="bg-muted h-2 rounded-full">
            <div
              className="bg-ripple-green h-2 rounded-full"
              style={{ width: "78%" }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">KPT Surveys</span>
            <span className="font-semibold">
              {stats.kptSurveysCompleted.toLocaleString()}
            </span>
          </div>
          <div className="bg-muted h-2 rounded-full">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: "54%" }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">SDG Surveys</span>
            <span className="font-semibold">
              {stats.sdgSurveysCompleted.toLocaleString()}
            </span>
          </div>
          <div className="bg-muted h-2 rounded-full">
            <div
              className="bg-status-blue h-2 rounded-full"
              style={{ width: "40%" }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

