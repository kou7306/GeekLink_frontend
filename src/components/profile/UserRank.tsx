import { Box, Typography, LinearProgress } from "@mui/material";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUuidFromCookie } from "@/actions/users";
import Image from 'next/image';
import { useParams } from "next/navigation";

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
};

const UserRank = ({ isMe }: Props) => {
  const { uuid } = useParams();

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

  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  const { rank, level, nextLevelPoints } = data;

  const image = (() => {
    switch (rank) {
      case "BronzeI":
        return rankImages.bronze;
      case "BronzeⅡ":
        return rankImages.bronze;
      case "BronzeⅢ":
        return rankImages.bronze;
      case "SilverI":
        return rankImages.silver;
      case "SilverⅡ":
        return rankImages.silver;
      case "SilverⅢ":
        return rankImages.silver;
      case "GoldI":
        return rankImages.gold;
      case "GoldⅡ":
        return rankImages.gold;
      case "GoldⅢ":
        return rankImages.gold;
      case "DiamondI":
        return rankImages.diamond;
      case "DiamondⅡ":
        return rankImages.diamond;
      case "DiamondⅢ":
        return rankImages.diamond;
      case "MasterI":
        return rankImages.master;
      case "MasterⅡ":
        return rankImages.master;
      case "MasterⅢ":
        return rankImages.master;
      case "Legend":
        return rankImages.legend;
    }
  })();

  // 進捗バーの割合を計算
  const maxPoints = 100;
  const progress = ((maxPoints - nextLevelPoints) / maxPoints) * 100;

  return (
    <Box
      sx={{
        maxWidth: 300,
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {image && <Image src={image} alt={rank} width={135} height={135} />}
      </Box>

      <Typography variant="h5" marginTop={1}>
        {rank} - Level {level}
      </Typography>

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
            '& .MuiLinearProgress-bar': {
              backgroundColor: "#3f51b5",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default UserRank;