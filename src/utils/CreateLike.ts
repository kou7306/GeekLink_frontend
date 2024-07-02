import { getUuidFromCookie } from "@/actions/users";

// ランダムマッチからいいねを送る場合
export async function postSwipedRightUserIds(IDs: string[]): Promise<any> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const uuid = await getUuidFromCookie();

  const response = await fetch(`${apiUrl}/likes/create-like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({
      IDs: IDs,
      uuid: uuid,
    }),
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return await response.json();
}

// ユーザーページからいいねを送る場合
export async function PostLikeID(ID: string): Promise<any> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const uuid = await getUuidFromCookie();

  const response = await fetch(`${apiUrl}/likes/create-like-one`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({
      uuid: uuid,
      ID: ID,
    }),
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return await response.json();
}