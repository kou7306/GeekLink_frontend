import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function POST(request: Request) {
  // console.log("api start!!!!");
  try {
    const { user_id } = await request.json();
    // console.log("uuid::::", user_id);

    const { data, error } = await supabase.from("users").select("name").eq("user_id", user_id).single();

    // console.log("error check");

    if (error) {
      throw new Error(error.message);
    }

    // console.log("data.name::::", data.name);
    const exists = data.name !== null;

    return NextResponse.json({ exists });
  } catch (error: any) {
    return NextResponse.json({ exists: false, error: error.message });
  }
}
