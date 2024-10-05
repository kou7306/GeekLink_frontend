import React from "react";
import { User } from "./options";
import { Box, Typography } from "@mui/material";

type Props = {
  user: User;
};

const BasicInformation = ({ user }: Props) => {
  return (
    <>
      <Box marginTop={2}>
        <Typography variant="h6" fontWeight={600}>
          基本情報
        </Typography>
        <Box marginLeft={2} marginTop={2}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1" fontWeight={600} width={80}>
                年齢:
              </Typography>
              <Typography variant="body1">{user.age}歳</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1" fontWeight={600} width={80}>
                在住:
              </Typography>
              <Typography variant="body1">{user.place}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1" fontWeight={600} width={80}>
                性別:
              </Typography>
              <Typography variant="body1">{user.sex}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1" fontWeight={600} width={80}>
                職種:
              </Typography>
              <Typography variant="body1">{user.occupation}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1" fontWeight={600} width={80}>
                所属:
              </Typography>
              <Typography variant="body1">{user.affiliation}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BasicInformation;
