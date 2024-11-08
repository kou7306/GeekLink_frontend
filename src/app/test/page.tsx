"use client";
import { useEffect } from "react";

const StarrySky = () => {
  useEffect(() => {
    const stars = document.querySelector(".stars") as HTMLElement;

    // 星をランダムなサイズと位置で生成する関数
    const createStar = () => {
      const starEl = document.createElement("span");
      starEl.className = "star";
      const minSize = 1; // 最小の星のサイズ
      const maxSize = 2; // 最大の星のサイズ
      const size = Math.random() * (maxSize - minSize) + minSize;
      starEl.style.width = `${size}px`;
      starEl.style.height = `${size}px`;

      // 星の位置をランダムに決定
      const left = Math.random() * 100;
      const top = Math.random() * 100;

      // `position: absolute` での配置を考慮して、親要素（`.stars`）の中でパーセントを使用する
      starEl.style.left = `${left}%`;
      starEl.style.top = `${top}%`;
      starEl.style.animationDelay = `${Math.random() * 5}s`; // ランダムなアニメーションの遅延

      stars?.appendChild(starEl);
    };

    // 500個の星を生成
    for (let i = 0; i <= 500; i++) {
      createStar();
    }
  }, []);

  return (
    <div
      className="stars relative w-full h-screen overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(0deg, #00dedc, #115d89, #080f1c)", // 背景色
      }}
    >
      {/* 他のコンテンツをここに追加できます */}
      <style jsx>{`
        .star {
          position: absolute;
          display: block;
          background-color: #ffc800; /* 星の色 */
          border-radius: 50%; /* 丸い星にする */
          box-shadow: 0 0 4px 2px rgba(255, 255, 255, 0.2); /* 星の影 */
          opacity: 1; /* 最初から星が見えるようにする */
          animation: twinkle 5s infinite; /* キラキラアニメーション */
        }

        @keyframes twinkle {
          0% {
            opacity: 0.5; /* アニメーション開始時は半透明 */
          }
          50% {
            transform: scale(1.1); /* 星が少し大きくなる */
            opacity: 1; /* 星が最も輝く */
          }
          100% {
            opacity: 0.5; /* 最後は再び半透明 */
            transform: scale(1); /* 元のサイズに戻る */
          }
        }
      `}</style>
    </div>
  );
};

export default StarrySky;
