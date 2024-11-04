import React from "react";

interface LifeGaugeProps {
  lives: number;
}

const LifeGauge: React.FC<LifeGaugeProps> = ({ lives }) => {
  const segments = Array.from({ length: 5 }); // 5つのセグメントを作成

  // ライフが6以上のときのゲージの色
  const gaugeColor = lives >= 6 ? "bg-green-400" : "bg-cyan-400";
  const textColor = lives >= 6 ? "text-green-400" : "text-cyan-400";

  return (
    <div className="flex items-center">
      <div className="relative flex h-5 w-64 bg-gray-300 rounded-lg overflow-hidden">
        {segments.map((_, index) => (
          <div key={index} className="relative flex-1">
            <div
              className={`h-full ${
                index < lives ? `${gaugeColor} shadow-glow` : "bg-gray-300"
              } transition-all duration-300`}
              style={{ width: "100%" }} // 各セグメントの幅を100%に設定
            ></div>
            {/* 区切り線 */}
            {index < segments.length - 1 && (
              <div className="absolute h-full border-l-2 border-gray-400 right-0 top-0" />
            )}
          </div>
        ))}
      </div>
      <span className={`ml-4 text-xl font-bold ${textColor}`}>{lives} / 5</span>
    </div>
  );
};

export default LifeGauge;
