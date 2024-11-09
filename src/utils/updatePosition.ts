import { getUuidFromCookie } from "@/actions/users";

// ライフの数を更新
export async function updatePosition(x: string, y: string): Promise<any> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const uuid = await getUuidFromCookie();

  const response = await fetch(`${apiUrl}/rpg/position/${uuid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({ positionX: x, positionY: y }),
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return await response.json();
}
