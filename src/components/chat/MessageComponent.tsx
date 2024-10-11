import React, { useState, useEffect } from "react";
import { Message } from "../../types/message";

interface MessageProps {
  message: Message;
  uuid: string;
}

const MessageComponent: React.FC<MessageProps> = ({ message, uuid }) => {
  return (
    <div
      className={`my-2 ${
        message.sender_id === uuid ? "text-right mr-5" : "ml-5"
      }`}
    >
      <div className="inline-block">
        <p
          className={`relative px-4 py-1 rounded-full ${
            message.sender_id === uuid ? "bg-primary" : "bg-base-sub shadow"
          }`}
        >
          {message.content}
        </p>
      </div>
      <p className="text-sm text-sub_text mt-2">
        {new Date(message.created_at).toLocaleString()}
      </p>
    </div>
  );
};

export default MessageComponent;
