import React from "react";
import { User } from "./options";
import { Box, Typography } from "@mui/material";

type Props = {
  user: User;
};

const OtherInformation = ({ user }: Props) => {
  return (
    <Box marginTop={2}>
      <Typography variant="h6" fontWeight={600}>
        その他
      </Typography>
      <Box marginLeft={2} marginTop={2}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              資格
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {user.qualification?.map((qualification, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  bgcolor="grey.100"
                  px={1}
                  py={0.5}
                  borderRadius={1}
                >
                  {qualification}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              趣味
            </Typography>
            <Typography variant="body2">{user.hobby}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OtherInformation;
