"use client";

import { DashboardOverview } from "~/components/overview";

export default function DashboardPageClient() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <div className="flex flex-1">
        <main className="flex-1 overflow-auto p-6">
          {<DashboardOverview />}
        </main>
      </div>
    </div>
  );
}
