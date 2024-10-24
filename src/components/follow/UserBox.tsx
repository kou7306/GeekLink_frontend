import React from "react";
import Link from "next/link";
import { Avatar, Box, Card, CardActionArea, Typography } from "@mui/material";
import { FollowUser } from "../profile/options";

type UserBoxProps = {
  user: FollowUser;
};

const UserBox: React.FC<UserBoxProps> = ({ user }) => {
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
              src={user.image_url || "/user.svg"}
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

export default UserBox;
