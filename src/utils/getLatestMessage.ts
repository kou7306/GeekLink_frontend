import { Message } from "../types/message";
// メッセージを取得してソートする関数
export const getLatestMessage = async (
  uuid: string,
  partnerId: string
): Promise<{ message: Message }> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // APIからデータを取得
    const response = await fetch(
      `${apiUrl}/user/get-latest-messages?uuid=${uuid}&&partnerId=${partnerId}`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    // レスポンスをJSONとしてパース
    const { message }: { message: Message } = await response.json();

    return { message };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { message: {} as Message };
  }
};
