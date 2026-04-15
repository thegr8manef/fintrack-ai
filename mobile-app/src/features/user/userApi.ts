/**
 * FinTrack AI — User API Slice (RTK Query)
 *
 * Endpoints for user profile management:
 *   GET /users/:id    — Fetch user profile (name, phone, locale, currency)
 *   PUT /users/:id    — Update profile fields
 *
 * Used by ProfileScreen to display and edit user information.
 * Tag-based invalidation ensures profile is refetched after updates.
 */
import { apiSlice } from "../../services/api";

export interface UserProfile {
  id: string;
  fullName: string;
  phone?: string;
  locale: string;
  timezone: string;
  defaultCurrency: string;
  createdAt: string;
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, string>({
      query: (userId) => `/users/${userId}`,
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation<
      UserProfile,
      { userId: string; data: Partial<UserProfile> }
    >({
      query: ({ userId, data }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi;
