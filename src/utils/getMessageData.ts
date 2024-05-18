// メッセージデータの型を定義
export interface Message {
  id?: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: Date; // Date 型に変更
  conversation_id: string;
}

// メッセージを取得してソートする関数
export const getMessageData = async (
  conversationId: string
): Promise<Message[]> => {
  try {
    // APIからデータを取得
    const response = await fetch(
      `http://localhost:8080/getMessage/${conversationId}`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    console.log(response);
    // レスポンスをJSONとしてパース
    const data: Message[] = await response.json();
    console.log(data);
    // created_atをDate型に変換
    data.forEach((message) => {
      message.created_at = new Date(message.created_at);
    });

    // タイムスタンプでソート (新しい順)
    data.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());

    return data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};