import { Message } from "../types/message";

// メッセージを取得してソートする関数
export const getMessageData = async (groupId: string): Promise<{ messages: Message[] }> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // APIからデータを取得
    const response = await fetch(`${apiUrl}/group/get-group-messages?groupId=${groupId}`, {
      method: "GET",
      mode: "cors",
    });
    // レスポンスをJSONとしてパース
    const { messages }: { messages: Message[] } = await response.json();
    // メッセージが空の場合、そのまま返す
    if (messages.length === 0) {
      return { messages };
    } else {
      // created_atをDate型に変換
      messages.forEach((message) => {
        message.created_at = new Date(message.created_at);
      });

      // タイムスタンプでソート (古い順)
      messages.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());

      return { messages };
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { messages: [] };
  }
};
