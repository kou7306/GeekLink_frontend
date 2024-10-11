"use client";
import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Post } from "../../types/timeline";
import { sendReaction } from "../../utils/actionPost";
import { Link } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface TimeLinePostProps {
  post: Post;
  isOwnPost: boolean;
  uuid: string | null;
}

const emojis = ["👍", "❤️", "🎉", "😢"]; // Example emojis

const TimeLinePost: React.FC<TimeLinePostProps> = ({ post, uuid }) => {
  const [selectedReactions, setSelectedReactions] = useState<Set<string>>(
    new Set<string>()
  );
  const [reactionCounts, setReactionCounts] = useState<{
    [emoji: string]: number;
  }>({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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

  const handleAddNewReaction = async (postId: string, emoji: string) => {
    // Function to handle adding a new reaction
    if (uuid === null) return;

    setSelectedReactions((prev) => new Set(prev).add(emoji));
    setReactionCounts((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1,
    }));

    try {
      await sendReaction(postId, uuid, emoji);
    } catch (error) {
      console.error("Failed to send new reaction", error);
      // Revert optimistic update on error
      setSelectedReactions((prev) => {
        const newSet = new Set(prev);
        newSet.delete(emoji);
        return newSet;
      });
      setReactionCounts((prev) => ({
        ...prev,
        [emoji]: Math.max(0, (prev[emoji] || 0) - 1),
      }));
    }
  };

  const handleEmojiPickerToggle = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiSelect = (emoji: string) => {
    handleAddNewReaction(post.id, emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div key={post.id} className="rounded-lg p-4 shadow bg-sub_base">
      <div className="flex items-start">
        <div>
          <div className="flex items-center">
            <Link
              href={`/my-page/${post.userId}`}
              underline="none"
              sx={{ color: "text.secondary" }}
            >
              <span className="font-semibold">{post.user_name}</span>
            </Link>

            <span className="text-sub_text ml-2">
              {format(new Date(post.timestamp), "M月d日 HH:mm", {
                locale: ja,
              })}
            </span>
          </div>
          <h2 className="font-bold mt-2">{post.title}</h2>
          <p className="mt-1 text-text">{post.comment}</p>
          <p className="mt-1 text-sub_text text-sm">やった時間: {post.time}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <button
          onClick={handleEmojiPickerToggle}
          className="flex items-center justify-center"
        >
          <AddCircleIcon
            sx={{
              color: "secondary.main", // 色を青に設定
              fontSize: 28, // フォントサイズを30に設定
            }}
          />
        </button>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="bg-hover border rounded shadow-lg p-2">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleEmojiSelect(emoji)}
                className="text-xl m-1"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {/* Reaction Buttons (Hide if count is 0) */}
        {emojis.map((emoji) => {
          const hasReaction = reactionCounts[emoji] > 0;
          return (
            hasReaction && (
              <button
                key={emoji}
                onClick={() => handleReaction(post.id, emoji)}
                className={`text-xl ${
                  hasReaction
                    ? "text-blue-500"
                    : "text-gray-500 hover:text-blue-500"
                }`}
              >
                {emoji} {reactionCounts[emoji]}
              </button>
            )
          );
        })}
      </div>
    </div>
  );
};

export default TimeLinePost;
