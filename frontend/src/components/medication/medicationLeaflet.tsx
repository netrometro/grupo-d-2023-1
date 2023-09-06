import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Linking } from 'react-native';
import axios from 'axios';

export default function MedicationLeaflet() {
  const [nomeMedicamento, setNomeMedicamento] = useState('');
  const [idBula, setIdBula] = useState('');
  const [pdfBula, setPdfBula] = useState('');


  const handlePesquisarMedicamento = async () => {
    try {
        if (nomeMedicamento === "") {
            alert("Digite o nome do medicamento")
        }
         const response = await axios.get(
        `https://bula.vercel.app/pesquisar?nome=${nomeMedicamento}&pagina=1`, {
        
      });
      console.log(nomeMedicamento);
        console.log('Medicamento encontrado:', response.data.content);
        const idBulaPacienteProtegido= response.data.content[0].idBulaPacienteProtegido;
        setIdBula(idBulaPacienteProtegido);
        console.log('ID da bula:', idBulaPacienteProtegido);
    } catch (error) {
      console.error('Erro ao pesquisar medicamento:', error);
    }
  };

  const handleBuscarPDFBula = async () => {
    try {
      if (idBula) {
        const response = await axios.get(
          `https://bula.vercel.app/bula?id=${idBula}`
        );
        console.log('PDF da bula:', response.data.pdf);
        const pdfBula = response.data.pdf;
        setPdfBula(pdfBula);
        console.log('PDF da bula:', pdfBula);
      }
    } catch (error) {
      console.error('Erro ao buscar PDF da bula:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Medicamento:</Text>
      <TextInput
        style={styles.input}
        value={nomeMedicamento}
        onChangeText={(text) => setNomeMedicamento(text)}
      />
      <Button
        title="Pesquisar Medicamento"
        onPress={handlePesquisarMedicamento}
      />
      {idBula ? (
        <Button title="Buscar PDF da Bula" onPress={handleBuscarPDFBula} />
      ) : null
      }
      {pdfBula ? (
        <Text>
          Link para a bula:
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => Linking.openURL(pdfBula)}
          >
            {pdfBula}
          </Text>
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 130,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 16,
    padding: 8,
  },
});
