import Image from "next/image";
import YearSelector from "./year-selector";
import { createAdminClient } from "~/lib/services/supabase/server";
import { AlertCircle } from "lucide-react";
import { getCurrentUser } from "~/lib/services/supabase/lib/getCurrentUser";
import { LogoutButton } from "~/lib/services/supabase/components/logout-button";
import { SidebarHeaderTrigger } from "./sidebar-header-trigger";

export async function DashboardHeader() {
  const [result, user] = await Promise.all([getYears(), getCurrentUser()]);

  return (
    <header className="border-border bg-primary border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="CCM Logo" width={40} height={40} />
          <div>
            <h1 className="text-primary-foreground hidden text-xl font-semibold md:block">
              Changu Changu Moto
            </h1>
            <h1 className="text-primary-foreground block text-xl font-semibold md:hidden">
              CCM
            </h1>
            <p className="text-primary-foreground/80 hidden text-sm md:block">
              Providing a handup not a handout
            </p>
          </div>
        </div>
        {user && (
          <div className="flex items-center gap-3">
            <SidebarHeaderTrigger />
            {result.error ? (
              <p className="text-red-500">
                <AlertCircle />
              </p>
            ) : (
              <YearSelector years={result.years} />
            )}
            <LogoutButton />
          </div>
        )}
      </div>
    </header>
  );
}

async function getYears(): Promise<
  { error: true; message: string } | { error: false; years: number[] }
> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("householders")
    .select("stove_build_date")
    .order("stove_build_date", { ascending: true })
    .limit(1);

  if (error || !data || data.length === 0) {
    return { error: true, message: "Failed to get years from supabase" };
  }

  const oldestYear = data[0]?.stove_build_date
    ? new Date(data[0].stove_build_date).getFullYear()
    : undefined;

  if (!oldestYear) {
    return { error: true, message: "No valid years found" };
  }

  return {
    error: false,
    years: createYearArray(oldestYear, new Date().getFullYear()),
  };
}

function createYearArray(oldestYear: number, currentYear: number) {
  return Array.from(
    { length: currentYear - oldestYear + 1 },
    (_, index) => oldestYear + index,
  );
}
