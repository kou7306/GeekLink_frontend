"use client";
import React, { useState, useEffect } from "react";

interface UserData {
  user_id: string;
  created_at: string;
  updated_at: string;
  name: string; // 名前
  sex: string; // 性別
  age: string; // 年齢
  place: string; // 在住
  top_teches: string[];
  teches: string[];
  hobby: string; // 趣味
  occupation: string; // 職種
  affiliation: string; // 所属
  qualification: string[]; // 資格
  editor: string; // エディタ
  image_url: string; // アイコン画像
  github: string;
  twitter: string;
  zenn: string;
  qiita: string;
  atcoder: string;
  message: string; // メッセージ
  portfolio: string; // ポートフォリオ
  graduate: string; // 卒業年度
  desiredOccupation: string; // 希望職種
  faculty: string; // 学部
  experience: string[]; // 経験
}

const Paga = () => {
  const api = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState<UserData>(); // Add type annotation to 'data' state variable
  useEffect(() => {
    fetch(api + "/getUserData", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid: "e6a55709-cf46-499b-aeb9-35f8b8e725a5" }),
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  console.log(data);
  return <div>{data && data.user_id}</div>; // Access 'user_id' property from the first element of 'data' array
};

export default Paga;
