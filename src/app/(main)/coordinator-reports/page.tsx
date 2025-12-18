import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/services/supabase/lib/getCurrentUser";
import { CoordinatorReports } from "~/components/coordinator-reports";

export default async function CoordinatorReportsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="bg-background p-2 md:p-4">
      <CoordinatorReports />
    </div>
  );
}

