import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Modal,
  Keyboard,
} from "react-native";
import axios from "axios";
import { props } from "../props";

const sugestoesMedicamentos = [
  "Paracetamol",
  "Ibuprofeno",
  "Amoxicilina",
  "Dipirona",
  "Omeprazol",
  "Dexametasona",
  "Azitromicina",
  "Sinvastatina",
  "Losartana",
  "Captopril",
  "Enalapril",
  "Hidroclorotiazida",
  "Atenolol",
  "Propranolol",
  "Metformina",
  "Glibenclamida",
  "Insulina",
  "Levotiroxina",
  "Olanzapina",
  "Risperidona",
  "Lorazepam",
  "Sertralina",
  "Fluoxetina",
  "Mirtazapina",
  "Clonazepam",
  "Diazepam",
  "Citalopram",
  "Escitalopram",
  "Bupropiona",
  "Venlafaxina",
  "Alprazolam",
  "Loratadina",
  "Desloratadina",
  "Cetirizina",
  "Fexofenadina",
  "Ciprofloxacino",
  "Amoxicilina + Clavulanato",
  "Levofloxacino",
  "Trimetoprima + Sulfametoxazol",
  "Metronidazol",
  "Doxiciclina",
  "Fluconazol",
  "Itraconazol",
  "Miconazol",
  "Nistatina",
  "Ranitidina",
  "Famotidina",
  "Ondansetrona",
  "Metoclopramida",
  "Dimeticona",
  "Pantoprazol",
  "Rabeprazol",
  "Lansoprazol",
  "Esomeprazol",
  "Sulfato Ferroso",
  "Ácido Fólico",
  "Levonorgestrel",
  "Etinilestradiol + Drospirenona",
  "Medroxiprogesterona",
  "Sildenafila",
  "Tadalafila",
  "Finasterida",
  "Dutasterida",
  "Alendronato de Sódio",
  "Ibandronato de Sódio",
  "Risedronato de Sódio",
  "Calcitriol",
  "Vitamina D3",
  "Cálcio",
  "Ácido Acetilsalicílico",
  "Clopidogrel",
  "Warfarina",
  "Varfarina",
  "Enoxaparina",
  "Heparina",
  "Insulina Glargina",
  "Insulina Aspart",
  "Insulina Lispro",
  "Insulina NPH",
  "Insulina Regular",
  "Levozine",
  "Ciclobenzaprina",
  "Meloxicam",
  "Celecoxibe",
  "Diclofenaco",
  "Naproxeno",
  "Paroxetina",
  "Fluvoxamina",
  "Nortriptilina",
  "Amitriptilina",
  "Oxcarbazepina",
  "Topiramato",
  "Carbamazepina",
  "Gabapentina",
  "Pregabalina",
  "Lítio",
  "Valproato de Sódio",
  "Risperidona",
  "Olanzapina",
  "Aripiprazol",
  "Quetiapina",
  "Ziprasidona",
  "Haloperidol",
  "Bromazepam",
  "Midazolam",
  "Zolpidem",
  "Zopiclona",
];

export default function MedicationLeaflet({ fontSize }: props) {
  const [nomeMedicamento, setNomeMedicamento] = useState("");
  const [idBula, setIdBula] = useState("");
  const [pdfBula, setPdfBula] = useState("");
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const handlePesquisarMedicamento = async () => {
    try {
      if (nomeMedicamento === "") {
        alert("Digite o nome do medicamento");
      }
      const response = await axios.get(
        `https://bula.vercel.app/pesquisar?nome=${nomeMedicamento}&pagina=1`,
        {}
      );
      console.log(nomeMedicamento);
      console.log("Medicamento encontrado:", response.data.content);
      const idBulaPacienteProtegido =
        response.data.content[0].idBulaPacienteProtegido;
      setIdBula(idBulaPacienteProtegido);
      console.log("ID da bula:", idBulaPacienteProtegido);
    } catch (error) {
      console.error("Erro ao pesquisar medicamento:", error);
    }
  };

  const handleBuscarPDFBula = async () => {
    try {
      if (idBula) {
        const response = await axios.get(
          `https://bula.vercel.app/bula?id=${idBula}`
        );
        console.log("PDF da bula:", response.data.pdf);
        const pdfBula = response.data.pdf;
        setPdfBula(pdfBula);
        console.log("PDF da bula:", pdfBula);
      }
    } catch (error) {
      console.error("Erro ao buscar PDF da bula:", error);
    }
  };

  const handleMedicationChange = (text: string) => {
    setNomeMedicamento(text);
    setSuggestionsVisible(text.length > 0);
  };

  const handleSuggestionPress = (sugestao: string) => {
    setNomeMedicamento(sugestao);
    setSuggestionsVisible(false);
    Keyboard.dismiss();
  };

  return (
    <>
      <View style={styles.divisor}></View>
      <View style={styles.container}>
        <Text style={[styles.title, { fontSize: fontSize + 4 }]}>
          Pesquisar Bula de Medicamento
        </Text>
        <Text style={[styles.label, { fontSize: fontSize }]}>
          Nome do Medicamento:
        </Text>
        <TextInput
          style={[styles.input, { fontSize: fontSize }]}
          value={nomeMedicamento}
          onChangeText={handleMedicationChange}
        />
        {suggestionsVisible && (
          <View style={styles.sugestoesContainer}>
            {sugestoesMedicamentos
              .filter((sugestao) =>
                sugestao.toLowerCase().includes(nomeMedicamento.toLowerCase())
              )
              .map((sugestao, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.sugestao}
                  onPress={() => handleSuggestionPress(sugestao)}
                >
                  <Text style={{ fontSize: fontSize }}>{sugestao}</Text>
                </TouchableOpacity>
              ))}
          </View>
        )}
        <TouchableOpacity
          onPress={handlePesquisarMedicamento}
          style={styles.button}
        >
          <Text
            style={{ color: "#fff", fontWeight: "bold", fontSize: fontSize }}
          >
            Pesquisar
          </Text>
        </TouchableOpacity>
        {idBula ? (
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.button2}
            onPress={handleBuscarPDFBula}
            accessible={true}
            accessibilityLabel="Buscar PDF da Bula"
            accessibilityHint="Ao ser pressionado busca o PDF da bula do medicamento pesquisado"
          >
            <Text
              style={{ color: "#fff", fontWeight: "bold", fontSize: fontSize }}
            >
              Buscar PDF da Bula
            </Text>
          </TouchableOpacity>
        ) : null}
        {pdfBula ? (
          <Text style={[styles.label, { fontSize: fontSize }]}>
            Link para a bula:
            <Text
              accessibilityRole="link"
              style={{ color: "blue", textDecorationLine: "underline" }}
              onPress={() => Linking.openURL(pdfBula)}
            >
              {pdfBula}
            </Text>
          </Text>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    fontFamily: "Helvetica-Oblique",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 40,
  },

  divisor: {
    borderBottomWidth: 1,
    borderBottomColor: "#166069",
    margin: 10,
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
    margin: 10,
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
    marginBottom: 10,
  },
  button2: {
    backgroundColor: "#166069",
    borderRadius: 10,
    padding: 10,
    width: 200,
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
    flexShrink: 0,
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
  sugestoesContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  sugestao: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
