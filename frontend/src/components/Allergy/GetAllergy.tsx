import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { instance } from "../../api/axios";
import { props } from "../props";

export default function GetAllergy({ fontSize }: props) {
    const [allergies, setAllergies] = useState([]);

    useEffect(() => {
        const fetchAllergies = async () => {
            try {
                const response = await instance.get("/allergies");
                setAllergies(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAllergies();
    }, []);

    const handleDeleteAllergy = async (id) => {
        try {
            const response = await instance.delete(`/allergies/delete/${id}`);
            console.log(response.data);
            setAllergies(allergies.filter(item => item.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const renderAllergyItem = ({ item }) => (
        <View style={allergyStyles.list}>
            <Text style={[allergyStyles.allergyName, {fontSize:fontSize}]}>{item.name}</Text>
            <Text style={[allergyStyles.allergyDescription, {fontSize:fontSize - 2}]}>{item.description}</Text>
            <Text style={[allergyStyles.treatment, {fontSize:fontSize - 2}]}>{item.treatment}</Text>
            <TouchableOpacity accessibilityRole="button"
                style={allergyStyles.deleteButton}
                onPress={() => handleDeleteAllergy(item.id)}
                accessible={true} 
                accessibilityLabel="Excluir alergia" 
                accessibilityHint="Ao ser pressionado exclui a alergia selecionada"
            >
                <Text style={[allergyStyles.deleteButtonText, {fontSize:fontSize}]}>Excluir</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={allergyStyles.container}>
            <Text style={[allergyStyles.title, {fontSize:fontSize + 4}]}>Lista de Alergias</Text>
            <FlatList
                data={allergies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderAllergyItem}
            />
        </View>
    );
}
const allergyStyles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: '#166069',
        fontFamily: 'Helvetica-Oblique',
    },
    allergyItem: {
        marginBottom: 15,
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderColor: "#ccc",
    },
    allergyName: {
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: 'Helvetica-Oblique',
    },
    allergyDescription: {
        fontSize: 14,
        fontFamily: 'Helvetica-Oblique',
    },
    treatment: {
        fontSize: 14,
        fontFamily: 'Helvetica-Oblique',
    },
    list: {
        fontFamily: 'Helvetica-Oblique',
        height: 80,
        width: 350,
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 10,
        paddingBottom: 10,
    },
    deleteButton: {
        backgroundColor: "#166069",
        padding: 5,
        borderRadius: 4,
        marginTop: 5,
        alignSelf: "flex-end",
        
    },
    deleteButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
});