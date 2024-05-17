// supabase.ts

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export const getSupabase = () => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or key is undefined.");
  }

  return createClient(supabaseUrl, supabaseKey);
};
