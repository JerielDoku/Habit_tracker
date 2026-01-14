import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

export default function AddScreen() {
  const [habit, setHabit] = useState("");

  const handleAddHabit = () => {
    // For now, just clear the input
    setHabit("");
    alert("Habit added (UI placeholder)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Habit</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter habit name"
        value={habit}
        onChangeText={setHabit}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddHabit}>
        <Text style={styles.buttonText}>Add Habit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#22c55e",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
