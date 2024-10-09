import { useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import { getUuidFromCookie } from "@/actions/users";
import { getMessageAndRoomData } from "@/utils/getMessageAndRoomData";
import socketIOClient from "socket.io-client";
import MessageComponent from "./MessageComponent";
import { Message } from "../../types/message";
import { Socket } from "socket.io-client";

const Chat = ({ params }: { params: any }) => {
  const [uuid, setUuid] = useState<string>("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
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
      setRoomId(roomId);
      setMessages(messages);
    };

    fetchMessages();
  }, [uuid, partnerId]);

  // socket通信を行う
  const socketRef = useRef<Socket | null>(null);
  const [socketData, setSocketData] = useState("");
  useEffect(() => {
    if (!apiUrl) return;
    socketRef.current = socketIOClient(`${apiUrl}/ws/chat`);

    socketRef.current.on("connect", () => {
      socketRef.current?.emit("joinRoom", roomId); // ルームに参加する
    });

    socketRef.current.on("message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId, apiUrl]);

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
        {messages.map((message) => (
          <MessageComponent key={message.id} message={message} uuid={uuid} />
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
        <button type="submit" className="ml-2 pb-3 bg-accent text-white rounded-lg p-2">
          <MdSend className="h-5 w-5 ml-1 mt-1" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
