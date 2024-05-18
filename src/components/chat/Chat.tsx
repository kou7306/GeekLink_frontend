"use client";
import { useEffect, useRef, useState } from "react";
import { getMessageData } from "../../utils/getMessageData";
import { Message } from "../../utils/getMessageData";
import { MdSend } from "react-icons/md";

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
      setMessages((prevMessages) => [...prevMessages, newMessage]); // 新しいメッセージをに追加
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
      <div className="bg-primary">
        <h1>WebSocket is connected : {`${isConnected}`}</h1>
        <ul className="h-[85vh] overflow-y-auto">
          {messages.map((message, index) =>
            //TODO:message.sender_idが自分のUUIDだった場合にする
            message.sender_id === "1" ? (
              <div key={index} className="text-right mr-5 my-2">
                <li className="inline-block">
                  <div className="bg-accent relative px-3 py-1 rounded-xl inline-block">
                    <p>{message.content}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(message.created_at).toLocaleString()}
                  </p>
                </li>
              </div>
            ) : (
              <div key={index} className="ml-5 my-2">
                <li className="inline-block">
                  <div className="bg-secondary relative px-3 py-1 rounded-xl inline-block shadow">
                    <p>{message.content}</p>
                  </div>
                  <p>
                    <p className="text-sm text-gray-500">
                      {new Date(message.created_at).toLocaleString()}
                    </p>
                  </p>
                </li>
              </div>
            )
          )}
        </ul>
        <form
          onSubmit={sendData}
          className="fixed bottom-0 w-full p-4 bg-primary z-99 flex justify-center items-center"
        >
          <input
            className="w-3/5 bg-secondary rounded-xl px-2 py-3 border-0 active:border-2 active:border-accent leading-tight"
            type="text"
            name="socketData"
            value={socketData}
            placeholder="メッセージを入力"
            onChange={(e) => setSocketData(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 pb-3 bg-accent text-white rounded-lg p-2"
          >
            <MdSend className="h-5 w-5 ml-1 mt-1" />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;
