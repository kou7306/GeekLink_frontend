"use client";
import { useEffect, useState } from "react";
import React from "react";
import UserList from "@/components/chat/UserList";
import { getMatchingUser } from "@/utils/getMatchingUser";
import { User } from "@/utils/getMatchingUser";
import { getUuidFromCookie } from "@/actions/users";

const MessageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [users, setUsers] = useState<User[]>([]);
  const [uuid, setUuid] = useState<string>("");
  useEffect(() => {
    console.log("fetching users1");
    const fetchUsers = async () => {
      const users = await getMatchingUser();
      setUsers(users);
      const uuid = await getUuidFromCookie();
      if (uuid) {
        setUuid(uuid);
      }
    };

    fetchUsers();
  }, []);
  // childrenに追加のpropsを渡す
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        usersProps: users,
        uuidProp: uuid,
      } as {
        usersProps: User[];
        uuidProp: string;
      }); // 追加のpropsを渡す
    }
    return child;
  });

  return (
    <div className="h-full">
      <div className="lg:pl-20 h-full">
        <UserList />
        {enhancedChildren}
      </div>
    </div>
  );
};

export default MessageLayout;
