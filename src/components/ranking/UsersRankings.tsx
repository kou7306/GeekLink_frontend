import React from "react";
import UsersRanking from "../top-page/UsersRanking";
import { Box, Typography } from "@mui/material";
import { RankingData } from "../../types/ranking";

interface UsersRankingsProps {
  data: RankingData;
}

const UsersRankings: React.FC<UsersRankingsProps> = ({ data }) => {
  const { activity, contribution, star, qiita } = data;

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box>
        <Box display="flex" flexDirection="row" gap={2}>
          {/* Activity */}
          <Box flex={1}>
            <Typography
              variant="h6"
              component="span"
              sx={{ color: "text.secondary", ml: 4 }}
            >
              GeekLink Activities
            </Typography>
            {[{ data: activity, type: "activity" }].map((ranking, index) => (
              <Box key={index} p={2} borderRadius={1}>
                <UsersRanking data={ranking.data} type={ranking.type} />
              </Box>
            ))}
            {Array.from({ length: 5 - activity.length }).map((_, index) => (
              <Box key={`empty-${index}`} p={2} borderRadius={1}></Box>
            ))}
          </Box>

          {/* Contribution */}
          <Box flex={1}>
            <Typography
              variant="h6"
              component="span"
              sx={{ color: "text.secondary", ml: 4 }}
            >
              GitHub Contributions
            </Typography>
            {[{ data: contribution, type: "contribution" }].map(
              (ranking, index) => (
                <Box key={index} p={2} borderRadius={1}>
                  <UsersRanking data={ranking.data} type={ranking.type} />
                </Box>
              )
            )}
            {Array.from({ length: 5 - contribution.length }).map((_, index) => (
              <Box key={`empty-${index}`} p={2} borderRadius={1}></Box>
            ))}
          </Box>
        </Box>

        <Box display="flex" flexDirection="row" gap={2} mt={6}>
          {/* Star */}
          <Box flex={1}>
            <Typography
              variant="h6"
              component="span"
              sx={{ color: "text.secondary", ml: 4 }}
            >
              GitHub Stars
            </Typography>
            {[{ data: star, type: "star" }].map((ranking, index) => (
              <Box key={index} p={2} borderRadius={1}>
                <UsersRanking data={ranking.data} type={ranking.type} />
              </Box>
            ))}
            {Array.from({ length: 5 - star.length }).map((_, index) => (
              <Box key={`empty-${index}`} p={2} borderRadius={1}></Box>
            ))}
          </Box>

          {/* Qiita */}
          <Box flex={1}>
            <Typography
              variant="h6"
              component="span"
              sx={{ color: "text.secondary", ml: 4 }}
            >
              Qiita Posts
            </Typography>
            {[{ data: qiita, type: "qiita" }].map((ranking, index) => (
              <Box key={index} p={2} borderRadius={1}>
                <UsersRanking data={ranking.data} type={ranking.type} />
              </Box>
            ))}
            {Array.from({ length: 5 - qiita.length }).map((_, index) => (
              <Box key={`empty-${index}`} p={2} borderRadius={1}></Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UsersRankings;
