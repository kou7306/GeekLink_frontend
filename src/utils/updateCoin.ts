import { getUuidFromCookie } from "@/actions/users";

export async function updateCoin(coin: string): Promise<any> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const uuid = await getUuidFromCookie();

  const response = await fetch(`${apiUrl}/rpg/coin/${uuid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({ coin: coin }),
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return await response.json();
}
