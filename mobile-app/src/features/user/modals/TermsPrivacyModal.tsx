/**
 * Terms & Privacy Modal — Legal information display.
 */
import React from "react";
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

export const TermsPrivacyModal: React.FC<Props> = ({ visible, onClose }) => {
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
          <Text style={styles.title}>Terms & Privacy</Text>

          <ScrollView
            style={{ maxHeight: 420 }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.sectionTitle}>Terms of Service</Text>
            <Text style={styles.body}>
              By using FinTrack AI, you agree to these terms. The app provides
              personal finance tracking and AI-powered insights for
              informational purposes only. FinTrack AI is not a licensed
              financial advisor.
            </Text>
            <Text style={styles.body}>
              You are responsible for the accuracy of the data you enter. We
              reserve the right to modify or discontinue the service at any time
              with reasonable notice.
            </Text>

            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
              Privacy Policy
            </Text>
            <Text style={styles.body}>
              Your privacy is important to us. Here's how we handle your data:
            </Text>

            <View style={styles.bullet}>
              <Text style={styles.bulletIcon}>🔐</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Encryption: </Text>
                All data is encrypted at rest (AES-256) and in transit (TLS
                1.3).
              </Text>
            </View>

            <View style={styles.bullet}>
              <Text style={styles.bulletIcon}>🗄️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Storage: </Text>
                Financial data is stored in isolated databases with row-level
                security.
              </Text>
            </View>

            <View style={styles.bullet}>
              <Text style={styles.bulletIcon}>🚫</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>No Selling: </Text>
                We never sell your personal or financial data to third parties.
              </Text>
            </View>

            <View style={styles.bullet}>
              <Text style={styles.bulletIcon}>🤖</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>AI Processing: </Text>
                AI insights are generated locally within our infrastructure. No
                data is sent to external AI providers.
              </Text>
            </View>

            <View style={styles.bullet}>
              <Text style={styles.bulletIcon}>🗑️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Data Deletion: </Text>
                You can request complete deletion of your account and data at
                any time via Profile → Export Data or contacting support.
              </Text>
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
              Open Source
            </Text>
            <Text style={styles.body}>
              FinTrack AI is built with open-source technologies including React
              Native, NestJS, PostgreSQL, and Kafka. View our architecture and
              contribute on GitHub.
            </Text>

            <Text style={styles.footer}>
              Last updated: January 2025 • Version 1.0.0
            </Text>
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
    maxHeight: "85%",
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#818cf8",
    marginBottom: 10,
  },
  body: {
    fontSize: 13,
    color: "#9ca3af",
    lineHeight: 20,
    marginBottom: 10,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 12,
    paddingLeft: 4,
  },
  bulletIcon: { fontSize: 16, marginRight: 10, marginTop: 2 },
  bulletText: {
    fontSize: 13,
    color: "#9ca3af",
    lineHeight: 20,
    flex: 1,
  },
  bold: { fontWeight: "700", color: "#d1d5db" },
  footer: {
    fontSize: 11,
    color: "#4b5563",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  doneBtn: {
    backgroundColor: "#6366f1",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  doneBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
