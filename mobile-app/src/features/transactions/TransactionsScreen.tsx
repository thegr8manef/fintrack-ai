/**
 * FinTrack AI — Transactions Screen (Transactions Tab)
 *
 * Full paginated transaction list with:
 * - Category emoji icons (food, transport, entertainment, etc.)
 * - Amount display with income (green) / expense (red) coloring
 * - Filter button (UI placeholder)
 * - Empty state when no transactions exist
 *
 * Data Source: useGetTransactionsQuery() with userId from auth state.
 * Fetches 20 transactions per page from the transaction-service API.
 *
 * Design: Dark theme, glass-style transaction cards.
 */
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useAppSelector } from "../../state/hooks";
import { useGetTransactionsQuery } from "./transactionApi";
import type { Transaction } from "./transactionSlice";

const categoryIcons: Record<string, string> = {
  food: "🍔",
  transport: "🚕",
  entertainment: "🎬",
  shopping: "🛍️",
  utilities: "💡",
  health: "💊",
  income: "💰",
};

export const TransactionsScreen: React.FC = () => {
  const userId = useAppSelector((state) => state.auth.userId);
  const { data: transactions, isLoading } = useGetTransactionsQuery(
    { userId: userId ?? "", page: 1, limit: 20 },
    { skip: !userId },
  );

  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Text style={{ fontSize: 22 }}>
          {categoryIcons[item.category?.toLowerCase()] ?? "💳"}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.merchant}>{item.merchant}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text
          style={[
            styles.amount,
            item.txnType === "income" ? styles.income : styles.expense,
          ]}
        >
          {item.txnType === "income" ? "+" : "-"}$
          {Number(item.amount).toFixed(2)}
        </Text>
        <Text style={styles.currency}>{item.currency}</Text>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading transactions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>🔍 Filter</Text>
        </TouchableOpacity>
      </View>

      {!transactions || transactions.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyTitle}>No transactions yet</Text>
          <Text style={styles.emptySubtitle}>
            Your transactions will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0c29" },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0f0c29",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: { color: "#9ca3af", fontSize: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 20,
  },
  title: { fontSize: 28, fontWeight: "800", color: "#ffffff" },
  filterButton: {
    backgroundColor: "rgba(99, 102, 241, 0.12)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.25)",
  },
  filterText: { color: "#818cf8", fontSize: 13, fontWeight: "600" },
  list: { paddingHorizontal: 24, paddingBottom: 24 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  info: { flex: 1, marginLeft: 14 },
  merchant: { fontSize: 15, fontWeight: "600", color: "#ffffff" },
  category: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 3,
    textTransform: "capitalize",
  },
  amountContainer: { alignItems: "flex-end" },
  amount: { fontSize: 16, fontWeight: "700" },
  currency: { fontSize: 11, color: "#6b7280", marginTop: 2 },
  income: { color: "#4ade80" },
  expense: { color: "#f87171" },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60,
  },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: "700", color: "#ffffff" },
  emptySubtitle: { fontSize: 14, color: "#6b7280", marginTop: 8 },
});
