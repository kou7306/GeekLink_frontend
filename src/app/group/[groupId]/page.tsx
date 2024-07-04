"use client";
import React from "react";
import GroupChat from "@/components/groupChat/GroupChat";
import { useSearchParams } from "next/navigation";

const Page = ({ params }: { params: any }) => {
  const searchParams = useSearchParams();
  return (
    <div>
      <GroupChat params={params} />
    </div>
  );
};

export default Page;
