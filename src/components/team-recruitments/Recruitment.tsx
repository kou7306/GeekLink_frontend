import { Event } from "@/types/event";
import { Box, Typography, Grid } from "@mui/material";
import React from "react";

interface RecruitmentProps {
  event: Event;
}

const Recruitment = ({ event }: RecruitmentProps) => {
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
            {event.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary">
            募集日: {new Date(event.created_at).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{event.purpose}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" align="right">
            {event.participant_ids.length}/{event.max_participants}人
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Recruitment;
