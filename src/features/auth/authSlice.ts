import { createSlice, createSelector, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginFormValues, RegisterFormValues } from "./schemas";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  status: 'idle' | 'loading' | 'authenticated' | 'error';
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
};

// MOCK: replace with real POST /auth/login call once backend exists
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    const fakeUser: AuthUser = {
      id: typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" 
        ? crypto.randomUUID() 
        : `usr_${Math.random().toString(36).substring(2, 11)}`,
      name: credentials.email.split("@")[0].replace(".", " "),
      email: credentials.email,
      createdAt: new Date().toISOString(),
    };
    const fakeToken = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `tok_${Math.random().toString(36).substring(2, 17)}`;

    return { user: fakeUser, token: fakeToken };
  }
);

// MOCK: replace with real POST /auth/register call once backend exists
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values: RegisterFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const fakeUser: AuthUser = {
      id: typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" 
        ? crypto.randomUUID() 
        : `usr_${Math.random().toString(36).substring(2, 11)}`,
      name: values.name,
      email: values.email,
      createdAt: new Date().toISOString(),
    };
    const fakeToken = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `tok_${Math.random().toString(36).substring(2, 17)}`;

    return { user: fakeUser, token: fakeToken };
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
    },
    hydrateAuth: (state, action: PayloadAction<{ user: AuthUser | null; token: string | null }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = action.payload.user ? "authenticated" : "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = "authenticated";
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "error";
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = "authenticated";
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { logout, hydrateAuth } = authSlice.actions;

export const selectAuth = (state: { auth: AuthState }) => state.auth;

export const selectCurrentUser = createSelector(
  [selectAuth],
  (auth) => auth.user
);

export const selectIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => auth.status === "authenticated"
);

export default authSlice.reducer;
