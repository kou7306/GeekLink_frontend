"use client";

import LoginButton from "@/components/auth/LoginButton";
import LoginForm from "@/components/auth/LoginForm";
import { Box, Typography, Paper, Stack } from "@mui/material";

const SignUpPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: -10,
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={4} color="text.primary">
        新規登録
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: "sm",
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        <Stack spacing={4}>
          <LoginForm scene="sign-up" />
          <LoginButton provider="github" />
          <LoginButton provider="google" />
        </Stack>
      </Paper>
    </Box>
  );
};

export default SignUpPage;
