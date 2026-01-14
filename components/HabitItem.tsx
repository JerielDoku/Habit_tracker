import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

type HabitItemProps = {
  name: string;
  streak: number;
};

export default function HabitItem({ name, streak }: HabitItemProps) {
  const [completed, setCompleted] = useState(false);

  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleCompleted}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.streak}>🔥 {streak} day streak</Text>
      </View>

      
      <View style={[styles.checkbox, completed && styles.checkboxFilled]} />
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
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
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
