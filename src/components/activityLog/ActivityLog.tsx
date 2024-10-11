import React, { useState } from "react";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GitHubActivityCard } from "./ActivityGtihubCard";
import { GeekLinkActivityCard } from "./ActivityGeekLinkCard";

interface ActivityProps {
  kind: string;
  data: any[];
}

const Activity: React.FC<{ activities: ActivityProps[] }> = ({
  activities,
}) => {
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 3;

  const sortedActivities = activities
    .flatMap((activity) =>
      activity.data.map((item) => ({ ...item, kind: activity.kind }))
    )
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });

  const groupedActivities = sortedActivities.reduce((acc, activity) => {
    const date = new Date(
      activity.date || activity.created_at || ""
    ).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(activity);
    return acc;
  }, {} as Record<string, any[]>);

  const dates = Object.keys(groupedActivities);
  const displayDates = showAll ? dates : dates.slice(0, initialDisplayCount);

  return (
    <Box>
      {displayDates.map((date) => (
        <Box key={date} mb={4}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {date}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {groupedActivities[date].map((activity: any, index: number) => {
            if (activity.kind === "github") {
              return <GitHubActivityCard key={index} activity={activity} />;
            } else if (activity.kind === "geeklink") {
              return <GeekLinkActivityCard key={index} activity={activity} />;
            } else if (activity.kind === "qiita") {
              return null;
            }
            return null;
          })}
        </Box>
      ))}

      {!showAll && dates.length > initialDisplayCount && (
        <Box display="flex" justifyContent="center" mt={2}>
          <IconButton
            onClick={() => setShowAll(true)}
            aria-label="show more"
            size="large"
            sx={{
              color: "text.primary", // アイコンの色を白に
            }}
          >
            <ExpandMoreIcon fontSize="large" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default Activity;
