/**
 * FinTrack AI — Navigation Configuration
 *
 * Auth-gated navigation structure:
 * - When NOT authenticated: Shows LoginScreen (Auth stack)
 * - When authenticated:     Shows MainTabs (bottom tab navigator)
 *
 * Main Tabs:
 *   🏠 Dashboard    — Balance overview, income/expense, recent transactions
 *   💳 Transactions — Full transaction list with filters
 *   📊 Analytics    — Spending breakdown and AI insights
 *   👤 Profile      — User settings and sign out
 *
 * Dark theme tab bar with purple accent (#818cf8).
 * Auth state is read from Redux store (state.auth.isAuthenticated).
 */
import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppSelector } from "../state/hooks";

// Placeholder screens — will be built out per feature
import { LoginScreen } from "../features/auth/LoginScreen";
import { DashboardScreen } from "../features/dashboard/DashboardScreen";
import { TransactionsScreen } from "../features/transactions/TransactionsScreen";
import { AnalyticsScreen } from "../features/analytics/AnalyticsScreen";
import { ProfileScreen } from "../features/user/ProfileScreen";

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Transactions: undefined;
  Analytics: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs: React.FC = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: "#1a1635",
        borderTopColor: "rgba(255, 255, 255, 0.06)",
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingTop: 8,
        height: 64,
      },
      tabBarActiveTintColor: "#818cf8",
      tabBarInactiveTintColor: "#4b5563",
      tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
    }}
  >
    <Tab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: () => <TabIcon emoji="🏠" />,
      }}
    />
    <Tab.Screen
      name="Transactions"
      component={TransactionsScreen}
      options={{ tabBarIcon: () => <TabIcon emoji="💳" /> }}
    />
    <Tab.Screen
      name="Analytics"
      component={AnalyticsScreen}
      options={{ tabBarIcon: () => <TabIcon emoji="📊" /> }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ tabBarIcon: () => <TabIcon emoji="👤" /> }}
    />
  </Tab.Navigator>
);

const TabIcon: React.FC<{ emoji: string }> = ({ emoji }) => (
  <Text style={{ fontSize: 20 }}>{emoji}</Text>
);

export const AppNavigator: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <Stack.Screen name="Auth" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
