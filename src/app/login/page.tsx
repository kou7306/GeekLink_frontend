import SignOutButton from "@/components/auth/SignOutButton";
import LoginForm from "@/components/auth/LoginForm";
import LoginButton from "@/components/auth/LoginButton";
import { getUser } from "@/lib/auth";
import SignInButton from "@/components/auth/SignInButton";
import { Box, Typography, Paper, Stack, Chip } from "@mui/material";

async function LoginPage() {
  const user = await getUser();

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
        ログイン
      </Typography>
      {user ? (
        <Stack spacing={3} alignItems="center">
          <SignOutButton />
        </Stack>
      ) : (
        <Paper
          elevation={6}
          sx={{
            p: 6,
            maxWidth: "sm",
            width: "100%",
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        >
          <Stack spacing={4}>
            <LoginForm scene="sign-in" />
            <Box position="relative" mt={2}>
              <Chip
                label="おすすめ"
                color="secondary"
                size="small"
                sx={{
                  position: "absolute",
                  top: -10,
                  left: -10,
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              />
              <LoginButton provider="github" />
            </Box>
            <LoginButton provider="google" />
            <Box pt={4} display="flex" justifyContent="flex-end">
              <SignInButton isGuest />
            </Box>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}

export default LoginPage;
