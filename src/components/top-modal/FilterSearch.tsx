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
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Title />
            <Box mx={4} my={2}>
              <Area />
              <Age />
              <Hobby />
              <Tech />
              <Occupation />
              <Graduate />
              <DesiredOccupation />
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
