import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';

export default function SaveInformation() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [nationality, setNationality] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const router = useRouter();

    const handleSave = async () => {
        if (name && email && age && nationality && weight && height && address) {
            const userData = {
                name,
                email,
                age,
                nationality,
                weight,
                height,
                address,
            };

            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            Alert.alert('Information Saved', 'Your details have been saved successfully!');
            router.push('/FirstPage');
        } else {
            Alert.alert('Error', 'Please fill in all the fields');
        }
    };

    return (
        <ScrollView>
              <Stack.Screen options={{ title: 'SaveInformation' }} />
            <View style={styles.container}>
                <Text style={styles.headerText}>Save Your Information</Text>

                <TextInput
                    style={styles.inputField}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.inputField}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.inputField}
                    placeholder="Age"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.inputField}
                    placeholder="Nationality"
                    value={nationality}
                    onChangeText={setNationality}
                />
                <TextInput
                    style={styles.inputField}
                    placeholder="Weight (kg)"
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.inputField}
                    placeholder="Height (cm)"
                    value={height}
                    onChangeText={setHeight}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.inputField}
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                />

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save Information</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    inputField: {
        width: '80%',
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    saveButton: {
        backgroundColor: '#2196f3',
        padding: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
