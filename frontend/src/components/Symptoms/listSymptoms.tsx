import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { instance } from "../../api/axios";
import { deleteSymptom } from "./deleteSymptoms";
import EditSymptom from "./EditSymptoms";

export default function ListSymptoms() {
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

  const [symptomsList, setSymptomsList] = useState<Symptoms[]>([]);
  const [symptomName, setSymptomName] = useState("");
  const [symptomDescription, setSymptomDescription] = useState("");
  const [symptomMedication, setSymptomMedication] = useState("");
  const [symptomInitialDate, setSymptomInitialDate] = useState("");
  const [symptomFinalDate, setSymptomFinalDate] = useState("");
  const user_id = "df4f8363-f123-4e3e-ab40-8b4e28f2eee0";

  useEffect(() => {
    // Fetch symptoms list from the server and update the state
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

  const renderSymptomCard = ({ item }) => (
    <View style={styles.container}>
        <View style={styles.card}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity style={{ marginRight: 10 }}>
            <Feather name="edit" size={20} color="#98AD47" />
            </TouchableOpacity>
            <TouchableOpacity>
            <Feather
                name="trash-2"
                size={20}
                color="#98AD47"
                onPress={() => deleteSymptom(item.id, setSymptomsList)}
            />
            </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 15 }}>
            {item.name}
        </Text>

        <Text style={styles.labelgreen}> Descrição: </Text>
        <Text style={styles.label}>{item.description}</Text>

        <Text style={styles.labelgreen}> Medicação: </Text>
        <Text style={styles.label}>{item.medication}</Text>

        <View style={styles.row}>
            <View style={{ flexDirection: "column" }}>
            <Text style={styles.labelgreen}> Data inicial: </Text>
            <Text style={styles.label}>{item.startDate}</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
            <Text style={styles.labelgreen}> Data final: </Text>
            <Text style={styles.label}>{item.endDate}</Text>
            </View>
        </View>
        </View>
    </View>
  );

  return (
    <View style={{ margin: 30 }}>
      <Text style={styles.title}>Sintomas Registrados:</Text>
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
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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

  card: {
    backgroundColor: "#D9D9D9",
    borderRadius: 19,
    padding: 20,
    width: 308,
    height: "auto",
    marginBottom: 100,
    marginRight: 20,
  },

  button: {
    backgroundColor: "#98AD47",
    borderRadius: 19,
    padding: 10,
    color: "#fff",
    fontWeight: "bold",
  },

  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
