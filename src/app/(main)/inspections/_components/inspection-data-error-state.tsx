import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

type InspectionDataErrorStateProps = {
  title?: string;
  description?: string;
  error: string;
  actionHref?: string;
  actionLabel?: string;
};

export function InspectionDataErrorState({
  title = "Unable to load inspection data",
  description = "Please try again. If the problem persists, contact an administrator.",
  error,
  actionHref = "/inspections",
  actionLabel = "Try again",
}: InspectionDataErrorStateProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertTitle>Request failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
