// pages/index.js
"use client";
import React from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_QIITA_CLIENT_ID;
const frontend_url = process.env.NEXT_PUBLIC_BASE_URL;
const REDIRECT_URI = frontend_url + "/test_qiita/redirect";
const QIITA_AUTH_URL = `https://qiita.com/api/v2/oauth/authorize?client_id=${CLIENT_ID}&scope=read_qiita&state=RANDOM_STRING&redirect_uri=${REDIRECT_URI}`;

export default function Home() {
  const handleLogin = () => {
    window.location.href = QIITA_AUTH_URL;
  };

  return (
    <div>
      <h1>Login with Qiita</h1>
      <button onClick={handleLogin}>Qiitaでログイン</button>
    </div>
  );
}
