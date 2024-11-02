import { getUuidFromCookie } from "@/actions/users";

// ユーザーデータを取得
export async function getUserData(): Promise<any> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const uuid = await getUuidFromCookie();

  const response = await fetch(`${apiUrl}/user/get-user-data?uuid=${uuid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return await response.json();
}
