import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { instance } from "../../api/axios";
import { deleteSymptom } from "./deleteSymptoms"; 
import { useNavigation } from "@react-navigation/native";
import { props } from "../props";

export default function ListSymptoms({ fontSize }: props) {
  const [symptomsList, setSymptomsList] = useState([]);

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await instance.get("/symptoms");
        setSymptomsList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSymptoms();
  }, []);

  const navigate = useNavigation();
  

    const renderSymptomCard = ({ item }) => (
      <View style={styles.card}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity accessibilityRole="button" 
          style={{ marginRight: 10 }}
          accessible={true} 
          accessibilityLabel="Editar sintoma" 
          accessibilityHint="Ao ser pressionado edita o sintoma selecionado"
          >
            <Feather 
            name="edit" 
            size={20} 
            color="#166069"
            onPress={() =>  navigate.navigate("EditSymptoms")} 
            />
          </TouchableOpacity>
          <TouchableOpacity accessibilityRole="button"
          accessible={true} 
          accessibilityLabel="Excluir sintoma" 
          accessibilityHint="Ao ser pressionado exclui o sintoma selecionado"
          >
            <Feather
              name="trash-2"
              size={20}
              color="#166069"
              onPress={() => deleteSymptom(item.id)}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.label, {fontSize: fontSize}]}>{item.name}</Text>
        <Text style={[styles.labelgreen, {fontSize: fontSize}]}>Descrição:</Text>
        <Text style={[styles.label, {fontSize: fontSize}]}>{item.description}</Text>
        <Text style={[styles.labelgreen, {fontSize: fontSize}]}>Medicação:</Text>
        <Text style={[styles.label, {fontSize: fontSize}]}>{item.medication}</Text>
        <View style={styles.row}>
          <View style={{ flexDirection: "column" }}>
            <Text style={[styles.labelgreen, {fontSize: fontSize}]}>Data inicial:</Text>
            <Text style={[styles.label, {fontSize: fontSize}]}>{item.startDate}</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={[styles.labelgreen, {fontSize: fontSize}]}>Data final:</Text>
            <Text style={[styles.label, {fontSize: fontSize}]}>{item.endDate}</Text>
          </View>
        </View>
      </View>
    );

    return (
      <View style={styles.container}>
        <Text style={[styles.title, {fontSize: fontSize + 4}]}>Sintomas Registrados:</Text>
          <FlatList horizontal={true}
            data={symptomsList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderSymptomCard}
          />
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    fontFamily: "Helvetica-Oblique",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "normal",
    color: "#166069",
    margin: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "normal",
    marginBottom: 6,
  },
  labelgreen: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#166069",
    marginTop: 10,
  },
  card: {
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    padding: 16,
    height: "auto",
    marginRight: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});
