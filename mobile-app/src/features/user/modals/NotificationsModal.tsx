/**
 * Notifications Settings Modal — Toggle push/email notification preferences.
 */
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const notifOptions = [
  {
    key: "push_transactions",
    icon: "💳",
    label: "Transaction Alerts",
    desc: "Get notified for new transactions",
  },
  {
    key: "push_budget",
    icon: "📊",
    label: "Budget Warnings",
    desc: "Alert when nearing budget limit",
  },
  {
    key: "push_insights",
    icon: "🤖",
    label: "AI Insights",
    desc: "Smart spending recommendations",
  },
  {
    key: "email_weekly",
    icon: "📧",
    label: "Weekly Summary",
    desc: "Email digest every Monday",
  },
  {
    key: "email_monthly",
    icon: "📬",
    label: "Monthly Report",
    desc: "Detailed spending report",
  },
  {
    key: "push_security",
    icon: "🔐",
    label: "Security Alerts",
    desc: "Login & suspicious activity",
  },
];

export const NotificationsModal: React.FC<Props> = ({ visible, onClose }) => {
  const [settings, setSettings] = useState<Record<string, boolean>>({
    push_transactions: true,
    push_budget: true,
    push_insights: true,
    email_weekly: false,
    email_monthly: true,
    push_security: true,
  });

  const toggle = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
          <Text style={styles.title}>Notifications</Text>

          {notifOptions.map((opt) => (
            <View key={opt.key} style={styles.row}>
              <View style={styles.iconBox}>
                <Text style={{ fontSize: 20 }}>{opt.icon}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.label}>{opt.label}</Text>
                <Text style={styles.desc}>{opt.desc}</Text>
              </View>
              <Switch
                value={settings[opt.key]}
                onValueChange={() => toggle(opt.key)}
                trackColor={{ false: "#374151", true: "#6366f1" }}
                thumbColor="#fff"
              />
            </View>
          ))}

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
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  label: { fontSize: 14, fontWeight: "600", color: "#fff" },
  desc: { fontSize: 11, color: "#6b7280", marginTop: 2 },
  doneBtn: {
    backgroundColor: "#6366f1",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  doneBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
