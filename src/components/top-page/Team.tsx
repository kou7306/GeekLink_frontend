import { Box, Divider, ListItem, Typography, Chip, Link } from "@mui/material";
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
      <Link
        href={`/team-recruitment/${item.id}`}
        underline="none"
        sx={{ color: "text.primary" }}
      >
        <ListItem sx={{ py: 2, px: 0 }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "background.paper",
              border: "1px solid", // 枠線を指定
              borderColor: "text.secondary", // カスタムテーマの枠線色を指定
              borderRadius: "0.5rem",
              padding: "1rem", // パディングを調整
              boxShadow: "0 4px 6px rgba(0.1, 0, 0, 0.1)",
              flexDirection: "column", // 縦に要素を並べる
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="h6" component="h2" noWrap>
                {item.title}
              </Typography>
              <Typography variant="h6" component="h2" noWrap>
                {`${item.participant_ids.length}/${item.max_participants}人`}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: 1,
                marginTop: 1, // 下に少しスペースを追加
                width: "100%",
              }}
            >
              {item.techs.slice(0, 3).map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                  }}
                />
              ))}
              {item.techs.length > 3 && <Chip label="..." size="small" />}
            </Box>

            <Box sx={{ width: "100%", textAlign: "right", marginTop: 1 }}>
              <Typography variant="body2">
                {`締切日: ${deadlinestring(item.deadline)}`}
              </Typography>
            </Box>
          </Box>
        </ListItem>
      </Link>
      {key < 2 && <Divider />}
    </React.Fragment>
  );
};

export default Team;
