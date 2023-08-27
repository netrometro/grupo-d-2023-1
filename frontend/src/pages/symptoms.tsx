import CreateSymptoms from "../components/Symptoms/createSymptoms";
import ListSymptoms from "../components/Symptoms/listSymptoms";
import { View, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";

export default function Symptoms() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <CreateSymptoms />
      <ListSymptoms />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom:10,
  },
});