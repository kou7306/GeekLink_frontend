"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import TinderCard from "react-tinder-card";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { getRandomUsers } from "../../utils/getRandomMatchUser";
import { User } from "../../utils/getRandomMatchUser";
import { postSwipedRightUserIds } from "../../utils/CreateLike";
import Image from "next/image";
import { Box, Chip, IconButton, Typography } from "@mui/material";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState("");
  const [swipedRightUserIds, setSwipedRightUserIds] = useState<string[]>([]);

  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(users.length)
        .fill(0)
        .map(() => React.createRef<any>()),
    [users.length]
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getRandomUsers();
        setUsers(fetchedUsers);
        updateCurrentIndex(fetchedUsers.length - 1);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const canSwipe = currentIndex >= 0;

  const swiped = (direction: string, nameToDelete: string, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    if (direction === "right") {
      setSwipedRightUserIds((prev) => [...prev, users[index].user_id]);
    }
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    if (currentIndexRef.current >= idx && childRefs[idx].current) {
      childRefs[idx].current.restoreCard();
    }
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < users.length) {
      try {
        await childRefs[currentIndex].current?.swipe(dir);
      } catch (error) {
        console.error("Error swiping card:", error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full ">
      <h1 className="text-3xl pb-6">ランダムマッチ</h1>
      <div className="flex items-center justify-center w-[200vw] max-w-[260px] h-[300px]">
        {users.map((user, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="absolute"
            key={user.user_id}
            onSwipe={(dir) => swiped(dir, user.name, index)}
            onCardLeftScreen={() => outOfFrame(user.name, index)}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "600px",
                maxWidth: "600px",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "background.paper",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    marginBottom: "16px",
                    marginLeft: "50px",
                    marginTop: "20px",
                  }}
                >
                  <Image
                    src={user.imageURL ?? "/user.svg"}
                    layout="fill"
                    objectFit="cover"
                    alt={user.name}
                  />
                </Box>
                <Box paddingLeft={4} sx={{ textAlign: "center" }}>
                  <Typography variant="h4" component="h2">
                    {user.name}
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    {user.occupation}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "12px",
                  marginBottom: "24px",
                }}
              >
                {Array.isArray(user.top_teches) &&
                  (user.top_teches as string[]).map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      color="primary"
                      sx={{
                        color: "black", // Sets text color to black
                        fontSize: "16px", // Adjusts the text size slightly larger
                      }}
                    />
                  ))}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  gap: "16px",
                }}
              ></Box>
            </Box>
          </TinderCard>
        ))}
      </div>
      <Box display="flex" justifyContent="center" gap={6} mb={1} mt={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => swipe("left")}
            disabled={users.length === 0}
            sx={{
              width: "200px",
              height: "60px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white", // White background for the down button
              color: "black", // Black text
              borderRadius: "8px", // Rounded corners
              padding: "12px", // Add padding here
              "&:hover": { backgroundColor: "#f0f0f0" }, // Light gray on hover
            }}
          >
            <ThumbDownAltIcon sx={{ fontSize: 40 }} />
            <Typography variant="body1">パス</Typography>
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => swipe("right")}
            disabled={users.length === 0}
            sx={{
              width: "200px",
              height: "60px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "primary.main", // Primary background for the up button
              color: "black", // Black text
              borderRadius: "8px", // Rounded corners
              padding: "12px", // Add padding here
              "&:hover": { backgroundColor: "primary.dark" }, // Darker shade on hover
            }}
          >
            <ThumbUpAltIcon sx={{ fontSize: 40 }} />
            <Typography variant="body1">いいね</Typography>
          </IconButton>
        </Box>
      </Box>

      <div>
        <button
          className="bg-red-500 text-white font-bold py-2 px-4 w-36 rounded hover:bg-red-700 transition duration-200 mt-24"
          onClick={async () => {
            console.log(swipedRightUserIds);
            try {
              if (swipedRightUserIds.length > 0) {
                const data = await postSwipedRightUserIds(swipedRightUserIds);
                console.log(data);
              } else {
                console.warn("No users swiped right");
              }
            } catch (error) {
              console.error(error);
            }
          }}
        >
          終了
        </button>
      </div>
    </div>
  );
}
