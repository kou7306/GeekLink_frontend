import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Post } from "../../../types/post";
import { sendReaction, getPosts } from "../../utils/actionPost";

interface TimeLinePostProps {
  post: Post;
}

const emojis = ["👍", "❤️"]; // Example emojis
const currentUserId = "test"; // Example user ID

const TimeLinePost: React.FC<TimeLinePostProps> = ({ post }) => {
  const [selectedReactions, setSelectedReactions] = useState<Set<string>>(
    new Set<string>()
  );
  const [reactionCounts, setReactionCounts] = useState<{
    [emoji: string]: number;
  }>({});

  // Update reactions when post data changes
  useEffect(() => {
    const updateReactions = () => {
      const newSelectedReactions = new Set<string>();
      const newReactionCounts: { [emoji: string]: number } = {};

      for (const emoji of emojis) {
        const emojiReactions = post.reactions[emoji];
        if (emojiReactions) {
          const userIds = emojiReactions;
          newReactionCounts[emoji] = userIds.length;
          if (userIds.includes(currentUserId)) {
            newSelectedReactions.add(emoji);
          }
        } else {
          newReactionCounts[emoji] = 0;
        }
      }

      setSelectedReactions(newSelectedReactions);
      setReactionCounts(newReactionCounts);
    };

    updateReactions();
  }, [post]);

  const handleReaction = async (emoji: string) => {
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
      // Send reaction to the server
      await sendReaction(post.id, currentUserId, emoji);

      // Fetch the updated post data to ensure the state is correct
      const updatedPosts = await getPosts();
      const updatedPost = updatedPosts.find((p) => p.id === post.id);

      if (updatedPost) {
        // Update local state with the updated post data
        const newSelectedReactions = new Set<string>();
        const newReactionCounts: { [emoji: string]: number } = {};

        for (const emoji of emojis) {
          const emojiReactions = updatedPost.reactions[emoji];
          if (emojiReactions) {
            const userIds = emojiReactions;
            newReactionCounts[emoji] = userIds.length;
            if (userIds.includes(currentUserId)) {
              newSelectedReactions.add(emoji);
            }
          } else {
            newReactionCounts[emoji] = 0;
          }
        }

        setSelectedReactions(newSelectedReactions);
        setReactionCounts(newReactionCounts);
      }
    } catch (error) {
      console.error("Failed to send reaction", error);
      // Revert optimistic updates on error
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
    <div className="border rounded-lg p-4 shadow">
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
            onClick={() => handleReaction(emoji)}
            className={`text-xl ${
              selectedReactions.has(emoji) ? "text-blue-500" : "text-gray-500"
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
