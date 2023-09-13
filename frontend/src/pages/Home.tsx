import React from "react";
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { FontAwesome5 } from "@expo/vector-icons";
import FontSize from "../components/font/font";
import { useState } from "react";

export default function Home() {
  const navigation = useNavigation();

  const optionsData = [
    { id: "1", icon: "weight", text: "IMC", route: "IMC" },
    { id: "2", icon: "heartbeat", text: "Sintomas", route: "Sintoma" },
    { id: "3", icon: "pills", text: "Medicamento", route: "Medicamento" },
    { id: "4", icon: "minus-circle", text: "Alergias", route: "Alergia" },
    { id: "5", icon: "newspaper", text: "Notícias", route: "Notícias" },
  ];

  const renderOption = ({ item }) => (
    <TouchableOpacity accessibilityRole="button"
      style={homeStyles.optionView}
      onPress={() => navigation.navigate(item.route)}
    >
      <View style={homeStyles.optionIcon}>
        <FontAwesome5 name={item.icon} size={33} color="#166069" />
      </View>
      <Text style={[homeStyles.optionText, {fontSize: fontSize}] }>{item.text}</Text>
    </TouchableOpacity>
  );

  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    setFontSize(fontSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 2);
  };

  return (
    <View style={homeStyles.container}>
      <Header />
      <View>
        <View style={homeStyles.homeSelection}>
          <Text style={[homeStyles.question, {fontSize: fontSize + 5}]}>Do que você precisa hoje?</Text>
          <FlatList
            data={optionsData}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={homeStyles.flatListContainer}
            renderItem={renderOption}
          />
          <View style={homeStyles.borderLine} />
        </View>
        <FontSize fontSize={fontSize} onIncreaseFontSize={increaseFontSize} onDecreaseFontSize={decreaseFontSize}/>
      </View>
    </View>
  );
}

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  question: {
    color: "#166069",
    fontFamily: "Helvetica-Oblique",
    fontWeight: "bold",
    marginTop: 32,
    marginBottom: 24,
    marginLeft: 32,
  },
  optionView: {
    alignItems: "center",
    marginRight: 22,
  },
  optionIcon: {
    height: 75,
    width: 75,
    backgroundColor: "#e6e6e6",
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontWeight: "400",
    fontSize: 14,
  },
  flatListContainer: {
    marginLeft: 24,
    paddingRight: 50,
  },
  homeSelection: {
    paddingBottom: 32,
  },
  borderLine: {
    position: "absolute",
    bottom: 0,
    left: "5%",
    right: "5%",
    height: 2,
    backgroundColor: "#166069",
  },
 
});
