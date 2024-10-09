import { Box, Divider, ListItem, Typography, Chip } from "@mui/material";
import React from "react";

type Team = {
  id: number;
  title: string;
  max_participants: number;
  participant_ids: string[];
  techs: string[];
  deadline: string;
};

type Props = {
  item: Team;
  key: number;
};

const Team = ({ item, key }: Props) => {
  const deadlinestring = (deadline: string) => {
    const date = new Date(deadline);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  return (
    <React.Fragment key={key}>
      <ListItem sx={{ py: 2, px: 0 }}>
        <Box
          sx={{
            width: "100%",
            height: 80,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            boxShadow: "0 4px 6px rgba(0.1, 0, 0, 0.1)",
            position: "relative",
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              position: "absolute",
              top: 8,
              left: 16,
            }}
          >
            {item.title}
          </Typography>

          <Typography
            variant="h6"
            component="h2"
            sx={{
              position: "absolute",
              top: 8,
              right: 16,
            }}
          >
            {`${item.participant_ids.length}/${item.max_participants}人`}
          </Typography>

          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              left: 16,
              display: "flex",
              gap: 1,
            }}
          >
            {item.techs.slice(0, 3).map((tech) => (
              <Chip key={tech} label={tech} size="small" />
            ))}
            {item.techs.length > 3 && "..."}
          </Box>

          <Typography
            variant="body2"
            sx={{
              position: "absolute",
              bottom: 8,
              right: 16,
            }}
          >
            {`締切日: ${deadlinestring(item.deadline)}`}
          </Typography>
        </Box>
      </ListItem>
      {key < 2 && <Divider />}
    </React.Fragment>
  );
};

export default Team;
