import { SafeAreaView } from "react-native-safe-area-context";
import AddHabitForm from "../../components/AddHabit";
import AppHeader from "../../components/Header";

export default function AddScreen() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <AppHeader
        title="Add Habit"
        subtitle="Create a new daily habit"
      />

      <AddHabitForm
        onAddHabit={(habit) => {
          alert(`Habit added: ${habit.emoji} ${habit.name}`);
        }}
      />
    </SafeAreaView>
  );
}
