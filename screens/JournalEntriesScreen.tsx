import { useState, useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
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

type SortOption = "newest" | "oldest";
type FilterOption = "all" | "with-image" | "without-image";

interface JournalEntriesScreenProps {
  navigation: StackNavigationProp<any>;
}

/**
 * Screen displaying all saved journal entries in a list
 * Shows cards for each entry with preview and metadata
 * Supports pull-to-refresh, search, sorting, and filtering
 */
function JournalEntriesScreen({ navigation }: JournalEntriesScreenProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Search, sort, and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const flatListRef = useRef<FlatList>(null);

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

  /**
   * Filters, sorts, and searches entries based on current state
   */
  const processedEntries = useMemo(() => {
    let filtered = [...entries];

    // Apply search filter (case-insensitive)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (entry) =>
          entry.content.toLowerCase().includes(query) ||
          entry.ai_insights.toLowerCase().includes(query)
      );
    }

    // Apply image filter
    if (filterBy === "with-image") {
      filtered = filtered.filter((entry) => entry.image_uri !== null);
    } else if (filterBy === "without-image") {
      filtered = filtered.filter((entry) => entry.image_uri === null);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return b.date_saved - a.date_saved;
      } else {
        return a.date_saved - b.date_saved;
      }
    });

    return filtered;
  }, [entries, searchQuery, sortBy, filterBy]);

  /**
   * Clears the search query
   */
  const clearSearch = () => {
    setSearchQuery("");
  };

  /**
   * Handles sort option selection
   */
  const handleSortSelect = (option: SortOption) => {
    setSortBy(option);
    setShowSortModal(false);
  };

  /**
   * Handles filter option selection
   */
  const handleFilterSelect = (option: FilterOption) => {
    setFilterBy(option);
    setShowFilterModal(false);
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
          {processedEntries.length} of {entries.length}{" "}
          {entries.length === 1 ? "entry" : "entries"}
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={20}
            color={mainColors.textMuted}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search journal entries..."
            placeholderTextColor={mainColors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons
                name="close-circle"
                size={20}
                color={mainColors.textMuted}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Sort and Filter Buttons */}
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setShowSortModal(true)}
          >
            <Ionicons
              name="swap-vertical"
              size={18}
              color={mainColors.primary500}
            />
            <Text style={styles.controlButtonText}>
              {sortBy === "newest" ? "Newest" : "Oldest"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.controlButton,
              filterBy !== "all" && styles.controlButtonActive,
            ]}
            onPress={() => setShowFilterModal(true)}
          >
            <Ionicons
              name="filter"
              size={18}
              color={
                filterBy !== "all"
                  ? mainColors.textOnPrimary
                  : mainColors.primary500
              }
            />
            <Text
              style={[
                styles.controlButtonText,
                filterBy !== "all" && styles.controlButtonTextActive,
              ]}
            >
              {filterBy === "all"
                ? "All"
                : filterBy === "with-image"
                ? "With Image"
                : "No Image"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={processedEntries}
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
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Ionicons
              name="search-outline"
              size={60}
              color={mainColors.textMuted}
            />
            <Text style={styles.emptyListText}>
              {searchQuery
                ? "No entries match your search"
                : filterBy !== "all"
                ? "No entries match this filter"
                : "No entries found"}
            </Text>
          </View>
        }
      />

      {/* Sort Modal */}
      <Modal
        visible={showSortModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSortModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSortModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort By</Text>
            <TouchableOpacity
              style={[
                styles.modalOption,
                sortBy === "newest" && styles.modalOptionSelected,
              ]}
              onPress={() => handleSortSelect("newest")}
            >
              <Text
                style={[
                  styles.modalOptionText,
                  sortBy === "newest" && styles.modalOptionTextSelected,
                ]}
              >
                Newest First
              </Text>
              {sortBy === "newest" && (
                <Ionicons
                  name="checkmark"
                  size={24}
                  color={mainColors.primary500}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalOption,
                sortBy === "oldest" && styles.modalOptionSelected,
              ]}
              onPress={() => handleSortSelect("oldest")}
            >
              <Text
                style={[
                  styles.modalOptionText,
                  sortBy === "oldest" && styles.modalOptionTextSelected,
                ]}
              >
                Oldest First
              </Text>
              {sortBy === "oldest" && (
                <Ionicons
                  name="checkmark"
                  size={24}
                  color={mainColors.primary500}
                />
              )}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFilterModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter By</Text>
            <TouchableOpacity
              style={[
                styles.modalOption,
                filterBy === "all" && styles.modalOptionSelected,
              ]}
              onPress={() => handleFilterSelect("all")}
            >
              <Text
                style={[
                  styles.modalOptionText,
                  filterBy === "all" && styles.modalOptionTextSelected,
                ]}
              >
                All Entries
              </Text>
              {filterBy === "all" && (
                <Ionicons
                  name="checkmark"
                  size={24}
                  color={mainColors.primary500}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalOption,
                filterBy === "with-image" && styles.modalOptionSelected,
              ]}
              onPress={() => handleFilterSelect("with-image")}
            >
              <Text
                style={[
                  styles.modalOptionText,
                  filterBy === "with-image" && styles.modalOptionTextSelected,
                ]}
              >
                With Image
              </Text>
              {filterBy === "with-image" && (
                <Ionicons
                  name="checkmark"
                  size={24}
                  color={mainColors.primary500}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalOption,
                filterBy === "without-image" && styles.modalOptionSelected,
              ]}
              onPress={() => handleFilterSelect("without-image")}
            >
              <Text
                style={[
                  styles.modalOptionText,
                  filterBy === "without-image" &&
                    styles.modalOptionTextSelected,
                ]}
              >
                Without Image
              </Text>
              {filterBy === "without-image" && (
                <Ionicons
                  name="checkmark"
                  size={24}
                  color={mainColors.primary500}
                />
              )}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  searchContainer: {
    padding: 16,
    paddingBottom: 12,
    backgroundColor: mainColors.background,
    borderBottomWidth: 1,
    borderBottomColor: mainColors.borderLight,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: mainColors.backgroundAlt,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: mainColors.borderLight,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: mainColors.textPrimary,
  },
  clearButton: {
    padding: 4,
  },
  controlsRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },
  controlButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: mainColors.backgroundAlt,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: mainColors.primary500,
    gap: 6,
  },
  controlButtonActive: {
    backgroundColor: mainColors.primary500,
  },
  controlButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: mainColors.primary500,
  },
  controlButtonTextActive: {
    color: mainColors.textOnPrimary,
  },
  listContainer: {
    padding: 16,
  },
  emptyList: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyListText: {
    fontSize: 16,
    color: mainColors.textSecondary,
    marginTop: 12,
    textAlign: "center",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: mainColors.backgroundAlt,
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: mainColors.textPrimary,
    marginBottom: 16,
    textAlign: "center",
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  modalOptionSelected: {
    backgroundColor: mainColors.primary100,
  },
  modalOptionText: {
    fontSize: 16,
    color: mainColors.textPrimary,
  },
  modalOptionTextSelected: {
    fontWeight: "600",
    color: mainColors.primary500,
  },
});

export default JournalEntriesScreen;
