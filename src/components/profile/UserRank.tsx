"use client";
import { Box, Typography, LinearProgress, Button } from "@mui/material";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUuidFromCookie } from "@/actions/users";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import ComponentLoading from "../core/ComponentLoading";
import AvatarViewer from "../rpg/AvatarViewer";

const rankImages: { [key: string]: string } = {
  bronze: "/img/bronze.png",
  silver: "/img/silver.png",
  gold: "/img/gold.png",
  diamond: "/img/diamond.png",
  master: "/img/master.png",
  legend: "/img/legend.png",
};

type Props = {
  isMe: boolean;
  currentAvatar?: string;
};

const UserRank = ({ isMe, currentAvatar }: Props) => {
  const { uuid } = useParams();
  const router = useRouter();

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["rank"],
    queryFn: async () => {
      const userUid = isMe ? (await getUuidFromCookie()) ?? uuid : uuid;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rank/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid: userUid,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch UserRank");
      }
      return response.json();
    },
  });

  if (isPending) return <ComponentLoading />;

  if (isError) return <div>Error: {error.message}</div>;

  const { rank, level, nextLevelPoints } = data;

  const image = (() => {
    switch (rank) {
      case "BronzeI":
      case "BronzeⅡ":
      case "BronzeⅢ":
        return rankImages.bronze;
      case "SilverI":
      case "SilverⅡ":
      case "SilverⅢ":
        return rankImages.silver;
      case "GoldI":
      case "GoldⅡ":
      case "GoldⅢ":
        return rankImages.gold;
      case "DiamondI":
      case "DiamondⅡ":
      case "DiamondⅢ":
        return rankImages.diamond;
      case "MasterI":
      case "MasterⅡ":
      case "MasterⅢ":
        return rankImages.master;
      case "Legend":
        return rankImages.legend;
      default:
        return null;
    }
  })();

  // Calculate progress percentage for the progress bar
  const maxPoints = 100;
  const progress = ((maxPoints - nextLevelPoints) / maxPoints) * 100;

  const handleChangeAvatar = () => {
    router.push("/change-avatar");
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        textAlign: "center",
        marginTop: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 1,
        }}
      >
        {image && <Image src={image} alt={rank} width={135} height={135} />}
        <Box sx={{ textAlign: "left", flexGrow: 1, marginLeft: 1 }}>
          <Typography variant="h5">{rank}</Typography>
          <Typography variant="h6">Level {level}</Typography>
          <Box sx={{ marginTop: 1, width: "100%" }}>
            <Typography variant="body1" gutterBottom>
              次のレベルまで: {nextLevelPoints}ポイント
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress < 0 ? 0 : progress}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: "#e0e0e0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#3f51b5",
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Avatar display */}
      <Box sx={{ marginTop: 2 }}>
        <AvatarViewer
          modelPath="/models/mii-sword.glb"
          size={{ width: 400, height: 300 }}
        />
      </Box>

      {/* Change Avatar button */}
      <Box sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleChangeAvatar}
          sx={{ color: "white" }}
        >
          着替える
        </Button>
      </Box>
    </Box>
  );
};

export default UserRank;
