import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type UserData = {
    name: string;
    email: string;
    age: string;
    nationality: string;
    weight: string;
    height: string;
    address: string;
};

export default function SaveInformation() {
    const [userData, setUserData] = useState<UserData>({
        name: '',
        email: '',
        age: '',
        nationality: '',
        weight: '',
        height: '',
        address: '',
    });
    const [errors, setErrors] = useState<Partial<UserData>>({});
    const router = useRouter();

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('userData');
                if (storedData) {
                    setUserData(JSON.parse(storedData));
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };
        loadUserData();
    }, []);

    const validateForm = (): boolean => {
        let newErrors: Partial<UserData> = {};
        let isValid = true;

        if (!userData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }
        if (!userData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }
        if (!userData.age.trim()) {
            newErrors.age = 'Age is required';
            isValid = false;
        } else if (isNaN(Number(userData.age)) || Number(userData.age) <= 0) {
            newErrors.age = 'Age must be a positive number';
            isValid = false;
        }
        if (!userData.nationality.trim()) {
            newErrors.nationality = 'Nationality is required';
            isValid = false;
        }
        if (!userData.weight.trim()) {
            newErrors.weight = 'Weight is required';
            isValid = false;
        } else if (isNaN(Number(userData.weight)) || Number(userData.weight) <= 0) {
            newErrors.weight = 'Weight must be a positive number';
            isValid = false;
        }
        if (!userData.height.trim()) {
            newErrors.height = 'Height is required';
            isValid = false;
        } else if (isNaN(Number(userData.height)) || Number(userData.height) <= 0) {
            newErrors.height = 'Height must be a positive number';
            isValid = false;
        }
        if (!userData.address.trim()) {
            newErrors.address = 'Address is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = async () => {
        if (validateForm()) {
            try {
                await AsyncStorage.setItem('userData', JSON.stringify(userData));
                Alert.alert('Success', 'Your information has been saved successfully!');
                router.push('/FirstPage');
            } catch (error) {
                console.error('Error saving user data:', error);
                Alert.alert('Error', 'There was a problem saving your information. Please try again.');
            }
        }
    };

    const handleInputChange = (field: keyof UserData, value: string) => {
        setUserData(prevData => ({ ...prevData, [field]: value }));
        if (errors[field]) {
            setErrors(prevErrors => ({ ...prevErrors, [field]: undefined }));
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Stack.Screen
                    options={{
                        title: 'Edit Profile',
                        headerStyle: {
                            backgroundColor: '#4a90e2',
                        },
                        headerTintColor: '#fff',
                    }}
                />
                <Text style={styles.headerText}>Your Information</Text>

                {Object.keys(userData).map((key) => (
                    <View key={key} style={styles.inputContainer}>
                        <Ionicons name={getIconName(key) as any} size={24} color="#4a90e2" style={styles.inputIcon} />
                        <TextInput
                            style={[styles.inputField, errors[key as keyof UserData] && styles.inputError]}
                            placeholder={getPlaceholder(key)}
                            value={userData[key as keyof UserData]}
                            onChangeText={(value) => handleInputChange(key as keyof UserData, value)}
                            keyboardType={getKeyboardType(key)}
                        />
                        {errors[key as keyof UserData] && <Text style={styles.errorText}>{errors[key as keyof UserData]}</Text>}
                    </View>
                ))}

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save Information</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const getIconName = (key: string): string => {
    switch (key) {
        case 'name': return 'person-outline';
        case 'email': return 'mail-outline';
        case 'age': return 'calendar-outline';
        case 'nationality': return 'flag-outline';
        case 'weight': return 'fitness-outline';
        case 'height': return 'resize-outline';
        case 'address': return 'home-outline';
        default: return 'information-circle-outline';
    }
};

const getPlaceholder = (key: string): string => {
    switch (key) {
        case 'name': return 'Full Name';
        case 'email': return 'Email Address';
        case 'age': return 'Age';
        case 'nationality': return 'Nationality';
        case 'weight': return 'Weight (kg)';
        case 'height': return 'Height (cm)';
        case 'address': return 'Address';
        default: return key.charAt(0).toUpperCase() + key.slice(1);
    }
};

const getKeyboardType = (key: string): "default" | "email-address" | "numeric" => {
    switch (key) {
        case 'email': return 'email-address';
        case 'age':
        case 'weight':
        case 'height': return 'numeric';
        default: return 'default';
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#2d3748',
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputIcon: {
        position: 'absolute',
        left: 12,
        top: 12,
        zIndex: 1,
    },
    inputField: {
        backgroundColor: '#ffffff',
        width: '100%',
        padding: 12,
        paddingLeft: 48,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 8,
        fontSize: 16,
    },
    inputError: {
        borderColor: '#e53e3e',
    },
    errorText: {
        color: '#e53e3e',
        fontSize: 12,
        marginTop: 4,
    },
    saveButton: {
        backgroundColor: '#4a90e2',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
});

