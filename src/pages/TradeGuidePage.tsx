import React from "react";
import { View, Text, ScrollView, StyleSheet, useColorScheme } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";

const KYC_TIERS = [
  {
    key: 'basic',
    name: 'Basic',
    icon: 'shield',
    requirements: [
      'Email Verification',
      'Phone Number Verification',
      'Basic Personal Information',
    ],
    features: [
      'Basic trading features',
      'Limited trading volume',
      'Basic support',
    ],
    limits: {
      daily: 100,
      monthly: 1000,
      withdrawal: 200,
    },
  },
  {
    key: 'starter',
    name: 'Starter',
    icon: 'star',
    requirements: [
      'All Basic Tier Requirements',
      'NIN Verification',
      'Selfie Verification',
    ],
    features: [
      'Increased trading limits',
      'Priority support',
      'Access to OTC trading',
    ],
    limits: {
      daily: 500,
      monthly: 5000,
      withdrawal: 1000,
    },
  },
  {
    key: 'intermediate',
    name: 'Intermediate',
    icon: 'arrow-up-right',
    requirements: [
      'All Starter Tier Requirements',
      'BVN Verification',
    ],
    features: [
      'Higher trading limits',
      'Lower trading fees',
      'Dedicated support line',
    ],
    limits: {
      daily: 2000,
      monthly: 20000,
      withdrawal: 5000,
    },
  },
  {
    key: 'advanced',
    name: 'Advanced',
    icon: 'lock',
    requirements: [
      'All Intermediate Tier Requirements',
      'LiveCheck Verification',
    ],
    features: [
      'Premium trading limits',
      'VIP support',
      'Advanced trading tools',
      'Exclusive market insights',
    ],
    limits: {
      daily: 10000,
      monthly: 100000,
      withdrawal: 20000,
    },
  },
  {
    key: 'premium',
    name: 'Premium',
    icon: 'crown',
    requirements: [
      'All Advanced Tier Requirements',
      'Government-issued ID',
      'International Passport',
    ],
    features: [
      'Highest trading limits',
      'Lowest trading fees',
      'Dedicated account manager',
      'Premium support',
      'Advanced trading features',
      'Early access to new features',
    ],
    limits: {
      daily: 50000,
      monthly: 500000,
      withdrawal: 100000,
    },
  },
];

const VOLUME_TIERS = [
  { min: 0, max: 1000, fee: 4.0 },
  { min: 1000, max: 5000, fee: 3.5 },
  { min: 5000, max: 20000, fee: 3.0 },
  { min: 20000, max: 100000, fee: 2.8 },
  { min: 100000, max: Infinity, fee: 2.5 },
];

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

export default function TradeGuidePage() {
  const { theme } = useTheme();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark' || theme.colors.background === '#181f1b' || theme.colors.background === '#101522';

  return (
    <ScrollView style={[styles.bg, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ padding: 18, paddingBottom: 40 }}>
      <Text style={[styles.title, { color: '#10b981' }]}>Trading Tiers</Text>
      <Text style={[styles.subtitle, { color: theme.colors.text }]}>
        Unlock premium features and higher limits as you progress through our verification tiers
      </Text>

      {/* Alert Box */}
      <View style={[styles.alertBox, { backgroundColor: isDark ? '#181f1b' : '#e8fdf3', borderColor: '#10b981' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          <Feather name="info" size={18} color="#10b981" style={{ marginRight: 6 }} />
          <Text style={{ fontWeight: 'bold', color: theme.colors.text }}>Identity Verification</Text>
        </View>
        <Text style={{ color: theme.colors.text, fontSize: 13 }}>
          Our secure identity verification system adapts to your trading needs. As your trading activity grows, we may request additional verification to ensure the safety of your account and maintain compliance with regulations.
        </Text>
      </View>

      {/* KYC Tiers */}
      <View style={[styles.card, { borderColor: isDark ? '#333' : '#d1fae5' }]}>
        <Text style={[styles.sectionTitle, { color: '#10b981' }]}>KYC Tiers & Trading Limits</Text>
        {KYC_TIERS.map((tier, idx) => (
          <View key={tier.key} style={[styles.tierBox, { backgroundColor: isDark ? '#101522' : '#fff', borderColor: isDark ? '#222' : '#e5e7eb' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name={tier.icon === 'crown' ? 'award' : tier.icon as any} size={20} color="#10b981" style={{ marginRight: 8 }} />
                <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#10b981' }}>{tier.name}</Text>
              </View>
              <Feather name="chevron-right" size={18} color={theme.colors.text} />
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, minWidth: 120, marginBottom: 6 }}>
                <Text style={[styles.tierLabel, { color: '#10b981' }]}>Requirements</Text>
                {tier.requirements.map((req, i) => (
                  <Text key={i} style={[styles.tierValue, { color: theme.colors.text }]}>• {req}</Text>
                ))}
              </View>
              <View style={{ flex: 1, minWidth: 120, marginBottom: 6 }}>
                <Text style={[styles.tierLabel, { color: '#10b981' }]}>Features</Text>
                {tier.features.map((feat, i) => (
                  <Text key={i} style={[styles.tierValue, { color: theme.colors.text }]}>• {feat}</Text>
                ))}
              </View>
              <View style={{ flex: 1, minWidth: 120 }}>
                <Text style={[styles.tierLabel, { color: '#10b981' }]}>Trading Limits</Text>
                <Text style={[styles.tierValue, { color: theme.colors.text }]}>Daily: {formatCurrency(tier.limits.daily)}</Text>
                <Text style={[styles.tierValue, { color: theme.colors.text }]}>Monthly: {formatCurrency(tier.limits.monthly)}</Text>
                <Text style={[styles.tierValue, { color: theme.colors.text }]}>Withdrawal: {formatCurrency(tier.limits.withdrawal)}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Trading Fee Tiers */}
      <View style={[styles.card, { borderColor: isDark ? '#333' : '#d1fae5' }]}>
        <Text style={[styles.sectionTitle, { color: '#10b981' }]}>Trading Fee Tiers</Text>
        <View style={[styles.alertBox, { backgroundColor: isDark ? '#181f1b' : '#e8fdf3', borderColor: '#10b981' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <Feather name="info" size={18} color="#10b981" style={{ marginRight: 6 }} />
            <Text style={{ fontWeight: 'bold', color: theme.colors.text }}>Volume-Based Discounts</Text>
          </View>
          <Text style={{ color: theme.colors.text, fontSize: 13 }}>
            Our fee structure rewards higher trading volumes with lower fees. The more you trade, the less you pay in fees. Volume is calculated based on your 30-day trading history.
          </Text>
        </View>
        <View style={{ marginTop: 16 }}>
          <View style={styles.feeTableHeader}>
            <Text style={[styles.feeTableCell, { flex: 1.2, color: theme.colors.text }]}>Tier Level</Text>
            <Text style={[styles.feeTableCell, { flex: 2, color: theme.colors.text }]}>30-Day Volume (USD)</Text>
            <Text style={[styles.feeTableCell, { flex: 1, color: theme.colors.text }]}>Trading Fee</Text>
            <Text style={[styles.feeTableCell, { flex: 2, color: theme.colors.text }]}>Features</Text>
          </View>
          {VOLUME_TIERS.map((tier, idx) => (
            <View key={idx} style={styles.feeTableRow}>
              <Text style={[styles.feeTableCell, { flex: 1.2, fontWeight: 'bold', color: theme.colors.text }]}>Tier {idx + 1}</Text>
              <Text style={[styles.feeTableCell, { flex: 2, color: theme.colors.text }]}>{tier.max === Infinity ? `${formatCurrency(tier.min)}+` : `${formatCurrency(tier.min)} - ${formatCurrency(tier.max)}`}</Text>
              <Text style={[styles.feeTableCell, { flex: 1, color: theme.colors.text }]}>{tier.fee}%</Text>
              <View style={{ flex: 2 }}>
                <Text style={{ fontSize: 13, color: theme.colors.text }}>Priority Support</Text>
                {idx >= 2 && <Text style={{ fontSize: 13, color: theme.colors.text }}>OTC Trading</Text>}
                {idx >= 3 && <Text style={{ fontSize: 13, color: theme.colors.text }}>Dedicated Account Manager</Text>}
                {idx >= 4 && <Text style={{ fontSize: 13, color: theme.colors.text }}>Custom Solutions</Text>}
              </View>
            </View>
          ))}
        </View>
        <View style={[styles.alertBox, { backgroundColor: isDark ? '#181f1b' : '#e8fdf3', borderColor: '#10b981', marginTop: 16 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <Feather name="arrow-up-right" size={18} color="#10b981" style={{ marginRight: 6 }} />
            <Text style={{ fontWeight: 'bold', color: theme.colors.text }}>Additional Fee Information</Text>
          </View>
          <Text style={{ color: theme.colors.text, fontSize: 13 }}>
            • Get 0.1% fee discount for each successful referral (up to 0.5%){"\n"}
            • Network fees vary by cryptocurrency and are displayed during trading{"\n"}
            • Volume is calculated in USD based on your 30-day trading activity{"\n"}
            • All fees are transparent and displayed before each trade
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 8, marginBottom: 2 },
  subtitle: { fontSize: 15, textAlign: 'center', marginBottom: 18 },
  alertBox: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
  },
  card: {
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tierBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  tierLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 14,
  },
  tierValue: {
    fontSize: 13,
    marginBottom: 2,
  },
  feeTableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e8fdf3',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 6,
    marginBottom: 2,
  },
  feeTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  feeTableCell: {
  },
});