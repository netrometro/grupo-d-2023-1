import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { StatusBar } from "expo-status-bar";
import CreateUser from "../components/User/CreateUser";


export default function Register() {
    return (
    <View style={styles.container}>
      <Text>Digite seu e-mail...</Text>
      <View style={styles.box}></View>

      <Text>Digite sua senha...</Text>
      <View style={styles.box}></View>

      <Text>Confirme sua senha...</Text>
      <View style={styles.box}></View>
    </View>
    
  )};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#98AD47',
  },
});