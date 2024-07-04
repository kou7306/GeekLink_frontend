"use client";
import React from "react";
import GroupChat from "@/components/groupChat/GroupChat";
import { useSearchParams } from "next/navigation";
import { Box, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Link from "next/link";

const Page = ({ params }: { params: any }) => {
  const searchParams = useSearchParams();
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        position="fixed"
        zIndex={50}
        width="100%"
        sx={{ backgroundColor: "rgba(211, 211, 211, 0.5)" }}
      >
        {/* TODO: グループ一覧画面が出来次第ここをそこのリンクに変更 */}
        <Link href={"/"}>
          <ArrowBackIosNewIcon
            sx={{
              paddingLeft: 1,
              marginLeft: 1,
              "&:active": { color: "#007BFF" },
            }}
          />
        </Link>
        <Typography paddingY={1} paddingLeft={2} fontWeight={"bold"}>
          グループ名
        </Typography>
      </Box>
      <GroupChat params={params} />
    </>
  );
};

export default Page;
