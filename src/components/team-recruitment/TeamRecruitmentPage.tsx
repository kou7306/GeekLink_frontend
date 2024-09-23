import React from "react";
import { Box, Typography, Grid, Avatar, Button, Paper } from "@mui/material";

const TeamRecruitmentPage = () => {
  const data = {
    title: "初心者募集！",
    createdAt: "2024-08-15",
    currentMember: 2,
    maxMember: 5,
    description: "初めてのハッカソンにでたい",
    welcomeConditions: ["TypeScriptを使える人", "関東圏"],
    host: true,
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, margin: "auto", padding: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{data.createdAt}</Typography>
          <Typography variant="h5" fontWeight="bold">
            {data.title}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle1">参加者</Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" mr={1}>
              {data.currentMember}/{data.maxMember}人
            </Typography>
            <Avatar sx={{ width: 24, height: 24 }} />
            <Avatar sx={{ width: 24, height: 24, marginLeft: -0.5 }} />
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle1">主催者</Typography>
          <Avatar sx={{ width: 40, height: 40 }} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1">募集目的</Typography>
          <Typography variant="body1">{data.description}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1">歓迎条件</Typography>
          {data.welcomeConditions.map((condition) => (
            <Typography variant="body1" key={condition}>
              {condition}
            </Typography>
          ))}
        </Grid>

        <Grid item xs={12}>
          {data.host ? (
            <Box display="flex" gap={2}>
              <Button variant="contained" fullWidth>
                締め切る
              </Button>
              <Button variant="contained" fullWidth>
                編集
              </Button>
            </Box>
          ) : (
            <Button variant="contained" fullWidth>
              申し込み
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TeamRecruitmentPage;
