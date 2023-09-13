import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { instance } from "../../api/axios";
import React from "react";

interface Symptoms {
  id: number;
  name: string;
  description: string;
  medication: string;
  startDate: string;
  endDate: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export default function EditSymptom(id: number) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [medication, setMedication] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    
    const handleUpdate = (event: GestureResponderEvent) => {
        event.preventDefault();
        instance.put(`/symptoms/update/${id}`, {
            name,
            description,
            medication,
            startDate,
            endDate,
        }).then((response) => {
            console.log(response);

        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>Editar Sintoma</Text>
            <Text style={styles.label}>Nome do sintoma</Text>
            <TextInput accessibilityRole="text"
                style={styles.input}
                onChangeText={(text) => setName(text)}
                value={name}
            />
            <Text style={styles.label}>Descrição</Text>
            <TextInput accessibilityRole="text"
                style={styles.bigInput}
                onChangeText={(text) => setDescription(text)}
                value={description}
            />
            <Text style={styles.label}>Medicação</Text>
            <TextInput accessibilityRole="text"
                style={styles.input}
                onChangeText={(text) => setMedication(text)}
                value={medication}
            />
            <Text style={styles.label}>Data de início</Text>
            <TextInput accessibilityRole="text"
                style={styles.input}
                onChangeText={(text) => setStartDate(text)}
                value={startDate}
            />
            <Text style={styles.label}>Data de término</Text>
            <TextInput accessibilityRole="text"
                style={styles.input}
                onChangeText={(text) => setEndDate(text)}
                value={endDate}
            />
            <TouchableOpacity accessibilityRole="button"
                style={styles.button}
                onPress={(event) => handleUpdate(event)}
            >
                <Text style={styles.labelgreen}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      fontFamily: "Inter",
    },
  
    mainTitle: {
      fontSize: 20,
      fontWeight: "normal",
      marginTop: 8,
      textAlign: "left",
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
      width: "auto",
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
  
