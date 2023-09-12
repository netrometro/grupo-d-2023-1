import React from 'react';
import News from '../components/News/News';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import FontSize from '../components/font/font';
import { useState } from 'react';
import Header from '../components/Header';

export default function NewsPage() {
    const newsPerPage = 5;

    const [fontSize, setFontSize] = useState(16);

    const increaseFontSize = () => {
      setFontSize(fontSize + 2);
    };
  
    const decreaseFontSize = () => {
      setFontSize(fontSize - 2);
    };

    return (
        <View>
            <Header />
            <FontSize onDecreaseFontSize={decreaseFontSize} onIncreaseFontSize={increaseFontSize} fontSize={fontSize}/>
            <View style={styles.container}>
                <View style={styles.titleBox}>
                    <View style={styles.icon}>
                        <FontAwesome5 name="newspaper" size={25} color="#98AD47" style={styles.newsIcon}/>
                    </View>
                    <Text style={[styles.title, {fontSize: fontSize}]}>Alergias</Text>
                    <View style={styles.borderLine}/>
                </View>
                <Text style={[styles.subtitle, {fontSize: fontSize}]}>Notícias Sobre Sintomas e Alergias</Text>
                <News newsPerPage={newsPerPage} fontSize={fontSize}/>
            </View>
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
        fontWeight: 'bold',
        marginBottom: 10,
    },
    borderLine: {
        position: 'absolute',
        bottom: 0,
        left: '5%',
        right: '5%',
        height: 2,
        backgroundColor: '#e6e6e6',
    },
    newsIcon: {
        paddingLeft: 2,
    },
    icon:{
        height: 50,
        width: 50,
        backgroundColor: '#e6e6e6',
        borderRadius: 99,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        paddingLeft: 35,
        paddingBottom: 40
    },
    subtitle: {
        fontSize: 20,
        paddingHorizontal: 30,
        paddingVertical: 30,
        fontFamily: 'Helvetica-Oblique',
        color: '#98AD47'
    }
});