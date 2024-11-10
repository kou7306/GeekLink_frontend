import { getUuidFromCookie } from "@/actions/users";
import { Post } from "../types/timeline";
import axios from "axios";

// 投稿一覧を取得する関数
export const getPosts = async (
  page: number,
  limit: number
): Promise<Post[]> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(
      `${apiUrl}/timeline/post?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const result = await response.json();
    return result.posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

// 新しい投稿を作成する関数
export const createPost = async (postData: {
  title: string;
  time: string;
  comment: string;
}): Promise<Post | null> => {
  try {
    let uuid = await getUuidFromCookie();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!uuid) {
      uuid = "test";
    }

    const response = await fetch(`${apiUrl}/timeline/create-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${uuid}`,
      },
      body: JSON.stringify({
        uuid, // UUIDをリクエストボディにも含める
        postData,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating post:", error);
    return null;
  }
};

export const sendReaction = async (
  postId: string,
  userId: string,
  emoji: string
) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/timeline/add-reaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId,
      userId, // ユーザーIDを追加
      emoji,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add reaction");
  }

  const result = await response.json();
  return result;
};
