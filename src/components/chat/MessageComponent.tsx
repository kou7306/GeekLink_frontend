import React, { useState, useEffect } from "react";
import { Message } from "../../../types/message";

interface MessageProps {
  message: Message;
  uuid: string;
}

const mockReactions = [{ id: 1, reaction: "👍", count: 5 }];

const MessageComponent: React.FC<MessageProps> = ({ message, uuid }) => {
  const [reactions, setReactions] = useState<
    { reaction: string; count: number; id: number }[]
  >([]);

  useEffect(() => {
    fetchReactions();
  }, []);

  const fetchReactions = async () => {
    // Mocking an API call with a timeout
    setTimeout(() => {
      setReactions(mockReactions);
    }, 500);
  };

  const addReaction = async (reaction: string) => {
    // Mocking an API call with a timeout
    setTimeout(() => {
      setReactions((prevReactions) => {
        const existingReaction = prevReactions.find(
          (r) => r.reaction === reaction
        );
        if (existingReaction) {
          return prevReactions.map((r) =>
            r.reaction === reaction ? { ...r, count: r.count + 1 } : r
          );
        } else {
          return [
            ...prevReactions,
            { reaction, count: 1, id: prevReactions.length + 1 },
          ];
        }
      });
    }, 500);
  };

  return (
    <div
      className={`my-2 ${
        message.sender_id === uuid ? "text-right mr-5" : "ml-5"
      }`}
    >
      <div className="inline-block">
        <p
          className={`relative px-4 py-1 rounded-full ${
            message.sender_id === uuid ? "bg-accent" : "bg-primary shadow"
          }`}
        >
          {message.content}
        </p>

        <div className="flex mt-1">
          {reactions.map((reaction) => (
            <span key={reaction.id} className="mr-2">
              <button onClick={() => addReaction("👍")}>👍</button>
              {reaction.count}
            </span>
          ))}
        </div>
      </div>
      <p className="text-sm text-secondary">
        {new Date(message.created_at).toLocaleString()}
      </p>
    </div>
  );
};

export default MessageComponent;
