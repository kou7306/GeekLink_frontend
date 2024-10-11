import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { getMatchingUser } from "@/utils/getMatchingUser";
import { User } from "@/utils/getMatchingUser";
import { getUuidFromCookie } from "@/actions/users";
import { getLatestMessage } from "@/utils/getLatestMessage";
import { CardContent, Typography, CircularProgress } from "@mui/material";

const UserSelectList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [latestMessages, setLatestMessages] = useState<{
    [key: string]: string;
  }>({});
  const [uuid, setUuid] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // For error handling

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const uuid = await getUuidFromCookie();
        if (uuid) {
          setUuid(uuid);
        }
        const users = await getMatchingUser();
        if (users.length > 0) {
          const messages = await Promise.all(
            users.map(async (user: User) => {
              const latestMessage = uuid
                ? await getLatestMessage(uuid, user.user_id)
                : null;
              return {
                [user.user_id]: latestMessage
                  ? latestMessage.message.content // Ensure correct property access
                  : "メッセージはありません",
              };
            })
          );

          const messagesDict = Object.assign({}, ...messages);
          setLatestMessages(messagesDict);
          setUsers(users);
        }
      } catch (err) {
        setError(
          "ユーザーを取得中にエラーが発生しました。再試行してください。"
        ); // Error message
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [uuid]);

  return (
    <div className="bg-sub_base shadow-lg rounded-lg p-5 my-10 mx-auto min-h-full max-w-7xl">
      <div className="flex-col h-full">
        <div className="font-bold text-2xl m-4 ml-5">トーク一覧</div>
        <div id="character-list" className="overflow-y-auto h-full">
          {loading ? (
            <div>
              <CircularProgress />
              <p>Loading users...</p>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : users.length === 0 ? (
            <p>Looks like you have no conversations yet. Start a new chat!</p>
          ) : (
            users.map((user: User) => (
              <Link
                key={user.user_id}
                href={{ pathname: `conversation/${user.user_id}` }}
                className="block hover:bg-hover transition-colors duration-300"
              >
                <div className="mb-2 p-4 transition-colors duration-200 cursor-pointer rounded-lg">
                  {" "}
                  {/* Cardを廃止し、余白を調整 */}
                  <CardContent className="flex items-center gap-48">
                    <div className="flex items-center">
                      <div className="relative w-16 h-16 mr-3">
                        <Image
                          src={user.img_url || "/user.svg"}
                          alt={user.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex-grow">
                        <Typography variant="h6">{user.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {user.language}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          className="mt-1"
                        >
                          {user.age}歳 / {user.sex}
                        </Typography>
                      </div>
                    </div>
                    <div>
                      <Typography variant="h6" color="textPrimary">
                        {latestMessages[user.user_id] ||
                          "メッセージはありません"}
                      </Typography>
                    </div>
                  </CardContent>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSelectList;
