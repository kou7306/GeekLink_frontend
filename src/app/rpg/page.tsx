"use client";
import RpgScreen from "@/components/rpg/RpgScreen";
import React, { useEffect, useState } from "react";
import { Box, Typography, LinearProgress, Button } from "@mui/material";
import LifeGauge from "@/components/rpg/LifeGauge";
import CoinDisplay from "@/components/rpg/CoinDisplay";
import { getUserData } from "@/utils/getUserData";
import { useRouter } from "next/navigation";
import { updateLife } from "@/utils/updateLife";
import { Link } from "@mui/material";
import { updatePosition } from "@/utils/updatePosition";

const items = [
  {
    x: -2,
    y: 3,
    name: "コイン",
    type: "coin",
    image: "coin.png",
    isCollected: false,
  },
  {
    x: 0,
    y: 6,
    name: "王冠",
    type: "costume",
    image: "crown.png",
    isCollected: true,
  },
  {
    x: 0,
    y: 9,
    name: "ライフ",
    type: "life",
    image: "life.png",
    isCollected: false,
  },
];

const Page = () => {
  const [lives, setLives] = useState<number>(0);
  const [coins, setCoins] = useState(0);
  const [error, setError] = useState("");
  const [positionX, setPositionX] = useState<number>(0);
  const [positionY, setPositionY] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData();
        console.log("Fetched user data:", data);
        setLives(Number(data.life));
        setCoins(data.coin);
        setPositionX(Number(data.position_x));
        setPositionY(Number(data.position_y));
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Failed to fetch user data.");
      }
    };

    fetchData();
  }, []);

  const handleLifeUpdate = async (change: number) => {
    const newLife = lives + change;
    if (newLife < 0) return;

    setLives(newLife);
    setError("");
    console.log("更新");
    try {
      await updateLife(newLife.toString());
    } catch (error) {
      console.error("Failed to update life:", error);
      setError("Failed to update life.");
      setLives(lives); // Revert UI if API call fails
    }
  };

  const handlePositionUpdate = async (x: number, y: number) => {
    const res = await updatePosition(x.toString(), y.toString());
    setPositionX(Number(res.positionX));
    setPositionY(Number(res.positionY));
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full p-6 overflow-hidden">
      <div className="absolute top-4 left-4">
        <LifeGauge lives={lives} />
      </div>
      <div className="absolute top-4 right-4">
        <CoinDisplay coins={coins} />
        <Button
          onClick={() => handlePositionUpdate(-positionX, -positionY + 3)}
        >
          座標リセット( デバッグ用 )
        </Button>
      </div>

      {/* <div className="absolute bottom-4 left-4">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleLifeUpdate(1)}
        >
          Increase Life
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleLifeUpdate(-1)}
        >
          Decrease Life
        </Button>
      </div> */}

      <RpgScreen
        handleLifeUpdate={handleLifeUpdate}
        handlePositionUpdate={handlePositionUpdate}
        positionX={positionX}
        positionY={positionY}
        lives={lives}
      />

      <Link href="/shop">
        <Button
          variant="contained"
          color="primary"
          className="absolute bottom-8 right-12"
          sx={{
            color: "white",
            fontSize: "1.25rem",
          }}
        >
          ショップ
        </Button>
      </Link>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Add Avatar in the bottom-left corner */}
      {/* <div className="absolute bottom-4 left-4">
        <AvatarViewer
          modelPath="/models/human.glb"
          size={{ width: 300, height: 500 }}
        />
        <Box sx={{ marginY: 8, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangeAvatar}
            sx={{ color: "white" }}
          >
            着替える
          </Button>
        </Box>
      </div> */}
    </div>
  );
};

export default Page;
