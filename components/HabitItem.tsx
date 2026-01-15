import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Added for the trash icon
import { useHabitStore } from "../store/habitStore";

type HabitItemProps = {
  id: number;
  name: string;
  streak: number;
  completed: boolean;
};

export default function HabitItem({ id, name, streak, completed }: HabitItemProps) {
  // Point 7: Access both toggle and delete actions from the store
  const toggleHabit = useHabitStore((state) => state.toggleHabit);
  const deleteHabit = useHabitStore((state) => state.deleteHabit);

  const handlePress = () => {
    toggleHabit(id, !completed);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.textContainer}>
        <Text style={[styles.name, completed && styles.completedText]}>{name}</Text>
        <Text style={styles.streak}>🔥 {streak} day streak</Text>
      </View>

      <View style={styles.actionContainer}>
        {/* NEW: Delete Button integration */}
        <TouchableOpacity 
          onPress={() => deleteHabit(id)} 
          style={styles.deleteButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Makes it easier to tap
        >
          <Ionicons name="trash-outline" size={20} color="#ef4444" />
        </TouchableOpacity>

        <View style={[styles.checkbox, completed && styles.checkboxFilled]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textContainer: {
    flex: 1,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16, // Space between trash can and checkbox
  },
  deleteButton: {
    padding: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  streak: {
    fontSize: 14,
    color: "#7f7f7f",
    marginTop: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#8f8f8f",
    backgroundColor: "transparent",
  },
  checkboxFilled: {
    backgroundColor: "#22c55e",
    borderColor: "#22c55e",
  },
});