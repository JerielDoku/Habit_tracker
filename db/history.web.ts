const HISTORY_KEY = 'habit_history';

export const initHistoryTable = async () => {
  if (typeof localStorage === 'undefined') return;
  if (!localStorage.getItem(HISTORY_KEY)) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
  }
};

export const logHabitHistory = async (habitId: number, date: string) => {
  if (typeof localStorage === 'undefined') return;
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  history.push({ habit_id: habitId, date, completed: 1 });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const getHabitStreak = async (habitId: number): Promise<number> => {
  if (typeof localStorage === 'undefined') return 0;
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  const habitHistory = history.filter((h: any) => h.habit_id === habitId);
  
  if (habitHistory.length === 0) return 0;

  // Sort descending
  const uniqueDates = [...new Set(habitHistory.map((h: any) => h.date))].sort().reverse() as string[];
  
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  // If the most recent date isn't today or yesterday, streak is 0
  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
    return 0;
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
  return streak;
};