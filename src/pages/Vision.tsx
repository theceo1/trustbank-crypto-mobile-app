import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const benefits = [
  { icon: 'globe', title: 'Multi-Currency Support', description: '80+ cryptocurrencies available' },
  { icon: 'shield', title: 'Bank-Grade Security', description: 'Multi-layer protection' },
  { icon: 'smartphone', title: 'Mobile First', description: 'Seamless mobile experience' },
  { icon: 'zap', title: 'Instant Settlements', description: 'Real-time transactions' },
];

const products = [
  {
    id: 'exchange',
    icon: 'repeat',
    title: 'trustExchange',
    description: 'A secure and intuitive cryptocurrency exchange platform',
    features: [
      'Instant buy/sell of cryptocurrencies',
      'Advanced trading features',
      'Deep liquidity pools',
      'Multiple payment methods',
      '24/7 customer support',
    ],
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'coin',
    icon: 'database',
    title: 'trustCoin (Coming Soon)',
    description: 'Our native digital currency powering the ecosystem',
    features: [
      'Reduced trading fees',
      'Governance rights',
      'Staking rewards',
      'Cross-border transfers',
      'Merchant payments',
    ],
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'card',
    icon: 'credit-card',
    title: 'trustCard (Coming Soon)',
    description: 'Spend your crypto assets anywhere, anytime',
    features: [
      'Virtual and physical cards',
      'Zero foreign transaction fees',
      'Instant crypto-to-fiat conversion',
      'Worldwide acceptance',
      'Cashback rewards',
    ],
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'pos',
    icon: 'shopping-bag',
    title: 'trustPOS (Coming Soon)',
    description: 'Next-generation point of service solution for merchants',
    features: [
      'Accept crypto payments',
      'Real-time settlement',
      'Analytics dashboard',
      'Multi-currency support',
      'Integration APIs',
    ],
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800',
  },
];

import { useTheme } from '@/contexts/ThemeContext';

export default function VisionScreen() {
  const { theme } = useTheme();
  const [activeProduct, setActiveProduct] = useState('exchange');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = () => {
    if (!email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    setSubscribed(true);
    setEmail('');
    setError('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={{ paddingBottom: 32 }}>
      <Text style={[styles.badge, { backgroundColor: theme.colors.card, color: theme.colors.primary }]}>Our Vision</Text>
      <Text style={[styles.header, { color: theme.colors.primary }]}>The Future of Finance</Text>
      <Text style={[styles.subheader, { color: theme.colors.secondaryText }]}>Building a comprehensive suite of financial products for the crypto economy</Text>

      {/* Benefits Grid */}
      <View style={styles.benefitsRow}>
        {benefits.map((b) => (
          <View key={b.title} style={[styles.benefitCard, { backgroundColor: theme.colors.card }] }>
            <View style={[styles.benefitIcon, { backgroundColor: theme.colors.primary + '22' }]}><Icon name={b.icon} size={28} color={theme.colors.primary} /></View>
            <Text style={[styles.benefitTitle, { color: theme.colors.primary }]}>{b.title}</Text>
            <Text style={[styles.benefitDesc, { color: theme.colors.secondaryText }]}>{b.description}</Text>
          </View>
        ))}
      </View>

      {/* Product Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsList}>
        {products.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={[styles.tabTrigger, { backgroundColor: activeProduct === p.id ? theme.colors.primary : theme.colors.card }]}
            onPress={() => setActiveProduct(p.id)}
          >
            <Icon name={p.icon} size={18} color={activeProduct === p.id ? '#fff' : theme.colors.primary} />
            <Text style={[styles.tabText, { color: activeProduct === p.id ? '#fff' : theme.colors.primary }]}>{p.title.split(' ')[0]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={[styles.tabContent, { backgroundColor: theme.colors.card }] }>
        {products.map((p) => (
          activeProduct === p.id && (
            <View key={p.id}>
              <Image source={{ uri: p.image }} style={styles.productImage} />
              <Text style={[styles.productTitle, { color: theme.colors.primary }]}>{p.title}</Text>
              <Text style={[styles.productDesc, { color: theme.colors.secondaryText }]}>{p.description}</Text>
              <View style={{ marginTop: 12 }}>
                {p.features.map((f, i) => (
                  <View key={i} style={styles.featureRow}>
                    <Icon name="check-circle" size={17} color={theme.colors.primary} />
                    <Text style={[styles.featureText, { color: theme.colors.primary }]}>{f}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity style={[styles.learnMoreBtn, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          )
        ))}
      </View>

      {/* Newsletter */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={[styles.newsletterCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.primary + '33' }] }>
          <Text style={[styles.newsletterTitle, { color: theme.colors.primary }]}>Stay Updated</Text>
          <Text style={[styles.newsletterDesc, { color: theme.colors.secondaryText }]}>Be the first to know about new features and product launches</Text>
          <View style={[styles.inputRow, { backgroundColor: theme.colors.background }] }>
            <Icon name="mail" size={20} color={theme.colors.primary} style={{ marginRight: 8 }} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Enter your email"
              placeholderTextColor={theme.colors.secondaryText}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {subscribed ? <Text style={styles.successText}>Successfully subscribed!</Text> : null}
          <TouchableOpacity style={[styles.subscribeBtn, { backgroundColor: theme.colors.primary }]} onPress={handleSubscribe}>
            <Text style={styles.subscribeText}>Subscribe for Updates</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  badge: { alignSelf: 'center', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8, marginTop: 16, marginBottom: 8, fontWeight: 'bold' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 4 },
  subheader: { fontSize: 14, textAlign: 'center', marginBottom: 18 },
  benefitsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  benefitCard: { flex: 1, alignItems: 'center', borderRadius: 12, marginHorizontal: 4, padding: 12, elevation: 2 },
  benefitIcon: { borderRadius: 24, padding: 8, marginBottom: 6 },
  benefitTitle: { fontWeight: 'bold', fontSize: 13, marginBottom: 2 },
  benefitDesc: { fontSize: 11, textAlign: 'center' },

  tabsList: { flexDirection: 'row', marginBottom: 12 },
  tabTrigger: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e0f2fe', paddingVertical: 7, paddingHorizontal: 16, borderRadius: 20, marginRight: 8 },
  tabActive: { backgroundColor: '#059669' },
  tabText: { marginLeft: 6, color: '#059669', fontWeight: 'bold' },
  tabContent: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 24, elevation: 2 },
  productTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 2, color: '#059669' },
  productDesc: { fontSize: 13, color: '#64748b', marginBottom: 10 },
  productImage: { width: '100%', height: 160, borderRadius: 8, marginBottom: 10 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  featureText: { marginLeft: 7, color: '#059669', fontSize: 13 },
  learnMoreBtn: { marginTop: 10, backgroundColor: '#059669', borderRadius: 6, paddingVertical: 8, alignItems: 'center' },
  learnMoreText: { color: '#fff', fontWeight: 'bold' },
  newsletterCard: { backgroundColor: '#f0fdf4', borderWidth: 1, borderColor: '#bbf7d0', borderRadius: 12, padding: 18, marginBottom: 20, elevation: 1 },
  newsletterTitle: { fontWeight: 'bold', fontSize: 16, color: '#059669', marginBottom: 2, textAlign: 'center' },
  newsletterDesc: { fontSize: 12, color: '#64748b', marginBottom: 12, textAlign: 'center' },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 8, marginBottom: 8 },
  input: { flex: 1, height: 40, fontSize: 14, color: '#222', paddingHorizontal: 6 },
  subscribeBtn: { backgroundColor: '#059669', borderRadius: 6, paddingVertical: 10, alignItems: 'center', marginTop: 4 },
  subscribeText: { color: '#fff', fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 12, textAlign: 'center', marginBottom: 4 },
  successText: { color: '#059669', fontSize: 12, textAlign: 'center', marginBottom: 4 },
});
