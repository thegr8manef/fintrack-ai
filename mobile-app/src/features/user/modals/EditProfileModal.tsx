/**
 * Edit Profile Modal — Allows user to update name, phone, and locale.
 */
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAppSelector } from "../../../state/hooks";
import { useGetProfileQuery } from "../userApi";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<Props> = ({ visible, onClose }) => {
  const userId = useAppSelector((s) => s.auth.userId);
  const { data: profile } = useGetProfileQuery(userId ?? "", {
    skip: !userId,
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    if (profile) {
      setName(profile.fullName ?? "");
      setPhone(profile.phone ?? "");
      setLocale(profile.locale ?? "en");
    }
  }, [profile]);

  const handleSave = () => {
    // TODO: call updateProfile mutation
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
          <Text style={styles.title}>Edit Profile</Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor="#6b7280"
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="+1-555-0000"
            placeholderTextColor="#6b7280"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Locale</Text>
          <TextInput
            style={styles.input}
            value={locale}
            onChangeText={setLocale}
            placeholder="en"
            placeholderTextColor="#6b7280"
          />

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
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
  title: { fontSize: 22, fontWeight: "800", color: "#fff", marginBottom: 20 },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#9ca3af",
    marginBottom: 6,
    marginTop: 12,
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
  saveBtn: {
    backgroundColor: "#6366f1",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
  },
  saveBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  cancelBtn: { alignItems: "center", marginTop: 12, padding: 12 },
  cancelText: { color: "#6b7280", fontSize: 14, fontWeight: "600" },
});
