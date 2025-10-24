import { Paths, File } from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";
import { Alert } from "react-native";

import { getDatabase } from "./coreStorage";
import type { JournalEntry } from "./journalStorage";

/**
 * Format version for backwards compatibility
 * Increment when changing the export format structure
 */
const EXPORT_FORMAT_VERSION = "1.0";

/**
 * Interface for the exported data structure
 */
interface ExportData {
  version: string;
  exportedAt: string;
  totalEntries: number;
  entries: JournalEntry[];
}

/**
 * Exports all journal entries to a JSON file
 * Creates a shareable file that can be saved to the device or shared
 *
 * @returns Promise<void>
 * @throws Error if export fails
 *
 * @example
 * try {
 *   await exportJournalData();
 *   // User will see system share dialog
 * } catch (error) {
 *   console.error("Export failed:", error);
 * }
 */
export async function exportJournalData(): Promise<void> {
  try {
    const db = getDatabase();

    // Fetch all journal entries
    const result = await db.getAllAsync<JournalEntry>(
      "SELECT * FROM journal_entries ORDER BY date_saved DESC"
    );

    if (!result || result.length === 0) {
      Alert.alert(
        "No Data to Export",
        "You don't have any journal entries to export yet.",
        [{ text: "OK" }]
      );
      return;
    }

    // Create export data structure
    const exportData: ExportData = {
      version: EXPORT_FORMAT_VERSION,
      exportedAt: new Date().toISOString(),
      totalEntries: result.length,
      entries: result,
    };

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const filename = `inksight-backup-${timestamp}.json`;

    // Create file in cache directory (user can save elsewhere via share dialog)
    const file = new File(Paths.cache, filename);

    // Write data to file
    await file.write(JSON.stringify(exportData, null, 2));

    console.log(`✅ Export file created: ${file.uri}`);

    // Check if sharing is available
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      // Share the file (user can save to Files, send via email, etc.)
      await Sharing.shareAsync(file.uri, {
        mimeType: "application/json",
        dialogTitle: "Save Your InkSight Backup",
        UTI: "public.json",
      });
    } else {
      Alert.alert(
        "Export Successful",
        `Your data has been exported to:\n${file.uri}\n\nYou can find this file in your app's cache folder.`,
        [{ text: "OK" }]
      );
    }
  } catch (error) {
    console.error("❌ Export error:", error);
    throw new Error(
      "Failed to export your data. Please ensure you have enough storage space and try again."
    );
  }
}

/**
 * Imports journal entries from a previously exported JSON file
 * Replaces all existing entries with the imported data
 *
 * @returns Promise<number> - Number of entries imported
 * @throws Error if import fails or file format is invalid
 *
 * @example
 * try {
 *   const count = await importJournalData();
 *   console.log(`Imported ${count} entries`);
 * } catch (error) {
 *   console.error("Import failed:", error);
 * }
 */
export async function importJournalData(): Promise<number> {
  try {
    // Let user pick a file
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/json",
      copyToCacheDirectory: true,
    });

    // Check if user cancelled
    if (result.canceled) {
      return 0;
    }

    const pickedFile = result.assets[0];
    console.log("📁 Selected file:", pickedFile.name);

    // Read file content
    const file = new File(pickedFile.uri);
    const fileContent = await file.text();

    // Parse and validate JSON
    let importData: ExportData;
    try {
      importData = JSON.parse(fileContent);
    } catch (parseError) {
      throw new Error(
        "Invalid file format. Please select a valid InkSight backup file."
      );
    }

    // Validate data structure
    if (
      !importData.version ||
      !importData.entries ||
      !Array.isArray(importData.entries)
    ) {
      throw new Error(
        "Invalid backup file structure. This file may be corrupted or from an incompatible version."
      );
    }

    // Check for empty backup
    if (importData.entries.length === 0) {
      Alert.alert(
        "Empty Backup",
        "The selected backup file contains no journal entries.",
        [{ text: "OK" }]
      );
      return 0;
    }

    const db = getDatabase();

    // Begin transaction for data integrity
    await db.withTransactionAsync(async () => {
      // Clear existing entries
      await db.runAsync("DELETE FROM journal_entries");
      console.log("🗑️ Cleared existing entries");

      // Insert imported entries
      for (const entry of importData.entries) {
        await db.runAsync(
          `INSERT INTO journal_entries (id, content, image_uri, ai_insights, date_saved)
           VALUES (?, ?, ?, ?, ?)`,
          [
            entry.id,
            entry.content,
            entry.image_uri,
            entry.ai_insights,
            entry.date_saved,
          ]
        );
      }

      console.log(
        `✅ Imported ${importData.entries.length} entries successfully`
      );
    });

    return importData.entries.length;
  } catch (error: any) {
    console.error("❌ Import error:", error);
    if (error.message) {
      throw error; // Re-throw with existing message
    }
    throw new Error(
      "Failed to import data. Please ensure the file is a valid InkSight backup."
    );
  }
}

/**
 * Gets the current number of journal entries for display purposes
 *
 * @returns Promise<number> - Total count of journal entries
 */
export async function getEntryCount(): Promise<number> {
  try {
    const db = getDatabase();
    const result = await db.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM journal_entries"
    );
    return result?.count || 0;
  } catch (error) {
    console.error("❌ Error getting entry count:", error);
    return 0;
  }
}

/**
 * Validates if a file is a valid InkSight backup
 * Can be used before attempting import to show user feedback
 *
 * @param fileUri - URI of the file to validate
 * @returns Promise<boolean> - True if valid backup file
 */
export async function validateBackupFile(fileUri: string): Promise<boolean> {
  try {
    const file = new File(fileUri);
    const fileContent = await file.text();
    const data = JSON.parse(fileContent);

    return !!(
      data.version &&
      data.entries &&
      Array.isArray(data.entries) &&
      data.exportedAt
    );
  } catch {
    return false;
  }
}
