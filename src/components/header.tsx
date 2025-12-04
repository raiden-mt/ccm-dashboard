import Image from "next/image";
import YearSelector from "./year-selector";

export function DashboardHeader() {
  const years = [2020, 2021, 2022, 2023, 2024, 2025];

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
          <YearSelector currentYear={2025} years={years} />
        </div>
      </div>
    </header>
  );
}
