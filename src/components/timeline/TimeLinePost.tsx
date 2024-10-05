"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Post, Reaction } from "../../../types/timeline";
import { sendReaction } from "../../utils/actionPost";

interface TimeLinePostProps {
  post: Post;
  isOwnPost: boolean;
  uuid: string | null;
}

const emojis = ["👍", "❤️"]; // Example emojis

const TimeLinePost: React.FC<TimeLinePostProps> = ({
  post,
  isOwnPost,
  uuid,
}) => {
  const [selectedReactions, setSelectedReactions] = useState<Set<string>>(
    new Set<string>()
  );
  const [reactionCounts, setReactionCounts] = useState<{
    [emoji: string]: number;
  }>({});

  useEffect(() => {
    // Initialize reaction counts and selected reactions
    const counts: { [emoji: string]: number } = {};
    const selected = new Set<string>();
    post.reactions.forEach((reaction) => {
      counts[reaction.emoji] = (counts[reaction.emoji] || 0) + 1;
      if (reaction.userId === uuid) {
        selected.add(reaction.emoji);
      }
    });
    setReactionCounts(counts);
    setSelectedReactions(selected);
  }, [post.reactions]);

  const handleReaction = async (postId: string, emoji: string) => {
    if (isOwnPost) {
      console.log("自分の投稿にはリアクションできません");
      return;
    }
    if (uuid == undefined) {
      return;
    }

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
      await sendReaction(postId, uuid, emoji);
    } catch (error) {
      console.error("Failed to send reaction", error);
      // Revert optimistic update on error
      setSelectedReactions((prev) => {
        const newSet = new Set(prev);
        isAdding ? newSet.delete(emoji) : newSet.add(emoji);
        return newSet;
      });
      setReactionCounts((prev) => ({
        ...prev,
        [emoji]: Math.max(0, (prev[emoji] || 0) + (isAdding ? -1 : 1)),
      }));
    }
  };

  return (
    <div key={post.id} className="border rounded-lg p-4 shadow">
      <div className="flex items-start">
        <div>
          <div className="flex items-center">
            <span className="font-semibold">User</span>
            <span className="text-gray-500 ml-2">·</span>
            <span className="text-gray-500 ml-2">
              {format(new Date(post.timestamp), "M月d日 HH:mm", { locale: ja })}
            </span>
          </div>
          <h2 className="font-bold mt-2">{post.title}</h2>
          <p className="mt-1 text-gray-700">{post.comment}</p>
          <p className="mt-1 text-gray-500 text-sm">やった時間: {post.time}</p>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleReaction(post.id, emoji)}
            disabled={isOwnPost}
            className={`text-xl ${
              isOwnPost
                ? "text-gray-300 cursor-not-allowed"
                : selectedReactions.has(emoji)
                ? "text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            {emoji} {reactionCounts[emoji] || 0}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeLinePost;
