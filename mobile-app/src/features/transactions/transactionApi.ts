/**
 * FinTrack AI — Transaction API Slice (RTK Query)
 *
 * Endpoints for transaction management:
 *   GET    /transactions?userId=&page=&limit=  — Paginated list
 *   POST   /transactions                       — Create (returns AI categorization)
 *   DELETE /transactions/:id                    — Delete transaction
 *
 * Uses tag-based cache invalidation: creating or deleting a transaction
 * automatically refetches the transaction list.
 */
import { apiSlice } from "../../services/api";
import type { Transaction } from "./transactionSlice";

interface CreateTransactionRequest {
  amount: number;
  currency: string;
  merchant: string;
  category: string;
  occurredAt: string;
}

interface CreateTransactionResponse {
  id: string;
  status: string;
  aiCategorization: {
    suggested: string;
    confidence: number;
  };
}

export const transactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<
      Transaction[],
      { userId: string; page?: number; limit?: number }
    >({
      query: ({ userId, page = 1, limit = 20 }) =>
        `/transactions?userId=${userId}&page=${page}&limit=${limit}`,
      providesTags: ["Transaction"],
    }),
    createTransaction: builder.mutation<
      CreateTransactionResponse,
      CreateTransactionRequest
    >({
      query: (body) => ({
        url: "/transactions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Transaction"],
    }),
    deleteTransaction: builder.mutation<void, string>({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionApi;
