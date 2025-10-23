import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import {
  exportJournalData,
  importJournalData,
  getEntryCount,
} from "../helpers/storage/exportImport";
import { mainColors } from "../constants/colors";

export default function SettingsScreen() {
  const [entryCount, setEntryCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  // Load entry count on mount
  useFocusEffect(
    useCallback(() => {
      loadEntryCount();
    }, [])
  );

  const loadEntryCount = async () => {
    try {
      const count = await getEntryCount();
      setEntryCount(count);
    } catch (error) {
      console.error("Failed to load entry count:", error);
    }
  };

  const handleExport = async () => {
    if (entryCount === 0) {
      Alert.alert(
        "No Data to Export",
        "You don't have any journal entries to export yet.",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      setIsLoading(true);
      await exportJournalData();

      Toast.show({
        type: "success",
        text1: "Export Successful",
        text2: `Exported ${entryCount} journal ${
          entryCount === 1 ? "entry" : "entries"
        }`,
        position: "bottom",
      });
    } catch (error) {
      console.error("Export error:", error);
      Alert.alert(
        "Export Failed",
        "Failed to export your data. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = () => {
    // Show confirmation dialog if there's existing data
    if (entryCount > 0) {
      Alert.alert(
        "⚠️ Confirm Import",
        `You currently have ${entryCount} journal ${
          entryCount === 1 ? "entry" : "entries"
        }.\n\nImporting will REPLACE all your current data with the backup file.\n\nThis action cannot be undone.`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Import & Replace",
            style: "destructive",
            onPress: performImport,
          },
        ]
      );
    } else {
      // No existing data, safe to import
      performImport();
    }
  };

  const performImport = async () => {
    try {
      setIsLoading(true);
      const importedCount = await importJournalData();

      if (importedCount > 0) {
        // Update entry count
        await loadEntryCount();

        Toast.show({
          type: "success",
          text1: "Import Successful",
          text2: `Imported ${importedCount} journal ${
            importedCount === 1 ? "entry" : "entries"
          }`,
          position: "bottom",
        });
      }
    } catch (error: any) {
      console.error("Import error:", error);
      Alert.alert(
        "Import Failed",
        error.message ||
          "Failed to import data. Please ensure the file is a valid InkSight backup.",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>
            Manage your journal data and preferences
          </Text>
        </View>

        {/* Data Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <Text style={styles.sectionDescription}>
            Export your journal entries for backup or import from a previous
            backup file.
          </Text>

          {/* Entry Count Info */}
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Current Entries</Text>
            <Text style={styles.infoValue}>{entryCount}</Text>
          </View>

          {/* Export Button */}
          <TouchableOpacity
            style={[styles.button, styles.exportButton]}
            onPress={handleExport}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={mainColors.textOnPrimary} />
            ) : (
              <>
                <Text style={styles.buttonIcon}>📤</Text>
                <Text style={styles.buttonText}>Export All Entries</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Import Button */}
          <TouchableOpacity
            style={[styles.button, styles.importButton]}
            onPress={handleImport}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={mainColors.primary500} />
            ) : (
              <>
                <Text style={styles.buttonIcon}>📥</Text>
                <Text style={[styles.buttonText, styles.importButtonText]}>
                  Import from Backup
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* Warning Text */}
          <View style={styles.warningCard}>
            <Text style={styles.warningIcon}>⚠️</Text>
            <Text style={styles.warningText}>
              Importing a backup file will replace all your current journal
              entries. Make sure to export your current data first if you want
              to keep it.
            </Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>InkSight v1.0.0</Text>
          <Text style={styles.aboutText}>
            Your personal AI-powered journal companion
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: mainColors.primary500,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: mainColors.textSecondary,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: mainColors.textPrimary,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: mainColors.textSecondary,
    marginBottom: 20,
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: mainColors.backgroundAlt,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: mainColors.borderLight,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 16,
    color: mainColors.textSecondary,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 24,
    color: mainColors.primary500,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  exportButton: {
    backgroundColor: mainColors.primary500,
  },
  importButton: {
    backgroundColor: mainColors.backgroundAlt,
    borderWidth: 2,
    borderColor: mainColors.primary500,
  },
  buttonIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: mainColors.textOnPrimary,
  },
  importButtonText: {
    color: mainColors.primary500,
  },
  warningCard: {
    flexDirection: "row",
    backgroundColor: "#FFF3E0",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FFB74D",
  },
  warningIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    color: "#E65100",
    lineHeight: 18,
  },
  aboutText: {
    fontSize: 14,
    color: mainColors.textSecondary,
    marginBottom: 4,
  },
});
