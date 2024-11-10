// メッセージデータの型を定義
export interface Group {
  id?: string;
  owner_id: string;
  member_ids: string[];
}

export const addGroupMember = async (
  groupId: string,
  uuid: string
): Promise<{ message: string }> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // APIからデータを取得
    const response = await fetch(
      `${apiUrl}/group/add-group-members?groupId=${groupId}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ groupId, uuid }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // レスポンスをJSONとしてパース
    const data = await response.json();
    return data; // { message: "success" } を返す
  } catch (error) {
    console.error("Error adding group member:", error);
    return { message: "Error adding group member" };
  }
};
