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
import { useParams } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  isMe: boolean;
};

const RepositoryList: React.FC<Props> = ({ isMe }) => {
  const { uuid } = useParams();

  const [repositories, setRepositories] = useState<Repository[]>([]);

  //個人のリポジトリを上から十件取得
  useEffect(() => {
    const fetchRepositories = async () => {
      let userUid = isMe ? (await getUuidFromCookie()) ?? uuid : uuid;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/github/repo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uuid: userUid }),
        }
      );
      const data = await res.json();
      setRepositories(data);
    };
    fetchRepositories();
  }, [isMe, uuid]);

  return (
    <>
      <Accordion sx={{ mt: 4 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
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
          <Box>
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
                    border: "1px solid #ccc",
                    borderRadius: "20px",
                  }}
                >
                  <RepositoryGraph repository={repository} />
                </Box>
              ))}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {/* 残りのレポジトリを表示 */}
          {repositories.length > 3 &&
            repositories
              .slice(4, repositories.length)
              .map((repository, index) => (
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
