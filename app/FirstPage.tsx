import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';

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

    useEffect(() => {
        const fetchUserData = async () => {
            const storedData = await AsyncStorage.getItem('userData');
            if (storedData) {
                setUser(JSON.parse(storedData));
            }
        };
        fetchUserData();
    }, []);

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen options={{ title: 'FirstPage' }} />
            <View style={styles.userInfoContainer}>
                <Image source={require('../assets/vt7r6you.bmp')} style={styles.image} />
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userInfo}>Email: {user.email}</Text>
                <Text style={styles.userInfo}>Age: {user.age}</Text>
                <Text style={styles.userInfo}>Nationality: {user.nationality}</Text>
                <Text style={styles.userInfo}>Weight: {user.weight} kg</Text>
                <Text style={styles.userInfo}>Height: {user.height} cm</Text>
                <Text style={styles.userInfo}>Address: {user.address}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    userInfoContainer: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#ffffff',
        padding: 32,
        borderRadius: 8,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    userInfo: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    loadingText: {
        fontSize: 18,
        fontWeight: '600',
    },
});
