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

//具体的な型が決まったらtypesフォルダに移動
type TimeLinePost = {
  name: string;
  content: string;
  like: number;
};

type Props = {
  timeLinePost: TimeLinePost;
};

const TimeLineItem = ({ timeLinePost }: Props) => {
  return (
    <Card>
      <CardHeader avatar={<Avatar></Avatar>} title={timeLinePost.name} />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ marginTop: "-8px" }}
        >
          今日やったこと
        </Typography>
        <Typography variant="body1">{timeLinePost.content}</Typography>
        <IconButton aria-label="like" size="small">
          <ThumbUpAltIcon fontSize="inherit" />
        </IconButton>
        <Typography variant="caption" color="text.secondary">
          {timeLinePost.like}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TimeLineItem;
