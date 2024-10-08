import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Paper,
  Button,
} from "@mui/material";

interface ActivityProps {
  kind: string; // データの種類（例: 'github'）
  data: any[]; // データ
}

// Activityコンポーネント
const Activity: React.FC<ActivityProps> = ({ kind, data }) => {
  // 日付でソート（新しい順）
  const sortedActivities = data.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // 日ごとにグループ化する
  const groupedActivities = sortedActivities.reduce((acc, activity) => {
    const date = new Date(activity.date).toLocaleDateString(); // 日付をフォーマット
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(activity);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <Box>
      {Object.keys(groupedActivities).map((date) => (
        <Box key={date} mb={4}>
          {/* 日付を表示 */}
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {date}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* 同じ日付のアクティビティを表示 */}
          {groupedActivities[date].slice(0, 5).map((activity, index) => (
            <Paper elevation={3} key={index} sx={{ mb: 2, ml: 4 }}>
              <Card
                sx={{
                  border: "1px solid rgba(0, 0, 0, 0.12)", // 薄い枠線
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" color="black">
                    {activity.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(activity.date).toLocaleTimeString()}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          ))}

          {/* それ以降のアクティビティを表示 */}
          {groupedActivities[date].length > 5 && (
            <Box sx={{ ml: 4 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  // ここに表示するロジックを追加
                  // 今回は簡単にコンソールに出力
                  console.log(`Showing more activities for ${date}`);
                }}
              >
                他のアクティビティを表示
              </Button>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Activity;
