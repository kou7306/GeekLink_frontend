"use client";
import React, { useState, useEffect, useCallback } from "react";
import TimeLinePost from "./TimeLinePost";
import PostModal from "./PostModal";
import { Post } from "../../../types/timeline";
import { getPosts, createPost } from "../../utils/actionPost";
import { useInView } from "react-intersection-observer";
import { getUuidFromCookie } from "@/actions/users";

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
    <div className="max-w-2xl mx-auto p-4 pb-24">
      <h1 className="text-2xl font-bold mb-4">タイムライン</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="space-y-4 mb-4">
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

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 z-10"
      >
        投稿する
      </button>

      <PostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePostSubmit}
      />
    </div>
  );
};

export default TimeLineContainer;
