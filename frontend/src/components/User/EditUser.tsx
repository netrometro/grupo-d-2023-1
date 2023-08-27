import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { instance } from '../../api/axios';
import axios from 'axios';

interface EditUserProps {
  userId: number;
}

const EditUser: React.FC<EditUserProps> = ({ userId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/users/${userId}`, { name, email });
      console.log('Usuário atualizado:', response.data);
    } catch (error) {
      console.error('Falha ao atualizar usuário:', error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} />
      <Button title="Atualizar" onPress={handleUpdate} />
    </View>
  );
};

export default EditUser;