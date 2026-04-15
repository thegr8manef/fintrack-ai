/**
 * FinTrack AI — Auth API Slice (RTK Query)
 *
 * API endpoints for authentication:
 *   POST /auth/login    — Login with email + password, returns tokens
 *   POST /auth/register — Create account, returns tokens
 *   POST /auth/refresh  — Refresh access token using refresh token
 *
 * All mutations return: { accessToken, refreshToken, userId }
 * Used by LoginScreen to authenticate users.
 */
import { apiSlice } from "../../services/api";

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    refresh: builder.mutation<AuthResponse, { refreshToken: string }>({
      query: (body) => ({
        url: "/auth/refresh",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useRefreshMutation } =
  authApi;
