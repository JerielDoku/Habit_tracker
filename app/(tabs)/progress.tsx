import { View, Text, ScrollView, StyleSheet,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HabitItem from "../../components/HabitItem";
import AppHeader from "../../components/Header";

export default function ProgressScreen() {
  
  const habits = [
    { name: "Drink Water", streak: 3 },
    { name: "Read Book", streak: 5 },
    { name: "Exercise", streak: 2 },
  ];

  const stats = [
    { label: "Completed Today", value: 2 },
    { label: "Longest Streak", value: 5 },
    { label: "Total Habits", value: 6 },
    { label: "Avg Streak", value: 3 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Your Progress" subtitle="Track your habit journey" />

    <View style={styles.grid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.value}>{stat.value}</Text>
            <Text style={styles.label}>{stat.label}</Text>
          </View>
        ))}
    </View>


      <ScrollView>
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%", 
    backgroundColor: "#f5f5f5",
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
