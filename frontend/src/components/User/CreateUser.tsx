import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { instance } from '../../api/axios';
import axios from 'axios';


const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/register', { name, email, password });
      console.log('Usuário registrado:', response.data);
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
};

export default CreateUser;