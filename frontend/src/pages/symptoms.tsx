import CreateSymptoms from "../components/Symptoms/createSymptoms";
import ListSymptoms from "../components/Symptoms/listSymptoms";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import Header from "../components/Header";
import FontSize from "../components/font/font";

export default function Symptoms() {
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    setFontSize(fontSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 2);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <FontSize onDecreaseFontSize={decreaseFontSize} onIncreaseFontSize={increaseFontSize} fontSize={fontSize}/>
      <CreateSymptoms fontSize={fontSize}/>
      <ListSymptoms fontSize={fontSize}/>
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