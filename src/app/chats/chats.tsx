"use client";
import { MessageInput } from "../../components/message/MessageInput";
import { MessageList } from "../../components/message/MessageList";
import { RecoilRoot } from "recoil";

export const Chats = () => {
  return (
    <RecoilRoot>
      <div>
        <h1>Simple Chat</h1>
        <MessageInput />
        <MessageList />
      </div>
    </RecoilRoot>
  );
};
