import React from "react";
import { Text, FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from "../components/Header";
import { Ionicons } from '@expo/vector-icons';

export default function Home() {

    const navigation = useNavigation(); 

    const optionsData = [
        { id: "1", icon: "clipboard", text: "IMC", route: "IMC"},
        { id: "2", icon: "fitness", text: "Sintomas", route: "Sintoma"},
        { id: "3", icon: "water", text: "Água", route: "Água" },
        { id: "4", icon: "remove-circle", text: "Alergias", route: "Alergia" }
    ];

    const renderOption = ({ item }) => (
        <TouchableOpacity
            style={styles.optionView}
            onPress={() => navigation.navigate(item.route)}
        >
            <View style={styles.optionIcon}>
                <Ionicons name={item.icon} size={33} color="#98AD47" />
            </View>
            <Text style={styles.optionText}>{item.text}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header/>
            <View>
                <View style={styles.homeSelection}>
                    <Text style={styles.question}>Do que você precisa hoje?</Text>
                    <FlatList
                        data={optionsData}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.flatListContainer}
                        renderItem={renderOption}
                    />
                    <View style={styles.borderLine} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    question: {
        color: '#98AD47',
        fontFamily: 'Helvetica-Oblique',
        fontWeight: "400",
        fontSize: 20,
        marginTop: 32,
        marginBottom: 24,
        marginLeft: 32
    },
    optionView: {
        alignItems: 'center',
        marginRight: 22,
    },
    optionIcon: {
        height: 75,
        width: 75,
        backgroundColor: '#e6e6e6',
        borderRadius: 99,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionText: {
        fontWeight: '400',
        fontSize: 14,
    },
    flatListContainer: {
        marginLeft: 24,
        paddingRight: 50,
    },
    homeSelection: {
        paddingBottom: 32,
    },
    borderLine: {
        position: 'absolute',
        bottom: 0,
        left: '5%',
        right: '5%',
        height: 2,
        backgroundColor: '#e6e6e6',
    },
});

