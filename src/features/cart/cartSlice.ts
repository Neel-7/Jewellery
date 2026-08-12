import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "@/types";

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

/**
 * Calculates total quantities and total price for the cart.
 */
const recalculateTotals = (state: CartState) => {
  let qty = 0;
  let price = 0;
  state.items.forEach((item) => {
    qty += item.quantity;
    price += item.product.price * item.quantity;
  });
  state.totalQuantity = qty;
  state.totalPrice = price;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ product: Product; quantity: number; selectedVariant?: string }>
    ) => {
      const { product, quantity, selectedVariant } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant === selectedVariant
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          product,
          quantity,
          selectedVariant,
        });
      }
      recalculateTotals(state);
    },
    removeItem: (
      state,
      action: PayloadAction<{ productId: string; selectedVariant?: string }>
    ) => {
      const { productId, selectedVariant } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(item.product.id === productId && item.selectedVariant === selectedVariant)
      );
      recalculateTotals(state);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; selectedVariant?: string; quantity: number }>
    ) => {
      const { productId, selectedVariant, quantity } = action.payload;
      const item = state.items.find(
        (item) =>
          item.product.id === productId &&
          item.selectedVariant === selectedVariant
      );
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      recalculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;