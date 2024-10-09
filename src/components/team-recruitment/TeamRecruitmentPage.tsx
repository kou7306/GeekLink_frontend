"use client";
import React, { useState } from "react";
import { Box, Typography, Grid, Avatar, Button, Paper } from "@mui/material";
import { Event } from "@/types/event";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import EditEventModal from "./EditEventModal";

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

  const handleJoinEvent = async () => {
    if (!currentUserId) {
      toast.error("ログインが必要です");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${event.id}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUserId }),
      });

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${event.id}/leave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUserId }),
      });

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });

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

  return (
    <>
      <Paper elevation={3} sx={{ maxWidth: 600, margin: "auto", padding: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontSize: "1.25rem" }}>
              {new Date(event.created_at).toLocaleDateString()}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {event.title}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontSize: "1.25rem" }}>
              参加者
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body1" mr={1} sx={{ fontSize: "1.25rem" }}>
                {event.participant_ids.length}/{event.max_participants}人
              </Typography>
              {/* TODO: 参加者のアバターを表示 */}
              <Avatar sx={{ width: 32, height: 32 }} />
              <Avatar sx={{ width: 32, height: 32, marginLeft: -0.5 }} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Box textAlign="center">
                <Typography variant="subtitle1" sx={{ fontSize: "1.25rem" }}>
                  主催者
                </Typography>
                {/* TODO: 主催者のアバターを表示 */}
                <Avatar sx={{ width: 56, height: 56, margin: "auto" }} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontSize: "1.25rem" }}>
              募集目的
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.25rem" }}>
              {event.purpose}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontSize: "1.25rem" }}>
              歓迎条件
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.25rem" }}>
              {event.requirements}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontSize: "1.25rem" }}>
              使用技術
            </Typography>
            {event.techs.map((tech) => (
              <Typography variant="body1" key={tech} sx={{ fontSize: "1.25rem" }}>
                {tech}
              </Typography>
            ))}
          </Grid>
          {/* ボタン */}
          <Grid item xs={12}>
            {isHost ? (
              <Box display="flex" gap={2}>
                <Button variant="contained" fullWidth sx={{ fontSize: "1.25rem" }}>
                  締め切る
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ fontSize: "1.25rem" }}
                  onClick={() => setIsEditModalOpen(true)}
                >
                  編集
                </Button>
              </Box>
            ) : isParticipant ? (
              <Button
                variant="contained"
                fullWidth
                sx={{ fontSize: "1.25rem" }}
                color="primary"
                onClick={handleLeaveEvent}
                disabled={isLoading}
              >
                {isLoading ? "処理中..." : "キャンセル"}
              </Button>
            ) : (
              <Button
                variant="contained"
                fullWidth
                sx={{ fontSize: "1.25rem" }}
                color="primary"
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
