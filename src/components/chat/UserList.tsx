"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { getMatchingUser } from "@/utils/getMatchingUser";
import { User } from "@/utils/getMatchingUser";
import { getUuidFromCookie } from "@/actions/users";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [uuid, setUuid] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getMatchingUser();
      if (users.length > 0) {
        setUsers(users);
      }

      const uuid = await getUuidFromCookie();
      if (uuid) {
        setUuid(uuid);
      }
    };

    fetchUsers();
  }, []);

  return (
    <aside className="fixed inset-y-20 pb-20 lg:pb-0 lg:px-8 lg:w-96 lg:block overflow-y-auto border-r border-border block w-full left-0">
      <div className="px-5 flex-col text-center">
        <div className="font-bold py-4">トーク一覧</div>
        <div id="character-list">
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            users.map((user: User) => (
              <Link
                key={user.user_id}
                href={{
                  pathname: `${user.user_id}`,
                }}
              >
                <div className="flex items-center mb-4 cursor-pointer">
                  {" "}
                  {/* items-centerを追加 */}
                  <div className="flex-shrink-0">
                    {" "}
                    {/* 画像を縮小しないように */}
                    <div className="w-20 h-20 relative">
                      <Image
                        src={user.img_url || "/user.svg"}
                        alt={user.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <div className="text-xs text-gray-500 text-center">
                      <div className="mt-1">{user.language}</div>
                      <div>
                        {user.age}歳 / {user.sex}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center ml-10 mb-2">
                    <div className="font-semibold text-lg text-center">
                      {user.name}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </aside>
  );
};

export default UserList;
