import React from "react";
import {ScrollView, StyleSheet} from 'react-native'
import GetBMI from "../components/BMI/GetBMI";
import Header from "../components/Header";
import FontSize from "../components/font/font";
import { useState } from "react";

export default function BMI() {
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    setFontSize(fontSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 2);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header/>
      <FontSize onDecreaseFontSize={decreaseFontSize} onIncreaseFontSize={increaseFontSize} fontSize={fontSize}/>
      <GetBMI fontSize={fontSize}/>
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