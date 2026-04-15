/**
 * Export Data Modal — Choose format and date range for data export.
 */
import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const formats = [
  { key: "csv", icon: "📄", label: "CSV", desc: "Spreadsheet-compatible" },
  { key: "pdf", icon: "📕", label: "PDF Report", desc: "Formatted summary" },
  { key: "json", icon: "🔧", label: "JSON", desc: "Raw data export" },
];

const ranges = [
  { key: "week", label: "Last 7 Days" },
  { key: "month", label: "This Month" },
  { key: "quarter", label: "Last 3 Months" },
  { key: "year", label: "This Year" },
  { key: "all", label: "All Time" },
];

export const ExportDataModal: React.FC<Props> = ({ visible, onClose }) => {
  const [format, setFormat] = useState("csv");
  const [range, setRange] = useState("month");

  const handleExport = () => {
    // TODO: trigger export via analytics-service API
    onClose();
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
          <Text style={styles.title}>Export Data</Text>

          <Text style={styles.sectionLabel}>Format</Text>
          {formats.map((f) => (
            <TouchableOpacity
              key={f.key}
              style={[
                styles.optionRow,
                format === f.key && styles.optionActive,
              ]}
              onPress={() => setFormat(f.key)}
            >
              <Text style={{ fontSize: 22 }}>{f.icon}</Text>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.optionLabel}>{f.label}</Text>
                <Text style={styles.optionDesc}>{f.desc}</Text>
              </View>
              {format === f.key && <Text style={styles.check}>✓</Text>}
            </TouchableOpacity>
          ))}

          <Text style={[styles.sectionLabel, { marginTop: 16 }]}>
            Date Range
          </Text>
          <View style={styles.chipRow}>
            {ranges.map((r) => (
              <TouchableOpacity
                key={r.key}
                style={[styles.chip, range === r.key && styles.chipActive]}
                onPress={() => setRange(r.key)}
              >
                <Text
                  style={[
                    styles.chipText,
                    range === r.key && styles.chipTextActive,
                  ]}
                >
                  {r.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.exportBtn} onPress={handleExport}>
            <Text style={styles.exportBtnText}>Export Now</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
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
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  optionActive: {
    backgroundColor: "rgba(99,102,241,0.1)",
    borderColor: "rgba(99,102,241,0.3)",
  },
  optionLabel: { fontSize: 14, fontWeight: "600", color: "#fff" },
  optionDesc: { fontSize: 11, color: "#6b7280", marginTop: 2 },
  check: { fontSize: 18, color: "#818cf8", fontWeight: "700" },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  chipActive: {
    backgroundColor: "rgba(99,102,241,0.15)",
    borderColor: "#6366f1",
  },
  chipText: { fontSize: 13, color: "#9ca3af", fontWeight: "600" },
  chipTextActive: { color: "#818cf8" },
  exportBtn: {
    backgroundColor: "#6366f1",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
  },
  exportBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  cancelBtn: { alignItems: "center", marginTop: 12, padding: 12 },
  cancelText: { color: "#6b7280", fontSize: 14, fontWeight: "600" },
});
