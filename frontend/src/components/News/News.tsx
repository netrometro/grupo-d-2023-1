import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, Linking } from 'react-native';
import { getNews } from '../../api/NewsAPI';
import { props } from '../props';

export default function News({newsPerPage, fontSize}: props ) {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const fetchNews = async () => {
            const newsData = await getNews();
            setNews(newsData);
        };

        fetchNews();
    }, []);

    const startIndex = (currentPage - 1) * newsPerPage;
    const endIndex = startIndex + newsPerPage;
    const displayedNews = news.slice(startIndex, endIndex);

    return (
        <View style={styles.container}>
            <FlatList
                data={displayedNews}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                        <View style={styles.newsItem}>
                            <Text style={[styles.newsTitle, {fontSize:fontSize}]}>{item.title}</Text>
                            <Text style={{fontSize:fontSize - 2}}>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <View style={styles.buttons}>
                <View style={styles.buttonContainer}>
                    {currentPage > 1 && (
                        <Button
                            title="Página Anterior"
                            onPress={() => setCurrentPage(currentPage - 1)}
                        />
                    )}
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Próxima Página"
                        onPress={() => setCurrentPage(currentPage + 1)}
                    />
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    newsItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#E0E0E0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    newsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        backgroundColor: '#98AD47',
        height: 50,
        width: 150,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        flexDirection:'row',
        justifyContent: 'center',
        paddingVertical: 10,
        alignItems:'center'
    }
    
});