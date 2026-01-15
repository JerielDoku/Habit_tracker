import { View, Text, StyleSheet } from "react-native";

type ProgressBarProps = {
  total: number;
  completed: number;
};

export default function ProgressBar({ total, completed }: ProgressBarProps) {
  const progress = total > 0 ? completed / total : 0;

  return (
    <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
            <Text style={styles.heading}>Today&apos;s Progress</Text>
            <Text style={styles.text}>{completed}/{total}</Text>
        </View>
        
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { flex: progress }]} />
        <View style={{ flex: 1 - progress }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginTop: 2,
    marginHorizontal: 5,
  },

    barBackground: {
    flexDirection: "row",
    height: 11,
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    overflow: "hidden",
  },
  barFill: {
    backgroundColor: "#22c55e",
  },
    heading: {
    fontSize: 18,
    color: "#515151",
},
  text: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
