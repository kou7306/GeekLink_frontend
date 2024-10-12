"use client";

import { signOutAction } from "../../actions/users";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getUuidFromCookie } from "../../actions/users";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout"; // ログアウト用のアイコン
import Typography from "@mui/material/Typography";

function SignOutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClickSignOutButton = () => {
    startTransition(async () => {
      const uuid = await getUuidFromCookie();

      // ログアウト時にサジェストされたデータをキャッシュから削除
      const CACHE_KEY = `suggestData_${uuid}`;
      const CACHE_EXPIRY_KEY = `cacheExpiry_${uuid}`;
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(CACHE_EXPIRY_KEY);

      const { errorMessage } = await signOutAction();
      if (!errorMessage) {
        toast.success("Successfully Signed Out");
        router.push("/login");
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <IconButton
      onClick={() => handleClickSignOutButton()}
      disabled={isPending}
      color="inherit" // 背景色を付けないように指定
      sx={{
        "&:hover": {
          color: "primary.main", // アイコンのホバー時の色をプライマリーに変更
        },
      }}
    >
      <LogoutIcon />
      <Typography
        variant="body2"
        sx={{
          ml: 2, // マージンを追加
          transition: "color 0.3s", // スムーズなトランジション
          color: isPending ? "primary.main" : "inherit", // サインアウト中はプライマリー
          "&:hover": {
            color: "primary.main", // ホバー時に文字の色をPrimaryに
          },
        }}
      >
        {isPending ? "サインアウト中..." : "サインアウト"}
      </Typography>
    </IconButton>
  );
}

export default SignOutButton;
