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
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) =>
        `/transactions?page=${page}&limit=${limit}`,
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
