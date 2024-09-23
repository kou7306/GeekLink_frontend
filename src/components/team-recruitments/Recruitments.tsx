import React from "react";
import Recruitment from "./Recruitment";
import { Box } from "@mui/material";

const Recruitments = () => {
  const data = [
    {
      title: "ハッカソン募集",
      createdAt: "2024-02-01",
      currentMember: 1,
      maxMember: 3,
      description: "チーム開発の募集です。",
    },
    {
      title: "システム作りの仲間募集",
      createdAt: "2024-02-01",
      currentMember: 3,
      maxMember: 4,
      description: "システム作りの仲間を募集します。",
    },
  ];
  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {data.map((recruitment) => (
          <Box key={recruitment.title} sx={{ flexBasis: "calc(50% - 1rem)" }}>
            <Recruitment recruitment={recruitment} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Recruitments;
