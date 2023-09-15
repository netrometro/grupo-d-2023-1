import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { instance } from "../../api/axios";
import { props } from "../props";

export default function GetBMI({ fontSize }: props) {
    const [latestInfo, setLatestInfo] = useState(null);
    const [bmi, setBMI] = useState(null);
    const [statusText, setStatusText] = useState("");
    const [statusDescription, setStatusDescription] = useState("");

    const userId = "ca696a03-6922-4ef2-99cf-9e35b2cf924f"

    useEffect(() => {
        const fetchLatestInfo = async () => {
            try {
                const response = await instance.get(`/info?user_id=${userId}`, {
                    params: {
                        _sort: "createdAt:desc",
                        _limit: 1,
                    },
                });
                const latestInfoData = response.data[0];
                setLatestInfo(latestInfoData);

                if (latestInfoData) {
                    const calculatedBMI = calculateBMI(
                        latestInfoData.peso,
                        latestInfoData.altura
                    );
                    setBMI(calculatedBMI);
                    setStatusText(getStatusText(calculatedBMI));
                    setStatusDescription(getStatusDescription(calculatedBMI));
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchLatestInfo();
    }, []);

    const calculateBMI = (weight, height) => {
        const heightInMeters = height ;
        return (weight / (heightInMeters * heightInMeters)).toFixed(2);
    };

    const getStatusText = (bmi) => {
        if (bmi < 18.5) {
            return "Abaixo do peso";
        } else if (bmi >= 18.5 && bmi < 24.9) {
            return "Peso normal";
        } else if (bmi >= 25 && bmi < 29.9) {
            return "Sobrepeso";
        } else {
            return "Obesidade";
        }
    };

    const getStatusDescription = (bmi) => {
        if (bmi < 18.5) {
            return "Você está abaixo do peso ideal. É importante procurar orientação médica.";
        } else if (bmi >= 18.5 && bmi < 24.9) {
            return "Seu peso está dentro da faixa considerada normal. Mantenha hábitos saudáveis.";
        } else if (bmi >= 25 && bmi < 29.9) {
            return "Você está com sobrepeso. Considere adotar um estilo de vida mais saudável.";
        } else {
            return "Você está com obesidade. Procure orientação médica para cuidar da sua saúde.";
        }
    };

    return (
        <View style={bmiStyles.container}>
            <Text style={[bmiStyles.title, {fontSize: fontSize + 4}]}>Índice de Massa Corporal (IMC)</Text>
            {latestInfo ? (
                <View style={bmiStyles.infoContainer}>
                    <Text style={{fontSize: fontSize - 2}}>Peso: {latestInfo.peso} kg</Text>
                    <Text style={{fontSize: fontSize - 2}}>Altura: {latestInfo.altura} cm</Text>
                    {bmi !== null && (
                        <>
                            <Text style={[bmiStyles.bmiText, {fontSize: fontSize + 2}]}>IMC: {bmi}</Text>
                            <Text style={[bmiStyles.statusText, {fontSize: fontSize}]}>Status: {statusText}</Text>
                            <Text style={[bmiStyles.statusDescription, {fontSize: fontSize - 2}]}>{statusDescription}</Text>
                        </>
                    )}
                </View>
            ) : (
                <Text style={{fontSize: fontSize}}>Não há informações disponíveis.</Text>
            )}
        </View>
    );
}

const bmiStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#166069",
        fontFamily: "Helvetica-Oblique",
    },
    infoContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    bmiText: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },
    statusText: {
        fontSize: 16,
        marginTop: 10,
    },
    statusDescription: {
        fontSize: 14,
        marginTop: 10,
    },
});
