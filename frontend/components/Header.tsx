import React from "react";
import { Image, Text, View, StyleSheet } from 'react-native';

export default function Header() {

    const logo = require('../assets/logo.png')

    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Image source={logo} />
            </View>

            <Text style={styles.welcomeText}>
                Olá, <Text style={styles.name}>Fulane</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '25%',
        padding: 70,
        paddingTop: 24,
        paddingBottom: 20,
        backgroundColor: '#29B1C3',
        justifyContent: 'space-around',
    },
    headerView: {
        paddingTop: 32,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    welcomeText: {
        fontFamily: 'Helvetica-Oblique',
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    name: {
        fontWeight: 'bold',
    },
});
