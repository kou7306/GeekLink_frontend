"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { User } from "@/types/user";
import Link from "next/link";

interface Ball {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  imageUrl: string;
  startTime: Date | null;
  motivation: string;
  userLink: string;
  radius: number;
}

const OnlineUserIcons = () => {
  const [balls, setBalls] = useState<Ball[]>([]);
  const [hoveredUser, setHoveredUser] = useState<Ball | null>(null);
  const animationFrameRef = useRef<number>();
  const BALL_MIN_SIZE = 70;
  const BALL_MAX_SIZE = 120;
  const FORCE_TO_CENTER = 0.6;
  const REPULSION = 0.6;
  const FRICTION = 0.9;

  const COLLISION_SCALE = 1.3;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/get-online-users`
        );
        const onlineUsers: User[] = await response.json();

        const initialBalls = onlineUsers.map((user) => {
          const side = Math.floor(Math.random() * 4);
          const width = window.innerWidth;
          const height = window.innerHeight;
          let x = 0,
            y = 0;

          switch (side) {
            case 0:
              x = Math.random() * width;
              y = -BALL_MIN_SIZE;
              break;
            case 1:
              x = width + BALL_MIN_SIZE;
              y = Math.random() * height;
              break;
            case 2:
              x = Math.random() * width;
              y = height + BALL_MIN_SIZE;
              break;
            case 3:
              x = -BALL_MIN_SIZE;
              y = Math.random() * height;
              break;
          }

          const radius =
            calculateIconSize(
              user.start_work_time ? new Date(user.start_work_time) : null
            ) / 2;

          return {
            id: user.user_id,
            x,
            y,
            vx: 0,
            vy: 0,
            imageUrl: user.image_url || "/user.svg",
            startTime: user.start_work_time
              ? new Date(user.start_work_time)
              : null,
            motivation: user.motivation || "モチベーション情報なし",
            userLink: "/my-page/" + user.user_id || "/",
            radius,
          };
        });

        setBalls(initialBalls);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();

    const width = window.innerWidth;
    const height = window.innerHeight;
    const centerX = width / 2;
    const centerY = height / 2;

    const animate = () => {
      setBalls((prevBalls) => {
        const newBalls = prevBalls.map((ball) => {
          const dx = centerX - ball.x;
          const dy = centerY - ball.y;
          const distanceToCenter = Math.sqrt(dx * dx + dy * dy);

          let newVx = ball.vx + (dx / distanceToCenter) * FORCE_TO_CENTER;
          let newVy = ball.vy + (dy / distanceToCenter) * FORCE_TO_CENTER;

          prevBalls.forEach((otherBall) => {
            if (ball.id !== otherBall.id) {
              const diffX = ball.x - otherBall.x;
              const diffY = ball.y - otherBall.y;
              const distance = Math.sqrt(diffX * diffX + diffY * diffY);

              const minDistance =
                ball.radius * COLLISION_SCALE +
                otherBall.radius * COLLISION_SCALE;

              if (distance < minDistance) {
                const angle = Math.atan2(diffY, diffX);
                const force = (minDistance - distance) * REPULSION;

                newVx += Math.cos(angle) * force;
                newVy += Math.sin(angle) * force;

                const overlap = minDistance - distance;
                const correction = overlap / 2;

                ball.x += Math.cos(angle) * correction;
                ball.y += Math.sin(angle) * correction;
                otherBall.x -= Math.cos(angle) * correction;
                otherBall.y -= Math.sin(angle) * correction;
              }
            }
          });

          newVx *= FRICTION;
          newVy *= FRICTION;

          return {
            ...ball,
            x: Math.min(width - BALL_MAX_SIZE, Math.max(0, ball.x + newVx)),
            y: Math.min(height - BALL_MAX_SIZE, Math.max(0, ball.y + newVy)),
            vx: newVx,
            vy: newVy,
          };
        });

        return newBalls;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const calculateIconSize = (startTime: Date | null): number => {
    if (!startTime) return BALL_MIN_SIZE;
    const now = new Date();
    const elapsedHours = Math.floor(
      (now.getTime() - startTime.getTime()) / (1000 * 60 * 60)
    );
    return Math.min(BALL_MIN_SIZE + elapsedHours * 5, BALL_MAX_SIZE);
  };

  const handleMouseEnter = (ball: Ball) => setHoveredUser(ball);
  const handleMouseLeave = () => setHoveredUser(null);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {" "}
      {/* Updated to enable scrolling */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(0deg, #00dedc, #115d89, #080f1c)", // 背景色
        }}
      />
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-lg font-semibold text-primary z-10">
        作業中のユーザー数: {balls.length}
      </div>
      {balls.map((ball) => {
        const iconSize = calculateIconSize(ball.startTime);

        return (
          <Link href={ball.userLink} key={ball.id}>
            <div
              className="absolute z-10 cursor-pointer"
              style={{
                width: iconSize,
                height: iconSize,
                transform: `translate(${ball.x}px, ${ball.y}px)`,
              }}
              onMouseEnter={() => handleMouseEnter(ball)}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={ball.imageUrl}
                alt="User Icon"
                width={iconSize}
                height={iconSize}
                className="rounded-full"
              />
            </div>
          </Link>
        );
      })}
      {hoveredUser && (
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 bg-sub_base p-4 rounded-lg shadow-lg w-80 text-center z-20">
          <p>
            作業時間:{" "}
            {Math.floor(
              (new Date().getTime() - hoveredUser.startTime!.getTime()) /
                (1000 * 60 * 60)
            )}
            時間
          </p>
          <p>{hoveredUser.motivation}</p>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <div className="w-full h-full bg-black overflow-hidden">
      <OnlineUserIcons />
    </div>
  );
}