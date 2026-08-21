import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
  quickViewProductId: string | null;
  searchOpen: boolean;
}

const initialState: UIState = {
  quickViewProductId: null,
  searchOpen: false,
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
    openSearch: (state) => {
      state.searchOpen = true;
    },
    closeSearch: (state) => {
      state.searchOpen = false;
    },
  },
});

export const { openQuickView, closeQuickView, openSearch, closeSearch } =
  uiSlice.actions;

export default uiSlice.reducer;
