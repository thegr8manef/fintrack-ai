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
