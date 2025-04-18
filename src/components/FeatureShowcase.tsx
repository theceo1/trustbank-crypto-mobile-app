import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';

const features = [
  {
    icon: <Feather name="shield" size={24} color="#fb923c" />,
    title: "Bank-Grade Security",
    description: "Multi-layer security architecture with advanced encryption",
    gradient: ["#fb923c22", "#ef444422"]
  },
  {
    icon: <Feather name="zap" size={24} color="#3b82f6" />,
    title: "Lightning Fast",
    description: "Execute trades in milliseconds with our optimized engine",
    gradient: ["#3b82f622", "#a21caf22"]
  },
  {
    icon: <Feather name="globe" size={24} color="#10b981" />,
    title: "Global Access",
    description: "Trade from anywhere, anytime with our global infrastructure",
    gradient: ["#10b98122", "#14b8a622"]
  },
  {
    icon: <Feather name="bar-chart-2" size={24} color="#facc15" />,
    title: "Advanced Analytics",
    description: "Make informed decisions with real-time market insights",
    gradient: ["#facc1522", "#fb923c22"]
  }
];

export default function FeatureShowcase() {
  return (
    <View style={styles.sectionWrap}>
      <Text style={styles.sectionTitle}>Why Choose trustBank?</Text>
      <Text style={styles.sectionSubtitle}>Experience the difference with our cutting-edge features</Text>
      <View style={styles.grid}>
        {features.map((f, idx) => (
          <View key={idx} style={[styles.card, { backgroundColor: f.gradient[0] }]}> 
            <View style={styles.iconWrap}>{f.icon}</View>
            <Text style={styles.cardTitle}>{f.title}</Text>
            <Text style={styles.cardDesc}>{f.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionWrap: {
    marginTop: 40,
    marginBottom: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#1a237e',
    marginBottom: 4,
    textAlign: 'center',
  },
  sectionSubtitle: {
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 18,
    fontSize: 15,
    maxWidth: 320,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  card: {
    width: 155,
    borderRadius: 16,
    margin: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#1a237e',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 1,
  },
  iconWrap: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
  },
  cardTitle: {
    fontWeight: '600',
    color: '#1a237e',
    fontSize: 16,
    marginBottom: 6,
    textAlign: 'center',
  },
  cardDesc: {
    color: '#475569',
    fontSize: 13,
    textAlign: 'center',
  },
});
