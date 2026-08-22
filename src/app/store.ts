import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "@/features/products/api/productsApi";
import { couponApi } from "@/features/cart/api/couponApi";
import cartReducer from "@/features/cart/cartSlice";
import wishlistReducer, { hydrateWishlist } from "@/features/wishlist/wishlistSlice";
import authReducer, { hydrateAuth } from "@/features/auth/authSlice";
import uiReducer from "@/app/uiSlice";
import { loadWishlistFromStorage, saveWishlistToStorage } from "@/features/wishlist/wishlistPersistence";
import { loadAuthFromStorage, saveAuthToStorage } from "@/features/auth/authPersistence";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
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

// Hydrate auth session immediately upon store creation / app init
const initialAuth = loadAuthFromStorage();
if (initialAuth) {
  store.dispatch(hydrateAuth(initialAuth));
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

// Subscribe to store changes to persist auth session updates
let currentAuth = {
  user: store.getState().auth.user,
  token: store.getState().auth.token,
};
store.subscribe(() => {
  const state = store.getState();
  const previousAuth = currentAuth;
  currentAuth = {
    user: state.auth.user,
    token: state.auth.token,
  };
  if (
    previousAuth.user !== currentAuth.user ||
    previousAuth.token !== currentAuth.token
  ) {
    saveAuthToStorage(currentAuth);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
