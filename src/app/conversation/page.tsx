"use client";
import EmptyState from "@/components/chat/EmptyState";
import UserList from "@/components/chat/UserList";
import React from "react";

const Page = () => {
  return (
    <div className="hidden h-full lg:block lg:pl-96">
      <EmptyState />
    </div>
  );
};

export default Page;
