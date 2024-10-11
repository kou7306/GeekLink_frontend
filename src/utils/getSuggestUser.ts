import { getUuidFromCookie } from "@/actions/users";
import { Profile } from "@/types/user";

interface UsersResponse {
  samePlaceUsers: Profile[];
  sameAgeUsers: Profile[];
  sameGraduateYearUsers: Profile[];
  sameJobTypeUsers: Profile[];
  sameTopTechUsers: Profile[];
  sortedUsers: { user: Profile; score: number }[];
}

// ログインしてるユーザーとマッチングしているユーザー一覧を取得する関数
export const getSuggestUser = async (): Promise<UsersResponse | null> => {
  try {
    const uuid = await getUuidFromCookie();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // APIからデータを取得
    const response = await fetch(`${apiUrl}/suggest/all?uuid=${uuid}`, {
      next: { revalidate: 3600 * 24 },
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // レスポンスをJSONとしてパース
    const data: UsersResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return null;
  }
};
