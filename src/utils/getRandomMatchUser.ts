import { getUuidFromCookie } from "@/actions/users";

export interface User {
  user_id: string;
  name: string;
  sex: string;
  age: string;
  place: string;
  occupation: string;
  top_teches: string[];
  imageURL: string;
}

// ランダムなユーザーを取得する関数
export const getRandomUsers = async (): Promise<User[]> => {
  try {
    const uuid = await getUuidFromCookie();
    // APIからデータを取得
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/match/random-match`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid: uuid }),
    });

    // レスポンスをJSONとしてパース
    const data: User[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching random users:", error);
    return [];
  }
};
