import React from "react";

interface CoinDisplayProps {
  coins: number;
}

const CoinDisplay: React.FC<CoinDisplayProps> = ({ coins }) => {
  console.log("Coins in CoinDisplay:", coins); // デバッグ: coinsの値をログに出力

  return (
    <div className="flex items-center rounded-lg pr-4 shadow-lg">
      {/* coin.pngを表示 */}
      <img src="/img/coin.png" alt="Coin Icon" className="w-8 h-8" />
      <span className="ml-2 text-2xl font-bold text-yellow-400">{coins}</span>
    </div>
  );
};

export default CoinDisplay;
