import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "@/features/products/api/productsApi";
import { couponApi } from "@/features/cart/api/couponApi";
import cartReducer from "@/features/cart/cartSlice";
import wishlistReducer, { hydrateWishlist } from "@/features/wishlist/wishlistSlice";
import uiReducer from "@/app/uiSlice";
import { loadWishlistFromStorage, saveWishlistToStorage } from "@/features/wishlist/wishlistPersistence";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, couponApi.middleware),
});

// Hydrate wishlist immediately upon store creation / app init
const initialWishlist = loadWishlistFromStorage();
if (initialWishlist.length > 0) {
  store.dispatch(hydrateWishlist(initialWishlist));
}

// Subscribe to store changes to persist wishlist updates
let currentWishlistItems = store.getState().wishlist.items;
store.subscribe(() => {
  const previousWishlistItems = currentWishlistItems;
  currentWishlistItems = store.getState().wishlist.items;
  if (previousWishlistItems !== currentWishlistItems) {
    saveWishlistToStorage(currentWishlistItems);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
