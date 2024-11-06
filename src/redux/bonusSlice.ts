// bonusSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BonusState {
  lifeAdded: number;
  coinsAdded: number;
  bonusGranted: boolean;
}

const initialState: BonusState = {
  lifeAdded: 0,
  coinsAdded: 0,
  bonusGranted: false,
};

const bonusSlice = createSlice({
  name: "bonus",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<BonusState>) => {
      state.lifeAdded = action.payload.lifeAdded;
      state.coinsAdded = action.payload.coinsAdded;
      state.bonusGranted = true; // ボーナスが付与されたフラグ
    },
    reset: (state) => {
      state.lifeAdded = 0;
      state.coinsAdded = 0;
      state.bonusGranted = false;
    },
  },
});

export const { set, reset } = bonusSlice.actions;
export const bonusReducer = bonusSlice.reducer;
