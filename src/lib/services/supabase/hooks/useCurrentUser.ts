import { useEffect, useState } from "react";
import { createClient } from "../client";
import type { User } from "@supabase/supabase-js";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setIsLoading(false);
    }

    void fetchUser();
    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return { user, isLoading };
}
