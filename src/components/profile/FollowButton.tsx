import React, { useState, useEffect } from 'react';
import { addFollowID, deleteFollowID } from "@/utils/addFollow";
import axios from 'axios';

interface FollowButtonProps {
  userId: string;
  isMe: boolean;
  myID: string;
}

interface FollowCheckResponse {
  message: string;
  data: boolean;
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId, isMe, myID }) => {
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [hoverText, setHoverText] = useState<string>("フォロー中");

  useEffect(() => {
    if (myID && !isMe) {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/profile/follow-status`, {
          myID,
          uuid: userId, // Assuming userId is the target UUID
        })
        .then((response: { data: FollowCheckResponse }) => {
          setIsFollowed(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching follow status:", error);
        });
    }
  }, [myID, userId, isMe]);

  if (isMe) return null;

  return (
    <button
      className={`rounded-full p-1.5 border-2 mt-2 my-4 w-32 ${
        isFollowed
          ? "bg-white text-black border-gray-600 hover:border-red-500 hover:text-red-500"
          : "bg-base text-white border-black"
      }`}
      onClick={() => {
        if (!isFollowed) {
          addFollowID(userId);
          setIsFollowed(true);
        } else {
          deleteFollowID(userId);
          setIsFollowed(false);
        }
      }}
      onMouseEnter={() => {
        if (isFollowed) setHoverText("フォロー解除");
      }}
      onMouseLeave={() => {
        if (isFollowed) setHoverText("フォロー中");
      }}
    >
      <span
        className={`text-sm font-semibold tracking-wider ${
          isFollowed ? "" : "text-white"
        }`}
      >
        {!isFollowed ? "フォロー" : hoverText}
      </span>
    </button>
  );
};

export default FollowButton;