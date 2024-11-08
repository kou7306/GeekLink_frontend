"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Grid, Card, CardActionArea, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AvatarViewer from "@/components/rpg/AvatarViewer";
import { blenderModels } from "@/constants/blenderModels";

interface ChangeAvatarPageProps {
  userId: string;
  currentAvatarData: {
    current_avatar: string;
  };
  userItemsData: {
    items: string[];
  };
}

const ChangeAvatarPage: React.FC<ChangeAvatarPageProps> = ({
  userId,
  currentAvatarData,
  userItemsData,
}) => {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [availableAvatars, setAvailableAvatars] = useState<string[]>([]);

  useEffect(() => {
    // 現在のアバターの設定
    const currentAvatarModel = blenderModels.find(
      (model) => model.id === currentAvatarData.current_avatar
    );
    if (currentAvatarModel) {
      setSelectedAvatar(currentAvatarModel.avatarPath);
    }

    // 利用可能なアバターの設定
    const availableModels = blenderModels.filter(
      (model) => userItemsData.items.includes(model.id) && model.id !== currentAvatarData.current_avatar
    );
    setAvailableAvatars(availableModels.map((model) => model.avatarPath));
  }, [currentAvatarData.current_avatar, userItemsData.items]);

  const handleSelectAvatar = async (avatarPath: string) => {
    setSelectedAvatar(avatarPath);
    const selectedModel = blenderModels.find((model) => model.avatarPath === avatarPath);

    if (selectedModel) {
      try {
        const response = await fetch(`http://localhost:8080/avatar/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            avatarId: selectedModel.id,
          }),
        });

        if (!response.ok) {
          throw new Error("アバターの更新に失敗しました");
        }

        router.refresh();
      } catch (error) {
        console.error("Error updating avatar:", error);
      }
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <Box sx={{ padding: 3, textAlign: "center", position: "relative" }}>
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
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        戻る
      </Button>

      <Typography variant="h4" gutterBottom>
        アバターを選択
      </Typography>

      <Box sx={{ marginBottom: 4 }}>
        <AvatarViewer modelPath={selectedAvatar} size={{ width: "100%", height: 400 }} />
      </Box>

      <Grid container spacing={2} justifyContent="center">
        {availableAvatars.map((avatarPath) => {
          const model = blenderModels.find((m) => m.avatarPath === avatarPath);
          return (
            <Grid item xs={6} sm={4} md={3} key={avatarPath}>
              <Card
                sx={{
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardActionArea
                  onClick={() => handleSelectAvatar(avatarPath)}
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ flexGrow: 1, minHeight: 200 }}>
                    <AvatarViewer modelPath={avatarPath} size={{ width: "100%", height: "100%" }} />
                  </Box>
                  <Box sx={{ p: 1 }}>
                    <Typography variant="body2" align="center">
                      {model?.name || "Unknown Avatar"}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ChangeAvatarPage;
