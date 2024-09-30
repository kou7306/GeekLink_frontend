// メッセージデータの型を定義
export interface Message {
  id?: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: Date; // Date 型に変更
  room_id: string;
}
