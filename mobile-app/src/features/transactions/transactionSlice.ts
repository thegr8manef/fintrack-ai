/**
 * FinTrack AI — Transaction State Slice (Redux Toolkit)
 *
 * Local transaction cache for offline-first support:
 * - items[]:    Cached transaction list
 * - isLoading:  Loading state flag
 *
 * Actions:
 * - setTransactions():  Replace entire list (from API response)
 * - addTransaction():   Prepend new transaction (optimistic update)
 * - removeTransaction(): Remove by ID (optimistic delete)
 *
 * Note: RTK Query handles primary data fetching.
 * This slice is for local state management and offline support.
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  merchant: string;
  category: string;
  txnType: "income" | "expense";
  occurredAt: string;
}

interface TransactionState {
  items: Transaction[];
  isLoading: boolean;
}

const initialState: TransactionState = {
  items: [],
  isLoading: false,
};

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.items = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.items.unshift(action.payload);
    },
    removeTransaction: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setTransactions,
  addTransaction,
  removeTransaction,
  setLoading,
} = transactionSlice.actions;
