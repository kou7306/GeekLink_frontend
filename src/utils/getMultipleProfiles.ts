import { User } from "@/components/profile/options";

//uuidからユーザーのプロフィールを取得する関数
export async function getMultipleProfiles(uuids: string[]): Promise<User[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const requests = uuids.map((uuid) =>
      fetch(`${apiUrl}/profile/get-profile/${uuid}`, {
        next: { revalidate: 3600 }, // 1時間ごとに再検証
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
    );
    const responses = await Promise.all(requests);

    const profiles: User[] = responses.map((data) => data);

    return profiles;
  } catch (error) {
    console.error("Error fetching multiple profiles:", error);
    return [];
  }
}
