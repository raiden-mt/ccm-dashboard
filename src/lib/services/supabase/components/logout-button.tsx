"use client";

import { createClient } from "~/lib/services/supabase/client";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    // `DashboardHeader` is a Server Component in a persistent layout; refresh the RSC tree
    // so auth-dependent UI updates immediately without a full page reload.
    router.refresh();
    router.push("/auth/login");
  };

  return <Button onClick={logout}>Logout</Button>;
}
