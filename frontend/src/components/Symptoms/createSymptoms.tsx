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
export default function CreateSymptoms() {
  const [symptomsList, setSymptomsList] = useState<Symptoms[]>([]);
  const [symptomName, setSymptomName] = useState("");
  const [symptomDescription, setSymptomDescription] = useState("");
  const [symptomMedication, setSymptomMedication] = useState("");
  const [symptomInitialDate, setSymptomInitialDate] = useState("");
  const [symptomFinalDate, setSymptomFinalDate] = useState("");
  const user_id = "1c6f9bfc-eb8f-41c1-990c-acc3597281c2";

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
    <ScrollView contentContainerStyle={styles.container}>

      <View style={{display: "flex", flexDirection: "row", gap:8, justifyContent: "flex-start"}}>
        <View style={styles.elipse}> 
            <FontAwesome5 name="heartbeat" size={20} color="#98AD47" />
        </View>
        <Text style={styles.mainTitle}> Sintomas </Text>
      </View>
      
      <Text style={styles.title}> Cadastrar sintomas</Text>
      <View style={{display: "flex", alignItems: "center", justifyContent: "center",}}>
            
        
        <View>
            <Text style={styles.label}> Sintoma: </Text>
            <TextInput
            style={styles.input}
            placeholder="Digite o nome do sintoma"
            value={symptomName}
            onChangeText={setSymptomName}
            />
        </View>
        <View>
            <Text style={styles.label}> Informações adicionais </Text>
            <TextInput
            style={styles.bigInput}
            placeholder="Ex: sintoma acontece quando estou nervosa"
            value={symptomDescription}
            onChangeText={setSymptomDescription}
            />
        </View>
        <View>
            <Text style={styles.label}> Medicação </Text>
            <TextInput
            style={styles.input}
            placeholder="Digite medicação, caso tenha tomadoo alguma"
            value={symptomMedication}
            onChangeText={setSymptomMedication}
            />
        </View>
        <View>
            <Text style={styles.label}> Data inicial do sintoma: </Text>
            <TextInput
            style={styles.input}
            placeholder="Digite a data em que o sintoma começou"
            value={symptomInitialDate}
            onChangeText={setSymptomInitialDate}
            />
        </View>
        <View>
            <Text style={styles.label}> Data final: </Text>
            <TextInput
            style={styles.input}
            placeholder="Digite a data em que parou de sentir sintoma"
            value={symptomFinalDate}
            onChangeText={setSymptomFinalDate}
            />
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "column", alignContent: "flex-end" }}>
        {/* botão de cadastro */}
        <TouchableOpacity style={styles.button} onPress={createSymptom}>
          <Text style={{color: "#fff", fontWeight: "bold",}}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
      <View style= {styles.divisor}></View>
    </ScrollView>
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
