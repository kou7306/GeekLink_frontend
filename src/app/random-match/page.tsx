"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { getRandomUsers } from "../../utils/getRandomMatchUser";
import { User } from "../../utils/getRandomMatchUser";
import { postSwipedRightUserIds } from "../../utils/CreateLike";
import Image from "next/image";
import { Box, Button, Chip, IconButton, Link, Typography } from "@mui/material";

export default function Home() {
  const characters = [
    {
      name: "Asuka",
      image: "/img/AsukaSouryu.jpg",
      user_id: "1",
      imageURL: "/img/AsukaSouryu.jpg",
      age: 14,
      sex: "female",
      place: "東京都",
      occupation: "学部3年生",
      top_teches: ["Python", "JavaScript", "React"],
    },
    {
      name: "Gendo Ikari",
      image: "/img/GendoIkari.jpg",
      user_id: "2",
      imageURL: "/img/GendoIkari.jpg",
      age: 48,
      sex: "male",
      place: "東京都",
      occupation: "学生エンジニア",
      top_teches: ["Java", "C++", "Python"],
    },
    // {
    //   name: "Kaoru Nagisa",
    //   imageURL: "/img/KaoruNagisa.jpg",
    // },
    // {
    //   name: "Rei Ayanami",
    //   imageURL: "/img/ReiAyanami.jpeg",
    // },
    // {
    //   name: "Shinji Ikari",
    //   imageURL: "/img/ShinjiIkari.jpg",
    // },
  ];
  type TinderCardInstance = {
    swipe: (dir?: string) => Promise<void>;
    restoreCard: () => Promise<void>;
  };

  const [currentIndex, setCurrentIndex] = useState(characters.length - 1);
  const [lastDirection, setLastDirection] = useState("");
  const currentIndexRef = useRef(currentIndex);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [swipedRightUserIds, setSwipedRightUserIds] = useState<string[]>([]);

  const childRefs = useRef(
    Array(characters.length)
      .fill(0)
      .map(() => React.createRef<TinderCardInstance>())
  ).current;

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < characters.length - 1;

  const canSwipe = currentIndex >= 0;

  const swiped = (direction: string, nameToDelete: string) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
    updateCurrentIndex(currentIndex - 1);
  };

  const outOfFrame = (name: string) => {
    console.log(name + " をスワイプしました！");
  };

  useEffect(() => {
    console.log(swipedRightUserIds);
  }, [swipedRightUserIds]);

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex >= 0 && currentIndex < users.length) {
      const user = users[currentIndex];
      setCurrentUser(user);
      if (dir === "right") {
        setSwipedRightUserIds([...swipedRightUserIds, user.user_id]);
      }

      await childRefs[currentIndex].current?.swipe(dir);
      updateCurrentIndex(currentIndex - 1);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    if (childRefs[newIndex]?.current) {
      await childRefs[newIndex]?.current?.restoreCard();
    }
  };

  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getRandomUsers();
        setUsers(users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full ">
      <h1 className="text-3xl pb-6">ランダムマッチ</h1>
      <div className="flex items-center justify-center w-[200vw] max-w-[260px] h-[300px]">
        {users.length > 0 ? (
          users.map((user, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="absolute"
              key={user.user_id}
              onSwipe={(dir) => swiped(dir, user.name)}
              onCardLeftScreen={() => outOfFrame(user.name)}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "500px",
                  maxWidth: "400px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
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
                      <Chip key={tech} label={tech} />
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
          ))
        ) : (
          <div>No users available</div>
        )}
      </div>
      <Box display="flex" justifyContent="center" gap={2} mb={1}>
        <IconButton
          onClick={() => {
            swipe("left");
          }}
          disabled={users.length === 0}
        >
          <ThumbDownAltIcon sx={{ fontSize: 40 }} />
        </IconButton>
        <IconButton
          onClick={() => {
            swipe("right");
          }}
          disabled={users.length === 0}
        >
          <ThumbUpAltIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>
      <div>
        <button
          className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-200"
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
