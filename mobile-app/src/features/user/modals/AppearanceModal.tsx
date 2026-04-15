/**
 * Appearance Modal — Dark/Light theme and accent color picker.
 */
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const accentColors = [
  { name: "Indigo", color: "#6366f1" },
  { name: "Emerald", color: "#10b981" },
  { name: "Rose", color: "#f43f5e" },
  { name: "Amber", color: "#f59e0b" },
  { name: "Sky", color: "#0ea5e9" },
  { name: "Purple", color: "#a855f7" },
];

export const AppearanceModal: React.FC<Props> = ({ visible, onClose }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedAccent, setSelectedAccent] = useState("#6366f1");
  const [compactMode, setCompactMode] = useState(false);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>Appearance</Text>

          <View style={styles.toggleRow}>
            <View style={styles.toggleIcon}>
              <Text style={{ fontSize: 20 }}>🌙</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.toggleLabel}>Dark Mode</Text>
              <Text style={styles.toggleDesc}>Use dark color scheme</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#374151", true: "#6366f1" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleIcon}>
              <Text style={{ fontSize: 20 }}>📐</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.toggleLabel}>Compact Mode</Text>
              <Text style={styles.toggleDesc}>Smaller cards & spacing</Text>
            </View>
            <Switch
              value={compactMode}
              onValueChange={setCompactMode}
              trackColor={{ false: "#374151", true: "#6366f1" }}
              thumbColor="#fff"
            />
          </View>

          <Text style={styles.sectionLabel}>Accent Color</Text>
          <View style={styles.colorGrid}>
            {accentColors.map((c) => (
              <TouchableOpacity
                key={c.name}
                style={[
                  styles.colorBtn,
                  { backgroundColor: c.color },
                  selectedAccent === c.color && styles.colorBtnActive,
                ]}
                onPress={() => setSelectedAccent(c.color)}
              >
                {selectedAccent === c.color && (
                  <Text style={styles.colorCheck}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.colorLabel}>
            {accentColors.find((c) => c.color === selectedAccent)?.name ??
              "Custom"}
          </Text>

          <TouchableOpacity style={styles.doneBtn} onPress={onClose}>
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#9ca3af",
    marginTop: 20,
    marginBottom: 12,
  },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  colorBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  colorBtnActive: {
    borderWidth: 3,
    borderColor: "#fff",
  },
  colorCheck: { color: "#fff", fontSize: 18, fontWeight: "700" },
  colorLabel: {
    fontSize: 13,
    color: "#818cf8",
    textAlign: "center",
    marginTop: 10,
  },
  doneBtn: {
    backgroundColor: "#6366f1",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
  },
  doneBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
