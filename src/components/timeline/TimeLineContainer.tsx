"use client";
import React, { useState, useEffect, useCallback } from "react";
import TimeLinePost from "./TimeLinePost";
import PostModal from "./PostModal";
import { Post } from "../../../types/post";
import { getPosts, createPost } from "../../utils/actionPost";
import { useInView } from "react-intersection-observer";

const TimeLineContainer: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1); // ページネーション用
  const [limit] = useState(10); // 一度に取得する投稿の数

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedPosts = await getPosts(page, limit);
      setPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);
      setIsLoading(false);
    } catch (err) {
      setError("投稿の取得に失敗しました。後で再試行してください。");
      setIsLoading(false);
    }
  }, [page, limit]);

  const handlePostSubmit = async (content: string) => {
    try {
      const createdPost = await createPost(content);
      if (createdPost) {
        setPosts([createdPost, ...posts]);
        setIsModalOpen(false); // 投稿後にモーダルを閉じる
      } else {
        throw new Error("投稿の作成に失敗しました");
      }
    } catch (err) {
      setError("投稿の作成に失敗しました。後で再試行してください。");
    }
  };

  if (isLoading && posts.length === 0) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 pb-24">
      <h1 className="text-2xl font-bold mb-4">タイムライン</h1>
      <div className="space-y-4 mb-4">
        {posts.map((post) => (
          <TimeLinePost key={post.id} post={post} />
        ))}
        {/* スクロールの検出用のダミー要素 */}
        <div ref={ref} />
      </div>

      {/* 投稿するボタン */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        投稿する
      </button>

      {/* モーダル */}
      <PostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePostSubmit}
      />
    </div>
  );
};

export default TimeLineContainer;
