import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/services/supabase/lib/getCurrentUser";
import { NotActiveSection } from "~/components/not-active-section";

export default async function NotActivePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="bg-background p-2 md:p-4">
      <NotActiveSection />
    </div>
  );
}

