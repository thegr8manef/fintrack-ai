/**
 * Help & Support Modal — FAQ accordion and contact options.
 */
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const faqs = [
  {
    q: "How do I add a transaction?",
    a: "Navigate to the Dashboard and tap the '+' button, or go to the Transactions tab.",
  },
  {
    q: "How does AI categorization work?",
    a: "Our AI engine analyzes merchant names and transaction patterns to automatically categorize your spending.",
  },
  {
    q: "Can I set budget limits?",
    a: "Yes! Go to the Budget section from Dashboard quick actions. Set monthly limits per category.",
  },
  {
    q: "How do I export my data?",
    a: "Go to Profile → Export Data. Choose CSV, PDF, or JSON format and your preferred date range.",
  },
  {
    q: "Is my financial data secure?",
    a: "Absolutely. We use 256-bit encryption, bcrypt password hashing, and JWT authentication. Your data never leaves our secured infrastructure.",
  },
  {
    q: "How do I connect my bank?",
    a: "Go to Dashboard → Bank Integration. We support major banks through our secure integration service.",
  },
];

const contactOptions = [
  { icon: "📧", label: "Email Support", desc: "support@fintrack.ai" },
  { icon: "💬", label: "Live Chat", desc: "Available 9am–6pm EST" },
  { icon: "🐦", label: "Twitter", desc: "@FinTrackAI" },
];

export const HelpSupportModal: React.FC<Props> = ({ visible, onClose }) => {
  const [expanded, setExpanded] = useState<number | null>(null);

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
          <Text style={styles.title}>Help & Support</Text>

          <ScrollView
            style={{ maxHeight: 420 }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.sectionLabel}>Frequently Asked Questions</Text>
            {faqs.map((faq, i) => (
              <TouchableOpacity
                key={i}
                style={styles.faqItem}
                onPress={() => setExpanded(expanded === i ? null : i)}
                activeOpacity={0.7}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQ}>{faq.q}</Text>
                  <Text style={styles.faqArrow}>
                    {expanded === i ? "▲" : "▼"}
                  </Text>
                </View>
                {expanded === i && <Text style={styles.faqA}>{faq.a}</Text>}
              </TouchableOpacity>
            ))}

            <Text style={[styles.sectionLabel, { marginTop: 20 }]}>
              Contact Us
            </Text>
            {contactOptions.map((opt, i) => (
              <View key={i} style={styles.contactRow}>
                <View style={styles.contactIcon}>
                  <Text style={{ fontSize: 20 }}>{opt.icon}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.contactLabel}>{opt.label}</Text>
                  <Text style={styles.contactDesc}>{opt.desc}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.doneBtn} onPress={onClose}>
            <Text style={styles.doneBtnText}>Close</Text>
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
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#9ca3af",
    marginBottom: 10,
  },
  faqItem: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQ: { fontSize: 14, fontWeight: "600", color: "#fff", flex: 1 },
  faqArrow: { fontSize: 12, color: "#6b7280", marginLeft: 8 },
  faqA: {
    fontSize: 13,
    color: "#9ca3af",
    marginTop: 10,
    lineHeight: 20,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  contactLabel: { fontSize: 14, fontWeight: "600", color: "#fff" },
  contactDesc: { fontSize: 11, color: "#6b7280", marginTop: 2 },
  doneBtn: {
    backgroundColor: "#6366f1",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  doneBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
