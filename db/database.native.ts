import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('habits.db');

export const initializeDb = async () => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS habits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed INTEGER DEFAULT 0
      );
    `);
  } catch (error) {
    console.error("Initialization Error:", error);
  }
};

export const addHabitToDb = async (title: string) => {
  const result = await db.runAsync('INSERT INTO habits (title, completed) VALUES (?, ?);', [title, 0]);
  return result.lastInsertRowId;
};

export const updateHabitInDb = async (id: number, completed: number) => {
  return await db.runAsync('UPDATE habits SET completed = ? WHERE id = ?;', [completed, id]);
};

export const deleteHabitFromDb = async (id: number) => {
  return await db.runAsync('DELETE FROM habits WHERE id = ?;', [id]);
};

export const getHabitsFromDb = async () => {
  return await db.getAllAsync('SELECT * FROM habits;');
};