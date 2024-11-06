import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { store } from "@/app/store";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const path = new URL(request.url).pathname;

  // Redux ストアからログイン状態を取得
  const state = store.getState();
  const userLoggedIn = state.auth.isLoggedIn;

  let user;

  if (!userLoggedIn) {
    user = await getUser(request, response);
    console.log("userNotRedux");
  }

  // Reduxにログイン状態をディスパッチ
  if (user) {
    store.dispatch({ type: "auth/login", payload: user });
  } else {
    user = state.auth.user;
    console.log("userRedux");
  }

  // ユーザーがログインしていない場合、特定のパスでリダイレクト
  if (
    (path === "/" ||
      path === "/protected-route" ||
      path === "/conversation" ||
      path === "/fetch" ||
      path === "/my-page" ||
      path === "/random-match" ||
      path === "/profile-initialization") &&
    !user // ユーザーが取得できない、またはログインしていない場合
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

async function getUser(request: NextRequest, response: NextResponse) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  return (await supabase.auth.getUser()).data.user; // ユーザー情報を取得
}
