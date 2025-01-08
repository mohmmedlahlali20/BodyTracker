import React from 'react';
import { Stack } from 'expo-router';
import { View, Text, TextInput, Button } from 'react-native';
import { Container } from '~/components/Container';



export default function Login() {
    return (
        <>
            <Stack.Screen options={{ title: 'Login' }} />
            <Container>
                <View className="flex-1 justify-center px-8 bg-gray-100">
                    <Text className="text-2xl font-bold text-center mb-8 text-gray-900">Login</Text>
                    <TextInput
                        className="border border-gray-300 p-4 mb-4 rounded-md"
                        placeholder="Email"
                        keyboardType="email-address"
                    />
                    <TextInput
                        className="border border-gray-300 p-4 mb-4 rounded-md"
                        placeholder="Password"
                        secureTextEntry
                    />
                    <Button title="Login" onPress={() => alert('Logged in!')} />
                </View>
            </Container>
        </>
    );
}
