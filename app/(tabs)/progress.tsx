import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "expo-router";
import HabitItem from "../../components/HabitItem";
import AppHeader from "../../components/Header";
import { useHabitStore } from "../../store/habitStore";
import { getHabitStreak } from "../../db/history";

export default function ProgressScreen() {
  const habits = useHabitStore((state) => state.habits);
  const fetchHabits = useHabitStore((state) => state.fetchHabits);
  const [habitStreaks, setHabitStreaks] = useState<Record<number, number>>({});

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, [])
  );

  useEffect(() => {
    const loadStreaks = async () => {
      const streaks: Record<number, number> = {};
      for (const habit of habits) {
        streaks[habit.id] = await getHabitStreak(habit.id);
      }
      setHabitStreaks(streaks);
    };
    if (habits.length > 0) loadStreaks();
  }, [habits]);

  const completedToday = habits.filter((h) => h.completed).length;
  const streakValues = Object.values(habitStreaks);
  const longestStreak = streakValues.length ? Math.max(...streakValues) : 0;
  const avgStreak = streakValues.length ? Math.round(streakValues.reduce((a, b) => a + b, 0) / streakValues.length) : 0;

  const stats = [
    { label: "Completed Today", value: completedToday, color: "#22c55e" },
    { label: "Longest Streak", value: longestStreak, color: "#3b82f6" },
    { label: "Total Habits", value: habits.length, color: "#f59e0b" },
    { label: "Avg Streak", value: avgStreak, color: "#8b5cf6" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Your Progress" subtitle="Track your habit journey" />

    <View style={styles.grid}>
       {stats.map((stat, index) => (
      <View key={index} style={[styles.card, { backgroundColor: stat.color + "1a" }]}>
        <Text style={[styles.value, { color: stat.color }]}>
          {stat.value}
        </Text>
        <Text style={styles.label}>{stat.label}</Text>
      </View>
      ))}
    </View>


      <View>
        <Text style={styles.title}>All Habits</Text> 
      </View>
      <ScrollView>
        {habits.map((habit) => (
          <HabitItem 
            key={habit.id} 
            id={habit.id}
            name={habit.title} 
            completed={habit.completed}
            streak={habitStreaks[habit.id] || 0} 
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
    paddingBottom: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
  },
  card: {
    width: "48%", 
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#22c55e",
  },
  label: {
    fontSize: 14,
    color: "#7f7f7f",
    marginTop: 4,
    textAlign: "center",
  },
});
