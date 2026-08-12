import { createSlice } from "@reduxjs/toolkit";
import type { WishlistItem } from "@/types";

export interface WishlistState {
  items: WishlistItem[];
  totalQuantity: number;
}

const initialState: WishlistState = {
  items: [],
  totalQuantity: 0,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Wishlist reducers will be implemented in the follow-up pass
  },
});

export default wishlistSlice.reducer;