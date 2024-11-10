import React from "react";
import { User } from "./options";
import { Box, Chip, Typography } from "@mui/material";

type Props = {
  user: User;
};

const EngineerInformation = ({ user }: Props) => {
  return (
    <Box marginTop={6}>
      <Typography variant="h6" fontWeight={600}>
        エンジニア情報
      </Typography>
      <Box marginLeft={2} marginTop={2}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              プログラミング経験
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {user.experience?.map((experience, index) => (
                <Chip
                  key={index}
                  label={experience}
                  color="default"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              希望職種
            </Typography>
            <Typography variant="body2">{user.desired_occupation}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              好きなエディター
            </Typography>
            <Typography variant="body2">{user.editor}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EngineerInformation;
