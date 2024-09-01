"use client";
import React, { useState, useEffect } from "react";
import TimeLinePost from "./TimeLinePost";
import { Post } from "../../../types/post";
import { getPosts, createPost } from "../../utils/actionPost";

const TimeLineContainer: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getPosts();
      console.log("fetchedPosts", fetchedPosts);
      setPosts(fetchedPosts);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch posts. Please try again later.");
      setIsLoading(false);
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      try {
        const createdPost = await createPost(newPost);
        if (createdPost) {
          setPosts([createdPost, ...posts]);
          setNewPost("");
          setIsModalOpen(false); // Close modal after submitting the post
        } else {
          throw new Error("Failed to create post");
        }
      } catch (err) {
        setError("Failed to create post. Please try again.");
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 pb-24">
      <h1 className="text-2xl font-bold mb-4">タイムライン</h1>
      <div className="space-y-4 mb-4">
        {posts.map((post) => (
          <TimeLinePost key={post.id} post={post} />
        ))}
      </div>

      {/* Button to open modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        投稿する
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">新しい投稿</h2>
            <form onSubmit={handlePostSubmit}>
              <input
                type="text"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="何か投稿してみましょう..."
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  投稿
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeLineContainer;
