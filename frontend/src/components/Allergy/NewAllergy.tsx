import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { instance } from "../../api/axios";
import { props } from "../props";

export default function NewAllergy({ fontSize }: props) {
    const [name, setName] = useState("");
    const [treatment, setTreatment] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateAllergy = async () => {
        try {
            setIsLoading(true);
            const response = await instance.post("/allergies/create", {
                name,
                treatment,
                description,
                user_id: "7340db54-07b4-4608-8ad4-c7cf9755566e",
            });
            setIsLoading(false);
            Alert.alert("Sucesso", response.data.message);
        } catch (error) {
            setIsLoading(false);
            Alert.alert("Erro", "Ocorreu um erro ao criar a alergia.");
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.title, {fontSize:fontSize + 4}]}>Cadastrar Alergia</Text>
            <TextInput
                style={[styles.input, {fontSize:fontSize}]}
                placeholder="Nome da alergia"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={[styles.input, {fontSize:fontSize}]}
                placeholder="Tratamento"
                value={treatment}
                onChangeText={setTreatment}
            />
            <TextInput
                style={[styles.input, {fontSize:fontSize}]}
                placeholder="Descrição"
                value={description}
                onChangeText={setDescription}
            />
            <Button
                title="Criar Alergia"
                onPress={handleCreateAllergy}
                disabled={isLoading}
                color={"#98AD47"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
});