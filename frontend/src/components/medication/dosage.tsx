import React from "react";
import {Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import { useState, useEffect  } from "react";
import { instance } from "../../api/axios";

export default function Dosage() {
  const [dosage, setDosage] = useState(0);
  const [infoList, setInfoList] = useState([]);
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await instance.get("/info");
        setInfoList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfo();
  }, []);

  const calculateDosage = () => {
    const dosage = infoList[0].dosage;
    const weight = infoList[0].weight;
    const result = parseFloat(dosage) * parseFloat(weight);
    setDosage(result);
  };
  
  return (
    <View style={styles.container}>
        <Text style={styles.mainTitle}>Dosagem de Medicamentos</Text>
        <Text style={styles.label}> Dose por kg (mg/kg)</Text>
        <TextInput
            style={styles.input}
            placeholder="0,0/kg"
            value={dosage.toString()}
            onChangeText={(value) => setDosage(parseFloat(value))}
        />
        <Text style={styles.label}> Peso (kg)</Text>
        <TextInput
            style={styles.input}
            value={weight.toString()}
            onChangeText={(value) => setWeight(parseFloat(value))}
        />
        <View style={{ display: "flex", flexDirection: "column", alignContent: "flex-end" }}>
            <TouchableOpacity style={styles.button} onPress={() => calculateDosage}>
              <Text style={{color: "#fff", fontWeight: "bold",}}>Calcular</Text>
            </TouchableOpacity>
        </View>
      <Text style={styles.label}> Dose (mg)</Text>
      <Text style={styles.labelgreen}> {dosage} </Text>
      <View style={styles.divisor}></View>
        
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      fontFamily: "Helvetica-Oblique",
      paddingBottom: 50,
      paddingLeft: 20,
      paddingRight: 20,
      marginBottom: 20,
    },
  
    divisor:{
      borderBottomWidth: 1,
      borderBottomColor: "#98AD47",
      padding: 20
    },
  
    mainTitle: {
      fontSize: 20,
      fontWeight: "normal",
      marginTop: 8,
      textAlign: "center",
    },
  
    title: {
      fontSize: 20,
      fontWeight: "normal",
      color: "#98AD47",
      marginTop: 8,
      marginBottom: 10,
      textAlign: "left",
    },
  
    label: {
      fontSize: 14,
      fontWeight: "normal",
      marginBottom: 10,
    },
  
    labelgreen: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#98AD47",
      marginBottom: 10,
    },
  
    button: {
      backgroundColor: "#98AD47",
      borderRadius: 10,
      padding: 10,
      width: 100,
    },
  
    input: {
      marginBottom: 10,
      width: 308,
      height: 33,
      borderRadius: 19,
      backgroundColor: "#D9D9D9",
      paddingStart: 10,
      fontSize: 12,
    },
    bigInput: {
      marginBottom: 10,
      width: 308,
      height: 50,
      borderRadius: 19,
      backgroundColor: "#D9D9D9",
      paddingStart: 10,
      fontSize: 12,
    },
    elipse: {
      width: 40,
      height: 40,
      borderRadius: 50,
      backgroundColor: "#D9D9D9",
      alignItems: "center",
      justifyContent: "center",
      },
  });
  