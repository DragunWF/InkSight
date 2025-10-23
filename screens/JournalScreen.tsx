import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";
import type { StackNavigationProp } from "@react-navigation/stack";

import Button from "../components/ui/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorDisplay from "../components/ui/ErrorDisplay";
import ConfirmationDialog from "../components/ui/ConfirmationDialog";
import { mainColors } from "../constants/colors";
import { screenNames } from "../constants/navigation";
import {
  getJournalEntryById,
  deleteJournalEntry,
  type JournalEntry,
} from "../helpers/storage/journalStorage";

interface JournalScreenParams {
  entryId: number;
}

interface JournalScreenProps {
  route: { params: JournalScreenParams };
  navigation: StackNavigationProp<any>;
}

/**
 * Screen for viewing a single journal entry in detail
 * Displays all fields: content, image (if available), AI insights, and date
 * Provides options to delete entry or start reflection chat
 * Buttons are placed at the top for easy access, with scroll-to-top button at bottom
 */
function JournalScreen({ route, navigation }: JournalScreenProps) {
  const { entryId } = route.params;
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    loadEntry();
  }, [entryId]);

  /**
   * Loads the journal entry from the database
   */
  const loadEntry = async () => {
    try {
      const fetchedEntry = await getJournalEntryById(entryId);
      if (fetchedEntry) {
        setEntry(fetchedEntry);
      } else {
        Alert.alert("Error", "Journal entry not found", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error loading journal entry:", error);
      Alert.alert("Error", "Failed to load journal entry", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Shows the delete confirmation dialog
   */
  const handleDeletePress = () => {
    setShowDeleteDialog(true);
  };

  /**
   * Confirms and executes the deletion of the journal entry
   */
  const confirmDelete = async () => {
    setShowDeleteDialog(false);
    try {
      const success = await deleteJournalEntry(entryId);
      if (success) {
        Alert.alert("Deleted", "Journal entry has been deleted successfully", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert("Error", "Failed to delete journal entry");
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
      Alert.alert("Error", "An error occurred while deleting the entry");
    }
  };

  /**
   * Cancels the delete operation
   */
  const cancelDelete = () => {
    setShowDeleteDialog(false);
  };

  /**
   * Navigates to the reflection chat screen with journal entry context
   */
  const handleStartReflection = () => {
    if (!entry) return;

    navigation.navigate(screenNames.chatScreen, {
      journalEntry: entry.content,
      insights: entry.ai_insights,
      entryId: entry.id,
    });
  };

  /**
   * Scrolls to the top of the screen
   */
  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingSpinner message="Loading entry..." />
      </View>
    );
  }

  // Entry not found state
  if (!entry) {
    return (
      <View style={styles.container}>
        <ErrorDisplay
          message="Journal entry not found"
          onRetry={() => navigation.goBack()}
        />
      </View>
    );
  }

  // Format the date
  const date = new Date(entry.date_saved);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Date Header */}
        <View style={styles.dateHeader}>
          <Ionicons name="calendar" size={20} color={mainColors.primary500} />
          <View style={styles.dateInfo}>
            <Text style={styles.dateText}>{formattedDate}</Text>
            <Text style={styles.timeText}>{formattedTime}</Text>
          </View>
        </View>

        {/* Action Buttons - Moved to Top */}
        <View style={styles.topActionsContainer}>
          <Button
            onPress={handleStartReflection}
            icon="chatbubbles"
            variant="primary"
            fullWidth
          >
            Start Reflection Chat
          </Button>
          <Button
            onPress={handleDeletePress}
            icon="trash"
            variant="outline"
            fullWidth
          >
            Delete Entry
          </Button>
        </View>

        {/* Image (if available) */}
        {entry.image_uri && (
          <View style={styles.imageContainer}>
            <Text style={styles.sectionLabel}>Original Journal Image</Text>
            <Image
              source={{ uri: entry.image_uri }}
              style={styles.journalImage}
              resizeMode="contain"
            />
          </View>
        )}

        {/* Journal Content */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="document-text"
              size={20}
              color={mainColors.primary500}
            />
            <Text style={styles.sectionLabel}>Journal Entry</Text>
          </View>
          <Text style={styles.contentText}>{entry.content}</Text>
        </View>

        {/* AI Insights */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="bulb" size={20} color={mainColors.primary500} />
            <Text style={styles.sectionLabel}>AI Insights</Text>
          </View>
          <View style={styles.insightsContainer}>
            <Markdown style={markdownStyles}>{entry.ai_insights}</Markdown>
          </View>
        </View>

        {/* Scroll to Top Button - Bottom */}
        <TouchableOpacity
          style={styles.scrollToTopButton}
          onPress={scrollToTop}
        >
          <Ionicons
            name="arrow-up-circle"
            size={24}
            color={mainColors.primary500}
          />
          <Text style={styles.scrollToTopText}>Back to Top</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        visible={showDeleteDialog}
        title="Delete Journal Entry?"
        message="This action cannot be undone. Your journal entry and all associated insights will be permanently deleted."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        confirmText="Delete"
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
  dateHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: mainColors.primary500,
  },
  dateInfo: {
    flex: 1,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: mainColors.textPrimary,
    marginBottom: 2,
  },
  timeText: {
    fontSize: 14,
    color: mainColors.textSecondary,
  },
  imageContainer: {
    marginBottom: 24,
  },
  journalImage: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    backgroundColor: mainColors.backgroundAlt,
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: mainColors.textPrimary,
  },
  contentText: {
    fontSize: 16,
    color: mainColors.textPrimary,
    lineHeight: 26,
    backgroundColor: mainColors.backgroundAlt,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: mainColors.accent500,
  },
  insightsContainer: {
    backgroundColor: mainColors.backgroundAlt,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: mainColors.borderLight,
  },
  topActionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  actionsContainer: {
    gap: 12,
    marginTop: 8,
  },
  scrollToTopButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    marginTop: 24,
    backgroundColor: mainColors.backgroundAlt,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: mainColors.primary500,
    gap: 8,
  },
  scrollToTopText: {
    fontSize: 16,
    fontWeight: "600",
    color: mainColors.primary500,
  },
});

/**
 * Markdown styling for rendering AI insights
 */
const markdownStyles = StyleSheet.create({
  heading1: {
    fontSize: 22,
    fontWeight: "bold",
    color: mainColors.textPrimary,
    marginTop: 16,
    marginBottom: 10,
  },
  heading2: {
    fontSize: 19,
    fontWeight: "bold",
    color: mainColors.textPrimary,
    marginTop: 14,
    marginBottom: 8,
  },
  heading3: {
    fontSize: 17,
    fontWeight: "600",
    color: mainColors.primary500,
    marginTop: 12,
    marginBottom: 6,
  },
  body: {
    fontSize: 15,
    color: mainColors.textPrimary,
    lineHeight: 24,
  },
  paragraph: {
    marginTop: 0,
    marginBottom: 10,
    fontSize: 15,
    color: mainColors.textPrimary,
    lineHeight: 24,
  },
  strong: {
    fontWeight: "bold",
  },
  em: {
    fontStyle: "italic",
  },
  bullet_list: {
    marginBottom: 10,
  },
  list_item: {
    marginBottom: 4,
    fontSize: 15,
    color: mainColors.textPrimary,
    lineHeight: 22,
  },
  bullet_list_icon: {
    color: mainColors.primary500,
    fontSize: 16,
  },
});

export default JournalScreen;
