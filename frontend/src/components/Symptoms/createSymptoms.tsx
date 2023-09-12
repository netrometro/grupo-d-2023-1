import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  GestureResponderEvent,
  ScrollView,
} from "react-native";
import { instance } from "../../api/axios";
import React from "react";
import { props } from "../props";

interface Symptoms {
  id: number;
  name: string;
  description: string;
  medication: string;
  startDate: string;
  endDate?: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export default function CreateSymptoms({ fontSize }: props) {
  const [symptomsList, setSymptomsList] = useState<Symptoms[]>([]);
  const [symptomName, setSymptomName] = useState("");
  const [symptomDescription, setSymptomDescription] = useState("");
  const [symptomMedication, setSymptomMedication] = useState("");
  const [symptomInitialDate, setSymptomInitialDate] = useState("");
  const [symptomFinalDate, setSymptomFinalDate] = useState("");
  const user_id = "7340db54-07b4-4608-8ad4-c7cf9755566e";

  async function createSymptom(event: GestureResponderEvent) {
    event.preventDefault();
  
    try {
      const newSymptomData = {
        name: symptomName,
        description: symptomDescription,
        medication: symptomMedication,
        startDate: symptomInitialDate,
        endDate: symptomFinalDate,
        user_id: user_id,
      };
  
      const response = await instance.post("/symptoms/create", newSymptomData);
  
      if (response.status === 201) {
        setSymptomName("");
        setSymptomDescription("");
        setSymptomMedication("");
        setSymptomInitialDate("");
        setSymptomFinalDate("");
  
        const updatedResponse = await instance.get("/symptoms");
        setSymptomsList(updatedResponse.data);
  
        alert("Sintoma cadastrado com sucesso");
        console.log(response.data);
      } else {
        alert("Erro ao cadastrar sintoma");
      }
    } catch (err) {
      console.log(err);
      alert("Erro ao cadastrar sintoma");
    }
  }

  return (
    <View style={styles.container}>

      <View style={{display: "flex", flexDirection: "row", gap:8, justifyContent: "flex-start"}}>
        <View style={styles.elipse}> 
            <FontAwesome5 name="heartbeat" size={20} color="#98AD47" />
        </View>
        <Text style={[styles.mainTitle, {fontSize: fontSize + 4}]}> Sintomas </Text>
      </View>
      
      <Text style={[styles.title, {fontSize: fontSize +4}]}> Cadastrar sintomas</Text>
      <View style={{display: "flex", alignItems: "center", justifyContent: "center",}}>
            
        
        <View>
            <Text style={[styles.label, {fontSize: fontSize - 2}]}> Sintoma: </Text>
            <TextInput
            style={[styles.input, {fontSize:fontSize}]}
            placeholder="Digite o nome do sintoma"
            value={symptomName}
            onChangeText={setSymptomName}
            />
        </View>
        <View>
            <Text style={[styles.label, {fontSize: fontSize - 2}]}> Informações adicionais </Text>
            <TextInput
            style={[styles.bigInput, {fontSize:fontSize}]}
            placeholder="Ex: sintoma acontece quando estou nervosa"
            value={symptomDescription}
            onChangeText={setSymptomDescription}
            />
        </View>
        <View>
            <Text style={[styles.label, {fontSize: fontSize - 2}]}> Medicação </Text>
            <TextInput
            style={[styles.input, {fontSize:fontSize}]}
            placeholder="Digite medicação, caso tenha tomadoo alguma"
            value={symptomMedication}
            onChangeText={setSymptomMedication}
            />
        </View>
        <View>
            <Text style={[styles.label, {fontSize: fontSize - 2}]}> Data inicial do sintoma: </Text>
            <TextInput
            style={[styles.input, {fontSize:fontSize}]}
            placeholder="Digite a data em que o sintoma começou"
            value={symptomInitialDate}
            onChangeText={setSymptomInitialDate}
            />
        </View>
        <View>
            <Text style={[styles.label, {fontSize: fontSize - 2}]}> Data final: </Text>
            <TextInput
            style={[styles.input, {fontSize:fontSize}]}
            placeholder="Digite a data em que parou de sentir sintoma"
            value={symptomFinalDate}
            onChangeText={setSymptomFinalDate}
            />
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "column", alignContent: "flex-end" }}>
        {/* botão de cadastro */}
        <TouchableOpacity style={styles.button} onPress={createSymptom}>
          <Text style={{color: "#fff", fontWeight: "bold", fontSize:fontSize}}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
      <View style= {styles.divisor}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    fontFamily: "Helvetica-Oblique",
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },

  divisor:{
    borderBottomWidth: 1,
    borderBottomColor: "#98AD47",
    padding: 20
  },

  mainTitle: {
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
