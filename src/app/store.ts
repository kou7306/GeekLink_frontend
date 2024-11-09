import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/redux/authSlice";
import { bonusReducer } from "@/redux/bonusSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bonus: bonusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
