export const getLoginBonus = async (uuid: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${apiUrl}/login-bonus/${uuid}`, {
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
};
