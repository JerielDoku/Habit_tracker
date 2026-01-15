const WEB_STORAGE_KEY = 'habits_data';

export const initializeDb = async () => {
  if (!localStorage.getItem(WEB_STORAGE_KEY)) {
    localStorage.setItem(WEB_STORAGE_KEY, JSON.stringify([]));
  }
};

export const addHabitToDb = async (title: string) => {
  const habits = JSON.parse(localStorage.getItem(WEB_STORAGE_KEY) || '[]');
  const newHabit = { id: Date.now(), title, completed: 0 };
  localStorage.setItem(WEB_STORAGE_KEY, JSON.stringify([...habits, newHabit]));
  return newHabit.id;
};

export const updateHabitInDb = async (id: number, completed: number) => {
  const habits = JSON.parse(localStorage.getItem(WEB_STORAGE_KEY) || '[]');
  const updated = habits.map((h: any) => h.id === id ? { ...h, completed: !!completed } : h);
  localStorage.setItem(WEB_STORAGE_KEY, JSON.stringify(updated));
};

export const deleteHabitFromDb = async (id: number) => {
  const habits = JSON.parse(localStorage.getItem(WEB_STORAGE_KEY) || '[]');
  const filtered = habits.filter((h: any) => h.id !== id);
  localStorage.setItem(WEB_STORAGE_KEY, JSON.stringify(filtered));
};

export const getHabitsFromDb = async () => {
  return JSON.parse(localStorage.getItem(WEB_STORAGE_KEY) || '[]');
};