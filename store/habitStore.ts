import { create } from 'zustand';
// Point 8: Ensure all database actions are imported correctly
import { addHabitToDb, getHabitsFromDb, updateHabitInDb, deleteHabitFromDb } from '../db/database'; 

interface Habit {
  id: number;
  title: string;
  completed: boolean;
}

interface HabitState {
  habits: Habit[];
  fetchHabits: () => Promise<void>;
  addHabit: (title: string) => Promise<void>;
  toggleHabit: (id: number, completed: boolean) => Promise<void>;
  // Added to the interface for full CRUD support
  deleteHabit: (id: number) => Promise<void>;
}

export const useHabitStore = create<HabitState>((set) => ({
  habits: [],

  fetchHabits: async () => {
    const data: any[] = await getHabitsFromDb();
    const formattedHabits = data.map(h => ({ ...h, completed: h.completed === 1 }));
    set({ habits: formattedHabits });
  },

  addHabit: async (title: string) => {
    try {
      await addHabitToDb(title);
      const data: any[] = await getHabitsFromDb();
      const formattedHabits = data.map(h => ({ ...h, completed: h.completed === 1 }));
      set({ habits: formattedHabits });
    } catch (error) {
      console.error("Store Add Error:", error);
    }
  },

  toggleHabit: async (id: number, completed: boolean) => {
    try {
      await updateHabitInDb(id, completed ? 1 : 0);
      const data: any[] = await getHabitsFromDb();
      const formattedHabits = data.map(h => ({ ...h, completed: h.completed === 1 }));
      set({ habits: formattedHabits });
    } catch (error) {
      console.error("Toggle Error:", error);
    }
  },

  // INTEGRATED DELETE LOGIC
  deleteHabit: async (id: number) => {
    try {
      // 1. Remove from SQLite
      await deleteHabitFromDb(id);
      
      // 2. Refresh the global list to update the Home screen and Progress Bar
      const data: any[] = await getHabitsFromDb();
      const formattedHabits = data.map(h => ({ ...h, completed: h.completed === 1 }));
      set({ habits: formattedHabits });
    } catch (error) {
      console.error("Store Delete Error:", error);
    }
  },
}));