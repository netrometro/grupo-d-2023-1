import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { StatusBar } from "expo-status-bar";


export default function Register() {
    return (
    <View style={styles.container}>
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
    backgroundColor: 'blue',
  },
});

