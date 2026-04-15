/**
 * FinTrack AI — Analytics API Slice (RTK Query)
 *
 * Endpoint for spend analytics:
 *   GET /analytics/summary?userId=X&range=monthly
 *       — Returns category breakdown and total spend from Elasticsearch
 *
 * Used by AnalyticsScreen to display spending charts.
 * Falls back gracefully when ES index is not populated.
 */
import { apiSlice } from "../../services/api";

export interface AnalyticsSummary {
  categories: Array<{ category: string; totalAmount: number }>;
  totalSpend: number;
  range: string;
}

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSummary: builder.query<
      AnalyticsSummary,
      { userId: string; range?: string }
    >({
      query: ({ userId, range = "monthly" }) =>
        `/analytics/summary?userId=${userId}&range=${range}`,
      providesTags: ["Analytics"],
    }),
  }),
});

export const { useGetSummaryQuery } = analyticsApi;
