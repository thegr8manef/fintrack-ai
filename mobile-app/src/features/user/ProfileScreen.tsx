/**
 * FinTrack AI — Profile Screen (Profile Tab)
 *
 * Comprehensive profile hub showing:
 * - Avatar card with user name, currency, and member badge
 * - Account Overview: balance, total income, total expenses from Dashboard data
 * - Spending Snapshot: top 3 categories from Analytics breakdown
 * - Recent Activity: last 3 transactions from Transactions data
 * - Quick Actions: navigate to Dashboard, Transactions, Analytics
 * - Settings menu: Edit Profile, Notifications, Currency, Security, etc.
 * - Sign Out button
 *
 * Data Sources:
 * - useGetProfileQuery(): User profile from user-service
 * - useGetTransactionsQuery(): Transaction data for stats & recent activity
 * - useGetSummaryQuery(): Analytics summary for spending snapshot
 *
 * Design: Dark theme, glass cards, purple accent, comprehensive overview.
 */
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { MainTabParamList } from "../../navigation/AppNavigator";
import { useAppSelector, useAppDispatch } from "../../state/hooks";
import { logout } from "../auth/authSlice";
import { useGetProfileQuery } from "./userApi";
import { useGetTransactionsQuery } from "../transactions/transactionApi";
import { useGetSummaryQuery } from "../analytics/analyticsApi";
import { EditProfileModal } from "./modals/EditProfileModal";
import { NotificationsModal } from "./modals/NotificationsModal";
import { CurrencyModal } from "./modals/CurrencyModal";
import { SecurityModal } from "./modals/SecurityModal";
import { AppearanceModal } from "./modals/AppearanceModal";
import { ExportDataModal } from "./modals/ExportDataModal";
import { HelpSupportModal } from "./modals/HelpSupportModal";
import { TermsPrivacyModal } from "./modals/TermsPrivacyModal";

type ProfileNav = BottomTabNavigationProp<MainTabParamList, "Profile">;

type ModalKey =
  | "editProfile"
  | "notifications"
  | "currency"
  | "security"
  | "appearance"
  | "exportData"
  | "helpSupport"
  | "termsPrivacy"
  | null;

const categoryIcons: Record<string, string> = {
  food: "🍔",
  transport: "🚕",
  entertainment: "🎬",
  shopping: "🛍️",
  utilities: "💡",
  health: "💊",
  income: "💰",
};

const settingsMenu: {
  key: ModalKey;
  icon: string;
  label: string;
  desc: string;
}[] = [
  {
    key: "editProfile",
    icon: "👤",
    label: "Edit Profile",
    desc: "Name, photo, email",
  },
  {
    key: "notifications",
    icon: "🔔",
    label: "Notifications",
    desc: "Push & email alerts",
  },
  { key: "currency", icon: "💱", label: "Default Currency", desc: "USD" },
  {
    key: "security",
    icon: "🔒",
    label: "Security",
    desc: "Password & biometrics",
  },
  { key: "appearance", icon: "🌙", label: "Appearance", desc: "Dark mode" },
  {
    key: "exportData",
    icon: "📤",
    label: "Export Data",
    desc: "CSV, PDF reports",
  },
  {
    key: "helpSupport",
    icon: "❓",
    label: "Help & Support",
    desc: "FAQ, contact us",
  },
  {
    key: "termsPrivacy",
    icon: "📜",
    label: "Terms & Privacy",
    desc: "Legal information",
  },
];

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileNav>();
  const userId = useAppSelector((state) => state.auth.userId);
  const localProfile = useAppSelector((state) => state.user.profile);
  const dispatch = useAppDispatch();
  const [activeModal, setActiveModal] = useState<ModalKey>(null);

  // ---- Data fetching ----
  const { data: remoteProfile, isLoading: profileLoading } = useGetProfileQuery(
    userId ?? "",
    { skip: !userId },
  );
  const { data: transactions } = useGetTransactionsQuery(
    { userId: userId ?? "", page: 1, limit: 50 },
    { skip: !userId },
  );
  const { data: summary } = useGetSummaryQuery(
    { userId: userId ?? "", range: "monthly" },
    { skip: !userId },
  );

  // ---- Derived values ----
  const displayName =
    remoteProfile?.fullName ?? localProfile?.fullName ?? "FinTrack User";
  const displayCurrency =
    remoteProfile?.defaultCurrency ?? localProfile?.defaultCurrency ?? "USD";
  const initial = displayName[0]?.toUpperCase() ?? "👤";

  const items = transactions ?? [];
  const income = items
    .filter((t) => t.txnType === "income")
    .reduce((s, t) => s + Number(t.amount), 0);
  const expenses = items
    .filter((t) => t.txnType === "expense")
    .reduce((s, t) => s + Number(t.amount), 0);
  const balance = income - expenses;

  // Category breakdown (top 3)
  const catMap = new Map<string, number>();
  items
    .filter((t) => t.txnType === "expense")
    .forEach((t) => {
      const cat = t.category?.toLowerCase() ?? "other";
      catMap.set(cat, (catMap.get(cat) ?? 0) + Number(t.amount));
    });
  const topCategories = Array.from(catMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const recentTxns = items.slice(0, 3);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* ---- Profile Card ---- */}
        <View style={styles.profileCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarEmoji}>{initial}</Text>
          </View>
          {profileLoading ? (
            <ActivityIndicator color="#818cf8" style={{ marginTop: 12 }} />
          ) : (
            <>
              <Text style={styles.profileName}>{displayName}</Text>
              <Text style={styles.profileEmail}>
                Currency: {displayCurrency}
              </Text>
            </>
          )}
          <View style={styles.memberBadge}>
            <Text style={styles.memberText}>✨ Premium Member</Text>
          </View>
        </View>

        {/* ---- Account Overview (from Dashboard data) ---- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Overview</Text>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, styles.balanceCard]}>
              <Text style={styles.statLabel}>Balance</Text>
              <Text style={styles.statValueMain}>${balance.toFixed(2)}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Income</Text>
              <Text style={[styles.statValue, { color: "#4ade80" }]}>
                ${income.toFixed(2)}
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Expenses</Text>
              <Text style={[styles.statValue, { color: "#f87171" }]}>
                ${expenses.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* ---- Spending Snapshot (from Analytics data) ---- */}
        {topCategories.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top Spending</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Analytics")}
              >
                <Text style={styles.seeAllText}>See All →</Text>
              </TouchableOpacity>
            </View>
            {topCategories.map(([cat, amount]) => (
              <View key={cat} style={styles.spendRow}>
                <View style={styles.spendLeft}>
                  <View style={styles.catIcon}>
                    <Text style={{ fontSize: 18 }}>
                      {categoryIcons[cat] ?? "💳"}
                    </Text>
                  </View>
                  <Text style={styles.spendCat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Text>
                </View>
                <Text style={styles.spendAmount}>${amount.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        )}

        {/* ---- Recent Activity (from Transactions data) ---- */}
        {recentTxns.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Transactions")}
              >
                <Text style={styles.seeAllText}>View All →</Text>
              </TouchableOpacity>
            </View>
            {recentTxns.map((txn) => (
              <View key={txn.id} style={styles.txnRow}>
                <View style={styles.catIcon}>
                  <Text style={{ fontSize: 18 }}>
                    {categoryIcons[txn.category?.toLowerCase()] ?? "💳"}
                  </Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.txnMerchant}>{txn.merchant}</Text>
                  <Text style={styles.txnCategory}>{txn.category}</Text>
                </View>
                <Text
                  style={[
                    styles.txnAmount,
                    txn.txnType === "income"
                      ? { color: "#4ade80" }
                      : { color: "#f87171" },
                  ]}
                >
                  {txn.txnType === "income" ? "+" : "-"}$
                  {Number(txn.amount).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* ---- Quick Actions ---- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => navigation.navigate("Dashboard")}
            >
              <Text style={styles.actionIcon}>🏠</Text>
              <Text style={styles.actionLabel}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => navigation.navigate("Transactions")}
            >
              <Text style={styles.actionIcon}>💳</Text>
              <Text style={styles.actionLabel}>Transactions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => navigation.navigate("Analytics")}
            >
              <Text style={styles.actionIcon}>📊</Text>
              <Text style={styles.actionLabel}>Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ---- Settings ---- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {settingsMenu.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => setActiveModal(item.key)}
            >
              <View style={styles.menuIcon}>
                <Text style={{ fontSize: 20 }}>{item.icon}</Text>
              </View>
              <View style={styles.menuInfo}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuDesc}>{item.desc}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => dispatch(logout())}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>🚪 Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>FinTrack AI v1.0.0</Text>
      </ScrollView>

      {/* ---- Setting Modals ---- */}
      <EditProfileModal
        visible={activeModal === "editProfile"}
        onClose={() => setActiveModal(null)}
      />
      <NotificationsModal
        visible={activeModal === "notifications"}
        onClose={() => setActiveModal(null)}
      />
      <CurrencyModal
        visible={activeModal === "currency"}
        currentCurrency={displayCurrency}
        onClose={() => setActiveModal(null)}
      />
      <SecurityModal
        visible={activeModal === "security"}
        onClose={() => setActiveModal(null)}
      />
      <AppearanceModal
        visible={activeModal === "appearance"}
        onClose={() => setActiveModal(null)}
      />
      <ExportDataModal
        visible={activeModal === "exportData"}
        onClose={() => setActiveModal(null)}
      />
      <HelpSupportModal
        visible={activeModal === "helpSupport"}
        onClose={() => setActiveModal(null)}
      />
      <TermsPrivacyModal
        visible={activeModal === "termsPrivacy"}
        onClose={() => setActiveModal(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0c29" },
  header: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 10 },
  title: { fontSize: 28, fontWeight: "800", color: "#ffffff" },

  // Profile Card
  profileCard: {
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  avatarEmoji: { fontSize: 32, color: "#ffffff", fontWeight: "700" },
  profileName: { fontSize: 22, fontWeight: "700", color: "#ffffff" },
  profileEmail: { fontSize: 14, color: "#6b7280", marginTop: 4 },
  memberBadge: {
    backgroundColor: "rgba(99, 102, 241, 0.12)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.25)",
  },
  memberText: { fontSize: 12, color: "#818cf8", fontWeight: "600" },

  // Sections
  section: { paddingHorizontal: 24, marginTop: 24 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 12,
  },
  seeAllText: { fontSize: 13, color: "#818cf8", fontWeight: "600" },

  // Account Overview Stats
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    alignItems: "center",
  },
  balanceCard: {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderColor: "rgba(99, 102, 241, 0.2)",
  },
  statLabel: { fontSize: 11, color: "#6b7280", fontWeight: "600" },
  statValueMain: {
    fontSize: 16,
    fontWeight: "800",
    color: "#818cf8",
    marginTop: 4,
  },
  statValue: { fontSize: 14, fontWeight: "700", marginTop: 4 },

  // Spending Snapshot
  spendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  spendLeft: { flexDirection: "row", alignItems: "center" },
  spendCat: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    marginLeft: 10,
  },
  spendAmount: { fontSize: 14, fontWeight: "700", color: "#f87171" },

  // Recent Activity
  txnRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  catIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  txnMerchant: { fontSize: 14, fontWeight: "600", color: "#ffffff" },
  txnCategory: {
    fontSize: 11,
    color: "#6b7280",
    marginTop: 2,
    textTransform: "capitalize",
  },
  txnAmount: { fontSize: 14, fontWeight: "700" },

  // Quick Actions
  actionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: "rgba(99, 102, 241, 0.08)",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.15)",
  },
  actionIcon: { fontSize: 24, marginBottom: 6 },
  actionLabel: { fontSize: 12, fontWeight: "600", color: "#818cf8" },

  // Settings Menu
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  menuIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuInfo: { flex: 1, marginLeft: 14 },
  menuLabel: { fontSize: 15, fontWeight: "600", color: "#ffffff" },
  menuDesc: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  chevron: { fontSize: 22, color: "#4b5563" },

  // Logout & Version
  logoutButton: {
    marginHorizontal: 24,
    marginTop: 24,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
  },
  logoutText: { fontSize: 16, fontWeight: "600", color: "#f87171" },
  version: {
    textAlign: "center",
    fontSize: 12,
    color: "#4b5563",
    marginTop: 24,
    marginBottom: 40,
  },
});
