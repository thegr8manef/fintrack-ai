import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useGetTransactionsQuery } from "./transactionApi";
import type { Transaction } from "./transactionSlice";

export const TransactionsScreen: React.FC = () => {
  const { data: transactions, isLoading } = useGetTransactionsQuery({
    page: 1,
    limit: 20,
  });

  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.merchant}>{item.merchant}</Text>
        <Text
          style={[
            styles.amount,
            item.txnType === "income" ? styles.income : styles.expense,
          ]}
        >
          {item.txnType === "income" ? "+" : "-"}
          {item.currency} {item.amount.toFixed(2)}
        </Text>
      </View>
      <Text style={styles.category}>{item.category}</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading transactions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <FlatList
        data={transactions ?? []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
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
  list: { paddingBottom: 24 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  merchant: { fontSize: 16, fontWeight: "600" },
  amount: { fontSize: 16, fontWeight: "700" },
  income: { color: "#2ec4b6" },
  expense: { color: "#e63946" },
  category: { fontSize: 13, color: "#888", marginTop: 4 },
});
