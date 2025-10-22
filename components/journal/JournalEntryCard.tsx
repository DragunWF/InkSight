import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { mainColors } from "../../constants/colors";
import type { JournalEntry } from "../../helpers/storage/journalStorage";

interface JournalEntryCardProps {
  entry: JournalEntry;
  onPress: () => void;
}

/**
 * Card component displaying a journal entry preview
 * Shows date, content preview, and whether it has an image
 */
function JournalEntryCard({ entry, onPress }: JournalEntryCardProps) {
  // Format the date
  const date = new Date(entry.date_saved);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  // Get content preview (first 120 characters)
  const contentPreview =
    entry.content.length > 120
      ? entry.content.substring(0, 120) + "..."
      : entry.content;

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <View style={styles.cardHeader}>
        <View style={styles.dateContainer}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color={mainColors.primary500}
          />
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Text style={styles.timeText}>{formattedTime}</Text>
        </View>
        {entry.image_uri && (
          <View style={styles.imageIndicator}>
            <Ionicons name="image" size={16} color={mainColors.accent500} />
          </View>
        )}
      </View>

      <Text style={styles.contentPreview} numberOfLines={3}>
        {contentPreview}
      </Text>

      <View style={styles.cardFooter}>
        <View style={styles.insightsIndicator}>
          <Ionicons name="bulb" size={14} color={mainColors.textSecondary} />
          <Text style={styles.insightsText}>AI Insights Available</Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={mainColors.textSecondary}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: mainColors.backgroundAlt,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: mainColors.borderLight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "600",
    color: mainColors.textPrimary,
  },
  timeText: {
    fontSize: 13,
    color: mainColors.textSecondary,
  },
  imageIndicator: {
    backgroundColor: mainColors.accent100,
    borderRadius: 8,
    padding: 6,
  },
  contentPreview: {
    fontSize: 15,
    color: mainColors.textPrimary,
    lineHeight: 22,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: mainColors.borderLight,
  },
  insightsIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  insightsText: {
    fontSize: 12,
    color: mainColors.textSecondary,
    fontWeight: "500",
  },
});

export default JournalEntryCard;
