import DashboardPageClient from "./_client";
import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/services/supabase/lib/getCurrentUser";
import { ProjectSummary } from "~/components/project-summary";
import { loadSearchParams } from "~/lib/search-params";
import type { SearchParams } from "nuqs/server";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function DashboardPage({ searchParams }: PageProps) {
  const { year } = await loadSearchParams(searchParams);
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }
  return (
    <>
      <div className="border-border border-b px-6 py-4">
        <ProjectSummary year={year} />
      </div>
      <DashboardPageClient />
    </>
  );
}
