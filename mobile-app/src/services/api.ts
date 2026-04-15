/**
 * FinTrack AI — RTK Query API Slice (Base Configuration)
 *
 * Central API client used by all feature-specific API slices.
 * Configures fetchBaseQuery with:
 * - Dynamic base URL: 10.0.2.2 for Android emulator, localhost for iOS
 * - Automatic JWT bearer token injection from Redux auth state
 * - Tag types for cache invalidation: Transaction, User, Analytics, Currency
 *
 * Feature slices inject their endpoints via apiSlice.injectEndpoints().
 */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Platform } from "react-native";
import type { RootState } from "../state/store";

const HOST = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const API_BASE_URL = `http://${HOST}:3000/api/v1`;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Transaction", "User", "Analytics", "Currency"],
  endpoints: () => ({}),
});
