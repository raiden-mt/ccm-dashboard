import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/services/supabase/lib/getCurrentUser";
import { LocalAuthorities } from "~/components/local-authorities";

export default async function LocalAuthoritiesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="bg-background p-2 md:p-4">
      <LocalAuthorities />
    </div>
  );
}

