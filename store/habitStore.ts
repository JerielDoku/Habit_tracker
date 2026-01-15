import { create } from 'zustand';
import { addHabitToDb, getHabitsFromDb, updateHabitInDb, deleteHabitFromDb } from '../db/database'; 

interface Habit {
  id: number;
  title: string;
  completed: boolean;
  streak?: number; // Added optional streak to match your mock data
}

interface HabitState {
  habits: Habit[];
  fetchHabits: () => Promise<void>;
  addHabit: (title: string) => Promise<void>;
  toggleHabit: (id: number, completed: boolean) => Promise<void>;
  deleteHabit: (id: number) => Promise<void>;
  formatData: (data: any[]) => Habit[]; // Added to interface for internal use
}

export const useHabitStore = create<HabitState>((set, get) => ({
  // Updated initial state with seed data
  habits: [
    { id: 1, title: 'Drink Water', completed: false, streak: 3 } 
  ],

  // Universal Formatter: Handles both SQLite (0/1) and Web (true/false)
  formatData: (data: any[]) => {
    return data.map(h => ({
      ...h,
      // If it's 1 or true, it's completed. Otherwise, false.
      completed: h.completed === 1 || h.completed === true 
    }));
  },

  fetchHabits: async () => {
    try {
      const data: any[] = await getHabitsFromDb();
      // Only update if database has items, otherwise keep mock data for the demo
      if (data && data.length > 0) {
        set({ habits: get().formatData(data) });
      }
    } catch (error) {
      console.error("Fetch Habits Error:", error);
    }
  },

  addHabit: async (title: string) => {
    try {
      await addHabitToDb(title);
      const data: any[] = await getHabitsFromDb();
      set({ habits: get().formatData(data) });
    } catch (error) {
      console.error("Store Add Error:", error);
    }
  },

  toggleHabit: async (id: number, completed: boolean) => {
    try {
      await updateHabitInDb(id, completed ? 1 : 0);
      const data: any[] = await getHabitsFromDb();
      set({ habits: get().formatData(data) });
    } catch (error) {
      console.error("Toggle Error:", error);
    }
  },

  deleteHabit: async (id: number) => {
    try {
      await deleteHabitFromDb(id);
      const data: any[] = await getHabitsFromDb();
      set({ habits: get().formatData(data) });
    } catch (error) {
      console.error("Store Delete Error:", error);
    }
  },
}));