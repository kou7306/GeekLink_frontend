import { getUuidFromCookie } from "@/actions/users";

export interface User {
  id: string;
  name: string;
  img_url: string;
  language: string;
  age: number;
  gender: string;
}

// ログインしてるユーザーとマッチングしているユーザー一覧を取得する関数
export const getMatchingUser = async (): Promise<User[]> => {
  try {
    const uuid = getUuidFromCookie();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // APIからデータを取得
    const response = await fetch(`${apiUrl}/getMatchingUser`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid }),
    });
    // レスポンスをJSONとしてパース
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};
