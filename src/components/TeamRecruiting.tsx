import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  keyframes,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Team from "./Team";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

const TeamRecruiting = () => {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await fetch(
        // TODO:最新3件の募集を取得するAPIを作成・変更予定⇒このルートだと全てのイベントを取ってきてしまう
        `${process.env.NEXT_PUBLIC_API_URL}/events/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch NewEvents");
      }
      return response.json();
    },
  });
  
  const events: any[] = data;

  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Box sx={{ bgcolor: "background.paper", p: 2, borderRadius: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
          新規チーム募集
        </Typography>
        <Link href="/team-recruitments">
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            詳しく見る <ArrowForwardIosIcon fontSize="small" sx={{ ml: 0.5 }} />
          </Typography>
        </Link>
      </Box>
      <List disablePadding>
        {events.map((item) => (
          <Team item={item} key={item.id} />
        ))}
      </List>
    </Box>
  );
};

export default TeamRecruiting;
