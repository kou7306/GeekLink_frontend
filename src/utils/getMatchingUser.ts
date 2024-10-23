import { getUuidFromCookie } from "@/actions/users";

export interface User {
  user_id: string;
  name: string;
  image_url: string;
  language: string;
  age: number;
  sex: string;
}

// ログインしてるユーザーと相互フォローしているユーザー一覧を取得する関数
export const getMatchingUser = async (): Promise<User[]> => {
  try {
    const uuid = await getUuidFromCookie();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // APIからデータを取得
    const response = await fetch(`${apiUrl}/user/get-mutual-follow-users`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid }),
    });
    // レスポンスをJSONとしてパース
    const result = await response.json();
    // データが存在するかどうかを確認してから返す
    return result && Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};
