import React from "react";
import {Text, View, StyleSheet} from 'react-native'
import Dosage from "../components/medication/dosage";
import Header from "../components/Header";

export default function Medication() {
  return (
    <View style={styles.container}>
      <Header />
      <Dosage />
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
