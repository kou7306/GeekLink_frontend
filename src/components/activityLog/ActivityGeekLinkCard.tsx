import React from "react";
import { Card, CardContent, Paper, Typography } from "@mui/material";

// Geeklink活動用のカードコンポーネント
export const GeekLinkActivityCard: React.FC<{ activity: any }> = ({
  activity,
}) => {
  return (
    <Paper sx={{ mb: 2, ml: 4, boxShadow: "none" }}>
      <Card sx={{ border: "1px solid rgba(0, 0, 0, 0.12)" }}>
        <CardContent>
          <Typography variant="caption" color="black" sx={{ mb: 1 }}>
            {activity.id ? "Create Event" : "Timeline Post"}
          </Typography>
          <Typography variant="subtitle1" color="black">
            {activity.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {new Date(activity.created_at).toLocaleTimeString()} -{" "}
            <span>GeekLink Activity</span>
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
};
