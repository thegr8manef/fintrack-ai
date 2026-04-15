/**
 * FinTrack AI — Auth State Slice (Redux Toolkit)
 *
 * Manages authentication state:
 * - isAuthenticated: Boolean flag for auth-gated navigation
 * - accessToken:     JWT for API Authorization header
 * - refreshToken:    Token for refreshing expired access tokens
 * - userId:          Current user's UUID (used to fetch user-specific data)
 *
 * Actions:
 * - setCredentials(): Called after successful login/register
 * - logout():         Clears all auth state, returns user to login screen
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  userId: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        userId: string;
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.userId;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.userId = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
