/**
 * FinTrack AI — Login / Registration Screen
 *
 * Dark glassmorphic authentication screen with:
 * - Email + password inputs with emoji icons
 * - Toggle between Sign In and Create Account modes
 * - RTK Query mutations for login and register API calls
 * - On success: dispatches setCredentials() to Redux store,
 *   which triggers AppNavigator to switch to the main tab view
 *
 * Design: Dark background (#0f0c29), glass card effect, purple accent (#6366f1)
 */
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLoginMutation, useRegisterMutation } from "./authApi";
import { useAppDispatch } from "../../state/hooks";
import { setCredentials } from "./authSlice";

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const isLoading = isLoginLoading || isRegisterLoading;

  const handleSubmit = async () => {
    try {
      const action = isRegistering ? register : login;
      const result = await action({ email, password }).unwrap();
      dispatch(setCredentials(result));
    } catch {
      Alert.alert(
        isRegistering ? "Registration Failed" : "Login Failed",
        isRegistering
          ? "Email may already be registered."
          : "Please check your credentials and try again.",
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inner}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>💰</Text>
          </View>
          <Text style={styles.title}>FinTrack AI</Text>
          <Text style={styles.subtitle}>
            {isRegistering ? "Create your account" : "Welcome back"}
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>✉️</Text>
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#6b7280"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#6b7280"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {isLoading
                ? isRegistering
                  ? "Creating account..."
                  : "Signing in..."
                : isRegistering
                  ? "Create Account"
                  : "Sign In"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => setIsRegistering(!isRegistering)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleText}>
            {isRegistering
              ? "Already have an account? "
              : "Don't have an account? "}
            <Text style={styles.toggleHighlight}>
              {isRegistering ? "Sign In" : "Create one"}
            </Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0c29",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "rgba(99, 102, 241, 0.3)",
  },
  logoIcon: {
    fontSize: 36,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#9ca3af",
    marginTop: 8,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#6366f1",
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  toggleButton: {
    marginTop: 24,
    alignItems: "center",
  },
  toggleText: {
    color: "#9ca3af",
    fontSize: 14,
  },
  toggleHighlight: {
    color: "#818cf8",
    fontWeight: "600",
  },
});
