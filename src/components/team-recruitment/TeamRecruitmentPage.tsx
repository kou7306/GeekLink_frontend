"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Button,
  Paper,
  Chip,
} from "@mui/material";
import { Event } from "@/types/event";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import EditEventModal from "./EditEventModal";
import axios from "axios";
import { User } from "../profile/options";
import { getMultipleProfiles } from "@/utils/getMultipleProfiles";
import Link from "next/link";
import { getUuidFromCookie } from "@/actions/users";

type Props = {
  event: Event;
  currentUserId: string | null;
};

const TeamRecruitmentPage = ({ event, currentUserId }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isHost = currentUserId === event.owner_id;
  const isParticipant = event.participant_ids.includes(currentUserId || "");
  const [uuid, setUuid] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [participantProfiles, setParticipantProfiles] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const uuid = await getUuidFromCookie();
      if (uuid) {
        setUuid(uuid);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (event.owner_id) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/profile/get-profile/${event.owner_id}`
          );
          setUser(response.data);
          const profiles = await getMultipleProfiles(event.participant_ids);
          setParticipantProfiles(profiles);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchProfile();
  }, [event.owner_id, event.participant_ids]);

  const handleJoinEvent = async () => {
    if (!currentUserId) {
      toast.error("ログインが必要です");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${event.id}/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUserId }),
        }
      );

      if (!response.ok) {
        throw new Error("イベントへの参加に失敗しました");
      }

      toast.success("イベントに参加しました");
      router.refresh();
    } catch (error) {
      toast.error("エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeaveEvent = async () => {
    if (!currentUserId) {
      toast.error("ログインが必要です");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${event.id}/leave`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUserId }),
        }
      );

      if (!response.ok) {
        throw new Error("イベントからの退出に失敗しました");
      }

      toast.success("イベントから退出しました");
      router.refresh();
    } catch (error) {
      toast.error("エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditEvent = async (updatedEvent: Partial<Event>) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${event.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        }
      );

      if (!response.ok) {
        throw new Error("イベントの更新に失敗しました");
      }

      toast.success("イベントを更新しました");
      router.refresh();
    } catch (error) {
      toast.error("エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${event.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("イベントの締め切りに失敗しました");
      }

      toast.success("イベントを締め切りました");
      router.push("/team-recruitments");
    } catch (error) {
      toast.error("エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{ maxWidth: 800, margin: "auto", padding: 4, borderRadius: 2 }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "1rem", color: "text.secondary" }}
            >
              作成日: {new Date(event.created_at).toLocaleDateString()}
            </Typography>
            <Typography variant="h4" fontWeight="bold" sx={{ mt: 1, mb: 2 }}>
              {event.title}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
              height="100%"
              sx={{
                backgroundColor: "background.paper",
                p: 2,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontSize: "1.3rem", fontWeight: "bold", mb: 2 }}
              >
                参加者数
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                width="100%"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={2}
                >
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {event.participant_ids.length}/{event.max_participants}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ ml: 1, color: "text.secondary" }}
                  >
                    人
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  flexWrap="wrap"
                  justifyContent="center"
                >
                  {participantProfiles.map((profile) => (
                    <Link
                      href={
                        profile.user_id === uuid
                          ? "/my-page"
                          : `/my-page/${profile.user_id}`
                      }
                      key={profile.user_id}
                    >
                      <Avatar
                        key={profile.user_id}
                        src={profile.image_url}
                        sx={{
                          width: 60,
                          height: 60,
                          m: 1,
                          border: "2px solid",
                        }}
                      />
                    </Link>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              borderRadius={3}
              py={3}
              sx={{ backgroundColor: "warning.main" }}
            >
              <Typography
                variant="h6"
                sx={{ fontSize: "1.3rem", fontWeight: "bold", mb: 2 }}
              >
                主催者
              </Typography>
              <Link
                href={
                  user?.user_id === uuid
                    ? "/my-page"
                    : `/my-page/${user?.user_id}`
                }
              >
                {user && user.image_url ? (
                  <Avatar
                    src={user.image_url}
                    sx={{
                      width: 96,
                      height: 96,
                      mb: 2,
                      border: "3px solid #e0e0e0",
                    }}
                  />
                ) : (
                  <Avatar
                    src="/img/default_icon.png"
                    sx={{
                      width: 96,
                      height: 96,
                      mb: 2,
                      border: "3px solid #e0e0e0",
                    }}
                  />
                )}
              </Link>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {user ? user.name : ""}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              募集目的
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1.1rem", lineHeight: 1.6 }}
            >
              {event.purpose}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              歓迎条件
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1.1rem", lineHeight: 1.6 }}
            >
              {event.requirements}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              使用技術
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {event.techs.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  sx={{
                    fontSize: "1rem",
                    backgroundColor: "primary.light",
                    color: "text.primary",
                  }}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            {isHost ? (
              <Box display="flex" gap={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  sx={{
                    fontSize: "1.1rem",
                    py: 1.5,
                    color: "black",
                    backgroundColor: "white",
                  }}
                  onClick={() => handleDeleteEvent()}
                >
                  締め切る
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  color="secondary"
                  sx={{ fontSize: "1.1rem", py: 1.5, color: "text.primary" }}
                  onClick={() => setIsEditModalOpen(true)}
                >
                  編集
                </Button>
              </Box>
            ) : isParticipant ? (
              <Button
                variant="outlined"
                fullWidth
                color="secondary"
                sx={{
                  fontSize: "1.1rem",
                  py: 1.5,
                  color: "black",
                  backgroundColor: "white",
                }}
                onClick={handleLeaveEvent}
                disabled={isLoading}
              >
                {isLoading ? "処理中..." : "キャンセル"}
              </Button>
            ) : (
              <Button
                variant="contained"
                fullWidth
                color="secondary"
                sx={{ fontSize: "1.1rem", py: 1.5, color: "text.primary" }}
                onClick={handleJoinEvent}
                disabled={isLoading}
              >
                {isLoading ? "処理中..." : "申し込み"}
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
      <EditEventModal
        event={event}
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditEvent}
      />
    </>
  );
};

export default TeamRecruitmentPage;
