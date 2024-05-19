import { getUuidFromCookie } from "@/actions/users";

export async function postSwipedRightUserIds(IDs: string[]): Promise<any> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const uuid = await getUuidFromCookie();

  const response = await fetch(`${apiUrl}/createlike`, {
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
