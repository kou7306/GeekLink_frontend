import { getUuidFromCookie } from "@/actions/users";

// アイテムを購入する
export async function buyItem(item: string, coin: string): Promise<any> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const uuid = await getUuidFromCookie();

  const response = await fetch(`${apiUrl}/rpg/item`, {
    method: "POSt",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uuid,
      item,
      coin,
    }),
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return await response.json();
}
