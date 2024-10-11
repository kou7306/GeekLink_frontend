import React from "react";
import { Card, CardContent, Paper, Typography } from "@mui/material";

// Geeklink活動用のカードコンポーネント
export const GeekLinkActivityCard: React.FC<{ activity: any }> = ({
  activity,
}) => {
  return (
    <Paper sx={{ mb: 2, ml: 4, boxShadow: "none" }}>
      <Card
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.12)",
          bgcolor: "background.default",
          ":hover": {
            bgcolor: "info.main",
          },
        }}
      >
        <CardContent>
          <Typography variant="caption" color="text.primary" sx={{ mb: 1 }}>
            {activity.id ? "Create Event" : "Timeline Post"}
          </Typography>
          <Typography variant="subtitle1" color="text.primary">
            {activity.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(activity.created_at).toLocaleTimeString()} -{" "}
            <span>GeekLink Activity</span>
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
};
