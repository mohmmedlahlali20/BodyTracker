import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
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

export default function FirstPage() {
    const [user, setUser] = useState<UserData | null>(null);
    const [bmi, setBmi] = useState<number | null>(null);
    const [bmiCategory, setBmiCategory] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('userData');
                if (storedData) {
                    const userData: UserData = JSON.parse(storedData);
                    setUser(userData);

                    const weight = parseFloat(userData.weight);
                    const height = parseFloat(userData.height) / 100; // Convert height from cm to meters
                    const bmiResult = weight / (height * height);
                    setBmi(bmiResult);
                    setBmiCategory(getBmiCategory(bmiResult));
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const getBmiCategory = (bmi: number): string => {
        if (bmi < 18.5) return 'Underweight';
        if (bmi < 25) return 'Normal weight';
        if (bmi < 30) return 'Overweight';
        return 'Obese';
    };

    if (!user) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#4a90e2" />
                <Text style={styles.loadingText}>Loading your profile...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Your Profile',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => router.push('/SaveInformation')}>
                            <Ionicons name="create-outline" size={24} color="#4a90e2" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <View style={styles.userInfoContainer}>
                <Image source={require('../assets/vt7r6you.bmp')} style={styles.image} />
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>

                <View style={styles.infoSection}>
                    <InfoItem icon="calendar-outline" label="Age" value={`${user.age} years`} />
                    <InfoItem icon="flag-outline" label="Nationality" value={user.nationality} />
                    <InfoItem icon="scale-outline" label="Weight" value={`${user.weight} kg`} />
                    <InfoItem icon="resize-outline" label="Height" value={`${user.height} cm`} />
                    <InfoItem icon="home-outline" label="Address" value={user.address} />
                </View>

                {bmi && (
                    <View style={styles.bmiContainer}>
                        <Text style={styles.bmiTitle}>Your BMI</Text>
                        <Text style={styles.bmiValue}>{bmi.toFixed(1)}</Text>
                        <Text style={styles.bmiCategory}>{bmiCategory}</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

type InfoItemProps = {
    icon: string;
    label: string;
    value: string;
};

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
    <View style={styles.infoItem}>
        <Ionicons name={icon as any} size={24} color="#4a90e2" style={styles.infoIcon} />
        <View>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f8fafc',
    },
    userInfoContainer: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
        marginVertical: 20,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 16,
        color: '#718096',
        marginBottom: 24,
    },
    infoSection: {
        width: '100%',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    infoIcon: {
        marginRight: 12,
    },
    infoLabel: {
        fontSize: 14,
        color: '#718096',
    },
    infoValue: {
        fontSize: 16,
        color: '#2d3748',
        fontWeight: '500',
    },
    loadingText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#718096',
        marginTop: 16,
        textAlign: 'center',
    },
    bmiContainer: {
        backgroundColor: '#ebf8ff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 24,
        width: '100%',
    },
    bmiTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2b6cb0',
        marginBottom: 8,
    },
    bmiValue: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#2c5282',
    },
    bmiCategory: {
        fontSize: 16,
        color: '#2b6cb0',
        marginTop: 4,
    },
});

