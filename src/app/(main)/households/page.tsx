import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/services/supabase/lib/getCurrentUser";
import { HouseholdsSection } from "~/components/households-section";

import { exampleFlag } from "~/lib/flags";

export default async function HouseholdsPage() {
  const user = await getCurrentUser();
  const example = await exampleFlag();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="bg-background p-2 md:p-4">
      <div>{example ? "Flag is on" : "Flag is off"}</div>
      <HouseholdsSection />
    </div>
  );
}
