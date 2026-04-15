import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const AnalyticsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics</Text>
      <Text style={styles.placeholder}>
        Spending charts and insights will appear here.
      </Text>
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
  placeholder: { fontSize: 16, color: "#888" },
});
