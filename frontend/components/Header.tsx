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
    },
    headerView: {
    },
    welcomeText: {
    },
    name: {
    },
});
