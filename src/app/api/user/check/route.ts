// import { NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl!, supabaseKey!);

// export async function POST(request: Request) {
//   try {
//     const { user_id } = await request.json();
//     const { data, error } = await supabase.from("users").select("name").eq("user_id", user_id).single();
//     if (error) {
//       throw new Error(error.message);
//     }
//     const exists = data.name !== null;
//     return NextResponse.json({ exists });
//   } catch (error: any) {
//     return NextResponse.json({ exists: false, error: error.message });
//   }
// }
