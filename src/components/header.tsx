import Image from "next/image";
import YearSelector from "./year-selector";
import { createAdminClient } from "~/lib/services/supabase/server";
import { AlertCircle } from "lucide-react";

export async function DashboardHeader() {
  const result = await getYears();

  return (
    <header className="border-border bg-primary border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="CCM Logo" width={40} height={40} />
          <div>
            <h1 className="text-primary-foreground text-xl font-semibold">
              Changu Changu Moto
            </h1>
            <p className="text-primary-foreground/80 text-sm">
              Community Conservation Malawi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {result.error ? (
            <p className="text-red-500">
              <AlertCircle />
            </p>
          ) : (
            <YearSelector years={result.years} />
          )}
        </div>
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
    return { error: true, message: "Failed to get years" };
  }

  const oldestYear = data[0]?.stove_build_date
    ? new Date(data[0].stove_build_date).getFullYear()
    : undefined;

  if (!oldestYear) {
    return { error: true, message: "Failed to get years" };
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
