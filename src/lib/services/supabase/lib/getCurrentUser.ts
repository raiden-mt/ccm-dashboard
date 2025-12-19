import { createClient } from "../server";

export const getCurrentUser = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
};
