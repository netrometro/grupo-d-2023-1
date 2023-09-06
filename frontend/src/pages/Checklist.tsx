import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import '.\symptom\symptomController.ts';

const Checklist: React.FC = () => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [newSymptom, setNewSymptom] = useState<string>('');

  const fetchSymptoms = async () => {
    try {
      const response = await fetch('.\symptom\symptomController.ts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Falha ao buscar sintomas do servidor');
      }
      const data = await response.json();

      setSymptoms(data);
    } catch (error) {
      console.error('Erro ao buscar sintomas:', error);
    }
  };
  

  useEffect(() => {
    fetchSymptoms();
  }, []);

  const addSymptom = async () => {
  };

  return (
    <View>
      <Text>Lista de Sintomas</Text>
      <FlatList
        data={symptoms}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
      <Text>Novo Sintoma:</Text>
      <TextInput
        value={newSymptom}
        onChangeText={(text) => setNewSymptom(text)}
      />
      <Button title="Adicionar Sintoma" onPress={addSymptom} />
    </View>
  );
};

export default Checklist;