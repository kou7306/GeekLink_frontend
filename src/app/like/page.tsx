"use client";
import React, { useState } from "react";
import LikedUsers from "./components/LikedUsers.tsx/page";
import MatchingUsers from "./components/MatchingUsers.tsx/page";

const Page = () => {
  const [activeTab, setActiveTab] = useState("liked");

  return (
    <div className="text-center p-5">
      <h1 className="text-2xl font-bold">いいね</h1>
      <div className="flex justify-center mt-10">
        <button
          className={`px-4 py-2 ${activeTab === "liked" ? "font-bold text-accent" : ""}`}
          onClick={() => setActiveTab("liked")}
        >
          いいねされた人
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "matching" ? "font-bold text-accent" : ""}`}
          onClick={() => setActiveTab("matching")}
        >
          マッチング中
        </button>
      </div>
      <div className="w-full h-px bg-black my-2"></div>
      {activeTab === "liked" ? <LikedUsers /> : <MatchingUsers />}
    </div>
  );
};

export default Page;
