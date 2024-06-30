import { useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import { getUuidFromCookie } from "@/actions/users";
import { getMessageAndRoomData, Message } from "@/utils/getMessageAndRoomData";
import createSocket from "@/utils/socket";
import { Socket } from "socket.io-client";
import socketIOClient from "socket.io-client";

const Chat = ({ params }: { params: any }) => {
  const [uuid, setUuid] = useState<string>("");
  useEffect(() => {
    const fetchUsers = async () => {
      const uuid = await getUuidFromCookie();
      if (uuid) {
        setUuid(uuid);
      }
    };

    fetchUsers();
  }, []);

  const partnerId = params.partnerId;

  const [roomId, setRoomId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const { roomId, messages } = await getMessageAndRoomData(uuid, partnerId);
      console.log(roomId, messages);
      setRoomId(roomId);
      setMessages(messages);
    };

    fetchMessages();
  }, [uuid, partnerId]);

  // socket通信を行う
  const socketRef = useRef<Socket | null>(null);
  const [socketData, setSocketData] = useState("");
  useEffect(() => {
    socketRef.current = socketIOClient("http://localhost:8080/ws/chat");

    socketRef.current.on("connect", () => {
      console.log("Connected to /chat namespace");
      socketRef.current?.emit("joinRoom", roomId); // ルームに参加する
    });

    socketRef.current.on("message", (message: Message) => {
      console.log("Received message from server:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId]);

  const sendData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formMessage = socketData.trim();
    if (!formMessage) return;

    const message: Message = {
      sender_id: uuid,
      receiver_id: partnerId,
      content: formMessage,
      created_at: new Date(),
      room_id: roomId,
    };

    socketRef.current?.emit("message", message);
    setSocketData("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-secondary px-4 py-10 sm:px-6 lg:px-8 h-full">
      <ul className="h-[85vh] overflow-y-auto overflow-x-hidden">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`my-2 ${
              message.sender_id === uuid ? "text-right mr-5" : "ml-5"
            }`}
          >
            <li className="inline-block">
              <div
                className={`relative px-4 py-1 rounded-full inline-block ${
                  message.sender_id === uuid ? "bg-accent" : "bg-primary shadow"
                }`}
              >
                <p>{message.content}</p>
              </div>
              <p className="text-sm text-secondary">
                {new Date(message.created_at).toLocaleString()}
              </p>
            </li>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ul>
      <form
        onSubmit={sendData}
        className="fixed bottom-0 w-4/5 p-2 bg-secondary z-99 flex justify-center items-center"
      >
        <input
          className="w-3/5 bg-primary rounded-xl px-2 py-3 border-0 active:border-2 active:border-accent leading-tight"
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
  );
};

export default Chat;
