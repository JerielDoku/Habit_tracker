import { View, Text, ScrollView, StyleSheet } from "react-native";
import HabitItem from "../../components/HabitItem";

export default function ProgressScreen() {
  // Placeholder data for now
  const habits = [
    { name: "Drink Water", streak: 3 },
    { name: "Read Book", streak: 5 },
    { name: "Exercise", streak: 2 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <ScrollView>
        {habits.map((habit, index) => (
          <HabitItem key={index} name={habit.name} streak={habit.streak} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
