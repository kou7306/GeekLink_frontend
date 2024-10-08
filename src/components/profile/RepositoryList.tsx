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
import { getUuidFromCookie } from "@/actions/users";
import RepositoryGraph from "./RepositoryGraph";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RepositoryList = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [expanded, setExpanded] = useState(false); // アコーディオンの開閉状態を管理

  // 個人のリポジトリを上から十件取得
  useEffect(() => {
    const fetchRepositories = async () => {
      const uuid = await getUuidFromCookie();
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
  }, []);

  const handleAccordionChange = () => {
    setExpanded(!expanded); // アコーディオンの状態を切り替え
  };

  return (
    <>
      <Accordion
        expanded={expanded}
        onChange={handleAccordionChange}
        sx={{
          marginLeft: 2, // 右にマージンを追加
          transition: "height 0.3s ease", // スムーズな高さの変化
          height: expanded ? "auto" : "800px", // 開く前の高さを指定
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // ここでシャドウを追加
          borderRadius: 2, // 角を少し丸める場合は追加
          padding: 2, // パディングを追加
        }}
      >
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            flexDirection: "column",
            alignItems: "center",
            "& .MuiAccordionSummary-content": {
              margin: 0,
              flexDirection: "column",
              width: "100%",
            },
            minHeight: "auto",
            height: "auto",
          }}
        >
          <Box marginX={4}>
            <Typography variant="h5" marginY={4}>
              レポジトリ一覧
            </Typography>
            {/* 先頭3つだけデフォルトで見せる */}
            {repositories.length > 0 &&
              repositories.slice(0, 3).map((repository, index) => (
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
              ))}
          </Box>
          {/* 矢印アイコンをコンテンツの下に配置し、回転させる */}
          <ExpandMoreIcon
            sx={{
              mt: 2,
              mx: "auto", // 中央寄せ
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </AccordionSummary>
        <AccordionDetails>
          {/* 残りのレポジトリを表示 */}
          {repositories.length > 3 &&
            repositories.slice(3).map((repository, index) => (
              <Box
                key={index}
                display={"flex"}
                justifyContent={"center"}
                sx={{
                  mb: 2,
                  height: "200px",
                  border: "1px solid #ccc",
                  borderRadius: "20px",
                }}
              >
                <RepositoryGraph repository={repository} />
              </Box>
            ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default RepositoryList;
