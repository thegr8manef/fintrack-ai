/**
 * FinTrack AI — Analytics Screen (Analytics Tab)
 *
 * Spending analytics dashboard showing:
 * - Summary card: Total spent + transaction count
 * - Category spending breakdown with percentage bars
 * - Data sourced from both analytics API and transaction fallback
 *
 * Data Sources:
 * - useGetSummaryQuery(): Analytics service (Elasticsearch aggregation)
 * - useGetTransactionsQuery(): Fallback if analytics service returns empty
 *
 * Gracefully handles empty data when no transactions or ES index not populated.
 *
 * Design: Dark theme, colored category bars, glass summary cards.
 */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useAppSelector } from "../../state/hooks";
import { useGetSummaryQuery } from "./analyticsApi";
import { useGetTransactionsQuery } from "../transactions/transactionApi";

const categoryColors: Record<string, string> = {
  food: "#f97316",
  transport: "#3b82f6",
  shopping: "#a855f7",
  entertainment: "#ec4899",
  utilities: "#14b8a6",
  health: "#4ade80",
};

const categoryIconsMap: Record<string, string> = {
  food: "🍔",
  transport: "🚕",
  shopping: "🛍️",
  entertainment: "🎬",
  utilities: "💡",
  health: "💊",
};

export const AnalyticsScreen: React.FC = () => {
  const userId = useAppSelector((state) => state.auth.userId);
  const { data: summary, isLoading: summaryLoading } = useGetSummaryQuery(
    { userId: userId ?? "", range: "monthly" },
    { skip: !userId },
  );
  const { data: transactions } = useGetTransactionsQuery(
    { userId: userId ?? "", page: 1, limit: 100 },
    { skip: !userId },
  );

  const items = transactions ?? [];
  const totalSpend =
    summary?.totalSpend ??
    items
      .filter((t) => t.txnType === "expense")
      .reduce((s, t) => s + Number(t.amount), 0);
  const txnCount = items.length;

  // Build category breakdown from transactions if analytics service has no data
  const categoryMap = new Map<string, number>();
  items
    .filter((t) => t.txnType === "expense")
    .forEach((t) => {
      const cat = t.category?.toLowerCase() ?? "other";
      categoryMap.set(cat, (categoryMap.get(cat) ?? 0) + Number(t.amount));
    });

  const categories =
    summary?.categories && summary.categories.length > 0
      ? summary.categories.map((c) => ({
          name: c.category,
          amount: Number(c.totalAmount),
        }))
      : Array.from(categoryMap.entries()).map(([name, amount]) => ({
          name,
          amount,
        }));

  const maxAmount = Math.max(...categories.map((c) => c.amount), 1);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.period}>This Month</Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Spent</Text>
            <Text style={styles.summaryValue}>${totalSpend.toFixed(0)}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Transactions</Text>
            <Text style={styles.summaryValue}>{txnCount}</Text>
          </View>
        </View>

        {summaryLoading ? (
          <ActivityIndicator color="#818cf8" style={{ marginTop: 30 }} />
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Spending Breakdown</Text>
            {categories.length === 0 ? (
              <View style={{ alignItems: "center", paddingVertical: 24 }}>
                <Text style={{ fontSize: 36 }}>📊</Text>
                <Text style={{ color: "#6b7280", marginTop: 8 }}>
                  No spending data yet
                </Text>
              </View>
            ) : (
              categories.map((cat) => {
                const pct = Math.round((cat.amount / maxAmount) * 100);
                const key = cat.name.toLowerCase();
                return (
                  <View key={cat.name} style={styles.categoryRow}>
                    <View style={styles.catLeft}>
                      <Text style={{ fontSize: 20 }}>
                        {categoryIconsMap[key] ?? "💳"}
                      </Text>
                      <View style={{ marginLeft: 12 }}>
                        <Text style={styles.catName}>{cat.name}</Text>
                        <Text style={styles.catAmount}>
                          ${cat.amount.toFixed(0)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.barContainer}>
                      <View
                        style={[
                          styles.barFill,
                          {
                            width: `${pct}%`,
                            backgroundColor: categoryColors[key] ?? "#6366f1",
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.catPercent}>{pct}%</Text>
                  </View>
                );
              })
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0c29" },
  header: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 20 },
  title: { fontSize: 28, fontWeight: "800", color: "#ffffff" },
  period: { fontSize: 14, color: "#818cf8", marginTop: 4, fontWeight: "600" },
  summaryCard: {
    flexDirection: "row",
    marginHorizontal: 24,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  summaryItem: { flex: 1, alignItems: "center" },
  summaryLabel: { fontSize: 12, color: "#6b7280" },
  summaryValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ffffff",
    marginTop: 6,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 4,
  },
  section: { padding: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 16,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  catLeft: { flexDirection: "row", alignItems: "center", width: 120 },
  catName: { fontSize: 14, fontWeight: "600", color: "#ffffff" },
  catAmount: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: "hidden",
  },
  barFill: { height: "100%", borderRadius: 4 },
  catPercent: {
    fontSize: 13,
    fontWeight: "700",
    color: "#9ca3af",
    width: 36,
    textAlign: "right",
  },
  insightCard: {
    flexDirection: "row",
    backgroundColor: "rgba(99, 102, 241, 0.08)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.15)",
    alignItems: "flex-start",
  },
  insightIcon: { fontSize: 20, marginRight: 12, marginTop: 2 },
  insightText: { flex: 1, fontSize: 14, color: "#d1d5db", lineHeight: 21 },
});
