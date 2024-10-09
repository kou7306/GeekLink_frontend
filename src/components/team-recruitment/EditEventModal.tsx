import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Event } from "@/types/event";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { technologies } from "../profile/options";

interface EditEventModalProps {
  event: Event;
  open: boolean;
  onClose: () => void;
  onSave: (updatedEvent: Partial<Event>) => Promise<void>;
}

const EditEventModal: React.FC<EditEventModalProps> = ({ event, open, onClose, onSave }) => {
  const [title, setTitle] = useState(event.title);
  const [purpose, setPurpose] = useState(event.purpose);
  const [requirements, setRequirements] = useState(event.requirements);
  const [maxParticipants, setMaxParticipants] = useState(event.max_participants);
  const [deadline, setDeadline] = useState<Date | null>(
    event.deadline ? new Date(event.deadline) : null
  );
  const [techs, setTechs] = useState<string[]>(event.techs);

  const handleTechChange = (tech: string) => {
    setTechs((prevTechs) =>
      prevTechs.includes(tech) ? prevTechs.filter((t) => t !== tech) : [...prevTechs, tech]
    );
  };

  const handleSave = async () => {
    const updatedEvent: Partial<Event> = {
      title,
      purpose,
      requirements,
      max_participants: maxParticipants,
      deadline: deadline ? deadline.toISOString() : undefined,
      techs,
    };
    await onSave(updatedEvent);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          maxHeight: "90vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          イベントを編集
        </Typography>
        <TextField
          fullWidth
          label="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="募集目的"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          fullWidth
          label="歓迎条件"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          fullWidth
          label="最大参加者数"
          type="number"
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(Number(e.target.value))}
          margin="normal"
        />
        <Typography variant="subtitle1" gutterBottom>
          締切日
        </Typography>
        <DatePicker
          selected={deadline}
          onChange={(date: Date | null) => setDeadline(date)}
          dateFormat="yyyy/MM/dd"
          isClearable
          customInput={<TextField fullWidth />}
        />
        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          使用技術
        </Typography>
        <FormGroup>
          {technologies.map((tech) => (
            <FormControlLabel
              key={tech}
              control={
                <Checkbox checked={techs.includes(tech)} onChange={() => handleTechChange(tech)} />
              }
              label={tech}
            />
          ))}
        </FormGroup>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            キャンセル
          </Button>
          <Button onClick={handleSave} variant="contained">
            保存
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditEventModal;
