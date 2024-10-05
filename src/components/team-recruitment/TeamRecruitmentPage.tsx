import React from "react";
import { Box, Typography, Grid, Avatar, Button, Paper } from "@mui/material";
import { Event } from "@/types/event";

type Props = {
  event: Event;
  currentUserId: string | null;
};

const TeamRecruitmentPage = ({ event, currentUserId }: Props) => {
  const isHost = currentUserId === event.owner_id;
  const isParticipant = event.participant_ids.includes(currentUserId || "");

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, margin: "auto", padding: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontSize: "1.25rem" }}>
            {new Date(event.created_at).toLocaleDateString()}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {event.title}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" sx={{ fontSize: "1.25rem" }}>
            参加者
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" mr={1} sx={{ fontSize: "1.25rem" }}>
              {event.participant_ids.length}/{event.max_participants}人
            </Typography>
            {/* TODO: 参加者のアバターを表示 */}
            <Avatar sx={{ width: 32, height: 32 }} />
            <Avatar sx={{ width: 32, height: 32, marginLeft: -0.5 }} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Box textAlign="center">
              <Typography variant="subtitle1" sx={{ fontSize: "1.25rem" }}>
                主催者
              </Typography>
              {/* TODO: 主催者のアバターを表示 */}
              <Avatar sx={{ width: 56, height: 56, margin: "auto" }} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontSize: "1.25rem" }}>
            募集目的
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.25rem" }}>
            {event.purpose}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontSize: "1.25rem" }}>
            歓迎条件
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.25rem" }}>
            {event.requirements}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontSize: "1.25rem" }}>
            使用技術
          </Typography>
          {event.techs.map((tech) => (
            <Typography variant="body1" key={tech} sx={{ fontSize: "1.25rem" }}>
              {tech}
            </Typography>
          ))}
        </Grid>
        {/* ボタン */}
        <Grid item xs={12}>
          {isHost ? (
            <Box display="flex" gap={2}>
              <Button variant="contained" fullWidth sx={{ fontSize: "1.25rem" }}>
                締め切る
              </Button>
              <Button variant="contained" fullWidth sx={{ fontSize: "1.25rem" }}>
                編集
              </Button>
            </Box>
          ) : isParticipant ? (
            <Button variant="contained" fullWidth sx={{ fontSize: "1.25rem" }} color="secondary">
              キャンセル
            </Button>
          ) : (
            <Button variant="contained" fullWidth sx={{ fontSize: "1.25rem" }} color="primary">
              申し込み
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TeamRecruitmentPage;
