"use client";

import React, { useState } from "react";
import SignInButton from "@/components/auth/SignInButton";
import SignUpButton from "@/components/auth/SignUpButton";
import Link from "next/link";
import { Box, TextField, Button, Stack } from "@mui/material";

interface LoginFormProps {
  scene: string;
}

function LoginForm({ scene }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box sx={{ maxWidth: "md", width: "100%" }}>
      <Stack spacing={3}>
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            sx: {
              color: "text.primary",
              backgroundColor: "warning.main",
              borderRadius: 8,
            },
          }}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            sx: {
              color: "text.primary",
              backgroundColor: "warning.main",
              borderRadius: 8,
            },
          }}
        />
        {scene === "sign-in" ? (
          <Stack spacing={2} alignItems="center">
            <SignInButton email={email} password={password} />
            <Link href="/sign-up" passHref>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{
                  backgroundColor: "background.default",
                  borderRadius: 8,
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                  },
                }}
              >
                新規登録はこちら
              </Button>
            </Link>
          </Stack>
        ) : (
          <Stack spacing={2} alignItems="center">
            <SignUpButton email={email} password={password} />
            <Link href="/login" passHref>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{
                  backgroundColor: "background.default",
                  borderRadius: 8,
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                  },
                }}
              >
                アカウントをお持ちの方はこちら
              </Button>
            </Link>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

export default LoginForm;
