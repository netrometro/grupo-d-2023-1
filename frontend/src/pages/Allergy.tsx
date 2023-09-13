import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NewAllergy from "../components/Allergy/NewAllergy";
import GetAlergy from "../components/Allergy/GetAllergy";
import FontSize from "../components/font/font";
import Header from "../components/Header";

export default function Allergy() {
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    setFontSize(fontSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 2);
  };

  return (
    <ScrollView>
      <View>
        <Header />
        <FontSize
          onDecreaseFontSize={decreaseFontSize}
          onIncreaseFontSize={increaseFontSize}
          fontSize={fontSize}
        />
        <View style={allergyStyles.container}>
          <View style={allergyStyles.titleBox}>
            <View style={allergyStyles.icon}>
              <Ionicons
                name="remove-circle"
                size={33}
                color="#166069"
                style={allergyStyles.allergyIcon}
              />
            </View>
            <Text style={[allergyStyles.title, { fontSize: fontSize + 4 }]}>
              Alergias
            </Text>
            <View style={allergyStyles.borderLine} />
          </View>
          <View style={allergyStyles.containerComp}>
            <NewAllergy fontSize={fontSize} />
            <GetAlergy fontSize={fontSize} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const allergyStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerComp: {
    flex: 2,
  },
  titleBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingLeft: 35,
    paddingBottom: 40,
  },
  title: {
    fontFamily: "Helvetica-Oblique",
    color: "#000000",
    fontSize: 20,
    fontWeight: "400",
    paddingLeft: 20,
  },
  icon: {
    height: 50,
    width: 50,
    backgroundColor: "#e6e6e6",
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
  borderLine: {
    position: "absolute",
    bottom: 0,
    left: "5%",
    right: "5%",
    height: 2,
    backgroundColor: "#e6e6e6",
  },
  allergyIcon: {
    paddingLeft: 2,
  },
});
