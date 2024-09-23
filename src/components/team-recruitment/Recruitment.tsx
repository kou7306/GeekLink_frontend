import { Box, Typography, Grid } from "@mui/material";
import React from "react";

//型が決まり次第、typesフォルダに定義
type Props = {
  recruitment: {
    title: string;
    createdAt: string;
    currentMember: number;
    maxMember: number;
    description: string;
  };
};

const Recruitment = ({ recruitment }: Props) => {
  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {recruitment.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary">
            募集日: {recruitment.createdAt}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{recruitment.description}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" align="right">
            {recruitment.currentMember}/{recruitment.maxMember}人
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Recruitment;
