"use client";
import EmptyState from "@/components/chat/EmptyState";
import React from "react";

const Page = () => {
  return (
    <div className="hidden h-full lg:block lg:pl-80">
      <EmptyState />
    </div>
  );
};

export default Page;
