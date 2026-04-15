import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppSelector } from "../../state/hooks";

export const ProfileScreen: React.FC = () => {
  const profile = useAppSelector((state) => state.user.profile);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {profile ? (
        <>
          <Text style={styles.name}>{profile.fullName}</Text>
          <Text style={styles.detail}>{profile.email}</Text>
          <Text style={styles.detail}>Currency: {profile.defaultCurrency}</Text>
        </>
      ) : (
        <Text style={styles.detail}>Loading profile...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#f8f9fa" },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1a1a2e",
  },
  name: { fontSize: 20, fontWeight: "600", marginBottom: 8 },
  detail: { fontSize: 16, color: "#666", marginBottom: 4 },
});
