import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
const BodyTracker = require('../assets/vt7r6you.bmp');

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={BodyTracker} 
          style={styles.image}
        />
      </View>
      <Text style={styles.description}>
        Welcome to our app! Join now and enjoy all the great features we have to offer.
      </Text>
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  buttonsContainer: {
    width: '100%',
    paddingHorizontal: 50,
    gap: 10,
  },
});
