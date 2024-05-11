"use server";

import { getSupabaseAuth } from "../lib/auth";
import { Provider } from "@supabase/supabase-js";

export const loginAction = async (provider: Provider) => {
  try {
    const { data, error } = await getSupabaseAuth().signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`,
      },
    });

    if (error) throw error;

    return { errorMessage: null, url: data.url };
  } catch (error) {
    return { errorMessage: "ログインに失敗しました" };
  }
};

export const signOutAction = async () => {
  try {
    const { error } = await getSupabaseAuth().signOut();
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: "サインアウトに失敗しました" };
  }
};

export const signInAction = async (email: string, password: string) => {
  try {
    const { error } = await getSupabaseAuth().signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { errorMessage: null };
  } catch (error: any) {
    if (error.status === 400) {
      return { errorMessage: "無効なログイン情報です。メールアドレスとパスワードを確認してください。" };
    }
    console.log(error);
    return { errorMessage: "サインインに失敗しました" };
  }
};

export const signUpAction = async (email: string, password: string) => {
  try {
    const { error } = await getSupabaseAuth().signUp({
      email,
      password,
    });
    if (error) throw error;
    return { errorMessage: null };
  } catch (error: any) {
    if (error.status === 429 && error.code === "over_email_send_rate_limit") {
      return { errorMessage: "リクエストの上限に達しました。しばらくしてから再度お試しください。" };
    }
    console.log(error);
    return { errorMessage: "サインアップに失敗しました" };
  }
};
