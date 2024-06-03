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
  const imageURL = data && data.image_url ? data.image_url : '/img/default_icon.png';

  return (
    <div className="flex justify-center">
    <div className="w-2/5">
          <img src={data && data.image_url} alt="アイコン画像" className="px-16 w-36 h-36 rounded-full object-cover" />
        </div>
    <div className="w-3/5">
        <p>名前：{data && data.name}</p>
        <p>性別：{data && data.sex}</p>
        <p>年齢：{data && data.age}</p>
        <p>在住：{data && data.place}</p>
        <p>トップ技術：{data && data.top_teches}</p>
        <p>技術：{data && data.teches}</p>
        <p>趣味：{data && data.hobby}</p>
        <p>職種：{data && data.occupation}</p>
        <p>所属：{data && data.affiliation}</p>
        <p>資格：{data && data.qualification}</p>
        <p>エディタ：{data && data.editor}</p>
        <p>Github：{data && data.github}</p>
        <p>Twitter：{data && data.twitter}</p>
        <p>Zenn：{data && data.zenn}</p>
        <p>Qiita：{data && data.qiita}</p>
        <p>Atcoder：{data && data.atcoder}</p>
        <p>メッセージ：{data && data.message}</p>
        <p>ポートフォリオ：{data && data.portfolio}</p>
        <p>卒業年度：{data && data.graduate}</p>
        <p>希望職種：{data && data.desiredOccupation}</p>
        <p>学部：{data && data.faculty}</p>
        <p>経験：{data && data.experience}</p>
    </div>
</div>


  );
};

export default Page;
