import { getUuidFromCookie } from "@/actions/users";

// ライフの数を更新
export async function updateLife(life: string): Promise<any> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const uuid = await getUuidFromCookie();

  const response = await fetch(`${apiUrl}/life/update-life`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({ uuid: uuid, life: life }),
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return await response.json();
}
