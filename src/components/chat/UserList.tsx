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

  return (
    <aside className="inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-border block w-full left-0 h-full">
      <div className="px-5 flex-col">
        <div id="character-list">
          <div className="font-bold py-4">トーク一覧</div>
          {users.map((user: User) => (
            // 選択したユーザーのIDと自分のIDを足し合わせたIDをリンク先に指定
            <Link
              key={user.user_id}
              href={{
                pathname: `conversation/${user.user_id}!${uuid}`,
                query: { name: user.name },
              }}
            >
              <div className="flex items-start mb-4 cursor-pointer">
                <div>
                  <div className="w-20 h-20 relative">
                    <Image
                      src={user.img_url}
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
                <div className="flex flex-col justify-start mt-2 ml-5">
                  <div className="font-semibold text-lg">{user.name}</div>
                  <div className="text-gray-500 text-sm my-2">こんにちは</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default UserList;
