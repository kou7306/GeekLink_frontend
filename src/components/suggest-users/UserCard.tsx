import React from "react";
import { Profile } from "../../types/user";
import Image from "next/image";
import { Box, Typography, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import Chips from "./Chips";

type Props = {
  user: Profile;
  chipOption:
    | "overAll"
    | "sameTech"
    | "samePlace"
    | "sameAge"
    | "sameGraduate"
    | "sameDesiredOccupation";
};

const UserCard = ({ user, chipOption }: Props) => {
  return (
    <Link
      href={`/my-page/${user.user_id}`}
      underline="none"
      sx={{
        color: "black",
        display: "block",
        borderRadius: "8px",
        width: "100%", // widthを%で指定
        maxWidth: "250px", // レスポンシブなサイズの上限
        transition: "background-color 0.3s, transform 0.3s",
        backgroundColor: "background.paper",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "1rem", // paddingをremに変更
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          width: "250px",
          height: "auto", // autoにして内容に応じて伸縮
          minHeight: "10rem", // 必要であれば最低限の高さを指定
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "3rem", // 相対的な単位でサイズを指定
              height: "3rem",
              borderRadius: "50%",
              overflow: "hidden",
              marginRight: "0.75rem", // 相対的な単位でマージンを指定
            }}
          >
            <Image
              src={user.image_url || "/user.svg"}
              layout="fill"
              objectFit="cover"
              alt={user.name}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h2" color="text.primary">
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.occupation}
            </Typography>
          </Box>
        </Box>
        <Chips user={user} chipOption={chipOption} />
      </Box>
    </Link>
  );
};

export default UserCard;
