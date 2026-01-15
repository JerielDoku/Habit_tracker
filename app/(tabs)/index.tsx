import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react"; 
import HabitItem from "../../components/HabitItem";
import ProgressBar from "../../components/ProgressBar";
import AppHeader from "../../components/Header";
// Point 5: Using Zustand for better performance and state sharing
import { useHabitStore } from "../../store/habitStore"; 
import { logHabitHistory } from "../../db/history";

export default function HomeScreen() {
  // Point 7: Selective subscription to habits and fetch function to prevent re-renders
  const habits = useHabitStore((state) => state.habits);
  const fetchHabits = useHabitStore((state) => state.fetchHabits);
  const toggleHabit = useHabitStore((state) => state.toggleHabit);

  // Point 1: Data consistency - SQLite is the single source of truth
  useEffect(() => {
    fetchHabits();
  }, []);

  // CALCULATE PROGRESS: Dynamically updates the ProgressBar whenever 'habits' changes
  const total = habits.length;
  const completed = habits.filter(habit => habit.completed).length;

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const handleReset = async () => {
    const completedHabits = habits.filter((habit) => habit.completed);

    // 1. Save completed habits to history
    const todayISO = new Date().toISOString().split('T')[0];
    const historyPromises = completedHabits.map((habit) => logHabitHistory(habit.id, todayISO));
    await Promise.all(historyPromises);

    // 2. Reset tasks for the day (Toggle them off)
    const promises = completedHabits.map((habit) => toggleHabit(habit.id));
    await Promise.all(promises);
    
    await fetchHabits();
    Alert.alert("Daily Reset", "Tasks for the day have been cleared and saved to history.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Habit Tracker" subtitle="Build daily habits" />

      <View style={styles.dateContainer}>
        <Text style={styles.date}>{currentDate}</Text>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Ionicons name="refresh-outline" size={14} color="#22c55e" />
          <Text style={{ color: "#22c55e" }}>Reset Daily</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        {/* Pass calculated values to the Progress Bar component */}
        <ProgressBar total={total} completed={completed} />
      </View>

      <ScrollView style={{ marginTop: 16 }}>
        {/* Point 6: Scaling the UI dynamically based on SQLite data */}
        {habits.map((habit) => (
          <HabitItem 
            key={habit.id} 
            id={habit.id}             // Added: Required for toggleHabit logic
            name={habit.title} 
            completed={habit.completed} // Added: Required to show 'checked' state
            streak={0} 
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  date: {
    fontSize: 16,
    color: "#7f7f7f",
  },
  dateContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    marginTop: 8,
  },
  resetButton: {
    backgroundColor: "#22c55e1a",
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#22c55e",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  progressContainer: {
    marginTop: 24,
    marginBottom: 16,
    backgroundColor: "#22c55e1a",
    padding: 12,
    borderRadius: 18,
  },
});