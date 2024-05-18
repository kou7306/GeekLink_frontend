import React from "react";
import UserList from "@/components/chat/UserList";

const MessageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-full">
      <div className="lg:pl-20 h-full">
        <UserList />
        {children}
      </div>
    </div>
  );
};

export default MessageLayout;
