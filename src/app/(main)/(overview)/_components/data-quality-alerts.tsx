"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { dashboardStats } from "~/lib/mock-data";
import { AlertTriangle } from "lucide-react";

export function DataQualityAlertsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="text-primary h-5 w-5" />
          Data Quality Alerts
        </CardTitle>
        <CardDescription>Issues requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-muted/50 flex items-center justify-between rounded-lg p-3"
            >
              <div className="space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-8 w-10" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function DataQualityAlerts() {
  const stats = dashboardStats;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="text-primary h-5 w-5" />
          Data Quality Alerts
        </CardTitle>
        <CardDescription>Issues requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-status-salmon flex items-center justify-between rounded-lg p-3">
            <div>
              <p className="text-foreground font-medium">Duplicates Detected</p>
              <p className="text-foreground/70 text-sm">
                Weekly scan found potential duplicates
              </p>
            </div>
            <span className="text-foreground text-2xl font-bold">
              {stats.duplicatesDetected}
            </span>
          </div>

          <div className="bg-status-tan flex items-center justify-between rounded-lg p-3">
            <div>
              <p className="text-foreground font-medium">Missing Data</p>
              <p className="text-foreground/70 text-sm">
                Records with incomplete GPS data
              </p>
            </div>
            <span className="text-foreground text-2xl font-bold">
              {stats.missingDataCount}
            </span>
          </div>

          <div className="bg-status-green flex items-center justify-between rounded-lg p-3">
            <div>
              <p className="text-foreground font-medium">Anomalies</p>
              <p className="text-foreground/70 text-sm">
                Data points outside normal ranges
              </p>
            </div>
            <span className="text-foreground text-2xl font-bold">
              {stats.anomaliesDetected}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
