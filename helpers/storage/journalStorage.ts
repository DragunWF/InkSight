import { getDatabase } from "./coreStorage";

/**
 * Interface representing a Journal Entry in the database
 */
export interface JournalEntry {
  id: number;
  content: string;
  image_uri: string | null;
  ai_insights: string;
  date_saved: number; // Unix timestamp
}

/**
 * Interface for creating a new journal entry (without ID)
 */
export interface NewJournalEntry {
  content: string;
  image_uri?: string | null;
  ai_insights: string;
}

/**
 * Creates a new journal entry in the database
 * @param entry - The journal entry data to save
 * @returns The ID of the newly created entry
 */
export async function createJournalEntry(
  entry: NewJournalEntry
): Promise<number> {
  try {
    const db = getDatabase();
    const result = await db.runAsync(
      `INSERT INTO journal_entries (content, image_uri, ai_insights, date_saved) 
       VALUES (?, ?, ?, ?)`,
      [entry.content, entry.image_uri || null, entry.ai_insights, Date.now()]
    );

    console.log("✅ Journal entry created with ID:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("❌ Error creating journal entry:", error);
    throw error;
  }
}

/**
 * Retrieves all journal entries from the database
 * Sorted by date (newest first)
 * @returns Array of all journal entries
 */
export async function getAllJournalEntries(): Promise<JournalEntry[]> {
  try {
    const db = getDatabase();
    const entries = await db.getAllAsync<JournalEntry>(
      `SELECT * FROM journal_entries ORDER BY date_saved DESC`
    );

    console.log(`✅ Retrieved ${entries.length} journal entries`);
    return entries;
  } catch (error) {
    console.error("❌ Error fetching journal entries:", error);
    throw error;
  }
}

/**
 * Retrieves a single journal entry by ID
 * @param id - The ID of the journal entry to retrieve
 * @returns The journal entry or null if not found
 */
export async function getJournalEntryById(
  id: number
): Promise<JournalEntry | null> {
  try {
    const db = getDatabase();
    const entry = await db.getFirstAsync<JournalEntry>(
      `SELECT * FROM journal_entries WHERE id = ?`,
      [id]
    );

    if (entry) {
      console.log("✅ Retrieved journal entry:", id);
    } else {
      console.log("⚠️  Journal entry not found:", id);
    }

    return entry;
  } catch (error) {
    console.error("❌ Error fetching journal entry:", error);
    throw error;
  }
}

/**
 * Updates an existing journal entry
 * Note: Date saved is not updated
 * @param id - The ID of the entry to update
 * @param updates - Partial entry data to update
 * @returns True if update was successful
 */
export async function updateJournalEntry(
  id: number,
  updates: Partial<Omit<JournalEntry, "id" | "date_saved">>
): Promise<boolean> {
  try {
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.content !== undefined) {
      fields.push("content = ?");
      values.push(updates.content);
    }
    if (updates.image_uri !== undefined) {
      fields.push("image_uri = ?");
      values.push(updates.image_uri);
    }
    if (updates.ai_insights !== undefined) {
      fields.push("ai_insights = ?");
      values.push(updates.ai_insights);
    }

    if (fields.length === 0) {
      console.log("⚠️  No fields to update");
      return false;
    }

    values.push(id);

    const db = getDatabase();
    const result = await db.runAsync(
      `UPDATE journal_entries SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    console.log("✅ Journal entry updated:", id, "Changes:", result.changes);
    return result.changes > 0;
  } catch (error) {
    console.error("❌ Error updating journal entry:", error);
    throw error;
  }
}

/**
 * Deletes a journal entry from the database
 * @param id - The ID of the entry to delete
 * @returns True if deletion was successful
 */
export async function deleteJournalEntry(id: number): Promise<boolean> {
  try {
    const db = getDatabase();
    const result = await db.runAsync(
      `DELETE FROM journal_entries WHERE id = ?`,
      [id]
    );

    console.log("✅ Journal entry deleted:", id, "Changes:", result.changes);
    return result.changes > 0;
  } catch (error) {
    console.error("❌ Error deleting journal entry:", error);
    throw error;
  }
}

/**
 * Searches journal entries by content text
 * @param searchTerm - The text to search for in content
 * @returns Array of matching journal entries
 */
export async function searchJournalEntries(
  searchTerm: string
): Promise<JournalEntry[]> {
  try {
    const db = getDatabase();
    const entries = await db.getAllAsync<JournalEntry>(
      `SELECT * FROM journal_entries 
       WHERE content LIKE ? OR ai_insights LIKE ?
       ORDER BY created_at DESC`,
      [`%${searchTerm}%`, `%${searchTerm}%`]
    );

    console.log(
      "✅ Found entries matching:",
      searchTerm,
      "Count:",
      entries.length
    );
    return entries;
  } catch (error) {
    console.error("❌ Error searching journal entries:", error);
    throw error;
  }
}

/**
 * Gets the total count of journal entries
 * @returns The total number of entries in the database
 */
export async function getJournalEntriesCount(): Promise<number> {
  try {
    const db = getDatabase();
    const result = await db.getFirstAsync<{ count: number }>(
      `SELECT COUNT(*) as count FROM journal_entries`
    );

    const count = result?.count ?? 0;
    console.log("✅ Total journal entries:", count);
    return count;
  } catch (error) {
    console.error("❌ Error getting journal entries count:", error);
    throw error;
  }
}
