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
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  AlertTriangle,
  Copy,
  MapPin,
  FileX,
  Zap,
  CheckCircle,
  Clock,
  RefreshCw,
} from "lucide-react";
import { dataQualityIssues, householders } from "~/lib/mock-data";

export function AutomatedChecks() {
  const [lastRunDate] = useState("2025-11-25 08:00 AM");

  const duplicates = dataQualityIssues.filter(
    (i) => i.type === "duplicate" && !i.resolved,
  );
  const missingData = dataQualityIssues
    .filter((i) => i.type === "missing_gps" || i.type === "missing_data")
    .filter((i) => !i.resolved);
  const anomalies = dataQualityIssues.filter(
    (i) => i.type === "anomaly" && !i.resolved,
  );
  const resolved = dataQualityIssues.filter((i) => i.resolved);

  const getHouseholderName = (id: string) => {
    const hh = householders.find((h) => h.id === id);
    return hh ? `${hh.firstName} ${hh.lastName}` : "Unknown";
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return (
          <Badge className="bg-status-salmon text-foreground hover:bg-status-salmon/80">
            High
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-status-tan text-foreground hover:bg-status-tan/80">
            Medium
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-status-green text-foreground hover:bg-status-green/80">
            Low
          </Badge>
        );
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-2xl font-semibold">
            Automated Data Checks
          </h2>
          <p className="text-muted-foreground">
            Weekly duplicate checks, missing data detection, and anomaly
            identification
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right text-sm">
            <div className="text-muted-foreground">Last Run</div>
            <div className="font-medium">{lastRunDate}</div>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
            <RefreshCw className="h-4 w-4" />
            Run Checks Now
          </Button>
        </div>
      </div>

      {/* Summary Cards - Updated with traffic-light status colors */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-status-salmon bg-status-salmon/10 border-l-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Duplicates</CardTitle>
            <Copy className="text-foreground/70 h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-foreground text-2xl font-bold">
              {duplicates.length}
            </div>
            <p className="text-muted-foreground text-xs">
              Weekly check (Req. #3)
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-status-tan bg-status-tan/10 border-l-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Missing Data</CardTitle>
            <MapPin className="text-foreground/70 h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-foreground text-2xl font-bold">
              {missingData.length}
            </div>
            <p className="text-muted-foreground text-xs">
              Weekly check (Req. #4)
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-primary bg-primary/10 border-l-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Anomalies</CardTitle>
            <Zap className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-foreground text-2xl font-bold">
              {anomalies.length}
            </div>
            <p className="text-muted-foreground text-xs">
              Monthly check (Req. #6, #12)
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-status-green bg-status-green/10 border-l-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="text-ripple-green h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-ripple-green text-2xl font-bold">
              {resolved.length}
            </div>
            <p className="text-muted-foreground text-xs">Issues fixed</p>
          </CardContent>
        </Card>
      </div>

      {/* Check Schedule - Updated with warm tones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="text-primary h-5 w-5" />
            Automated Check Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-action-beige rounded-lg p-4">
              <div className="text-foreground/70 flex items-center gap-2 text-sm font-medium">
                <Copy className="h-4 w-4" />
                Duplicate Check
              </div>
              <div className="text-foreground mt-2 font-semibold">
                Every Monday, 6:00 AM
              </div>
              <div className="text-muted-foreground text-xs">
                Requirement #3
              </div>
            </div>
            <div className="bg-action-mint rounded-lg p-4">
              <div className="text-foreground/70 flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4" />
                Missing Data Check
              </div>
              <div className="text-foreground mt-2 font-semibold">
                Every Monday, 6:30 AM
              </div>
              <div className="text-muted-foreground text-xs">
                Requirement #4, #13
              </div>
            </div>
            <div className="bg-status-blue rounded-lg p-4">
              <div className="text-foreground/70 flex items-center gap-2 text-sm font-medium">
                <Zap className="h-4 w-4" />
                Anomaly Detection
              </div>
              <div className="text-foreground mt-2 font-semibold">
                1st of each month, 7:00 AM
              </div>
              <div className="text-muted-foreground text-xs">
                Requirement #6, #12
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issues Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="text-primary h-5 w-5" />
            Data Quality Issues
          </CardTitle>
          <CardDescription>Review and resolve detected issues</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="duplicates">
            <TabsList className="bg-muted">
              <TabsTrigger
                value="duplicates"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2"
              >
                <Copy className="h-4 w-4" />
                Duplicates ({duplicates.length})
              </TabsTrigger>
              <TabsTrigger
                value="missing"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2"
              >
                <FileX className="h-4 w-4" />
                Missing ({missingData.length})
              </TabsTrigger>
              <TabsTrigger
                value="anomalies"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2"
              >
                <Zap className="h-4 w-4" />
                Anomalies ({anomalies.length})
              </TabsTrigger>
              <TabsTrigger
                value="resolved"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Resolved ({resolved.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="duplicates" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Severity</TableHead>
                    <TableHead>Record</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Detected</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {duplicates.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell>{getSeverityBadge(issue.severity)}</TableCell>
                      <TableCell className="font-medium">
                        {getHouseholderName(issue.affectedRecordId)}
                      </TableCell>
                      <TableCell>{issue.description}</TableCell>
                      <TableCell>{issue.detectedAt}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent"
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            className="bg-action-beige text-foreground hover:bg-action-beige/80"
                          >
                            Merge
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent"
                          >
                            Dismiss
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {duplicates.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-muted-foreground text-center"
                      >
                        No duplicate issues found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="missing" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Severity</TableHead>
                    <TableHead>Record</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Detected</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {missingData.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell>{getSeverityBadge(issue.severity)}</TableCell>
                      <TableCell className="font-medium">
                        {getHouseholderName(issue.affectedRecordId)}
                      </TableCell>
                      <TableCell>{issue.description}</TableCell>
                      <TableCell>{issue.detectedAt}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent"
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            className="bg-action-mint text-foreground hover:bg-action-mint/80"
                          >
                            Update
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="anomalies" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Severity</TableHead>
                    <TableHead>Record</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Detected</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {anomalies.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell>{getSeverityBadge(issue.severity)}</TableCell>
                      <TableCell className="font-medium">
                        {getHouseholderName(issue.affectedRecordId)}
                      </TableCell>
                      <TableCell>{issue.description}</TableCell>
                      <TableCell>{issue.detectedAt}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent"
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            className="bg-action-beige text-foreground hover:bg-action-beige/80"
                          >
                            Correct
                          </Button>
                          <Button
                            size="sm"
                            className="bg-action-mint text-foreground hover:bg-action-mint/80"
                          >
                            Flag OK
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="resolved" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Record</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Resolved</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resolved.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell>
                        <Badge variant="outline" className="bg-status-green/20">
                          {issue.type.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {getHouseholderName(issue.affectedRecordId)}
                      </TableCell>
                      <TableCell>{issue.description}</TableCell>
                      <TableCell>{issue.detectedAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
