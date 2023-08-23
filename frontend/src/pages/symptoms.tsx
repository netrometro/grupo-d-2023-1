import { StatusBar } from "expo-status-bar";
import CreateSymptoms from "../components/Symptoms/createSymptoms";
import ListSymptoms from "../components/Symptoms/listSymptoms";
import { View, StyleSheet } from "react-native";

export default function Symptoms() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CreateSymptoms />
      <ListSymptoms />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 20,
  },
});