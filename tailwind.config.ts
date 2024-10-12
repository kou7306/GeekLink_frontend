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
        secondary: "#432ee6", //メインの補助カラー
        base: "#212121", //背景
        sub_base: "#2F3232", //コンテンツの背景
        content_base: "#3e4242", //コンテンツの中のコンテンツの背景
        border: "#b5b5ba", //枠線
        accent: "#ee223c", //メインとは反対の色
        text: "#ffffff", //テキスト
        sub_text: "#b5b5ba", //枠線
        hover: "#4d5252", //hover時の色
        hover_blue: "#39dff7", //hover時の色
      },
    },
  },
  plugins: [],
};

export default config;
