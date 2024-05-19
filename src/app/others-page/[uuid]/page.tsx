"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface UserData {
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  name?: string; // 名前
  sex?: string; // 性別
  age?: string; // 年齢
  place?: string; // 在住
  top_teches?: string[];
  teches?: string[];
  hobby?: string; // 趣味
  occupation?: string; // 職種
  affiliation?: string; // 所属
  qualification?: string[]; // 資格
  editor?: string; // エディタ
  image_url?: string; // アイコン画像
  github?: string;
  twitter?: string;
  zenn?: string;
  qiita?: string;
  atcoder?: string;
  message?: string; // メッセージ
  portfolio?: string; // ポートフォリオ
  graduate?: string; // 卒業年度
  desiredOccupation?: string; // 希望職種
  faculty?: string; // 学部
  experience?: string[]; // 経験
}

const Page = ({ params }: { params: any }) => {
  const searchParams = useSearchParams();
  //   const uuid = searchParams.get("uuid");
  const uuid = params.uuid;

  const api = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState<UserData>(); // Add type annotation to 'data' state variable
  useEffect(() => {
    console.log("API URL:", api); // 追加
    if (uuid) {
      fetch(api + "/getUserData", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uuid }),
      })
        .then((response) => {
          console.log("Response:", response); // 追加
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setData(data))
        .catch((error) => {
          console.error("Fetch error:", error);
          console.error("Error details:", error.message);
        });
    }
  }, []);

  console.log(data);

  return (
    <div>
      <h1>UUID: {params.uuid}</h1>
      <div>{data && data.name}</div>
      <p>ここに他のコンテンツを追加します。</p>
    </div>
  );
};

export default Page;
