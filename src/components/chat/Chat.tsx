"use client";
import { useEffect, useRef, useState } from "react";
import { getMessageData } from "../../utils/getMessageData";
import { Message } from "../../utils/getMessageData";

const Chat = ({ params }: { params: any }) => {
  const conversationId = params.conversationId;
  // メッセージデータの管理
  const [messages, setMessages] = useState<Message[]>([]);
  // 過去のメッセージデータを取得
  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = await getMessageData(conversationId);
      setMessages(fetchedMessages);
    };

    fetchMessages();
  }, [conversationId]);

  // WebSocket通信
  const socketRef = useRef<WebSocket>();
  const [isConnected, setIsConnected] = useState(false);
  const [socketData, setSocketData] = useState("");

  // 送信ボタンで発火
  const sendData = (event: any) => {
    event.preventDefault();
    const formMessage = event.target[0].value;
    const message: Message = {
      sender_id: "1",
      receiver_id: "2",
      content: formMessage,
      created_at: new Date(),
      conversation_id: conversationId,
    };

    console.log("Sending message: ", message);
    // 入力フィールドを空にする
    setSocketData("");

    // メッセージオブジェクトをJSON文字列に変換して送信
    socketRef.current?.send(JSON.stringify(message));
  };

  useEffect(() => {
    socketRef.current = new WebSocket(
      "ws://localhost:8080/ws/" + conversationId
    );
    socketRef.current.onopen = function () {
      setIsConnected(true);
      console.log("Connected");
    };

    socketRef.current.onclose = function () {
      console.log("closed");
      setIsConnected(false);
    };

    // server 側から送られてきたデータを受け取る
    socketRef.current.onmessage = function (event) {
      console.log("Message received: ", event.data);
      const newMessage: Message = JSON.parse(event.data); // JSONをパースしてMessage型に変換
      setMessages((prevMessages) => [newMessage, ...prevMessages]); // 新しいメッセージを先頭に追加
    };

    return () => {
      if (socketRef.current == null) {
        return;
      }
      socketRef.current.close();
    };
  }, []);

  return (
    <>
      <h1>WebSocket is connected : {`${isConnected}`}</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <p>{message.content}</p>
            <p>
              <small>{new Date(message.created_at).toLocaleString()}</small>
            </p>
          </li>
        ))}
      </ul>

      <form onSubmit={sendData}>
        <input
          type="text"
          name="socketData"
          value={socketData}
          onChange={(e) => setSocketData(e.target.value)}
        />
        <button type="submit">Server に送信</button>
      </form>
    </>
  );
};

export default Chat;
