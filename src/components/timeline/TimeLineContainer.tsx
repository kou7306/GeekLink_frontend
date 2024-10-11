"use client";
import React, { useState, useEffect, useCallback } from "react";
import TimeLinePost from "./TimeLinePost";
import PostModal from "./PostModal";
import { Post } from "../../types/timeline";
import { getPosts, createPost } from "../../utils/actionPost";
import { useInView } from "react-intersection-observer";
import { getUuidFromCookie } from "@/actions/users";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ComponentLoading from "../core/ComponentLoading";

const TimeLineContainer: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  // ログインユーザーのIDを取得（実際の実装に合わせて調整してください）
  const [uuid, setUuid] = useState<string | null>(null);

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

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
    if (hasMore) {
      fetchPosts();
    }
  }, [page]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedPosts = await getPosts(page, limit);

      if (fetchedPosts.length === 0) {
        setHasMore(false);
        if (page === 1) {
          setError("投稿がありません。新しい投稿を作成してみましょう！");
        }
      } else {
        setPosts((prevPosts) => {
          const newPosts = fetchedPosts.filter(
            (newPost) =>
              !prevPosts.some((existingPost) => existingPost.id === newPost.id)
          );
          return [...prevPosts, ...newPosts];
        });
        setError(null);
      }

      setIsLoading(false);
    } catch (err) {
      setError("投稿の取得に失敗しました。後で再試行してください。");
      setIsLoading(false);
    }
  }, [page, limit]);

  const handlePostSubmit = async (
    title: string,
    time: string,
    comment: string
  ) => {
    try {
      const createdPost = await createPost({ title, time, comment }); // オブジェクトを作成して渡す
      if (createdPost) {
        setPosts((prevPosts) => [createdPost, ...prevPosts]);
        setIsModalOpen(false);
        setError(null);
      } else {
        throw new Error("投稿の作成に失敗しました");
      }
    } catch (err) {
      setError("投稿の作成に失敗しました。後で再試行してください。");
    }
  };

  return (
    <div className=" p-4 pb-24 mx-48">
      {isLoading && <ComponentLoading />}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="space-y-4 mb-4 w-full mx-auto">
        {posts.map((post) => (
          <TimeLinePost
            key={post.id}
            post={post}
            isOwnPost={post.userId === uuid}
            uuid={uuid}
          />
        ))}
        {hasMore && <div ref={ref} />}
      </div>

      <IconButton
        onClick={() => setIsModalOpen(true)}
        className="fixed z-10"
        sx={{
          position: "fixed",
          bottom: "5%", // 下から5%の位置に固定
          right: "30%", // 右から30%の位置に固定
          color: "#ffffff", // アイコンの色
          backgroundColor: "secondary.main", // 背景色を追加
          "&:hover": {
            backgroundColor: "secondary.main", // ホバー時も背景色を変更しない
            color: "#ffffff", // ホバー時のアイコンの色を変更しない
          },
        }}
      >
        <EditIcon fontSize="large" />
      </IconButton>

      <PostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePostSubmit}
      />
    </div>
  );
};

export default TimeLineContainer;
