import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const TimeLineItem = () => {
  return (
    <Card>
      <CardHeader avatar={<Avatar></Avatar>} title="名前" />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ marginTop: "-8px" }}
        >
          今日やったこと
        </Typography>
        <Typography variant="body1">
          個人開発のアプリのフロント部分を開発しました
        </Typography>
        <IconButton aria-label="like" size="small">
          <ThumbUpAltIcon fontSize="inherit" />
        </IconButton>
        <Typography variant="caption" color="text.secondary">
          1
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TimeLineItem;
