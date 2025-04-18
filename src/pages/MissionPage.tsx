import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Feather from 'react-native-vector-icons/Feather';

const stats = [
  { value: '1.4B', label: 'Unbanked Adults Globally', description: 'People without access to basic financial services.' },
  { value: '57%', label: 'Mobile Internet Users', description: 'In emerging markets with potential crypto access.' },
  { value: '$500B+', label: 'Remittance Market', description: 'Annual cross-border payments in emerging markets.' },
  { value: '95%', label: 'Transaction Cost Reduction', description: 'Potential savings using crypto vs traditional methods.' },
];

const impactAreas = [
  {
    icon: (color: string) => <Feather name="users" size={28} color={color} />,
    title: 'Financial Inclusion',
    description: 'Bringing banking services to the underserved populations in emerging markets.'
  },
  {
    icon: (color: string) => <Feather name="credit-card" size={28} color={color} />,
    title: 'Affordable Remittances',
    description: 'Reducing the cost of sending money across borders for millions of families.'
  },
  {
    icon: (color: string) => <Feather name="bar-chart-2" size={28} color={color} />,
    title: 'Economic Growth',
    description: 'Fostering entrepreneurship and business development through accessible financial tools.'
  },
  {
    icon: (color: string) => <Feather name="shield" size={28} color={color} />,
    title: 'Secure Transactions',
    description: 'Providing safe and transparent financial services to protect users\' assets.'
  }
];

const challenges = [
  {
    title: 'Limited Banking Access',
    description: '2.5 billion people in emerging markets lack access to traditional banking.',
    solution: 'Mobile-first crypto solutions'
  },
  {
    title: 'High Transaction Costs',
    description: 'Average remittance fees of 6.5% eat into crucial family support.',
    solution: 'Near-zero crypto transfer fees'
  },
  {
    title: 'Financial Education',
    description: '65% of adults in developing economies are financially illiterate.',
    solution: 'Built-in learning resources'
  }
];

export default function MissionPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { theme } = useTheme();

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    setSuccess(true);
    setError('');
    setEmail('');
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.headerSection}>
        <Text style={[styles.badge, { borderColor: theme.colors.primary, color: theme.colors.primary }]}>Our Mission</Text>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Simplifying Crypto Adoption</Text>
        <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>Making cryptocurrency accessible and useful for everyone in emerging markets</Text>
      </View>
      {/* Stats */}
      <View style={styles.statsRow}>
        {stats.map((stat, i) => (
          <View key={stat.label} style={[styles.statCard, { backgroundColor: theme.colors.card }]}> 
            <Text style={[styles.statValue, { color: theme.colors.primary }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.text }]}>{stat.label}</Text>
            <Text style={[styles.statDesc, { color: theme.colors.secondaryText }]}>{stat.description}</Text>
          </View>
        ))}
      </View>
      {/* Impact Areas */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Impact Areas</Text>
        <View style={styles.impactRow}>
          {impactAreas.map((area, i) => (
            <View key={area.title} style={[styles.impactCard, { backgroundColor: theme.colors.card }]}> 
              <View style={{ marginBottom: 8 }}>{area.icon(theme.colors.primary)}</View>
              <Text style={[styles.impactTitle, { color: theme.colors.primary }]}>{area.title}</Text>
              <Text style={[styles.impactDesc, { color: theme.colors.secondaryText }]}>{area.description}</Text>
            </View>
          ))}
        </View>
      </View>
      {/* Challenges */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Challenges We're Solving</Text>
        <View style={styles.challengesRow}>
          {challenges.map((challenge) => (
            <View key={challenge.title} style={[styles.challengeCard, { backgroundColor: theme.colors.card }]}> 
              <Text style={[styles.challengeTitle, { color: theme.colors.primary }]}>{challenge.title}</Text>
              <Text style={[styles.challengeDesc, { color: theme.colors.secondaryText }]}>{challenge.description}</Text>
              <View style={styles.solutionRow}>
                <Feather name="check" size={16} color={theme.colors.primary} />
                <Text style={[styles.solutionText, { color: theme.colors.primary }]}>{challenge.solution}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      {/* Newsletter */}
      <View style={styles.section}>
        <View style={[styles.newsletterCard, { borderColor: theme.colors.primary }]}> 
          <Text style={[styles.sectionTitle, { textAlign: 'center', color: theme.colors.text }]}>Join Our Mission</Text>
          <Text style={[styles.newsletterDesc, { color: theme.colors.secondaryText }]}>Be part of the movement to bring financial freedom to emerging markets</Text>
          <View style={styles.inputRow}>
            <Feather name="mail" size={20} color={theme.colors.secondaryText} style={{ marginRight: 8 }} />
            <TextInput
              style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.primary }]}
              placeholder="Enter your email"
              placeholderTextColor={theme.colors.secondaryText}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handleSubscribe}>
            <Text style={{ color: theme.colors.background, fontWeight: 'bold' }}>Join the Movement</Text>
            <Feather name="arrow-right" size={18} color={theme.colors.background} style={{ marginLeft: 6 }} />
          </TouchableOpacity>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {success ? (
            <View style={styles.successRow}>
              <Feather name="check" size={18} color={theme.colors.primary} />
              <Text style={styles.successText}>Successfully subscribed!</Text>
            </View>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerSection: { alignItems: 'center', marginTop: 28, marginBottom: 18 },
  badge: { fontWeight: 'bold', fontSize: 14, paddingHorizontal: 14, paddingVertical: 4, borderRadius: 16, borderWidth: 1, alignSelf: 'center', marginBottom: 8 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 15, textAlign: 'center', marginBottom: 4, maxWidth: 300 },
  statsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 18, gap: 10, paddingHorizontal: 8 },
  statCard: { flex: 1, minWidth: 150, maxWidth: '48%', margin: 4, borderRadius: 12, padding: 16, elevation: 2 },
  statValue: { fontSize: 22, fontWeight: 'bold', marginBottom: 2 },
  statLabel: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  statDesc: { fontSize: 13 },
  section: { marginBottom: 24, paddingHorizontal: 8 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  impactRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
  impactCard: { flex: 1, minWidth: 150, maxWidth: '48%', margin: 4, borderRadius: 12, padding: 16, elevation: 2, alignItems: 'flex-start' },
  impactTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 2 },
  impactDesc: { fontSize: 13 },
  challengesRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
  challengeCard: { flex: 1, minWidth: 150, maxWidth: '48%', margin: 4, borderRadius: 12, padding: 16, elevation: 2 },
  challengeTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 2 },
  challengeDesc: { fontSize: 13, marginBottom: 8 },
  solutionRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  solutionText: { marginLeft: 6, fontWeight: '600', fontSize: 13 },
  newsletterCard: { borderWidth: 1.5, borderRadius: 16, padding: 18, marginTop: 10 },
  newsletterDesc: { fontSize: 14, textAlign: 'center', marginBottom: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#10b981', borderRadius: 8, paddingHorizontal: 8, marginBottom: 10 },
  input: { flex: 1, height: 40, fontSize: 15 },
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, paddingVertical: 10, marginTop: 2 },
  errorText: { color: '#dc2626', fontSize: 13, textAlign: 'center', marginTop: 4 }, // You may want to add 'error' to your theme
  successRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  successText: { color: '#03a9f4', fontWeight: 'bold', marginLeft: 6, fontSize: 14 },
});
