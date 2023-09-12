import React from "react";
import { Image, Text, View, StyleSheet } from 'react-native';

export default function Header() {

    const logo = require('../../assets/logo.png')

    return (
        <View style={HeaderStyles.container}>
            <View style={HeaderStyles.headerView}>
                <View style={HeaderStyles.row}>
                    <Image source={logo} />
                    <Text style={HeaderStyles.mainTitle}>WTH</Text>
                </View>
            </View>

            <Text style={HeaderStyles.welcomeText}>
                Olá, <Text style={HeaderStyles.name}>Fulane</Text>
            </Text>
        </View>
    );
}

const HeaderStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: '20%',
        padding: 70,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#29B1C3',
        justifyContent: 'space-around',
        marginBottom: 20,
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
    mainTitle: {
        fontFamily: 'Helvetica-Bold',
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
