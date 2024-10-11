import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { InputAdornment } from "@mui/material";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, duration: string, comment: string) => void;
}

const DurationInput: React.FC<{
  value: { hours: string; minutes: string };
  onChange: (value: { hours: string; minutes: string }) => void;
}> = ({ value, onChange }) => {
  const handleChange =
    (type: "hours" | "minutes") => (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;
      if (newValue === "" || /^\d+$/.test(newValue)) {
        const numValue = parseInt(newValue, 10);
        if (type === "hours" || (type === "minutes" && numValue < 60)) {
          onChange({ ...value, [type]: newValue });
        }
      }
    };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <TextField
        value={value.hours}
        onChange={handleChange("hours")}
        InputProps={{
          endAdornment: <InputAdornment position="end">時間</InputAdornment>,
        }}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      />
      <TextField
        value={value.minutes}
        onChange={handleChange("minutes")}
        InputProps={{
          endAdornment: <InputAdornment position="end">分</InputAdornment>,
        }}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      />
    </Box>
  );
};

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState({ hours: "", minutes: "" });
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      title.trim() &&
      (duration.hours || duration.minutes) &&
      comment.trim()
    ) {
      const durationString = `${duration.hours || "0"}時間${
        duration.minutes || "0"
      }分`;
      onSubmit(title, durationString, comment);
      setTitle("");
      setDuration({ hours: "", minutes: "" });
      setComment("");
      onClose();
    }
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "#1c1d24",
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
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              所要時間
            </Typography>
            <DurationInput value={duration} onChange={setDuration} />
          </Box>
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
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
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
              sx={{ color: "#000000" }}
            >
              投稿
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default PostModal;
