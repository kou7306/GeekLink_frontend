"use client";
import React, { useState, useEffect } from "react";
import TimeLinePost from "./TimeLinePost";
import PostModal from "./PostModal"; // Import the new component
import { Post } from "../../../types/post";
import { getPosts, createPost } from "../../utils/actionPost";

const TimeLineContainer: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
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

  const handlePostSubmit = async (content: string) => {
    try {
      const createdPost = await createPost(content);
      if (createdPost) {
        setPosts([createdPost, ...posts]);
        setIsModalOpen(false); // Close modal after submitting the post
      } else {
        throw new Error("Failed to create post");
      }
    } catch (err) {
      setError("Failed to create post. Please try again.");
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
      <PostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePostSubmit}
      />
    </div>
  );
};

export default TimeLineContainer;
