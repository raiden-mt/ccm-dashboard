import type { ReadonlyRequestCookies } from "flags";
import { flag, dedupe } from "flags/next";
import { env } from "~/env";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "./services/supabase/database";

interface Entities {
  user?: { id: string; email?: string };
}

const identity = dedupe(
  async ({
    cookies: requestCookies,
  }: {
    cookies: ReadonlyRequestCookies;
  }): Promise<Entities> => {
    // Create Supabase client to read auth session from cookies
    const cookieStore = await cookies();
    const supabase = createServerClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
        },
      },
    );

    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
      return {};
    }

    return {
      user: {
        id: user.id,
        email: user.email,
      },
    };
  },
);
