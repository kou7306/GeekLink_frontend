import React from "react";
import { Box, Typography, Grid, Avatar, Button, Paper } from "@mui/material";

const TeamRecruitmentPage = () => {
  const data = {
    title: "初心者募集！",
    createdAt: "8月15日",
    currentMember: 2,
    maxMember: 5,
    description: "初めてのハッカソンにでたい",
    welcomeConditions: ["TypeScriptを使える人", "関東圏"],
    host: true,
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, margin: "auto", padding: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontSize: "1.25rem" }}>
            {data.createdAt}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {data.title}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" sx={{ fontSize: "1.25rem" }}>
            参加者
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" mr={1} sx={{ fontSize: "1.25rem" }}>
              {data.currentMember}/{data.maxMember}人
            </Typography>
            <Avatar sx={{ width: 32, height: 32 }} />
            <Avatar sx={{ width: 32, height: 32, marginLeft: -0.5 }} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Box textAlign="center">
              <Typography variant="subtitle1" sx={{ fontSize: "1.25rem" }}>
                主催者
              </Typography>
              <Avatar sx={{ width: 56, height: 56, margin: "auto" }} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontSize: "1.25rem" }}>
            募集目的
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.25rem" }}>
            {data.description}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontSize: "1.25rem" }}>
            歓迎条件
          </Typography>
          {data.welcomeConditions.map((condition) => (
            <Typography
              variant="body1"
              key={condition}
              sx={{ fontSize: "1.25rem" }}
            >
              {condition}
            </Typography>
          ))}
        </Grid>
        {/* ボタン */}
        <Grid item xs={12}>
          {data.host ? (
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                fullWidth
                sx={{ fontSize: "1.25rem" }}
              >
                締め切る
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ fontSize: "1.25rem" }}
              >
                編集
              </Button>
            </Box>
          ) : (
            <Button variant="contained" fullWidth sx={{ fontSize: "1.25rem" }}>
              申し込み
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TeamRecruitmentPage;
