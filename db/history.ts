import { Platform } from 'react-native';

const db = Platform.OS === 'web' 
  ? require('./history.web') 
  : require('./history.native');

export const initHistoryTable = db.initHistoryTable;
export const logHabitHistory = db.logHabitHistory;
export const getHabitStreak = db.getHabitStreak;