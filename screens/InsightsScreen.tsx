import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  Platform,
  SafeAreaView,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { Ionicons } from "@expo/vector-icons";

import Button from "../components/ui/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorDisplay from "../components/ui/ErrorDisplay";
import ConfirmationDialog from "../components/ui/ConfirmationDialog";
import { mainColors } from "../constants/colors";
import {
  generateInsights,
  correctOcrText,
} from "../helpers/ai/insightsGenerator";
import { performOCR } from "../services/ocr";
import { createJournalEntry } from "../helpers/storage/journalStorage";

interface InsightsScreenParams {
  journalText?: string;
  imageUri?: string;
  isOcrMode?: boolean;
}

/**
 * Screen that displays AI-generated insights from a journal entry.
 * Supports two modes:
 * 1. Direct text input (journalText parameter)
 * 2. OCR mode (imageUri + isOcrMode parameters) - processes scanned images
 *
 * Shows structured feedback including writing analysis, emotional tone,
 * key themes, reflections, and growth questions.
 */
function InsightsScreen({ route, navigation }) {
  const params = (route.params as InsightsScreenParams) || {};
  const { journalText, imageUri, isOcrMode } = params;

  const [processedText, setProcessedText] = useState<string>("");
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Initializing...");
  const [error, setError] = useState<string | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  useEffect(() => {
    if (isOcrMode && imageUri) {
      processOcrImage();
    } else if (journalText) {
      setProcessedText(journalText);
      fetchInsights(journalText);
    } else {
      setError("No journal text or image provided");
      setLoading(false);
    }
  }, [journalText, imageUri, isOcrMode]);

  /**
   * Complete OCR workflow: Image → OCR Extraction → Text Correction → Insights
   * This is the main processing pipeline for scanned journal entries
   */
  const processOcrImage = async () => {
    try {
      setLoading(true);
      setError(null);

      // Step 1: Extract text from image using OCR
      setLoadingMessage("Scanning your journal entry...");

      // Pass the image URI directly - API expects the raw image data
      const rawOcrText = await performOCR(imageUri!);

      if (!rawOcrText || rawOcrText.trim().length === 0) {
        throw new Error(
          "No text detected in the image. Please try a clearer photo."
        );
      }

      console.log("Raw OCR text:", rawOcrText);

      // Step 2: Correct OCR errors using AI
      setLoadingMessage("Correcting any recognition errors...");
      const correctedText = await correctOcrText(rawOcrText);
      console.log("Corrected text:", correctedText);
      setProcessedText(correctedText);

      // Step 3: Generate insights from corrected text
      setLoadingMessage("Generating your personalized insights...");
      const generatedInsights = await generateInsights(correctedText);
      setInsights(generatedInsights);
    } catch (err: any) {
      console.error("Error processing OCR image:", err);
      setError(
        err.message ||
          "Failed to process your journal image. Please try again with a clearer photo."
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches AI-generated insights for the journal entry (direct text mode)
   */
  const fetchInsights = async (text: string) => {
    try {
      setLoading(true);
      setError(null);
      setLoadingMessage("Generating your personalized insights...");
      const generatedInsights = await generateInsights(text);
      setInsights(generatedInsights);
    } catch (err) {
      console.error("Error generating insights:", err);
      setError(
        "Failed to generate insights. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Retries the entire processing workflow based on the mode
   */
  const handleRetry = () => {
    if (isOcrMode && imageUri) {
      processOcrImage();
    } else if (journalText) {
      fetchInsights(journalText);
    }
  };

  /**
   * Handles navigation to the reflection chat screen
   */
  const handleStartReflection = () => {
    // TODO: Navigate to reflection chat screen
    Alert.alert(
      "Coming Soon",
      "The reflection chat feature will allow you to discuss your journal entry in depth with an AI companion.",
      [{ text: "OK" }]
    );
  };

  /**
   * Shows confirmation dialog for saving journal entry
   */
  const handleSaveEntry = () => {
    setShowSaveDialog(true);
  };

  /**
   * Confirms and saves the journal entry to local storage
   */
  const confirmSaveEntry = async () => {
    setShowSaveDialog(false);

    try {
      // Save to SQLite database
      const entryId = await createJournalEntry({
        content: processedText,
        image_uri: isOcrMode ? imageUri : null,
        ai_insights: insights || "",
      });

      Alert.alert(
        "Entry Saved",
        "Your journal entry and insights have been saved successfully!",
        [{ text: "OK" }]
      );

      console.log("Journal entry saved with ID:", entryId);
    } catch (error) {
      console.error("Error saving journal entry:", error);
      Alert.alert(
        "Save Failed",
        "Failed to save your journal entry. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  /**
   * Cancels the save operation
   */
  const cancelSaveEntry = () => {
    setShowSaveDialog(false);
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingSpinner message={loadingMessage} />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.container}>
        <ErrorDisplay message={error} onRetry={handleRetry} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="bulb" size={32} color={mainColors.primary500} />
          </View>
          <Text style={styles.headerTitle}>Your Insights</Text>
          <Text style={styles.headerSubtitle}>
            AI-powered analysis of your journal entry
          </Text>
        </View>

        {/* Journal Entry Preview */}
        <View style={styles.entryPreviewContainer}>
          <View style={styles.entryPreviewHeader}>
            <Ionicons
              name={isOcrMode ? "image-outline" : "document-text-outline"}
              size={18}
              color={mainColors.textSecondary}
            />
            <Text style={styles.entryPreviewTitle}>
              {isOcrMode ? "Extracted Text" : "Your Entry"}
            </Text>
          </View>
          <Text style={styles.entryPreviewText} numberOfLines={3}>
            {processedText}
          </Text>
        </View>

        {/* Insights Content with Markdown Rendering */}
        <View style={styles.insightsContainer}>
          {insights ? (
            <Markdown style={markdownStyles}>{insights}</Markdown>
          ) : (
            <Text style={styles.noInsightsText}>
              No insights generated yet.
            </Text>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Button
            onPress={handleStartReflection}
            icon="chatbubbles"
            variant="primary"
            fullWidth
          >
            Start Reflection Chat
          </Button>
          <Button
            onPress={handleSaveEntry}
            icon="save"
            variant="outline"
            fullWidth
          >
            Save to Journal
          </Button>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle"
            size={20}
            color={mainColors.primary500}
          />
          <Text style={styles.infoText}>
            These insights are personalized feedback to support your growth
            journey. Use them as a starting point for deeper reflection.
          </Text>
        </View>
      </ScrollView>

      {/* Save Confirmation Dialog */}
      <ConfirmationDialog
        visible={showSaveDialog}
        title="Save Journal Entry?"
        message="This will save your journal entry and the generated insights to your local journal collection for future reference."
        onConfirm={confirmSaveEntry}
        onCancel={cancelSaveEntry}
        confirmText="Save"
        cancelText="Cancel"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  headerIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: mainColors.primary100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: mainColors.textPrimary,
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: mainColors.textSecondary,
    textAlign: "center",
  },
  entryPreviewContainer: {
    backgroundColor: mainColors.backgroundAlt,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: mainColors.accent500,
  },
  entryPreviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  entryPreviewTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: mainColors.textSecondary,
  },
  entryPreviewText: {
    fontSize: 14,
    color: mainColors.textSecondary,
    lineHeight: 20,
    fontStyle: "italic",
  },
  insightsContainer: {
    backgroundColor: mainColors.backgroundAlt,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: mainColors.borderLight,
  },
  noInsightsText: {
    fontSize: 15,
    color: mainColors.textMuted,
    textAlign: "center",
    fontStyle: "italic",
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: mainColors.primary100,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    alignItems: "flex-start",
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: mainColors.textSecondary,
    lineHeight: 20,
  },
});

/**
 * Markdown styling for rendering AI insights with proper typography
 * Follows the app's design system for consistency
 */
const markdownStyles = StyleSheet.create({
  // Headings
  heading1: {
    fontSize: 24,
    fontWeight: "bold",
    color: mainColors.textPrimary,
    marginTop: 20,
    marginBottom: 12,
  },
  heading2: {
    fontSize: 20,
    fontWeight: "bold",
    color: mainColors.textPrimary,
    marginTop: 16,
    marginBottom: 10,
  },
  heading3: {
    fontSize: 18,
    fontWeight: "600",
    color: mainColors.primary500,
    marginTop: 16,
    marginBottom: 8,
  },
  heading4: {
    fontSize: 16,
    fontWeight: "600",
    color: mainColors.textPrimary,
    marginTop: 12,
    marginBottom: 6,
  },
  // Body text
  body: {
    fontSize: 15,
    color: mainColors.textPrimary,
    lineHeight: 24,
  },
  paragraph: {
    marginTop: 0,
    marginBottom: 12,
    fontSize: 15,
    color: mainColors.textPrimary,
    lineHeight: 24,
  },
  // Text styles
  strong: {
    fontWeight: "bold",
    color: mainColors.textPrimary,
  },
  em: {
    fontStyle: "italic",
  },
  // Lists
  bullet_list: {
    marginBottom: 12,
  },
  ordered_list: {
    marginBottom: 12,
  },
  list_item: {
    marginBottom: 6,
    fontSize: 15,
    color: mainColors.textPrimary,
    lineHeight: 22,
  },
  bullet_list_icon: {
    color: mainColors.primary500,
    fontSize: 18,
    marginRight: 8,
  },
  ordered_list_icon: {
    color: mainColors.primary500,
    fontSize: 15,
    fontWeight: "bold",
  },
  // Code (if user uses it)
  code_inline: {
    backgroundColor: mainColors.primary100,
    color: mainColors.primary700,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 14,
  },
  code_block: {
    backgroundColor: mainColors.background,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 13,
  },
  // Links (if applicable)
  link: {
    color: mainColors.primary500,
    textDecorationLine: "underline",
  },
  // Blockquotes
  blockquote: {
    backgroundColor: mainColors.accent100,
    borderLeftWidth: 4,
    borderLeftColor: mainColors.accent500,
    paddingLeft: 12,
    paddingVertical: 8,
    marginBottom: 12,
    fontStyle: "italic",
  },
  // Horizontal rule
  hr: {
    backgroundColor: mainColors.borderLight,
    height: 1,
    marginVertical: 16,
  },
});

export default InsightsScreen;
