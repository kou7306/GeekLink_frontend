"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AvatarViewer from "@/components/rpg/AvatarViewer";

// Mock data: List of user equipment
const mockEquipments = [
  {
    id: 1,
    name: "Avatar 1",
    modelPath: "/models/avatar1.glb",
    thumbnail: "/img/avatar1.png",
  },
  {
    id: 2,
    name: "Avatar 2",
    modelPath: "/models/avatar2.glb",
    thumbnail: "/img/avatar2.png",
  },
  {
    id: 3,
    name: "Avatar 3",
    modelPath: "/models/avatar3.glb",
    thumbnail: "/img/avatar3.png",
  },
  // Add other equipment as needed
];

const ChangeAvatar = () => {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState("/models/human.glb");

  const handleSelectAvatar = (modelPath: string) => {
    setSelectedAvatar(modelPath);
  };

  const handleBack = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <Box sx={{ padding: 3, textAlign: "center", position: "relative" }}>
      {/* Back button in the top-left corner with transparent background */}
      <Button
        onClick={handleBack}
        variant="contained"
        startIcon={<ArrowBackIcon />}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          backgroundColor: "transparent",
          color: "primary.main",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)", // light hover effect
          },
        }}
      >
        戻る
      </Button>

      <Typography variant="h4" gutterBottom>
        アバターを選択
      </Typography>

      {/* Display selected avatar */}
      <Box sx={{ marginBottom: 4 }}>
        <AvatarViewer
          modelPath={selectedAvatar}
          size={{ width: "100%", height: 400 }}
        />
      </Box>

      {/* List of avatar options */}
      <Grid container spacing={2} justifyContent="center">
        {mockEquipments.map((equipment) => (
          <Grid item xs={6} sm={4} md={3} key={equipment.id}>
            <Card>
              <CardActionArea
                onClick={() => handleSelectAvatar(equipment.modelPath)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={equipment.thumbnail}
                  alt={equipment.name}
                />
                <Typography variant="body2" align="center">
                  {equipment.name}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ChangeAvatar;
