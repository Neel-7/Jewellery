import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
  quickViewProductId: string | null;
}

const initialState: UIState = {
  quickViewProductId: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openQuickView: (state, action: PayloadAction<string>) => {
      state.quickViewProductId = action.payload;
    },
    closeQuickView: (state) => {
      state.quickViewProductId = null;
    },
  },
});

export const { openQuickView, closeQuickView } = uiSlice.actions;

export default uiSlice.reducer;
