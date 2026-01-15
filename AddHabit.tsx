import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

const EMOJIS = ["💧", "🏃‍♂️", "📖", "🧘‍♀️", "🍎", "💻", "🛌", "🔥"];

export default function AddHabit({ onAddHabit }) {
  const [habitName, setHabitName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("💧");

  const isDisabled = habitName.trim().length === 0;

  const handleAdd = () => {
    if (isDisabled) return;

    onAddHabit({
      name: habitName.trim(),
      emoji: selectedEmoji,
    });

    setHabitName("");
  };

  return (
    <View>
        <Text style={{fontSize: 16,  marginBottom: 8, marginTop: 16}}>Habit Name</Text>
      <TextInput
        placeholder="e.g., Drink 8 glasses of water"
        value={habitName}
        onChangeText={setHabitName}
        style={styles.input}
      />

        <Text style={{fontSize: 16,  marginBottom: 8, marginTop: 10}}>Select Emoji</Text>
      <View style={styles.emojiRow}>
        
        {EMOJIS.map((emoji) => (
          <TouchableOpacity
            key={emoji}
            onPress={() => setSelectedEmoji(emoji)}
            style={[
              styles.emojiButton,
              selectedEmoji === emoji && styles.emojiSelected,
            ]}
          >
            <Text style={styles.emoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={handleAdd}
        disabled={isDisabled}
        style={[
          styles.button,
          isDisabled && styles.buttonDisabled,
        ]}
      >
        <Text style={styles.buttonText}>
          Add Habit
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },

  emojiRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },

  emojiButton: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },

  emojiSelected: {
    borderColor: "#22c55e",
    backgroundColor: "#22c55e1a",
  },

  emoji: {
    fontSize: 22,
  },

  button: {
    backgroundColor: "#22c55e",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonDisabled: {
    backgroundColor: "#cfcfcf",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
