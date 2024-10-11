import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#2ecee6", //メインカラー
        secondary: "#2c64c5", //メインの補助カラー
        base: "#2b2a36", //背景
        sub_base: "#2F3232", //コンテンツの背景
        border: "#b5b5ba", //枠線
        accent: "#ee223c", //メインとは反対の色
        text: "#ffffff", //テキスト
        sub_text: "#b5b5ba", //枠線
        hover: "#35373D", //hover時の色
        hover_blue: "#4171c4", //hover時の色
      },
    },
  },
  plugins: [],
};

export default config;
