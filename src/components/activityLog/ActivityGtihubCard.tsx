import React from "react";
import { Box, Card, CardContent, Typography, Paper, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export const GitHubActivityCard: React.FC<{ activity: any }> = ({
  activity,
}) => {
  console.log("activity", activity);
  let displayText = "";

  switch (true) {
    case !!activity.title:
      displayText = activity.title;
      break;
    case !!activity.message:
      displayText = activity.message;
      break;
    case !!activity.pullRequestTitle:
      displayText = activity.pullRequestTitle;
      break;
    default:
      displayText = "";
  }

  return (
    <Paper elevation={0} sx={{ mb: 2, ml: 4, boxShadow: "none" }}>
      <Card sx={{ border: "1px solid rgba(0, 0, 0, 0.12)" }}>
        <Link
          href={activity.url}
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          underline="none"
        >
          <CardContent>
            <Box display="flex" alignItems="center" mb={1}>
              <GitHubIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="caption" color="black">
                {activity.type}
              </Typography>
            </Box>
            <Typography variant="subtitle1" color="black">
              {displayText}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(activity.date).toLocaleTimeString()} -{" "}
              {activity.repository}
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </Paper>
  );
};
