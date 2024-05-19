"use client";
import React, { useMemo } from "react";
import { useEffect, useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import UndoIcon from "@mui/icons-material/Undo";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { getRandomUsers } from "../../utils/getRandomMatchUser";
import { User } from "../../utils/getRandomMatchUser";
import { postSwipedRightUserIds } from '../../utils/CreateLike'; // api.jsのパスに合わせて変更してください

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
      setSwipedRightUserIds([...swipedRightUserIds, user.user_id]); // 右にスワイプしたときに、そのユーザーのIDを配列に追加
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
      <h1>Random-match</h1>
      <div className="w-[90vw] max-w-[260px] h-[300px]">
        {users.map((user, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="absolute"
            key={user.user_id}
            onSwipe={(dir) => swiped(dir, user.name)}
            onCardLeftScreen={() => outOfFrame(user.name)}
          >
            <div
              style={{ backgroundImage: "url(" + user.imageURL + ")" }}
              className="relative bg-white w-80 max-w-[260px] h-[300px] shadow-[0px_0px_60px_0px_rgba(0,0,0,0.30)] rounded-[20px] bg-cover bg-center"
            >
              <h3>{user.name}</h3>
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
