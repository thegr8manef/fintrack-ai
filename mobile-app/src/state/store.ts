/**
 * FinTrack AI — Redux Store Configuration
 *
 * Combines all state slices and API middleware:
 * - auth:         Authentication state (tokens, userId, isAuthenticated)
 * - user:         User profile and preferences
 * - transactions: Local transaction cache
 * - [apiSlice]:   RTK Query cache for all API calls
 *
 * RTK Query middleware handles automatic cache invalidation,
 * request deduplication, and background refetching.
 */
import { configureStore } from "@reduxjs/toolkit";
import { transactionSlice } from "../features/transactions/transactionSlice";
import { authSlice } from "../features/auth/authSlice";
import { userSlice } from "../features/user/userSlice";
import { apiSlice } from "../services/api";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    transactions: transactionSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
