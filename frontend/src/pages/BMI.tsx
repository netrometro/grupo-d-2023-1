import React from "react";
import {ScrollView, StyleSheet} from 'react-native'
import GetBMI from "../components/BMI/GetBMI";
import Header from "../components/Header";

export default function BMI() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header/>
      <GetBMI/>
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