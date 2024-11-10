import React from "react";
import { Box, Card, CardContent, Typography, Paper, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { bg } from "date-fns/locale";

export const GitHubActivityCard: React.FC<{ activity: any }> = ({
  activity,
}) => {
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
      <Card
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.12)",
          bgcolor: "warning.main",
          ":hover": {
            bgcolor: "info.main",
          },
        }}
      >
        <Link
          href={activity.url}
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          underline="none"
        >
          <CardContent>
            <Box display="flex" alignItems="center" mb={1}>
              <GitHubIcon
                fontSize="small"
                sx={{ mr: 1, color: "text.primary" }}
              />
              <Typography variant="caption" color="text.primary">
                {activity.type}
              </Typography>
            </Box>
            <Typography variant="subtitle1" color="text.primary">
              {displayText}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(activity.date).toLocaleTimeString()} -{" "}
              {activity.repository}
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </Paper>
  );
};
