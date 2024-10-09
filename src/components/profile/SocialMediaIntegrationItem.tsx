import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import Image from "next/image";
import { FaGithub, FaTwitter } from "react-icons/fa";

type Props = {
  socialMedia: "Qiita" | "GitHub" | "Twitter" | "AtCoder" | "Zenn";
};

const OAUTH_GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
const QIITA_CLIENT_ID = process.env.NEXT_PUBLIC_QIITA_CLIENT_ID;
const frontend_url = process.env.NEXT_PUBLIC_BASE_URL;
const REDIRECT_QIITA_URI = frontend_url + "/test_qiita/redirect";
const REDIRECT_GITHUB_URI = frontend_url + "/github/redirect";
const QIITA_AUTH_URL = `https://qiita.com/api/v2/oauth/authorize?client_id=${QIITA_CLIENT_ID}&scope=read_qiita&state=RANDOM_STRING&redirect_uri=${REDIRECT_QIITA_URI}`;
const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${OAUTH_GITHUB_CLIENT_ID}&scope=user:read&redirect_uri=${REDIRECT_GITHUB_URI}`;

const SocialMediaIntegrationItem = ({ socialMedia }: Props) => {
  const sources = [
    {
      name: "Qiita",
      icon: <Image src="/qiita-icon.png" alt="Qiita" width={30} height={30} />,
    },
    { name: "GitHub", icon: <FaGithub size={30} /> },
    { name: "Twitter", icon: <FaTwitter size={30} /> },
    {
      name: "AtCoder",
      icon: (
        <Image src="/atcoder-icon.png" alt="AtCoder" width={30} height={30} />
      ),
    },
    {
      name: "Zenn",
      icon: <Image src="/zenn-icon.svg" alt="Zenn" width={30} height={30} />,
    },
  ];

  const handleLogin = (socialMedia: string) => {
    switch (socialMedia) {
      case "Qiita":
        window.location.href = QIITA_AUTH_URL;
        break;
      case "GitHub":
        window.location.href = GITHUB_AUTH_URL;
        break;
    }
  };

  return (
    <>
      <ListItem
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          mb: 1,
          "&:hover": {
            backgroundColor: "#f5f5f5",
            cursor: "pointer",
          },
        }}
        onClick={() => handleLogin(socialMedia)}
      >
        <ListItemIcon sx={{ minWidth: "40px" }}>
          {sources.find((source) => source.name === socialMedia)?.icon}
        </ListItemIcon>
        <ListItemText primary={socialMedia} />
      </ListItem>
    </>
  );
};

export default SocialMediaIntegrationItem;
