import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import HabitItem from "../../components/HabitItem";
import ProgressBar from "../../components/ProgressBar";

export default function HomeScreen() {
  const [habits, setHabits] = useState([
    { name: "Drink Water", streak: 3, done: false },
  ]);

  const total = habits.length;
  const completed = habits.filter(habit => habit.done).length;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Habit Tracker</Text>
        <Text style={styles.subtitle}>Build daily habits</Text>
      </View>

    
      <View style={styles.dateContainer}>
        <Text style={styles.date}>Wednesday, January 14</Text>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => alert("Habits reset")}
        >
          <Ionicons name="refresh-outline" size={14} color="#22c55e" />
          <Text style={{ color: "#22c55e" }}>Reset Daily</Text>
        </TouchableOpacity>
      </View>

     
      <View style={styles.progressContainer}>
        <ProgressBar total={total} completed={completed} />
      </View>

      
      <ScrollView style={{ marginTop: 16 }}>
        {habits.map((habit, index) => (
          <HabitItem key={index} name={habit.name} streak={habit.streak} />
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

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#22c55e",
  },
  subtitle: {
    fontSize: 18,
    color: "#7f7f7f",
    marginBottom: 16,
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
