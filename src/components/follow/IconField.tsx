import React from "react";
import { Avatar, Box, Typography, Card, CardActionArea } from "@mui/material";
import Link from "next/link";
import { FollowUser } from "../profile/options";

type Props = {
  user: FollowUser;
};

const IconField: React.FC<Props> = ({ user }) => {
  const defaultImage = "/user.svg";

  return (
    <Link href={`/my-page/${user.user_id}`}>
      <Card
        sx={{
          width: 256,
          m: 2,
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: 6,
          },
          bgcolor: "warning.main",
          borderRadius: 4,
        }}
      >
        <CardActionArea>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
            }}
          >
            <Avatar
              src={user.image_url || defaultImage}
              alt={user.name}
              sx={{ width: 96, height: 96, mb: 2 }}
            />
            <Typography variant="h6" component="div">
              {user.name}
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default IconField;
