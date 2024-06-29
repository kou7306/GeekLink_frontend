"use server";

import { CookieOptions } from "@supabase/ssr";
import { getSupabaseAuth } from "../lib/auth";
import { Provider } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Cookieの設定オプション
const cookieOptions: CookieOptions = {
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

// UUIDをクッキーに保存する関数
const setUuidCookie = (uuid: string) => {
  const cookieStore = cookies();
  cookieStore.set({ name: "user_uuid", value: uuid, ...cookieOptions });
};

// UUIDをクッキーから取得する関数
export const getUuidFromCookie = () => {
  const cookieStore = cookies();
  return cookieStore.get("user_uuid")?.value;
};

export const loginAction = async (provider: Provider) => {
  try {
    const { data, error } = await getSupabaseAuth().signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/auth/exchange-code`,
      },
    });

    if (error) throw error;

    const user = await getSupabaseAuth().getUser();
    if (user.data.user) {
      setUuidCookie(user.data.user.id);
    }

    return { errorMessage: null, url: data.url };
  } catch (error) {
    return { errorMessage: "ログインに失敗しました" };
  }
};

export const signOutAction = async () => {
  try {
    const { error } = await getSupabaseAuth().signOut();
    if (error) throw error;

    const cookieStore = cookies();
    cookieStore.set({ name: "user_uuid", value: "", ...cookieOptions });

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: "サインアウトに失敗しました" };
  }
};

export const signInAction = async (email: string, password: string) => {
  try {
    const { data, error } = await getSupabaseAuth().signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    if (data.user) {
      setUuidCookie(data.user.id);
    }

    return { errorMessage: null };
  } catch (error: any) {
    if (error.status === 400) {
      return {
        errorMessage: "無効なログイン情報です。メールアドレスとパスワードを確認してください。",
      };
    }
    return { errorMessage: "サインインに失敗しました" };
  }
};

export const signUpAction = async (email: string, password: string) => {
  try {
    const { data, error } = await getSupabaseAuth().signUp({
      email,
      password,
    });
    if (error) throw error;

    if (data.user) {
      setUuidCookie(data.user.id);
    }

    return { errorMessage: null };
  } catch (error: any) {
    if (error.status === 429 && error.code === "over_email_send_rate_limit") {
      return {
        errorMessage: "リクエストの上限に達しました。しばらくしてから再度お試しください。",
      };
    }
    return { errorMessage: "サインアップに失敗しました" };
  }
};
