//src/components/CallToAction.tsx
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useTheme } from "@/contexts/ThemeContext";

export default function CallToAction() {
  const { theme } = useTheme();
  return (
    <View style={styles.ctaSection}>

      <View style={styles.ctaCard}>
        <Text style={styles.ctaTitle}>
          Ready to Join Our Growing Community?
        </Text>
        <Text style={styles.ctaSubtitle}>
          Be part of a thriving ecosystem where traders help traders. From beginners to experts, everyone contributes to our success story.
        </Text>
        <View style={styles.featureRow}>
          <View style={styles.featureBadge}>
            <Feather name="shield" size={16} color="#059669" />
            <Text style={styles.featureText}>Bank-Grade Security</Text>
          </View>
          <View style={styles.featureBadge}>
            <Feather name="zap" size={16} color="#059669" />
            <Text style={styles.featureText}>Lightning Fast Trades</Text>
          </View>
          <View style={styles.featureBadge}>
            <Feather name="users" size={16} color="#059669" />
            <Text style={styles.featureText}>Beginner & Expert Friendly</Text>
          </View>
        </View>
        <View style={styles.ctaBtnRow}>
          <TouchableOpacity
            style={[styles.ctaBtn, styles.ctaBtnPrimary]}
            activeOpacity={0.85}
            onPress={() => Linking.openURL('https://chat.whatsapp.com/HeOE6jNRGhqAoJ8HOZU6dA')}
          >
            <Text style={styles.ctaBtnText}>Join Community</Text>
            <Feather name="arrow-right" size={18} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.ctaBtn, styles.ctaBtnOutline]}
            activeOpacity={0.85}
            // TODO: Replace with navigation.navigate('Learn') when the page exists
            onPress={() => Linking.openURL('https://www.trustbank.tech/learn')}
          >
            <Text style={[styles.ctaBtnText, { color: '#059669' }]}>Trading Academy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ctaSection: {
    width: '100%',
    paddingVertical: 32,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  ctaCard: {
    width: '92%',
    maxWidth: 400,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: 24,
    shadowColor: '#059669',
    shadowOpacity: 0.09,
    shadowRadius: 16,
    elevation: 5,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#059669',
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaSubtitle: {
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 18,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 18,
    flexWrap: 'wrap',
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    marginBottom: 6,
    shadowColor: '#059669',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureText: {
    fontSize: 13,
    color: '#059669',
    marginLeft: 6,
  },
  ctaBtnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginTop: 12,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginHorizontal: 4,
  },
  ctaBtnPrimary: {
    backgroundColor: '#059669',
    shadowColor: '#059669',
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 3,
  },
  ctaBtnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#bbf7d0',
  },
  ctaBtnText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
  },
});
