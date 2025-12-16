import DashboardPageClient from "./(overview)/_client";
import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/services/supabase/lib/getCurrentUser";
import { loadSearchParams } from "~/lib/search-params";
import type { SearchParams } from "nuqs/server";
import { ProjectSummaryWrapper } from "~/components/project-summary-wrapper";

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
        <ProjectSummaryWrapper year={year} />
      </div>
      <DashboardPageClient />
    </>
  );
}
