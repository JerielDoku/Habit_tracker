import * as SQLite from 'expo-sqlite';

// Open the database instance
const db = SQLite.openDatabaseSync('habits.db');

export const initializeDb = async () => {
  try {
    // Point 3: Ensure the table exists before any other operations
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS habits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed INTEGER DEFAULT 0
      );
    `);
    console.log("✅ Table created or verified.");
  } catch (error) {
    // Point 10: Catching initialization errors
    console.error("Initialization Error:", error);
  }
};

export const addHabitToDb = async (title: string) => {
  try {
    // Point 1: Writing to SQLite as the source of truth
    const result = await db.runAsync('INSERT INTO habits (title, completed) VALUES (?, ?);', [title, 0]);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("SQL Execution Error:", error);
    throw error;
  }
};

export const updateHabitInDb = async (id: number, completed: number) => {
  try {
    return await db.runAsync('UPDATE habits SET completed = ? WHERE id = ?;', [completed, id]);
  } catch (error) {
    console.error("SQL Update Error:", error);
    throw error;
  }
};

// STEP 1 INTEGRATED: Delete function
export const deleteHabitFromDb = async (id: number) => {
  try {
    // Point 3: Atomic delete operation to maintain data integrity
    return await db.runAsync('DELETE FROM habits WHERE id = ?;', [id]);
  } catch (error) {
    // Point 10: Error handling for failed deletions
    console.error("SQL Delete Error:", error);
    throw error;
  }
};

export const getHabitsFromDb = async () => {
  try {
    return await db.getAllAsync('SELECT * FROM habits;');
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
};