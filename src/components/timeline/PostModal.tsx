"use client";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, time: string, comment: string) => void;
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && time.trim() && comment.trim()) {
      onSubmit(title, time, comment);
      setTitle("");
      setTime("");
      setComment("");
    }
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          新しい投稿
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="今日やったこと"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="時間"
            variant="outlined"
            fullWidth
            margin="normal"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <TextField
            label="コメント"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-end">
            <Button
              onClick={onClose}
              color="primary"
              variant="outlined"
              sx={{ mr: 2 }}
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              sx={{ color: "#000000" }} // テキストを白に設定
            >
              投稿
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default PostModal;
