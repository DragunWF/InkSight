import { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import type { StackNavigationProp } from "@react-navigation/stack";

import JournalEntryCard from "../components/journal/JournalEntryCard";
import { mainColors } from "../constants/colors";
import { screenNames } from "../constants/navigation";
import {
  getAllJournalEntries,
  type JournalEntry,
} from "../helpers/storage/journalStorage";

interface JournalEntriesScreenProps {
  navigation: StackNavigationProp<any>;
}

/**
 * Screen displaying all saved journal entries in a list
 * Shows cards for each entry with preview and metadata
 * Supports pull-to-refresh and navigation to individual entries
 */
function JournalEntriesScreen({ navigation }: JournalEntriesScreenProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Loads all journal entries from the database
   */
  const loadEntries = async () => {
    try {
      const fetchedEntries = await getAllJournalEntries();
      setEntries(fetchedEntries);
    } catch (error) {
      console.error("Error loading journal entries:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles pull-to-refresh functionality
   */
  const onRefresh = async () => {
    setRefreshing(true);
    await loadEntries();
    setRefreshing(false);
  };

  /**
   * Navigates to the detail view for a specific journal entry
   */
  const handleEntryPress = (entry: JournalEntry) => {
    navigation.navigate(screenNames.journalScreen, { entryId: entry.id });
  };

  // Reload entries when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, [])
  );

  // Loading state
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={mainColors.primary500} />
        <Text style={styles.loadingText}>Loading your journal...</Text>
      </View>
    );
  }

  // Empty state
  if (entries.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons
          name="journal-outline"
          size={80}
          color={mainColors.textMuted}
        />
        <Text style={styles.emptyTitle}>No Journal Entries Yet</Text>
        <Text style={styles.emptySubtitle}>
          Start by creating your first journal entry.{"\n"}
          Use the Insights tab to get started!
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Journal</Text>
        <Text style={styles.headerSubtitle}>
          {entries.length} {entries.length === 1 ? "entry" : "entries"}
        </Text>
      </View>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JournalEntryCard
            entry={item}
            onPress={() => handleEntryPress(item)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={mainColors.primary500}
            colors={[mainColors.primary500]}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: mainColors.background,
    padding: 20,
  },
  header: {
    padding: 20,
    paddingBottom: 12,
    backgroundColor: mainColors.background,
    borderBottomWidth: 1,
    borderBottomColor: mainColors.borderLight,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: mainColors.textPrimary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: mainColors.textSecondary,
  },
  listContainer: {
    padding: 16,
  },
  loadingText: {
    fontSize: 16,
    color: mainColors.textSecondary,
    marginTop: 12,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: mainColors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: mainColors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
});

export default JournalEntriesScreen;
