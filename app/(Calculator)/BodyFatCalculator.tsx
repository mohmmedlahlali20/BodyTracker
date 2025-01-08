import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Measurements = {
    waist: string;
    neck: string;
    height: string;
    hip?: string;
};

type Result = {
    date: string;
    bodyFatPercentage: number;
};

export default function BodyFatCalculator() {
    const [measurements, setMeasurements] = useState<Measurements>({
        waist: '',
        neck: '',
        height: '',
        hip: '',
    });
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [results, setResults] = useState<Result[]>([]);

    useEffect(() => {
        loadResults();
    }, []);

    const loadResults = async () => {
        try {
            const storedResults = await AsyncStorage.getItem('bodyFatResults');
            if (storedResults) {
                setResults(JSON.parse(storedResults));
            }
        } catch (error) {
            console.error('Error loading results:', error);
        }
    };

    const saveResult = async (newResult: Result) => {
        try {
            const updatedResults = [...results, newResult].slice(-8);
            await AsyncStorage.setItem('bodyFatResults', JSON.stringify(updatedResults));
            setResults(updatedResults);
        } catch (error) {
            console.error('Error saving result:', error);
        }
    };

    const calculateBodyFat = () => {
        const waist = parseFloat(measurements.waist);
        const neck = parseFloat(measurements.neck);
        const height = parseFloat(measurements.height);

        if (isNaN(waist) || isNaN(neck) || isNaN(height)) {
            Alert.alert('Error', 'Please enter valid measurements');
            return;
        }

        let bodyFatPercentage: number;

        if (gender === 'male') {
            bodyFatPercentage = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
        } else {
            const hip = parseFloat(measurements.hip || '0');
            if (isNaN(hip)) {
                Alert.alert('Error', 'Please enter a valid hip measurement for females');
                return;
            }
            bodyFatPercentage = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
        }

        bodyFatPercentage = Math.max(0, Math.min(bodyFatPercentage, 100)); 
        const newResult: Result = {
            date: new Date().toISOString().split('T')[0],
            bodyFatPercentage: parseFloat((bodyFatPercentage ?? 0)?.toFixed(2)),
        };

        saveResult(newResult);
        Alert.alert('Result', `Your body fat percentage is ${newResult.bodyFatPercentage}%`);
    };

    const renderInputField = (label: string, value: string, onChangeText: (text: string) => void, keyboardType: 'numeric' | 'default' = 'numeric') => (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                placeholder={`Enter ${label.toLowerCase()}`}
            />
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Body Fat Calculator',
                    headerStyle: {
                        backgroundColor: '#4a90e2',
                    },
                    headerTintColor: '#fff',
                }}
            />

            <View style={styles.genderSelector}>
                <TouchableOpacity
                    style={[styles.genderButton, gender === 'male' && styles.selectedGender]}
                    onPress={() => setGender('male')}
                >
                    <Ionicons name="male" size={24} color={gender === 'male' ? '#fff' : '#4a90e2'} />
                    <Text style={[styles.genderText, gender === 'male' && styles.selectedGenderText]}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.genderButton, gender === 'female' && styles.selectedGender]}
                    onPress={() => setGender('female')}
                >
                    <Ionicons name="female" size={24} color={gender === 'female' ? '#fff' : '#4a90e2'} />
                    <Text style={[styles.genderText, gender === 'female' && styles.selectedGenderText]}>Female</Text>
                </TouchableOpacity>
            </View>

            {renderInputField('Waist (cm)', measurements.waist, (text) => setMeasurements({ ...measurements, waist: text }))}
            {renderInputField('Neck (cm)', measurements.neck, (text) => setMeasurements({ ...measurements, neck: text }))}
            {renderInputField('Height (cm)', measurements.height, (text) => setMeasurements({ ...measurements, height: text }))}
            {gender === 'female' && renderInputField('Hip (cm)', measurements.hip || '', (text) => setMeasurements({ ...measurements, hip: text }))}

            <TouchableOpacity style={styles.calculateButton} onPress={calculateBodyFat}>
                <Text style={styles.calculateButtonText}>Calculate Body Fat</Text>
            </TouchableOpacity>

            {/* {results.length > 0 && (
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Body Fat Percentage Over Time</Text>
                    <LineChart
                        data={{
                            labels: results.map(r => r.date.slice(5)), 
                            datasets: [{
                                data: results.map(r => r.bodyFatPercentage)
                            }]
                        }}
                        width={Dimensions.get('window').width - 40}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: '#ffffff',
                            backgroundGradientTo: '#ffffff',
                            decimalPlaces: 1,
                            color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </View>
            )} */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f8fafc',
    },
    genderSelector: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    genderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#4a90e2',
        borderRadius: 8,
    },
    selectedGender: {
        backgroundColor: '#4a90e2',
    },
    genderText: {
        marginLeft: 8,
        color: '#4a90e2',
        fontSize: 16,
    },
    selectedGenderText: {
        color: '#ffffff',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#2d3748',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    calculateButton: {
        backgroundColor: '#4a90e2',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    calculateButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    chartContainer: {
        marginTop: 30,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 10,
        textAlign: 'center',
    },
});
