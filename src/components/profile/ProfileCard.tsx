"use client";
import React, { useState, useEffect } from "react";
import { getUuidFromCookie } from "@/actions/users";
import { User } from "./options";
import Image from "next/image";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { Box, Grid } from "@mui/material";
import RepositoryList from "./RepositoryList";
import QiitaList from "./QiitaList";
import Activity from "../activityLog/Activity";
import UserMainInformation from "./UserMainInformation";
import SocialMediaIntegration from "./SocialMediaIntegration";
import CommentComponent from "./CommentComponent";
import QiitaNumberOfContributions from "./QiitaNumberOfContributions";
import GitHubContributions from "./GitHubContributions";
import PercentageOfLanguages from "./PercentageOfLanguages";
import UserRank from "./UserRank";
import FollowNum from "./FollowNum";
import FollowButton from "./FollowButton";

interface ProfileCardProps {
  user: User;
  isMe: boolean;
  onEdit?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, isMe, onEdit }) => {
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

  return (
    <Box>
      <div className="max-w-7xl mx-auto p-6 bg-sub_base rounded-lg shadow-lg grid grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          <Image
            className="w-64 h-64 object-cover rounded-full mb-4"
            src={user.image_url || "/user.svg"}
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
                <FaGithub size={30} color="white" />
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
          {/* フォローボタン */}
          {uuid && <FollowButton userId={user.user_id} isMe={isMe} myID={uuid} />}

          {/* フォロー・フォロワー数 */}
          <FollowNum isMe={isMe} />
          {/* コントリビューション数 */}
          <GitHubContributions isMe={isMe} />
          {/* Qiitaの投稿記事数 */}
          <QiitaNumberOfContributions isMe={isMe} />
          {/* 使用言語の割合 */}
          <PercentageOfLanguages isMe={isMe} />
          {/* ユーザーランク */}
          <UserRank isMe={isMe} />
        </div>
        <UserMainInformation user={user} onEdit={onEdit} isMe={isMe} />
      </div>
      {/* グラフ */}
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6} my={2}>
          {/* リポジトリ一覧 */}
          <RepositoryList uuid={user.user_id} />
        </Grid>
        <Grid item xs={12} md={6} my={2}>
          {/* Qiita リスト */}
          <QiitaList uuid={user.user_id} />
        </Grid>
        <Grid item xs={12} my={2}>
          <Activity uuid={user.user_id || ""} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileCard;
