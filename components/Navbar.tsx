// components/Navbar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import icons from Ionicons

const Navbar = () => {
    return (
        <View style={styles.navbar}>
            <Link href="/" style={styles.navItem}>
                <Ionicons name="home" size={34} color="white" />
            </Link>

            <Link href="/SaveInformation" style={styles.navItem}>
                <Ionicons name="person" size={34} color="white" />
            </Link>

            <Link href="/FirstPage" style={styles.navItem}>
                <Ionicons name="information-circle" size={34} color="white" />
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#9d9d9d',
        padding: 10,
    },
    navItem: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Navbar;
