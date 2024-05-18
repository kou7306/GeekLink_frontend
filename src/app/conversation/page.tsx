"use client";
import EmptyState from "@/components/chat/EmptyState";
import UserList from "@/components/chat/UserList";
import React from "react";

const Page = () => {
  return (
    <div className="flex h-full mt-20">
      <UserList />
      <div className="flex-1">
        <EmptyState />
      </div>
    </div>
  );
};

export default Page;
