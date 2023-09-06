import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from "expo-status-bar";
import CreateUser from "../components/User/CreateUser";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      alert('Preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    alert('Registro realizado com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Text>Digite seu e-mail...</Text>
      <View style={styles.box}></View>

      <Text>Digite sua senha...</Text>
      <View style={styles.box}></View>

      <Text>Confirme sua senha...</Text>
      <View style={styles.box}></View>
      <TextInput
        placeholder="E-mail"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Confirmar Senha"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#29B1C3',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#98AD47',
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 20,
  },
  input: {
    width: 263,
    height: 55,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16, 
  },
  button: {
    backgroundColor: '#E0FA77',
    padding: 10,
    borderRadius: 5,
    width: '80%',
  },
  buttonText: {
    color: '#98AD47',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Register;


