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
