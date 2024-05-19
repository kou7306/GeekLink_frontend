"use client";
import React, { useMemo } from "react";
import { useEffect, useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import UndoIcon from "@mui/icons-material/Undo";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { getRandomUsers } from "../../utils/getRandomMatchUser";
import { User } from "../../utils/getRandomMatchUser";
import { postSwipedRightUserIds } from '../../utils/CreateLike';
import Image from 'next/image'; 

export default function Home() {
  const characters = [
    {
      name: "Asuka",
      url: "/img/AsukaSouryu.jpg",
    },
    {
      name: "Gendo Ikari",
      url: "/img/GendoIkari.jpg",
    },
    {
      name: "Kaoru Nagisa",
      url: "/img/KaoruNagisa.jpg",
    },
    {
      name: "Rei Ayanami",
      url: "/img/ReiAyanami.jpeg",
    },
    {
      name: "Shinji Ikari",
      url: "/img/ShinjiIkari.jpg",
    },
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
      const users = await getRandomUsers();
      setUsers(users);
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <h1 className="text-3xl font-bold pb-6">Random-match</h1>
      <div className="flex items-center justify-center w-[200vw] max-w-[260px] h-[300px]">
        {users.map((user, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="absolute"
            key={user.user_id}
            onSwipe={(dir) => swiped(dir, user.name)}
            onCardLeftScreen={() => outOfFrame(user.name)}
          >
            <div className="flex items-center relative bg-white w-[520px] max-w-[600px] h-[300px] shadow-[0px_0px_60px_0px_rgba(0,0,0,0.30)] rounded-[20px]">
              <div className="flex-shrink-0 pl-8 pr-4">
              {user.imageURL ? (
                <Image 
                  src={user.imageURL}
                  alt="Profile Icon" 
                  width={160} 
                  height={160}
                  className="rounded-full w-[160px] h-[160px] object-cover" 
                />
              ) : (
                <img 
                  src="/img/default_icon.png" // 代替画像のパスを設定してください
                  alt="Profile Icon" 
                  className="rounded-full w-[160px] h-[160px] object-cover" 
                />
              )}
              </div>
              <div className="p-8">
                <p className="text-xl">名前：{user.name}</p>
                <p className="text-xl">年齢：{user.age}歳</p>
                <p className="text-xl">性別：{user.sex}</p>
                <p className="text-xl">在住：{user.place}</p>
                <p className="text-xl">職種：{user.occupation}</p>
                {user.top_teches && user.top_teches.map((tech, index) => (
                  <p key={index} className="text-xl">{index === 0 ? `技術：${tech}` : `　　　${tech}`}</p>
                ))}
              </div>
            </div>
          </TinderCard>
        ))}
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
        >
          <ThumbDownAltIcon />
        </button>
        <button
          className="transform transition-transform duration-200 active:scale-90"
          onClick={goBack}
        >
          <UndoIcon />
        </button>
        <button
          className="transform transition-transform duration-200 active:scale-90"
          onClick={() => {
            swipe("right");
          }}
        >
          <ThumbUpAltIcon />
        </button>
      </div>
      <div>
        <button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-200"
        onClick={async () => {
          console.log(swipedRightUserIds);
          // window.location.href = '/';
          try {
            const data = await postSwipedRightUserIds(swipedRightUserIds);
            console.log(data);
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
