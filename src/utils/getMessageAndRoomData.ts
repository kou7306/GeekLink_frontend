import { Message } from "../types/message";
// メッセージを取得してソートする関数
export const getMessageAndRoomData = async (
  uuid: string,
  partnerId: string
): Promise<{ roomId: string; messages: Message[] }> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // APIからデータを取得
    const response = await fetch(
      `${apiUrl}/user/get-messages?uuid=${uuid}&&partnerId=${partnerId}`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    // レスポンスをJSONとしてパース
    const { roomId, messages }: { roomId: string; messages: Message[] } =
      await response.json();

    // created_atをDate型に変換
    messages.forEach((message) => {
      message.created_at = new Date(message.created_at);
    });

    // タイムスタンプでソート (古い順)
    messages.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());

    return { roomId, messages };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { roomId: "", messages: [] };
  }
};
