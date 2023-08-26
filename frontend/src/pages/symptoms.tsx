import { StatusBar } from "expo-status-bar";
import CreateSymptoms from "../components/Symptoms/createSymptoms";
import ListSymptoms from "../components/Symptoms/listSymptoms";
import { View, StyleSheet } from "react-native";
import Header from "../components/Header";

export default function Symptoms() {
  return (
    <View style={styles.container}>
      <Header />
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
    padding:10
  },
});