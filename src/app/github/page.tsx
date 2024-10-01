'use client';

import React from 'react';

const CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
const frontend_url = process.env.NEXT_PUBLIC_BASE_URL;
const REDIRECT_URI = frontend_url + "/github/redirect";
const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user:read&redirect_uri=${REDIRECT_URI}`;

const Page = () => {
  const handleLogin = () => {
      window.location.href = GITHUB_AUTH_URL;
    };
  
    return (
      <div>
        <h1>Login with GitHub</h1>
        <button onClick={handleLogin}>GitHubでログイン</button>
      </div>
    );
};

export default Page;