import React from "react";
import {Text, View, StyleSheet} from 'react-native'
import Header from "../components/Header";
import { Ionicons } from '@expo/vector-icons';
import NewAllergy from "../components/NewAllergy";
import GetAlergy from "../components/GetAllergy";

export default function Allergy() {
  return (
    <View style={allergyStyles.container}>
      <Header/>
      <View style={allergyStyles.titleBox}>
        <View style={allergyStyles.icon}>
          <Ionicons name="remove-circle" size={33} color="#98AD47" style={allergyStyles.allergyIcon}/>
        </View>
        <Text style={allergyStyles.title}>Alergias</Text>
        <View style={allergyStyles.borderLine}/>
      </View>
      <View style={allergyStyles.containerComp}>
        <NewAllergy/>
        <GetAlergy/>
      </View>
    </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingLeft: 35,
    paddingBottom: 40
  },
  title: {
    fontFamily: 'Helvetica-Oblique',
    color: '#000000',
    fontSize: 20,
    fontWeight: '400',
    paddingLeft: 20
  },
  icon:{
    height: 50,
    width: 50,
    backgroundColor: '#e6e6e6',
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderLine: {
    position: 'absolute',
    bottom: 0,
    left: '5%',
    right: '5%',
    height: 2,
    backgroundColor: '#e6e6e6',
  },
  allergyIcon: {
    paddingLeft: 2,
  }
});