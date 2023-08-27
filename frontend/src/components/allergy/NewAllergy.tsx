import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { instance } from '../../api/axios';

export default function NewAllergy() {
    const [allergyData, setAllergyData] = useState([
        { label: "Nome da alergia", key: "name", value: "" },
        { label: "Tratamento", key: "treatment", value: "" },
        { label: "Descrição", key: "description", value: "" },
    ]);

    const handleInputChange = (key: string, value: string) => {
        const updatedAllergyData = allergyData.map(item => {
            if (item.key === key) {
                return { ...item, value };
            }
            return item;
        });
        setAllergyData(updatedAllergyData);
    };

    const handleAddAllergy = async () => {
        try {
            const allergyToAdd = {};
            allergyData.forEach(item => {
                allergyToAdd[item.key] = item.value;
            });
            allergyToAdd.user_id = "6922fb9a-695a-446a-9cdf-3bdd7a8450bf";

            const response = await instance.post("/allergies/create", allergyToAdd);
            console.log(response.data);

            if (response.data.id === "6922fb9a-695a-446a-9cdf-3bdd7a8450bf") {
                console.log("Alergia criada com sucesso usando o ID desejado!");
            } else {
                console.log("Alergia criada, mas o ID não corresponde ao esperado.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    function renderInputItem({ item }) {
        return (
            <View style={allergyStyles.inputItem}>
                <Text style={allergyStyles.inputLabel}>{item.label}</Text>
                <TextInput
                    style={allergyStyles.inputField}
                    placeholder={item.label}
                    value={item.value}
                    onChangeText={(text) => handleInputChange(item.key, text)} />
            </View>
        );
    }

    return (
        <View style={allergyStyles.container}>
            <Text style={allergyStyles.title}>Cadastrar alergia</Text>
            <FlatList
                data={allergyData}
                keyExtractor={(item) => item.key}
                renderItem={renderInputItem}
                style={allergyStyles.flatlist}
            />
            <TouchableOpacity
                style={allergyStyles.button}
                onPress={handleAddAllergy}
            >
                <Text style={allergyStyles.textButton}>Salvar</Text>
            </TouchableOpacity>

        </View>
    );
}


const allergyStyles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: '#98AD47',
        fontFamily: 'Helvetica-Oblique',
    },
    container: {
        flex: 1,
        margin: 20,
        alignItems: 'center',

    },
    inputItem: {
        marginBottom: 10,
    },
    inputLabel: {
        fontFamily: 'Helvetica-Oblique',
        marginBottom: 5,
        fontSize: 12,
        fontWeight: "400",
        marginLeft: 15

    },
    inputField: {
        fontFamily: 'Helvetica-Oblique',
        height: 50,
        width: 350,
        backgroundColor: '#e6e6e6',
        borderRadius: 99,
        paddingHorizontal: 15
    },
    button: {
        height: 40,
        width: 75,
        backgroundColor: '#98AD47',
        borderRadius: 99,
        alignItems: 'center',
        marginLeft: 250,
    },
    textButton: {
        color: '#fff',
        fontFamily: 'Helvetica-Oblique',
        paddingTop: 13
    },
    flatlist: {
        marginBottom: 5
    }
});