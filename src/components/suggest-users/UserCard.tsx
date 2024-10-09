import React from "react";
import { Profile } from "../../types/user";
import Image from "next/image";
import { Box, Typography, Button, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import Chips from "./Chips";

type Props = {
  user: Profile;
  chipOption:
    | "overAll"
    | "sameTech"
    | "samePlace"
    | "sameAge"
    | "sameGraduate"
    | "sameDesiredOccupation";
};

const UserCard = ({ user, chipOption }: Props) => {
  const router = useRouter();
  console.log(user);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        maxWidth: "300px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "16px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginBottom: "12px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            overflow: "hidden",
            marginRight: "12px",
          }}
        >
          <Image
            src={user.image_url ?? "/user.svg"}
            layout="fill"
            objectFit="cover"
            alt={user.name}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="h2">
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.occupation}
          </Typography>
        </Box>
      </Box>
      <Chips user={user} chipOption={chipOption} />
      <Box sx={{ display: "flex", width: "100%", gap: "8px" }}>
        <Link href={`/my-page/${user.user_id}`}>
          <Button
            variant="contained"
            sx={{
              width: "270px",
              borderRadius: "100px",
              backgroundColor: "secondary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "secondary.main",
              },
            }}
          >
            詳細へ
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default UserCard;
