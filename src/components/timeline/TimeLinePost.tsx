import React, { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Post } from "../../types/post";
import { sendReaction, getPosts } from "../../utils/actionPost";

type TimeLinePostProps = {
  post: Post;
};

const emojis = ["👍", "❤️"]; // Example emojis
const currentUserId = "test"; // Example user ID

const TimeLinePost: React.FC<TimeLinePostProps> = ({ post }) => {
  const [selectedReactions, setSelectedReactions] = useState<Set<string>>(new Set<string>());
  const [reactionCounts, setReactionCounts] = useState<{
    [emoji: string]: number;
  }>({});
  // リアクションを送信する関数
  const handleReaction = async (postId: string, emoji: string) => {
    const isAdding = !selectedReactions.has(emoji);

    // Optimistic UI update
    setSelectedReactions((prev) => {
      const newSet = new Set(prev);
      isAdding ? newSet.add(emoji) : newSet.delete(emoji);
      return newSet;
    });

    setReactionCounts((prev) => ({
      ...prev,
      [emoji]: Math.max(0, (prev[emoji] || 0) + (isAdding ? 1 : -1)),
    }));

    try {
      await sendReaction(postId, currentUserId, emoji);
    } catch (error) {
      console.error("Failed to send reaction", error);
    }
  };

  return (
    <div key={post.id} className="border rounded-lg p-4 shadow">
      <div className="flex items-start">
        <div>
          <div className="flex items-center">
            <span className="font-semibold">User</span>
            <span className="text-gray-500 ml-2">{post.userid}</span>
            <span className="text-gray-500 ml-2">·</span>
            <span className="text-gray-500 ml-2">
              {format(post.timestamp, "M月d日 HH:mm", { locale: ja })}
            </span>
          </div>
          <p className="mt-2">{post.content}</p>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleReaction(post.id, emoji)}
            className={`text-xl ${selectedReactions.has(emoji) ? "text-blue-500" : "text-gray-500"}`}
          >
            {emoji} {reactionCounts[emoji] || 0}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeLinePost;
