import { Event } from "@/types/event";
import { Box, Typography, Avatar, Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { User } from "../profile/options";

interface RecruitmentProps {
  event: Event;
}

const Recruitment = ({ event }: RecruitmentProps) => {
  const [user, setUser] = useState<User | null>(null);
  console.log(event);

  useEffect(() => {
    const fetchProfile = async () => {
      if (event.owner_id) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/profile/get-profile/${event.owner_id}`
          );
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchProfile();
  }, [event.owner_id]);

  return (
    <Box
      sx={{
        borderRadius: "12px",
        padding: "16px",
        backgroundColor: "background.paper",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: "info.main",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {user && user.image_url ? (
          <Avatar src={user.image_url} sx={{ width: 40, height: 40 }} />
        ) : (
          <Avatar
            src="/img/default_icon.png"
            sx={{ width: 40, height: 40 }}
          ></Avatar>
        )}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {user ? user.name : ""}
        </Typography>
      </Box>
      <Typography
        variant="h5"
        color="text.primary"
        sx={{ fontWeight: "bold", mt: 1 }}
      >
        {event.title}
      </Typography>
      <Typography
        variant="body1"
        color="text.primary"
        sx={{ fontWeight: "bold", my: 1 }}
      >
        {event.purpose}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
        {event.techs.length > 0 &&
          event.techs.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                backgroundColor: "primary.main",
                color: "text.primary",
                maxWidth: "100%",
                height: "auto",
                "& .MuiChip-label": {
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                },
              }}
            />
          ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          {event.participant_ids.length}/{event.max_participants}人
        </Typography>
        <Typography variant="body2" color="text.primary">
          締切: {new Date(event.created_at).toLocaleDateString()}まで
        </Typography>
      </Box>
    </Box>
  );
};

export default Recruitment;
