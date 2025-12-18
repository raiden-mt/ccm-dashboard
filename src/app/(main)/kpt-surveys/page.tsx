import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/services/supabase/lib/getCurrentUser";
import { SurveysSection } from "~/components/surveys-section";

export default async function KPTSurveysPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="bg-background p-2 md:p-4">
      <SurveysSection type="kpt" />
    </div>
  );
}

