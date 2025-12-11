import DashboardPageClient from "./_client";
import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/services/supabase/lib/getCurrentUser";
import { ProjectSummary } from "~/components/project-summary";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }
  return (
    <>
      <div className="border-border border-b px-6 py-4">
        <ProjectSummary />
      </div>
      <DashboardPageClient />
    </>
  );
}
