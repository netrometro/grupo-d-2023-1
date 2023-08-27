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

export default function ListSymptoms() {
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
        <TouchableOpacity style={{ marginRight: 10 }}>
          <Feather 
          name="edit" 
          size={20} 
          color="#98AD47"
          onPress={() =>  navigate.navigate("EditSymptom")} 
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather
            name="trash-2"
            size={20}
            color="#98AD47"
            onPress={() => deleteSymptom(item.id)}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>{item.name}</Text>
      <Text style={styles.labelgreen}>Descrição:</Text>
      <Text style={styles.label}>{item.description}</Text>
      <Text style={styles.labelgreen}>Medicação:</Text>
      <Text style={styles.label}>{item.medication}</Text>
      <View style={styles.row}>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.labelgreen}>Data inicial:</Text>
          <Text style={styles.label}>{item.startDate}</Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.labelgreen}>Data final:</Text>
          <Text style={styles.label}>{item.endDate}</Text>
        </View>
      </View>
    </View>
  );

  if (symptomsList.length === 0) {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Sintomas Registrados:</Text>
        <Text style={{color: "#29B1C3", fontSize: 16, textAlign: "center"}}>Nenhum sintoma registrado</Text>
      </View>
    );

  }else{
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sintomas Registrados:</Text>
          <FlatList horizontal={true}
            data={symptomsList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderSymptomCard}
          />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "Helvetica-Oblique",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "normal",
    color: "#98AD47",
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
    color: "#98AD47",
    marginTop: 10,
  },
  card: {
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    padding: 16,
    height: "auto",
    marginBottom: 10,
    marginRight: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});
