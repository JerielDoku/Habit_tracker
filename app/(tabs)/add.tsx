import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/Header";
import { useHabitStore } from "../../store/habitStore";
import { useRouter } from "expo-router";

export default function AddScreen() {
  const [title, setTitle] = useState('');
  const addHabit = useHabitStore((state) => state.addHabit);
  const router = useRouter();

  const handleSave = async () => {
    if (title.trim()) {
      await addHabit(title);
      setTitle('');
      // Automatically take the user to the Home screen to see their new habit
      router.push('/'); 
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      <AppHeader
        title="Add Habit"
        subtitle="Create a new daily habit"
      />

      <View style={styles.formContainer}>
        <Text style={styles.label}>What habit do you want to start?</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Drink 2L Water"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#999"
        />

        <TouchableOpacity 
          style={[styles.button, !title.trim() && styles.buttonDisabled]} 
          onPress={handleSave}
          disabled={!title.trim()}
        >
          <Text style={styles.buttonText}>Save Habit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formContainer: { marginTop: 40 },
  label: { fontSize: 16, color: '#444', marginBottom: 10, fontWeight: '500' },
  input: { 
    borderWidth: 1, 
    borderColor: '#e0e0e0', 
    borderRadius: 12, 
    padding: 15, 
    fontSize: 16, 
    backgroundColor: '#f9f9f9',
    marginBottom: 20 
  },
  button: { 
    backgroundColor: '#22c55e', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3
  },
  buttonDisabled: { backgroundColor: '#ccc', shadowOpacity: 0 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});