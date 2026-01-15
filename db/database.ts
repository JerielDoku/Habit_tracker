import { Platform } from 'react-native';

const db = Platform.OS === 'web' 
  ? require('./database.web') 
  : require('./database.native');

export const initializeDb = db.initializeDb;
export const addHabitToDb = db.addHabitToDb;
export const updateHabitInDb = db.updateHabitInDb;
export const deleteHabitFromDb = db.deleteHabitFromDb;
export const getHabitsFromDb = db.getHabitsFromDb;