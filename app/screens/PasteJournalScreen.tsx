import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import Button from "../components/ui/Button";
import ConfirmationDialog from "../components/ui/ConfirmationDialog";
import { mainColors } from "../constants/colors";
import { screenNames } from "../constants/navigation";

interface PasteJournalScreenProps {
  navigation: StackNavigationProp<any>;
}

/**
 * Screen for pasting and submitting digital journal entries
 * Supports markdown formatting and includes confirmation before processing
 */
function PasteJournalScreen({ navigation }: PasteJournalScreenProps) {
  const [journalText, setJournalText] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const wordCount = journalText.trim().split(/\s+/).filter(Boolean).length;
  const charCount = journalText.length;

  const handleSubmit = () => {
    if (journalText.trim().length === 0) {
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    // Navigate to insights screen with journal text
    navigation.navigate(screenNames.insightsScreen, { journalText });
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleClear = () => {
    setJournalText("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.headerIcon}>
            <Ionicons
              name="document-text"
              size={32}
              color={mainColors.primary500}
            />
          </View>
          <Text style={styles.title}>Digital Journal Entry</Text>
          <Text style={styles.subtitle}>
            Paste your journal text below. Markdown formatting is supported.
          </Text>
        </View>

        {/* Primary Action Button - Always Visible */}
        <View style={styles.topActionContainer}>
          <Button
            onPress={handleSubmit}
            icon="sparkles"
            variant="primary"
            fullWidth
            disabled={journalText.trim().length === 0}
          >
            {journalText.trim().length === 0
              ? "Paste Text to Generate Insights"
              : `Generate Insights (${wordCount} words)`}
          </Button>
          {journalText.length > 0 && (
            <Button
              onPress={handleClear}
              icon="trash"
              variant="outline"
              fullWidth
            >
              Clear Text
            </Button>
          )}
        </View>

        {/* Text Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Start typing or paste your journal entry here...&#10;&#10;You can use markdown:&#10;**bold**, *italic*, # heading, - lists"
            placeholderTextColor={mainColors.textMuted}
            multiline
            value={journalText}
            onChangeText={setJournalText}
            textAlignVertical="top"
          />

          {/* Character and Word Count */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="text" size={16} color={mainColors.textMuted} />
              <Text style={styles.statText}>{wordCount} words</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons
                name="document"
                size={16}
                color={mainColors.textMuted}
              />
              <Text style={styles.statText}>{charCount} characters</Text>
            </View>
          </View>
        </View>

        {/* Markdown Guide */}
        <View style={styles.guideContainer}>
          <Text style={styles.guideTitle}>✍️ Markdown Quick Guide</Text>
          <View style={styles.guideRow}>
            <Text style={styles.guideCode}>**bold**</Text>
            <Text style={styles.guideDescription}>Bold text</Text>
          </View>
          <View style={styles.guideRow}>
            <Text style={styles.guideCode}>*italic*</Text>
            <Text style={styles.guideDescription}>Italic text</Text>
          </View>
          <View style={styles.guideRow}>
            <Text style={styles.guideCode}># Heading</Text>
            <Text style={styles.guideDescription}>Section heading</Text>
          </View>
          <View style={styles.guideRow}>
            <Text style={styles.guideCode}>- Item</Text>
            <Text style={styles.guideDescription}>Bullet list</Text>
          </View>
        </View>
      </ScrollView>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        visible={showConfirmation}
        title="Generate Insights?"
        message="Your journal entry will be processed by AI to generate personalized insights. This may take a few moments."
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmText="Generate"
        cancelText="Cancel"
      />
    </KeyboardAvoidingView>
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
    flexGrow: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: mainColors.primary100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: mainColors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: mainColors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  inputContainer: {
    backgroundColor: mainColors.backgroundAlt,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: mainColors.borderLight,
    marginBottom: 20,
    overflow: "hidden",
  },
  textInput: {
    minHeight: 300,
    padding: 16,
    fontSize: 15,
    color: mainColors.textPrimary,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: mainColors.background,
    borderTopWidth: 1,
    borderTopColor: mainColors.borderLight,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontSize: 12,
    color: mainColors.textMuted,
  },
  topActionContainer: {
    gap: 12,
    marginBottom: 20,
  },
  guideContainer: {
    backgroundColor: mainColors.backgroundAlt,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: mainColors.accent500,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: mainColors.textPrimary,
    marginBottom: 12,
  },
  guideRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 12,
  },
  guideCode: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 13,
    color: mainColors.primary500,
    backgroundColor: mainColors.primary100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 100,
  },
  guideDescription: {
    flex: 1,
    fontSize: 13,
    color: mainColors.textSecondary,
  },
});

export default PasteJournalScreen;
