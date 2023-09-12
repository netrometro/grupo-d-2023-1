import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import Dosage from "../components/medication/dosage";
import Header from "../components/Header";
import MedicationLeaflet from "../components/medication/medicationLeaflet";
import FontSize from "../components/font/font";
import { useState } from "react";

export default function Medication() {
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    setFontSize(fontSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 2);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header />
        <FontSize onDecreaseFontSize={decreaseFontSize} onIncreaseFontSize={increaseFontSize} fontSize={fontSize}/>
        <Dosage fontSize={fontSize}/>
        <MedicationLeaflet fontSize={fontSize}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "Helvetica-Oblique",
    paddingBottom: 50,
  },
});
