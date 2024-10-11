import { createTheme } from "@mui/material";

// MUIのテーマをカスタマイズ
const theme = createTheme({
  palette: {
    primary: {
      main: "#2ecee6", // メインカラー
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#2c64c5", // メインの補助カラー
      contrastText: "#ffffff",
    },
    background: {
      default: "#2b2a36", // 背景
      paper: "#000000", // コンテンツの背景
    },
    text: {
      primary: "#ffffff", // テキスト
      secondary: "#b5b5ba", // 枠線
    },
    error: {
      main: "#ee223c", // メインとは反対の色
    },
  },
});

export default theme;
