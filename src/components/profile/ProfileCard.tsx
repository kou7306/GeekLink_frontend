"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getUuidFromCookie } from "@/actions/users";
import axios from "axios";
import { User } from "./options";
import Image from "next/image";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { postLikeID, deleteLikeID } from "@/utils/CreateLike";
import { Box, dividerClasses, Grid } from "@mui/material";
import RepositoryList from "./RepositoryList";
import QiitaList from "./QiitaList";
import ActivityLog from "./ActivityLog";
import WeeklyActivityLog from "./WeeklyActivityLog";

interface ProfileCardProps {
  user: User;
  isMe: boolean;
  onEdit?: () => void;
}

interface LikeCheckResponse {
  message: string;
  data: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, isMe, onEdit }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const params = useParams();
  const uuid = params.uuid;
  useEffect(() => {
    console.log("isliked = ", isLiked);
  }, [isLiked]);

  useEffect(() => {
    const myID = getUuidFromCookie();

    if (uuid && myID) {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/profile/like-status`, {
          myID,
          uuid,
        })
        .then((response: { data: LikeCheckResponse }) => {
          setIsLiked(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching like status:", error);
        });
    } else {
      if (!myID) {
        console.error("Current user ID is not found.");
      }
      if (!uuid) {
        console.error("UUID is not found.");
      }
    }
  }, [uuid]);

  return (
    <Box bgcolor="white">
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg grid grid-cols-3 gap-6">
        <div className="flex flex-col items-center">
          <Image
            className="w-64 h-64 object-cover rounded-full mb-4"
            src={user.image_url || "/default-profile.png"}
            alt={user.name}
            width={256}
            height={256}
          />
          <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
          <div className="flex space-x-4">
            {user.github && (
              <a
                href={`https://github.com/${user.github}`}
                className="text-black"
                aria-label="GitHub"
              >
                <FaGithub size={30} />
              </a>
            )}
            {user.twitter && (
              <a
                href={`https://x.com/${user.twitter}`}
                className="text-blue-400"
                aria-label="Twitter"
              >
                <FaTwitter size={30} />
              </a>
            )}
            {user.zenn && (
              <a
                href={`https://zenn.dev/${user.zenn}`}
                className="text-blue-600"
                aria-label="Zenn"
              >
                <Image src="/zenn-icon.svg" alt="Zenn" width={30} height={30} />
              </a>
            )}
            {user.qiita && (
              <a
                href={`https://qiita.com/${user.qiita}`}
                className="text-green-500"
                aria-label="Qiita"
              >
                <Image
                  src="/qiita-icon.png"
                  alt="Qiita"
                  width={30}
                  height={30}
                />
              </a>
            )}
            {user.atcoder && (
              <a
                href={`https://atcoder.jp/users/${user.atcoder}`}
                className="text-purple-500"
                aria-label="AtCoder"
              >
                <Image
                  src="/atcoder-icon.png"
                  alt="AtCoder"
                  width={30}
                  height={30}
                />
              </a>
            )}
          </div>
          {isMe && (
            <button
              onClick={onEdit}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              編集
            </button>
          )}
          {!isMe && (
            <button
              className="bg-white rounded-full p-1"
              onClick={() => {
                if (isLiked === false) {
                  postLikeID(user.user_id);
                  setIsLiked(true);
                } else {
                  deleteLikeID(user.user_id);
                  setIsLiked(false);
                }
              }}
            >
              <svg
                className={`w-16 h-16 ${
                  isLiked === true ? "text-red-500" : "text-gray-500"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              </svg>
            </button>
          )}
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <p className="text-gray-600">
                <strong>職業:</strong> {user.occupation}
              </p>
              <p className="text-gray-600">
                <strong>場所:</strong> {user.place}
              </p>
              <p className="text-gray-600">
                <strong>性別:</strong> {user.sex}
              </p>
              <p className="text-gray-600">
                <strong>年齢:</strong> {user.age}
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold">TOP3</h3>
                <ul className="list-disc list-inside">
                  {user.top_teches.map((tech, index) => (
                    <li key={index} className="text-gray-700">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold">技術スタック</h3>
                <ul className="list-disc list-inside">
                  {user.teches.map((tech, index) => (
                    <li key={index} className="text-gray-700">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              {user.hobby && (
                <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold">趣味</h3>
                  <p className="text-gray-700">{user.hobby}</p>
                </div>
              )}
              {user.editor && (
                <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold">好きなエディター</h3>
                  <p className="text-gray-700">{user.editor}</p>
                </div>
              )}
              {user.qualification && (
                <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold">資格</h3>
                  <ul className="list-disc list-inside">
                    {user.qualification.map((qual, index) => (
                      <li key={index} className="text-gray-700">
                        {qual}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {user.message && (
                <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold">一言</h3>
                  <p className="text-gray-700">{user.message}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* グラフ */}
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6} my={2}>
          {/* リポジトリ一覧 */}
          <RepositoryList />
        </Grid>
        <Grid item xs={12} md={6} my={2}>
          {/* Qiita */}
          <QiitaList />
        </Grid>
        <Grid item xs={12} my={2}>
          {/* アクティビティログ */}
          <ActivityLog />
        </Grid>
        <Grid item xs={12} my={2}>
          {/* 週間アクティビティログ */}
          <WeeklyActivityLog />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileCard;
