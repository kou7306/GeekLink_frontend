// // src/app/api/user/update/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

// export async function POST(req: NextRequest) {
//   try {
//     const { user_id, ...profileData } = await req.json();

//     const { data, error } = await supabase
//       .from('users')
//       .update(profileData)
//       .eq('user_id', user_id);

//     if (error) {
//       console.error(error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     return NextResponse.json({ message: 'Profile updated successfully', data }, { status: 200 });
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
