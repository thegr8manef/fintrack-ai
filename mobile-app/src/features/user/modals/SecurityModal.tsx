/**
 * Security Settings Modal — Password change form and biometrics toggle.
 */
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const SecurityModal: React.FC<Props> = ({ visible, onClose }) => {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [biometrics, setBiometrics] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSave = () => {
    // TODO: call change-password API
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.overlay}
      >
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>Security</Text>

          <Text style={styles.sectionLabel}>Change Password</Text>

          <TextInput
            style={styles.input}
            value={currentPw}
            onChangeText={setCurrentPw}
            placeholder="Current password"
            placeholderTextColor="#6b7280"
            secureTextEntry
          />
          <TextInput
            style={[styles.input, { marginTop: 10 }]}
            value={newPw}
            onChangeText={setNewPw}
            placeholder="New password"
            placeholderTextColor="#6b7280"
            secureTextEntry
          />
          <TextInput
            style={[styles.input, { marginTop: 10 }]}
            value={confirmPw}
            onChangeText={setConfirmPw}
            placeholder="Confirm new password"
            placeholderTextColor="#6b7280"
            secureTextEntry
          />

          <Text style={[styles.sectionLabel, { marginTop: 20 }]}>
            Authentication
          </Text>

          <View style={styles.toggleRow}>
            <View style={styles.toggleIcon}>
              <Text style={{ fontSize: 20 }}>👆</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.toggleLabel}>Biometric Login</Text>
              <Text style={styles.toggleDesc}>
                Use fingerprint or face recognition
              </Text>
            </View>
            <Switch
              value={biometrics}
              onValueChange={setBiometrics}
              trackColor={{ false: "#374151", true: "#6366f1" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleIcon}>
              <Text style={{ fontSize: 20 }}>🔑</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.toggleLabel}>Two-Factor Auth</Text>
              <Text style={styles.toggleDesc}>
                Require code from authenticator app
              </Text>
            </View>
            <Switch
              value={twoFactor}
              onValueChange={setTwoFactor}
              trackColor={{ false: "#374151", true: "#6366f1" }}
              thumbColor="#fff"
            />
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  sheet: {
    backgroundColor: "#1a1635",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#4b5563",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: { fontSize: 22, fontWeight: "800", color: "#fff", marginBottom: 16 },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#9ca3af",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: "#fff",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  toggleIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleLabel: { fontSize: 14, fontWeight: "600", color: "#fff" },
  toggleDesc: { fontSize: 11, color: "#6b7280", marginTop: 2 },
  saveBtn: {
    backgroundColor: "#6366f1",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
  },
  saveBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  cancelBtn: { alignItems: "center", marginTop: 12, padding: 12 },
  cancelText: { color: "#6b7280", fontSize: 14, fontWeight: "600" },
});
