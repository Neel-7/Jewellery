import { createSlice, createSelector, type PayloadAction } from "@reduxjs/toolkit";
import type { WishlistItem, Product } from "@/types";

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
    toggleWishlistItem: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item.product.id === product.id);

      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push({ product });
      }
      state.totalQuantity = state.items.length;
    },
    removeWishlistItem: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.product.id !== productId);
      state.totalQuantity = state.items.length;
    },
    clearWishlist: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
    hydrateWishlist: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload;
      state.totalQuantity = action.payload.length;
    },
  },
});

export const {
  toggleWishlistItem,
  removeWishlistItem,
  clearWishlist,
  hydrateWishlist,
} = wishlistSlice.actions;

// Selectors
export const selectWishlist = (state: { wishlist: WishlistState }) => state.wishlist;

export const selectWishlistItems = createSelector(
  [selectWishlist],
  (wishlist) => wishlist.items
);

export const selectWishlistTotalQuantity = createSelector(
  [selectWishlist],
  (wishlist) => wishlist.totalQuantity
);

export const selectWishlistItemIds = createSelector(
  [selectWishlistItems],
  (items) => items.map((item) => item.product.id)
);

// Selector factory to cheaply check if a specific product ID is wishlisted
export const selectIsWishlisted = (productId: string) =>
  createSelector([selectWishlistItems], (items) =>
    items.some((item) => item.product.id === productId)
  );

export default wishlistSlice.reducer;
