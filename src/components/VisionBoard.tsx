//src/components/VisionBoard.tsx
import UserFeedback from "./UserFeedback";
import FeatureShowcase from "./FeatureShowcase";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Linking } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useTheme } from "@/contexts/ThemeContext";

const visionItems = [
  {
    icon: <Feather name="bar-chart-2" size={30} color="#059669" />,
    title: "trustExchange",
    content: "Experience user-friendly yet professional trading of ETFs and other digital assets on a trusted platform.",
    bg: ["#ecfdf5", "#d1fae5"],
    comingSoon: "Q1 2025"
  },
  {
    icon: <Feather name="dollar-sign" size={30} color="#059669" />,
    title: "trustCoin",
    content: "Experience stability with trustCoin, our most stable ETF. Safe for investment and a reliable store of value.",
    bg: ["#e0f2fe", "#bbf7d0"],
    comingSoon: "Q2 2025"
  },
  {
    icon: <Feather name="credit-card" size={30} color="#059669" />,
    title: "trustCard",
    content: "Borderless Payments, Real-Time transactions at terminal, and cashback rewards when you transact with trustCard.",
    bg: ["#f0fdf4", "#bbf7d0"],
    comingSoon: "Q3 2025"
  },
  {
    icon: <Feather name="terminal" size={30} color="#059669" />,
    title: "trustTerminal",
    content: "Point Of Service terminal for merchants who accept crypto payments. Save on transaction time, cost, profit, and EARN on every transaction.",
    bg: ["#e0f2fe", "#a7f3d0"],
    comingSoon: "Q1 2026"
  }
];

export default function VisionBoard() {
  const { theme } = useTheme();
  const isSmall = Dimensions.get('window').width < 600;
  return (
    <View style={[styles.bgWrap, { backgroundColor: 'transparent' }]}> 
      <Text style={[styles.title, { color: theme.colors.primary }]}>Our Vision</Text>
      <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
        Building the future of finance, one feature at a time
      </Text>
      <View style={styles.grid}>
        {Array.from({ length: Math.ceil(visionItems.length / 2) }).map((_, rowIdx) => (
          <View key={rowIdx} style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', marginBottom: 16 }}>
            {[0,1].map(colIdx => {
              const itemIdx = rowIdx * 2 + colIdx;
              const item = visionItems[itemIdx];
              if (!item) return null;
              return (
                <View
                  key={itemIdx}
                  style={[
                    styles.card,
                    { backgroundColor: theme.colors.card },
                  ]}
                >
                  <View style={styles.cardHeader}>
                    <View style={[styles.iconWrap, { backgroundColor: theme.colors.background }]}
                    >{item.icon}</View>
                    <Text style={[styles.badge, { backgroundColor: theme.colors.primary, color: theme.colors.card }]}>{item.comingSoon}</Text>
                  </View>
                  <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{item.title}</Text>
                  <Text style={[styles.cardContent, { color: theme.colors.secondaryText }]}>{item.content}</Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>
      {/* Why Choose trustBank Section */}
      <FeatureShowcase />
      {/* Community Voices Section */}

      <UserFeedback />

      {/* DEBUG: CTA SECTION SHOULD APPEAR BELOW */}
      {/* Call to Action Section */}
      <View style={styles.ctaSection}>
        {/* <Text style={{color: 'red', fontWeight: 'bold'}}>DEBUG: CTA RENDERED</Text> */}
        <Text style={styles.ctaTitle}>Ready to Join Our Growing Community?</Text>
        <Text style={styles.ctaSubtitle}>
          Be part of a thriving ecosystem where traders help traders. From beginners to experts, everyone contributes to our success story.
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 14, marginTop: 12 }}>
          <TouchableOpacity
            style={[styles.ctaBtn, { marginRight: 7 }]}
            activeOpacity={0.85}
            onPress={() => Linking.openURL('https://chat.whatsapp.com/HeOE6jNRGhqAoJ8HOZU6dA')}
          >
            <Text style={styles.ctaBtnText}>Join Community</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.ctaBtn, { backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#bbf7d0' }]}
            activeOpacity={0.85}
            // TODO: Replace with navigation to trading academy page
            onPress={() => {/* navigation.navigate('learn'); */}}
          >
            <Text style={[styles.ctaBtnText, { color: '#059669' }]}>Trading Academy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgWrap: {
    flex: 1,
    alignItems: 'stretch',
    paddingVertical: 16,
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: 'transparent',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#059669',
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  subtitle: {
    color: '#64748b',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 18,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    width: '100%',
    marginBottom: 24,
  },
  card: {
    flexBasis: '45%',
    minWidth: 160,
    maxWidth: 260,
    borderRadius: 16,
    margin: 8,
    padding: 18,
    alignItems: 'flex-start',
    shadowColor: '#059669',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 14,
  },
  iconWrap: {
    backgroundColor: '#d1fae5',
    borderRadius: 10,
    padding: 6,
  },
  badge: {
    fontSize: 11,
    color: '#059669',
    backgroundColor: '#bbf7d0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  cardTitle: {
    fontWeight: '600',
    color: '#1a237e',
    fontSize: 16,
    marginBottom: 6,
    textAlign: 'left',
  },
  cardContent: {
    color: '#475569',
    fontSize: 13,
    textAlign: 'left',
  },
  // CTA styles below
  ctaSection: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: 'transparent',
    marginTop: 8,
    marginBottom: 12,
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#059669',
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 18,
  },
  ctaBtn: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#059669',
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 3,
  },
  ctaBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});