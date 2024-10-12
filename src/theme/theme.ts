import { createTheme } from "@mui/material";

// MUIのテーマをカスタマイズ
const theme = createTheme({
  palette: {
    primary: {
      main: "#2ecee6", // メインカラー
      contrastText: "#2ecee6",
    },
    secondary: {
      main: "#432ee6", // メインの補助カラー
      contrastText: "#2c64c5",
    },
    background: {
      default: "#323232", // 背景
      paper: "#2F3232", // コンテンツの背景
    },
    text: {
      primary: "#ffffff", // テキスト
      secondary: "#b5b5ba", // 枠線
    },
    error: {
      main: "#ee223c", // メインとは反対の色
    },
    info: {
      main: "#4d5252", //hover時の色
    },
    warning: {
      main: "#3e4242", // 黒の中のコンテンツ
    },
  },
});

export default theme;
