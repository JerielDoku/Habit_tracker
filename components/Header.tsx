
import { View, Text, StyleSheet } from "react-native";

type AppHeaderProps = {
  title: string;
  subtitle?: string; // subtitle is optional
};

export default function AppHeader({ title, subtitle }: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#22c55e",
  },
  subtitle: {
    fontSize: 18,
    color: "#7f7f7f",
    marginTop: 4,
  },
});
