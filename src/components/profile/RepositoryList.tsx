import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import RepositoryGraph from "./RepositoryGraph";
import { Box, Typography, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface RepositoryListProps {
  uuid: string;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ uuid }) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [expanded, setExpanded] = useState(false); // 展開状態を管理

  // リポジトリを取得
  useEffect(() => {
    const fetchRepositories = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/github/repo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uuid }),
        }
      );
      const data = await res.json();
      setRepositories(data);
    };
    fetchRepositories();
  }, [uuid]);

  // 展開状態の切り替え
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  // リポジトリが存在するかチェックし、sliceによるエラーを防ぐ
  const repositoriesToShow =
    repositories.length > 0
      ? expanded
        ? repositories
        : repositories.slice(0, 3)
      : [];

  return (
    <Box
      sx={{
        marginLeft: 2,
        transition: "height 0.3s ease",
        height: "auto",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        padding: 2,
      }}
    >
      <Box marginX={4}>
        <Typography variant="h5" marginY={4}>
          レポジトリ一覧
        </Typography>

        {/* リポジトリがない場合でもスペースを確保 */}
        {repositoriesToShow.length > 0 ? (
          repositoriesToShow.map((repository, index) => (
            <Box
              key={index}
              display={"flex"}
              justifyContent={"center"}
              sx={{
                mb: 2,
                height: "200px",
                border: "1px solid #e5e7eb",
                borderRadius: "20px",
              }}
            >
              <RepositoryGraph repository={repository} />
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary" align="center">
            No repositories available.
          </Typography>
        )}

        {/* 常にスペースを確保し、リポジトリが3つ以上ある場合に展開ボタンを表示 */}
        <IconButton
          onClick={handleToggle}
          sx={{
            display: "flex",
            margin: "auto",
            marginTop: 2,
            visibility: repositories.length > 3 ? "visible" : "hidden", // アイコンの表示/非表示
          }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default RepositoryList;
