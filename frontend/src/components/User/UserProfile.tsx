import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { instance } from '../../api/axios';
import axios from 'axios';

interface UserProfileProps {
  userId: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Falha!', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/users/${userId}`);
      console.log('Usuário deletado!');
    } catch (error) {
      console.error('Falha ao deletar usuário:', error);
    }
  };

  return (
    <View>
      <Text>Nome: {user.name}</Text>
      <Text>E-mail: {user.email}</Text>
      <Button title="Apagar" onPress={handleDelete} />
    </View>
  );
};

export default UserProfile;