/**
 * FinTrack AI — Dashboard Screen (Home Tab)
 *
 * Main overview screen showing:
 * - Total balance (income - expenses) in a gradient card
 * - Income and expense totals computed from live transaction data
 * - Quick action buttons (Send, Receive, Budget, AI Tips)
 * - Recent 5 transactions from RTK Query (live from database)
 *
 * Data Source: useGetTransactionsQuery() with userId from auth state.
 * Shows loading spinner while fetching, empty state when no transactions.
 *
 * Design: Dark theme (#0f0c29), purple balance card (#6366f1), glass activity cards.
 */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useAppSelector } from "../../state/hooks";
import { useGetTransactionsQuery } from "../transactions/transactionApi";
import type { Transaction } from "../transactions/transactionSlice";

const quickActions = [
  { icon: "📤", label: "Send" },
  { icon: "📥", label: "Receive" },
  { icon: "📊", label: "Budget" },
  { icon: "🤖", label: "AI Tips" },
];

const categoryIcons: Record<string, string> = {
  food: "☕",
  transport: "🚕",
  entertainment: "🎬",
  shopping: "🛍️",
  utilities: "💡",
  health: "💊",
  income: "💼",
};

export const DashboardScreen: React.FC = () => {
  const userId = useAppSelector((state) => state.auth.userId);
  const { data: transactions, isLoading } = useGetTransactionsQuery(
    { userId: userId ?? "", page: 1, limit: 10 },
    { skip: !userId },
  );

  const items = transactions ?? [];
  const income = items
    .filter((t) => t.txnType === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const expenses = items
    .filter((t) => t.txnType === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const balance = income - expenses;
  const recent = items.slice(0, 5);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning 👋</Text>
            <Text style={styles.name}>Welcome back</Text>
          </View>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>FT</Text>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceValue}>${balance.toFixed(2)}</Text>
          <View style={styles.balanceRow}>
            <View style={styles.balanceStat}>
              <Text style={styles.statArrow}>↑</Text>
              <View>
                <Text style={styles.statLabel}>Income</Text>
                <Text style={styles.statValueGreen}>${income.toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.balanceStat}>
              <Text style={styles.statArrow}>↓</Text>
              <View>
                <Text style={styles.statLabel}>Expenses</Text>
                <Text style={styles.statValueRed}>${expenses.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actionsRow}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.label}
              style={styles.actionButton}
              activeOpacity={0.7}
            >
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>{action.icon}</Text>
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <ActivityIndicator color="#818cf8" style={{ marginTop: 20 }} />
          ) : recent.length === 0 ? (
            <View style={{ alignItems: "center", paddingVertical: 24 }}>
              <Text style={{ fontSize: 36 }}>📋</Text>
              <Text style={{ color: "#6b7280", marginTop: 8 }}>
                No transactions yet
              </Text>
            </View>
          ) : (
            recent.map((item: Transaction) => (
              <View key={item.id} style={styles.activityCard}>
                <View style={styles.activityIcon}>
                  <Text style={{ fontSize: 22 }}>
                    {categoryIcons[item.category?.toLowerCase()] ?? "💳"}
                  </Text>
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityName}>
                    {item.merchant ?? "Unknown"}
                  </Text>
                  <Text style={styles.activityCategory}>{item.category}</Text>
                </View>
                <Text
                  style={[
                    styles.activityAmount,
                    item.txnType === "income" ? styles.green : styles.red,
                  ]}
                >
                  {item.txnType === "income" ? "+" : "-"}$
                  {Number(item.amount).toFixed(2)}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0c29" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    paddingTop: 56,
  },
  greeting: { fontSize: 14, color: "#9ca3af" },
  name: { fontSize: 22, fontWeight: "700", color: "#ffffff", marginTop: 4 },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  balanceCard: {
    marginHorizontal: 24,
    backgroundColor: "#6366f1",
    borderRadius: 24,
    padding: 28,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 16,
  },
  balanceLabel: { fontSize: 14, color: "rgba(255,255,255,0.7)" },
  balanceValue: {
    fontSize: 38,
    fontWeight: "800",
    color: "#ffffff",
    marginTop: 8,
    letterSpacing: 1,
  },
  balanceRow: {
    flexDirection: "row",
    marginTop: 24,
    alignItems: "center",
  },
  balanceStat: { flexDirection: "row", alignItems: "center", flex: 1 },
  statArrow: { fontSize: 18, color: "rgba(255,255,255,0.8)", marginRight: 10 },
  statLabel: { fontSize: 12, color: "rgba(255,255,255,0.6)" },
  statValueGreen: { fontSize: 16, fontWeight: "700", color: "#86efac" },
  statValueRed: { fontSize: 16, fontWeight: "700", color: "#fca5a5" },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginHorizontal: 16,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 24,
    marginTop: 28,
  },
  actionButton: { alignItems: "center" },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "rgba(99, 102, 241, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.2)",
  },
  actionEmoji: { fontSize: 24 },
  actionLabel: { fontSize: 12, color: "#9ca3af", marginTop: 8 },
  section: { padding: 24 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#ffffff" },
  seeAll: { fontSize: 14, color: "#818cf8" },
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  activityIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  activityInfo: { flex: 1, marginLeft: 14 },
  activityName: { fontSize: 15, fontWeight: "600", color: "#ffffff" },
  activityCategory: { fontSize: 12, color: "#6b7280", marginTop: 3 },
  activityAmount: { fontSize: 16, fontWeight: "700" },
  green: { color: "#4ade80" },
  red: { color: "#f87171" },
});
