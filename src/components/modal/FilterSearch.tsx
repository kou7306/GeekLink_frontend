import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
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
import { useRouter } from "next/navigation";

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

type Props = {
  handlePlaceClick: (place: string) => void;
  selectedPlaces: string[];
  handleAgeClick: (age: string) => void;
  selectedAges: string[];
  onChangeHobby: (hobby: string) => void;
  enteredHobby: string;
  handleFirstTechClick: (firstTech: string) => void;
  selectedFirstTechs: string[];
  handleOccupationClick: (occupation: string) => void;
  selectedOccupations: string[];
  handleGraduateClick: (graduateOption: string) => void;
  selectedGraduates: string[];
  handleDesiredOccupationClick: (desiredOccupationOption: string) => void;
  selectedDesiredOccupations: string[];
  handleExperienceClick: (experienceOption: string) => void;
  selectedExperiences: string[];
  onSearch: () => void;
};

const FilterSearch: React.FC<Props> = ({
  handlePlaceClick,
  selectedPlaces,
  handleAgeClick,
  selectedAges,
  onChangeHobby,
  enteredHobby,
  handleFirstTechClick,
  selectedFirstTechs,
  handleOccupationClick,
  selectedOccupations,
  handleGraduateClick,
  selectedGraduates,
  handleDesiredOccupationClick,
  selectedDesiredOccupations,
  handleExperienceClick,
  selectedExperiences,
  onSearch,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const router = useRouter();

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          color: "secondary.contrastText",
          backgroundColor: "secondary.main",
          borderRadius: "8px",
          padding: "8px 16px",
          fontWeight: "bold",
          margin: "8px",
          "&:hover": {
            backgroundColor: "#1f235a",
          },
        }}
      >
        絞り込み
      </Button>
      <Button
        onClick={() => {
          router.push("/random-match");
        }}
        variant="contained"
        sx={{
          backgroundColor: "secondary.main",
          color: "secondary.contrastText",
          borderRadius: "8px",
          padding: "8px 16px",
          fontWeight: "bold",
          margin: "8px",
          "&:hover": {
            backgroundColor: "#1f235a",
          },
        }}
      >
        ランダムマッチ
      </Button>
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
            <Area
              handlePlaceClick={handlePlaceClick}
              selectedPlaces={selectedPlaces}
            />
            {/* 年齢層で探す */}
            <Age handleAgeClick={handleAgeClick} selectedAges={selectedAges} />
            {/* 趣味で探す */}
            <Hobby onChangeHobby={onChangeHobby} enteredHobby={enteredHobby} />
            {/* 得意言語一位で探す */}
            {/* TODO:一位のもののデータを表示する */}
            <Tech
              handleFirstTechClick={handleFirstTechClick}
              selectedFirstTechs={selectedFirstTechs}
            />
            {/* 職業で探す */}
            <Occupation
              handleOccupationClick={handleOccupationClick}
              selectedOccupations={selectedOccupations}
            />
            {/* 卒業年度で探す */}
            <Graduate
              handleGraduateClick={handleGraduateClick}
              selectedGraduates={selectedGraduates}
            />
            {/* 希望職種で探す */}
            <DesiredOccupation
              handleDesiredOccupationClick={handleDesiredOccupationClick}
              selectedDesiredOccupations={selectedDesiredOccupations}
            />
            {/* 経験で探す */}
            <Experience
              handleExperienceClick={handleExperienceClick}
              selectedExperiences={selectedExperiences}
            />
            <SearchButton onClick={onSearch} />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default FilterSearch;
