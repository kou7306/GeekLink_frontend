import React from "react";
import UserList from "@/components/chat/UserList";

const MessageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>{children}</>;
};

export default MessageLayout;
