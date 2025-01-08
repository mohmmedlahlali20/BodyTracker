// Layout.tsx
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import Navbar from '~/components/Navbar';

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Slot />
      </ScrollView>
      <Navbar />  
    </View>
  );
}
