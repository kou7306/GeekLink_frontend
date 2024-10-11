import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search"; // 検索アイコン
import ShuffleIcon from "@mui/icons-material/Shuffle"; // ランダムアイコン
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
      {/* 絞り込みボタン */}
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          position: "fixed",
          top: "10%",
          right: "8%",
          color: "secondary.contrastText",
          backgroundColor: "secondary.main",
          borderRadius: "8px",
          padding: "8px 16px",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#1f235a",
          },
        }}
        startIcon={<SearchIcon />} // 検索アイコンを追加
      >
        検索
      </Button>

      {/* ランダムマッチボタン */}
      <Button
        onClick={() => {
          router.push("/random-match");
        }}
        variant="contained"
        sx={{
          position: "fixed",
          bottom: "5%",
          right: "8%",
          width: "56px", // 幅を指定
          height: "56px", // 高さを指定
          borderRadius: "50%", // 丸いボタンにする
          backgroundColor: "secondary.main",
          color: "secondary.contrastText",
          fontWeight: "bold",
          display: "flex",
          flexDirection: "column", // 縦方向に配置
          alignItems: "center", // 中央に配置
          justifyContent: "center", // 中央に配置
          padding: "8px", // パディングを調整
          "&:hover": {
            backgroundColor: "#1f235a",
          },
        }}
      >
        <ShuffleIcon /> {/* ランダムアイコンを追加 */}
        {/* テキスト */}
      </Button>

      {/* モーダル */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Title />
          <Box mx={4} my={2}>
            {/* 各フィルターコンポーネント */}
            <Area
              handlePlaceClick={handlePlaceClick}
              selectedPlaces={selectedPlaces}
            />
            <Age handleAgeClick={handleAgeClick} selectedAges={selectedAges} />
            <Hobby onChangeHobby={onChangeHobby} enteredHobby={enteredHobby} />
            <Tech
              handleFirstTechClick={handleFirstTechClick}
              selectedFirstTechs={selectedFirstTechs}
            />
            <Occupation
              handleOccupationClick={handleOccupationClick}
              selectedOccupations={selectedOccupations}
            />
            <Graduate
              handleGraduateClick={handleGraduateClick}
              selectedGraduates={selectedGraduates}
            />
            <DesiredOccupation
              handleDesiredOccupationClick={handleDesiredOccupationClick}
              selectedDesiredOccupations={selectedDesiredOccupations}
            />
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
