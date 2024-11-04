// // src/features/auth/authSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // ログイン状態を確認する非同期処理を定義
// export const checkLoginStatus = createAsyncThunk(
//   "auth/checkLoginStatus",
//   async () => {
//     const response = await fetch("/api/checkLogin"); // APIに置き換える
//     const data = await response.json();
//     return data.isLoggedIn;
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     isLoggedIn: false,
//     status: "idle", // 状態管理用：idle, loading, succeeded, failed
//   },
//   reducers: {
//     logout: (state) => {
//       state.isLoggedIn = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(checkLoginStatus.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(checkLoginStatus.fulfilled, (state, action) => {
//         state.isLoggedIn = action.payload;
//         state.status = "succeeded";
//       })
//       .addCase(checkLoginStatus.rejected, (state) => {
//         state.status = "failed";
//       });
//   },
// });

// export const { logout } = authSlice.actions;

// export default authSlice.reducer;
