import { getUuidFromCookie } from "@/actions/users";

export async function getLoginBonus(): Promise<any> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const uuid = await getUuidFromCookie();
  console.log("getLoginBonus -> uuid", uuid);
  const response = await fetch(`${apiUrl}/user/get-login-bonus?uuid=${uuid}`, {
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
