import { Box, Chip, Typography } from "@mui/material";
import React from "react";

type Props = {
  top_teches: string[];
  teches: string[];
};

const TechStack = ({ top_teches, teches }: Props) => {
  return (
    <>
      <Box marginTop={2}>
        <Typography variant="h6" fontWeight={600}>
          TOP3
        </Typography>
        {/* 一位から三位の技術 */}
        <Box marginLeft={2} marginTop={2}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            トップ技術
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
            {top_teches.map((tech, index) => (
              <Chip
                key={index}
                label={`${index + 1}位: ${tech}`}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            その他の技術
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {teches.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                color="default"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TechStack;
