"use client";
import React from "react";
import GroupChat from "@/components/groupChat/GroupChat";
import { useSearchParams } from "next/navigation";

const Page = ({ params }: { params: any }) => {
  const searchParams = useSearchParams();
  return (
    <>
      <GroupChat params={params} />
    </>
  );
};

export default Page;
