import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import Dosage from "../components/medication/dosage";
import Header from "../components/Header";
import MedicationLeaflet from "../components/medication/medicationLeaflet";

export default function Medication() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.sview}>
        <View>
        <Dosage />
        </View>
        <MedicationLeaflet />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "Helvetica-Oblique",
    paddingBottom: 10,
  },
  sview:{
    flex: 1
  }
});
