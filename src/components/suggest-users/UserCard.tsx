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
  const router = useRouter();
  return (
    <Link
      href={`/my-page/${user.user_id}`}
      underline="none"
      sx={{
        color: "black",
        display: "block", // ブロック要素にすることでサイズを固定
        borderRadius: "8px",
        width: "15%", // 固定の横幅を設定
        transition: "background-color 0.3s, transform 0.3s", // ホバー時のアニメーションを追加
        backgroundColor: "background.paper",
        "&:hover": {
          transform: "scale(1.05)", // ホバー時に少し拡大
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "16px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          height: "200px", // 固定の高さを設定
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            marginBottom: "12px",
            flexGrow: 1, // flexGrowを追加してサイズを揃える
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              overflow: "hidden",
              marginRight: "12px",
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
