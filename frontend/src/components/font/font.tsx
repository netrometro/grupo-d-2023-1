import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface FontSizeProps {
  onIncreaseFontSize: () => void;
  onDecreaseFontSize: () => void;
  fontSize: number;
}

const FontSize: React.FC<FontSizeProps> = ({
  onIncreaseFontSize,
  onDecreaseFontSize,
  fontSize,
}) => {
  return (
    <View>
      <Text style={homeStyles.question}>Alterar tamanho da fonte:</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity accessibilityRole="button"
          style={homeStyles.button}
          onPress={onDecreaseFontSize}
        >
          <FontAwesome5 name="minus" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#166069" }}>
          {fontSize}
        </Text>

        <TouchableOpacity accessibilityRole="button"
          style={homeStyles.button}
          onPress={onIncreaseFontSize}
        >
          <FontAwesome5 name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style= {homeStyles.divisor}></View>
    </View>
  );
};

const homeStyles = StyleSheet.create({
  button: {
    backgroundColor: "#166069",
    borderRadius: 10,
    padding: 10,
    width: 50,
    alignItems: "center",
    marginBottom: 10,
  },

  question: {
    color: "#000",
    fontFamily: "Helvetica-Oblique",
    fontWeight: "400",
    fontSize: 25,
    marginTop: 32,
    marginBottom: 24,
    marginLeft: 32,
  },
  divisor: {
    borderBottomWidth: 1,
    borderBottomColor: "#166069",
    padding: 20,
  },
});

export default FontSize;
