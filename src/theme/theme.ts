import { createTheme } from "@mui/material";

//MUIのテーマをカスタマイズ
const theme = createTheme({
  palette: {
    primary: {
      main: "#22d3ee",
      contrastText: "#111827",
    },
    secondary: {
      main: "#25276D",
      contrastText: "white",
    },
    text: {
      primary: "#111827",
    },
  },
});

export default theme;
