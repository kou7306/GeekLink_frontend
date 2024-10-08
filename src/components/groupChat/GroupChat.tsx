"use client";
import { use, useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import { getUuidFromCookie } from "@/actions/users";
import { getMessageData } from "@/utils/getMessageData";
import { Message } from "../../../types/message";
import { Group, getGroupMembers } from "@/utils/getGroupMembers";
import { Socket } from "socket.io-client";
import socketIOClient from "socket.io-client";
import SubHeader from "./SubHeader";
import { User } from "../profile/options";
import { Snackbar, Alert, Avatar } from "@mui/material";
import Link from "next/link";

const GroupChat = ({ params }: { params: any }) => {
  const [uuid, setUuid] = useState<string>("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      const uuid = await getUuidFromCookie();
      if (uuid) {
        setUuid(uuid);
      }
    };

    fetchUsers();
  }, []);

  const groupId = params.groupId;

  const [messages, setMessages] = useState<Message[]>([]);
  const [groupData, setGroupData] = useState<Group>({
    id: "",
    owner_id: "",
    member_ids: [],
    name: "",
    description: "",
  });
  const [members, setMembers] = useState<User[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // メッセージを取得してソートする
  useEffect(() => {
    const fetchMessages = async () => {
      const { messages } = await getMessageData(groupId);
      console.log(messages);
      setMessages(messages);
    };

    fetchMessages();
  }, [uuid, groupId]);

  // グループメンバーを取得する
  useEffect(() => {
    const fetchMembers = async () => {
      const { group, members } = await getGroupMembers(groupId);
      setGroupData(group);
      setMembers(members);
      console.log("groupData", group?.member_ids);
      console.log("members", members);
    };

    fetchMembers();
  }, [apiUrl, groupId]);

  // socket通信を行う
  const socketRef = useRef<Socket | null>(null);
  const [socketData, setSocketData] = useState("");

  useEffect(() => {
    socketRef.current = socketIOClient(`${apiUrl}/ws/group-chat`);

    socketRef.current.on("connect", () => {
      console.log("Connected to /group-chat namespace");
      socketRef.current?.emit("joinRoom", groupId); // ルームに参加する
    });

    socketRef.current.on("message", (message: Message) => {
      console.log("Received message from server:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [groupId, apiUrl]);

  const sendData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formMessage = socketData.trim();
    if (!formMessage) return;

    const message: Message = {
      sender_id: uuid,
      receiver_id: groupId,
      content: formMessage,
      created_at: new Date(),
      room_id: groupId,
    };

    socketRef.current?.emit("message", message);
    setSocketData("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputFocus = () => {
    if (!groupData.member_ids.includes(uuid) && groupData.owner_id !== uuid) {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <SubHeader
        params={params}
        groupData={groupData}
        setGroupData={setGroupData}
        members={members}
        setMembers={setMembers}
      />
      <div className="bg-secondary px-4 py-10 sm:px-6 lg:px-8 h-[100vh] overflow-y-auto overflow-x-hidden z-10">
        <ul>
          {messages.map((message, index) => {
            // message.sender_idに対応するメンバーを見つける
            const member = members?.find(
              (m) => m.user_id === message.sender_id
            );
            return (
              <div key={index} className={`my-2 ml-5 flex items-start`}>
                <Link
                  href={
                    member?.user_id === uuid
                      ? "/my-page"
                      : `/my-page/${member?.user_id}`
                  }
                >
                  <Avatar
                    alt={member?.name || "Unknown"}
                    src={member?.image_url || "/img/default_icon.png"}
                    className="mr-2"
                  />
                </Link>
                <li className="inline-block">
                  <p className="text-md font-bold mb-1">
                    {member?.name || "Unknown"}
                  </p>
                  <div>
                    <p>{message.content}</p>
                  </div>
                  <p className="text-sm text-secondary">
                    {new Date(message.created_at).toLocaleString()}
                  </p>
                </li>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </ul>
        <form
          onSubmit={sendData}
          className="fixed bottom-0 w-full p-2 bg-secondary z-99 flex justify-center items-center"
        >
          <input
            className="w-3/5 bg-primary rounded-xl px-2 py-3 border-0 active:border-2 active:border-accent leading-tight"
            type="text"
            name="socketData"
            value={socketData}
            placeholder="メッセージを入力"
            onChange={(e) => setSocketData(e.target.value)}
            onClick={handleInputFocus}
            onFocus={handleInputFocus}
          />
          <button
            type="submit"
            className="ml-2 pb-3 bg-accent text-white rounded-lg p-2"
            disabled={
              groupData &&
              !groupData.member_ids?.includes(uuid) &&
              groupData.owner_id !== uuid
            }
          >
            <MdSend className="h-5 w-5 ml-1 mt-1" />
          </button>
        </form>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={null}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="warning"
          sx={{ width: "100%" }}
        >
          コメントするにはメンバーになる必要があります
        </Alert>
      </Snackbar>
    </>
  );
};

export default GroupChat;
