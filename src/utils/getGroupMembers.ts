// メッセージデータの型を定義
export interface Group {
  id?: string;
  owner_id: string;
  member_ids: string[];
}

// メッセージを取得してソートする関数
export const getGroupMembers = async (
  groupId: string
): Promise<{ group: Group }> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // APIからデータを取得
    const response = await fetch(
      `${apiUrl}/group/get-group-members?groupId=${groupId}`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    // レスポンスをJSONとしてパース
    const { group }: { group: Group } = await response.json();
    return { group };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { group: { owner_id: "", member_ids: [] } };
  }
};
