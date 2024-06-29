import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const getSupabase = () => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or key is undefined.");
  }

  return createClient(supabaseUrl, supabaseKey);
};
