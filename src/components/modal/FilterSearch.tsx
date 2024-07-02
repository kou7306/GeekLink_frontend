import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { ThemeProvider, createTheme } from "@mui/material";
import Area from "./Area";
import Age from "./Age";
import Hobby from "./Hobby";
import Tech from "./Tech";
import Occupation from "./Occupation";
import Graduate from "./Graduate";
import DesiredOccupation from "./DesiredOccupation";
import Experience from "./Experience";
import SearchButton from "./SearchButton";
import Title from "./Title";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "background.paper",
  boxShadow: 24,
  maxHeight: "80vh",
  overflowY: "auto",
  borderRadius: "16px",
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#22d3ee",
    },
  },
});

const FilterSearch = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button onClick={handleOpen}>絞り込み</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Title />
            <Box mx={4} my={2}>
              {/* 都道部県で探す */}
              <Area />
              {/* 年齢層で探す */}
              <Age />
              {/* 趣味で探す */}
              <Hobby />
              {/* 得意言語一位で探す */}
              {/* TODO:一位のもののデータを表示する */}
              <Tech />
              {/* 職業で探す */}
              <Occupation />
              {/* 卒業年度で探す */}
              <Graduate />
              {/* 希望職種で探す */}
              <DesiredOccupation />
              {/* 経験で探す */}
              <Experience />
              <SearchButton />
            </Box>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
};

export default FilterSearch;
