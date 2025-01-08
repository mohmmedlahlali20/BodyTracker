import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Navbar = () => {
  const pathname = usePathname();
  interface NavItemProps {
    href: string;
    icon: keyof typeof Ionicons.glyphMap;

  }


  const NavItem: React.FC<NavItemProps> = ({ href, icon }) => (
    <Link href={href} asChild>
      <TouchableOpacity style={[styles.navItem, pathname === href && styles.activeNavItem]}>
        <Ionicons 
          name={icon} 
          size={24} 
          color={pathname === href ? '#4a90e2' : '#ffffff'} 
        />

      </TouchableOpacity>
    </Link>
  );
  return (
    <View style={styles.navbar}>
      <NavItem href="/" icon="home-outline"  />
      <NavItem href="/SaveInformation" icon="person-outline" />
      <NavItem href="/FirstPage" icon="fitness-outline"  />
      <NavItem href="/(Calculator)/BodyFatCalculator" icon="calculator-outline" />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2d3748',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderTopWidth: 1,
    borderTopColor: '#4a5568',
  },
  navItem: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: width / 4 - 20,
  },
  activeNavItem: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
  },
  navText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  activeNavText: {
    color: '#4a90e2',
  },
});

export default Navbar;

