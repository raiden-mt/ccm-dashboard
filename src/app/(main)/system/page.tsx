import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/services/supabase/lib/getCurrentUser";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Settings } from "lucide-react";

export default async function SystemPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="bg-background p-2 md:p-4">
      <div className="space-y-6">
        <div>
          <h2 className="text-foreground text-2xl font-semibold">
            System Settings
          </h2>
          <p className="text-muted-foreground">
            System configuration and administration
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="text-primary h-5 w-5" />
              Coming Soon
            </CardTitle>
            <CardDescription>
              This feature is under development and will be available soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The System module will provide configuration options, user
              management, and administrative functions for the CCM Dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

