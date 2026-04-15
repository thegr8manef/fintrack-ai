import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const DashboardScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Total Balance</Text>
        <Text style={styles.cardValue}>$0.00</Text>
      </View>
      <View style={styles.row}>
        <View style={[styles.card, styles.halfCard]}>
          <Text style={styles.cardLabel}>Income</Text>
          <Text style={[styles.cardValue, styles.income]}>$0.00</Text>
        </View>
        <View style={[styles.card, styles.halfCard]}>
          <Text style={styles.cardLabel}>Expenses</Text>
          <Text style={[styles.cardValue, styles.expense]}>$0.00</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8f9fa" },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1a1a2e",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  halfCard: { flex: 1, marginHorizontal: 4 },
  row: { flexDirection: "row" },
  cardLabel: { fontSize: 14, color: "#888", marginBottom: 4 },
  cardValue: { fontSize: 28, fontWeight: "700", color: "#1a1a2e" },
  income: { color: "#2ec4b6" },
  expense: { color: "#e63946" },
});
