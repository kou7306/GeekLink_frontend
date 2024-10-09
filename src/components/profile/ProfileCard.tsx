"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getUuidFromCookie } from "@/actions/users";
import axios from "axios";
import { User } from "./options";
import Image from "next/image";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { postLikeID, deleteLikeID } from "@/utils/CreateLike";
import { Box, Grid } from "@mui/material";
import RepositoryList from "./RepositoryList";
import QiitaList from "./QiitaList";
import Activity from "../activityLog/Activity";
import WeeklyActivityLog from "./WeeklyActivityLog";
import UserMainInformation from "./UserMainInformation";
import SocialMediaIntegration from "./SocialMediaIntegration";
import CommentComponent from "./CommentComponent";
import QiitaNumberOfContributions from "./QiitaNumberOfContributions";
import GitHubContributions from "./GitHubContributions";
import PercentageOfLanguages from "./PercentageOfLanguages";
import UserRank from "./UserRank";

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
  const [uuid, setUuid] = useState<string>();

  // Get UUID from cookie on component mount
  useEffect(() => {
    const getUuid = async () => {
      const userId = await getUuidFromCookie();
      if (userId) {
        try {
          setUuid(userId);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    getUuid();
  }, []);

  useEffect(() => {
    console.log("isLiked =", isLiked);
  }, [isLiked]);

  useEffect(() => {
    if (uuid) {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/profile/like-status`, {
          myID: uuid,
          uuid: user.user_id, // Assuming user.user_id is the target UUID
        })
        .then((response: { data: LikeCheckResponse }) => {
          setIsLiked(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching like status:", error);
        });
    }
  }, [uuid, user.user_id]);

  return (
    <Box bgcolor="white">
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg grid grid-cols-3 gap-6">
        <div className="flex flex-col items-center">
          <Image
            className="w-64 h-64 object-cover rounded-full mb-4"
            src={user.image_url || "/img/default_icon.png"}
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
            {/* 連携 */}
            {isMe ? <SocialMediaIntegration /> : null}
          </div>
          {user.message && <CommentComponent message={user.message} />}
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
          {/* コントリビューション数 */}
          <GitHubContributions />
          {/* Qiitaの投稿記事数 */}
          <QiitaNumberOfContributions />
          {/* 使用言語の割合 */}
          <PercentageOfLanguages />
          {/* ユーザーランク */}
          <UserRank />
        </div>
        <UserMainInformation user={user} onEdit={onEdit} isMe={isMe} />
      </div>
      {/* グラフ */}
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6} my={2}>
          {/* リポジトリ一覧 */}
          <RepositoryList />
        </Grid>
        <Grid item xs={12} md={6} my={2}>
          {/* Qiita リスト */}
          <QiitaList />
        </Grid>
        <Grid item xs={12} my={2}>
          <Activity uuid={uuid || ""} />
          <WeeklyActivityLog />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileCard;
