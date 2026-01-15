import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { initializeDb } from "../../db/database"; // Correct relative path
import { initHistoryTable } from "../../db/history";

export default function TabsLayout() {
  // Initialize the database table when the tab layout loads
  useEffect(() => {
    initializeDb()
      .then(() => initHistoryTable())
      .then(() => console.log("✅ Database and Tables Ready"))
      .catch((err) => console.error("❌ Database Init Failed", err));
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#22c55e", // Professional Green
        tabBarInactiveTintColor: "#888",
      }}
    >
      {/* 1. HOME TAB (index.tsx) */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 2. ADD TAB (add.tsx) */}
      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 3. PROGRESS TAB (progress.tsx) */}
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trending-up-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}