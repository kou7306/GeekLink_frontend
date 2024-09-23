import React from "react";
import UsersRanking from "../UsersRanking";
import { Box } from "@mui/material";

const UsersRankings = () => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        gap={2}
        justifyContent="space-between"
      >
        {[1, 2, 3].map((index) => (
          <Box key={index} bgcolor="grey.100" p={2} borderRadius={1} flex={1}>
            <UsersRanking key={index} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default UsersRankings;
