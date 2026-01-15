import * as SQLite from 'expo-sqlite';

// NOTE: Ensure this matches the database name used in your existing db/database.ts
const db = SQLite.openDatabase('habits.db');

export const initHistoryTable = () => {
  return new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          habit_id INTEGER,
          date TEXT,
          completed INTEGER
        );`,
        [],
        () => resolve(),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const logHabitHistory = (habitId: number, date: string) => {
  return new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO history (habit_id, date, completed) VALUES (?, ?, 1);",
        [habitId, date],
        () => resolve(),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const getHabitStreak = (habitId: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT date FROM history WHERE habit_id = ? ORDER BY date DESC;",
        [habitId],
        (_, { rows: { _array } }) => {
          if (_array.length === 0) {
            resolve(0);
            return;
          }

          const uniqueDates = [...new Set(_array.map((row: any) => row.date))];
          const today = new Date().toISOString().split('T')[0];
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

          // If the most recent date isn't today or yesterday, streak is 0
          if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
            resolve(0);
            return;
          }

          let streak = 1;
          let currentDate = new Date(uniqueDates[0]);

          for (let i = 1; i < uniqueDates.length; i++) {
            const prevDate = new Date(uniqueDates[i]);
            const expectedPrevDate = new Date(currentDate);
            expectedPrevDate.setDate(expectedPrevDate.getDate() - 1);

            if (prevDate.toISOString().split('T')[0] === expectedPrevDate.toISOString().split('T')[0]) {
              streak++;
              currentDate = prevDate;
            } else {
              break;
            }
          }
          resolve(streak);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};