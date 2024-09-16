import { Box, Divider, ListItem, Typography } from "@mui/material";
import React from "react";

type Team = {
  id: number;
  name: string;
};

type Props = {
  item: Team;
  key: number;
};

const Team = ({ item, key }: Props) => {
  return (
    <React.Fragment key={key}>
      <ListItem sx={{ py: 2, px: 0 }}>
        <Box
          sx={{
            width: "80%",
            height: 80,
            bgcolor: "grey.300",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="h2">
            {item.name}
          </Typography>
        </Box>
      </ListItem>
      {key < 2 && <Divider />}
    </React.Fragment>
  );
};

export default Team;
