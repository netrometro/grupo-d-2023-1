import React from "react";
import {Text, View, TextInput, StyleSheet} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { useState, useEffect  } from "react";
import { instance } from "../../api/axios";
import { props } from "../props";

export default function Dosage({ fontSize }: props) {
  const [dosage, setDosage] = useState("");
  const [info, setInfo] = useState(null);
  const [weight, setWeight] = useState(0);

  const user_id = "ca696a03-6922-4ef2-99cf-9e35b2cf924f";

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await instance.get(`/info?user_id=${user_id}`,{
          params: {
            _sort: 'created_at:desc',
            limit: 1,
          },
        }); 
        const info = response.data[0];
        setInfo(info);
        if (info) {
          const userWeight = info.peso
          setWeight(userWeight);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfo();
  }, []);

  const handleChange = (number: string) => {
    setDosage(number);
  }

  const calculateDosage = () => {
    const result = parseFloat(dosage) * weight;
    if (isNaN(result)) {
      return 0;
    }
    return result;
  }

  const parseToMl = () => {
    const result = parseFloat(dosage) * weight;
    const ml = result / 100;
    if (isNaN(ml)) {
      return 0;
    }
    return ml;
  }

  return (
    <View style={styles.container}>
      <View >
        <View style={{display: "flex", flexDirection: "row", gap:8, justifyContent: "flex-start"}}>
          <View style={styles.elipse}> 
              <FontAwesome5 name="pills" size={20} color="#166069" />
          </View>
          <Text style={[styles.mainTitle, {fontSize:fontSize + 4}]}> Medicamentos </Text>
        </View>
        <Text style={[styles.title, {fontSize:fontSize + 4}]}>Dosagem de medicamento</Text>
        <Text style={[styles.label, {fontSize:fontSize}]}>
          Para calcular a dosagem de um medicamento é necessário saber a dose que deve
          ser administrada por quilo do paciente.
          Por exemplo: Se na descrição da bula do medicamento 
          estiver indicando que a prescrição deve ser 100mg/Kg/dia quer dizer que em um 
          dia deve ser administrado 100 mg do medicamento para cada quilo do paciente. 
        </Text>
        <Text style={[styles.label, {fontSize:fontSize}]}>Peso</Text>
        <Text style={[styles.input, {fontSize:fontSize}]}>{weight}</Text>
        <Text style={[styles.label, {fontSize:fontSize}]}>Dose (mg)</Text>
        <TextInput accessibilityRole="text"
          style={[styles.input, {fontSize:fontSize}]}
          placeholder="Digite a dosagem"
          keyboardType="numeric"
          onChangeText={ (number) => handleChange(number)}
        />
        <View style={styles.divisor}></View>
        <View style={{ marginBottom: 180}}>
          <Text style={[styles.label, {fontSize:fontSize}]}>Resultado</Text>
          <Text style={[styles.labelgreen, {fontSize:fontSize}]}>{calculateDosage()} mg</Text>
          <Text style={[styles.label, {fontSize:fontSize}]}>Resultado em ml</Text>
          <Text style={[styles.labelgreen, {fontSize:fontSize}]}>{parseToMl()} ml</Text>
          <View style={styles.divisor}></View>
        </View>
      </View>
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
      marginBottom: 50,
    },
  
    divisor:{
      borderBottomWidth: 1,
      borderBottomColor: "#166069",
      margin:10,
    },
  
    mainTitle: {
      fontSize: 20,
      fontWeight: "normal",
      marginTop: 8,
      textAlign: "center",
      marginBottom: 10,
    },
  
    title: {
      fontSize: 20,
      fontWeight: "normal",
      color: "#166069",
      marginTop: 8,
      marginBottom: 10,
      textAlign: "left",
    },
  
    label: {
      fontSize: 14,
      fontWeight: "normal",
      marginBottom: 10,
      marginTop: 10,
    },
  
    labelgreen: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#166069",
      marginBottom: 10,
    },
  
    button: {
      backgroundColor: "#166069",
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
      display: "flex",
      alignItems: "center",
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
  