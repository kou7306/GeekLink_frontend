"use client";
import React, { useMemo } from "react";
import { useEffect, useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import UndoIcon from "@mui/icons-material/Undo";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { getRandomUsers } from "../../utils/getRandomMatchUser";
import { User } from "../../utils/getRandomMatchUser";
import { postSwipedRightUserIds } from "../../utils/CreateLike";
import Image from "next/image";
import { Chip } from "@mui/material";

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
    console.log(name + " left the screen!");
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
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-custom-gradient">
      <h1 className="text-3xl font-bold pb-6">Random-match</h1>
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
              <div className="flex flex-col items-center relative bg-white w-[520px] max-w-[600px] h-[300px] rounded-[20px] shadow-lg">
                <div className="flex items-center pl-8 pr-4 mt-7 mb-7">
                  {user.imageURL ? (
                    <Image
                      src={user.imageURL}
                      alt="Profile Icon"
                      width={160}
                      height={160}
                      className="rounded-full w-[120px] h-[120px] object-cover mr-8"
                    />
                  ) : (
                    <Image
                      src="/img/default_icon.png" // 代替画像のパスを設定してください
                      alt="Profile Icon"
                      className="rounded-full w-[120px] h-[120px] object-cover mr-8"
                    />
                  )}
                  <p className="text-3xl font-bold mx-7">{user.name}</p>
                </div>
                <div className="flex flex-wrap px-5">
                  <Chip
                    label={`${user.age}歳`}
                    color="success"
                    sx={{
                      mx: 0.5,
                      my: 0.5,
                    }}
                  />
                  <Chip
                    label={user.sex}
                    color="success"
                    sx={{
                      mx: 0.5,
                      my: 0.5,
                    }}
                  />
                  <Chip
                    label={user.place}
                    color="primary"
                    sx={{
                      mx: 0.5,
                      my: 0.5,
                    }}
                  />
                  <Chip
                    label={user.occupation}
                    color="info"
                    sx={{ mx: 0.5, my: 0.5 }}
                  />

                  {user.top_teches &&
                    user.top_teches.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        color="warning"
                        sx={{
                          mx: 0.5,
                          my: 0.5,
                        }}
                      />
                    ))}
                </div>
              </div>
            </TinderCard>
          ))
        ) : (
          <div>No users available</div>
        )}
      </div>
      {lastDirection ? (
        <h2 className="infoText">You swiped {lastDirection}</h2>
      ) : (
        <h2 className="infoText" />
      )}
      <div className="flex space-x-4 mt-4">
        <button
          className="transform transition-transform duration-200 active:scale-90"
          onClick={() => swipe("left")}
          disabled={users.length === 0}
        >
          <ThumbDownAltIcon />
        </button>
        <button
          className="transform transition-transform duration-200 active:scale-90"
          onClick={goBack}
          disabled={users.length === 0}
        >
          <UndoIcon />
        </button>
        <button
          className="transform transition-transform duration-200 active:scale-90"
          onClick={() => {
            swipe("right");
          }}
          disabled={users.length === 0}
        >
          <ThumbUpAltIcon />
        </button>
      </div>
      <div>
        <button
          className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-200"
          onClick={async () => {
            console.log(swipedRightUserIds);
            // window.location.href = '/';
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
