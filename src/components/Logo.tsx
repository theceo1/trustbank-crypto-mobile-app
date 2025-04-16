
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

interface LogoProps {
  size?: "sm" | "md" | "lg";
  style?: any;
}

const SIZE_MAP = {
  sm: { fontSize: 22, letterSpacing: 1 },
  md: { fontSize: 32, letterSpacing: 1.5 },
  lg: { fontSize: 44, letterSpacing: 2 },
};

const Logo: React.FC<LogoProps> = ({ size = "md", style }) => {
  const sizeStyle = SIZE_MAP[size] || SIZE_MAP.md;
  return (
    <View style={[styles.row, style]} accessibilityLabel="trustBank logo">
      <LinearGradient
        colors={["#1a237e", "#3a3a72"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBg}
      >
        <Text style={[styles.logoText, sizeStyle]}>
          <Text style={styles.trust}>trust</Text>
          <Text style={styles.bank}>Bank</Text>
        </Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  gradientBg: {
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 3,
  },
  logoText: {
    fontWeight: '700',
    fontFamily: 'System',
    letterSpacing: 1.5,
    color: '#FFD700', // fallback for gold
    textShadowColor: '#1a237e',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  trust: {
    color: '#FFD700', // Gold
    fontWeight: '800',
    fontFamily: 'System',
  },
  bank: {
    color: '#e3e9f7', // Soft luxury off-white/blue
    fontWeight: '700',
    fontFamily: 'System',
  },
});

export default Logo;
