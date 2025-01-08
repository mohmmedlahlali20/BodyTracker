import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import * as Animatable from 'react-native-animatable';


const BodyTrackerLogo = require('../assets/vt7r6you.bmp');

const { width } = Dimensions.get('window');

export default function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Animatable.View animation="bounceIn" style={styles.logoContainer}>
            <Image
              source={BodyTrackerLogo}
              style={styles.logo}
            />
          </Animatable.View>
          <Animatable.Text animation="fadeIn" style={styles.title}>
            BodyTracker
          </Animatable.Text>
          <Animatable.Text animation="fadeIn" delay={300} style={styles.subtitle}>
            Your Personal Fitness Journey
          </Animatable.Text>
        </View>

        <View style={styles.content}>
          <Animatable.Text animation="fadeIn" delay={600} style={styles.description}>
            Track your progress, set goals, and achieve the body you've always dreamed of with BodyTracker.
          </Animatable.Text>

          <Animatable.View animation="fadeInUp" delay={900} style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            <View style={styles.feature}>
              <Text style={styles.featureTitle}>📊 Comprehensive Tracking</Text>
              <Text style={styles.featureDescription}>Monitor weight, measurements, and body fat percentage</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureTitle}>🎯 Goal Setting</Text>
              <Text style={styles.featureDescription}>Set and track personalized fitness goals</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureTitle}>📈 Progress Visualization</Text>
              <Text style={styles.featureDescription}>View your progress with intuitive charts and graphs</Text>
            </View>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={1200} style={styles.ctaContainer}>
            <TouchableOpacity style={styles.ctaButton} onPress={() => {}}>
              <Text style={styles.ctaButtonText}>Start Your Journey</Text>
            </TouchableOpacity>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={1500} style={styles.testimonialsContainer}>
            <Text style={styles.sectionTitle}>Success Stories</Text>
            <View style={styles.testimonial}>
              <Text style={styles.testimonialText}>
                "BodyTracker helped me lose 30 pounds and keep it off. The progress tracking is a game-changer!"
              </Text>
              <Text style={styles.testimonialAuthor}>- Sarah M.</Text>
            </View>
          </Animatable.View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 BodyTracker. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4a90e2',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#4a90e2',
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#e6f2ff',
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#4a5568',
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2d3748',
    textAlign: 'center',
  },
  feature: {
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2b6cb0',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 16,
    color: '#4a5568',
  },
  ctaContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  ctaButton: {
    backgroundColor: '#48bb78',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  testimonialsContainer: {
    marginBottom: 30,
  },
  testimonial: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  testimonialText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#4a5568',
    marginBottom: 10,
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d3748',
    textAlign: 'right',
  },
  footer: {
    backgroundColor: '#2d3748',
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    color: '#e2e8f0',
    fontSize: 14,
  },
});

