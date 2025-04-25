//src/pages/Dashboard.tsx
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

// ===== MOCK DATA FOR PRODUCTION UI =====
const mockUser = { email: "john@doe.com" };
const totalBalance = 500000;
const monthlyVolume = 120000;
const withdrawalLimit = 1000000;
const recentTransactions = [
  { id: '1', type: 'swap', amount: 0.00000576, currency: 'BTC', status: 'completed', createdAt: '2025-04-15', to_amount: 0.00000576, to_currency: 'BTC' },
  { id: '2', type: 'trade', amount: 100, currency: 'USDT', status: 'completed', createdAt: '2025-04-14' },
];

const quickActions = [
  { label: 'Deposit', icon: 'download', color: ['#34d399', '#10b981'], onPress: () => {} },
  { label: 'Instant Swap', icon: 'repeat', color: ['#818cf8', '#6366f1'], onPress: () => {} },
  { label: 'Withdraw', icon: 'upload', color: ['#fbbf24', '#f59e42'], onPress: () => {} },
  { label: 'Send', icon: 'send', color: ['#38bdf8', '#0ea5e9'], onPress: () => {} },
];

const quickLinks = [
  { label: 'View Full Portfolio', icon: 'folder', subtitle: 'Check your assets', onPress: (navigation: any) => navigation.navigate('WalletPage') },
  { label: 'Trade Crypto', icon: 'shopping-cart', subtitle: 'Buy & sell crypto', onPress: (navigation: any) => navigation.navigate('TradePage', { initialTab: 'swap' }) },
  { label: 'P2P Trading', icon: 'users', subtitle: 'Trade with users', onPress: (navigation: any) => navigation.navigate('TradePage', { initialTab: 'p2p' }) },
];

import { SafeAreaView } from 'react-native';

import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [showBalance, setShowBalance] = useState(true);
  const firstName = mockUser.email.split('@')[0] || "User";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Welcome & Info */}
        <View style={{ paddingHorizontal: 24, paddingTop: 18, marginBottom: 12 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme.colors.text, marginBottom: 2 }}>Welcome back, {firstName} <Text style={{ fontSize: 20 }}>👋</Text></Text>
          <Text style={{ fontSize: 14, color: theme.colors.secondaryText }}>Here’s your crypto dashboard overview.</Text>
        </View>

        {/* Overview Cards - Horizontal Scrollable */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12, marginBottom: 14 }}
        >
          {/* Total Balance Card with Hide/Eye Icon */}
          <LinearGradient colors={['#34d399cc', '#10b981cc']} style={{ width: 320, borderRadius: 26, padding: 28, marginRight: 16, elevation: 4, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <TouchableOpacity
              style={{ position: 'absolute', top: 18, right: 18, zIndex: 10, padding: 4 }}
              onPress={() => setShowBalance(prev => !prev)}
              hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}
            >
              <Feather name={showBalance ? 'eye' : 'eye-off'} size={22} color={'#fff'} />
            </TouchableOpacity>
            <Feather name="credit-card" size={32} color="#fff" style={{ marginBottom: 14 }} />
            <Text style={{ fontSize: 14, color: '#e0f2fe', fontWeight: '600' }}>Total Balance</Text>
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginVertical: 4, color: '#fff', letterSpacing: 0.5 }}>
              {showBalance ? `₦${totalBalance.toLocaleString()}` : '*****'}
            </Text>
            <Text style={{ fontSize: 13, color: '#e0f2fe', marginBottom: 8 }}>All wallets</Text>
            <TouchableOpacity style={{ alignSelf: 'center', marginTop: 2 }}><Text style={{ fontSize: 13, color: '#fff', fontWeight: '600', opacity: 0.85 }}>View Details <Feather name="chevron-right" size={14} color="#fff" /></Text></TouchableOpacity>
          </LinearGradient>
          {/* Monthly Volume Card */}
          <LinearGradient colors={['#818cf8cc', '#6366f1cc']} style={{ width: 320, borderRadius: 26, padding: 28, marginRight: 16, elevation: 4, alignItems: 'center', justifyContent: 'center' }}>
            <Feather name="bar-chart-2" size={32} color="#fff" style={{ marginBottom: 14 }} />
            <Text style={{ fontSize: 14, color: '#e0e7ff', fontWeight: '600' }}>Monthly Volume</Text>
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginVertical: 4, color: '#fff', letterSpacing: 0.5 }}>{showBalance ? `₦${monthlyVolume.toLocaleString()}` : '*****'}</Text>
            <Text style={{ fontSize: 13, color: '#e0e7ff', marginBottom: 8 }}>This month</Text>
          </LinearGradient>
          {/* Withdrawal Limit Card */}
          <LinearGradient colors={['#fbbf24cc', '#f59e42cc']} style={{ width: 320, borderRadius: 26, padding: 28, marginRight: 4, elevation: 4, alignItems: 'center', justifyContent: 'center' }}>
            <Feather name="shield" size={32} color="#fff" style={{ marginBottom: 14 }} />
            <Text style={{ fontSize: 14, color: '#fef3c7', fontWeight: '600' }}>Withdrawal Limit</Text>
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginVertical: 4, color: '#fff', letterSpacing: 0.5 }}>{showBalance ? `₦${withdrawalLimit.toLocaleString()}` : '*****'}</Text>
            <Text style={{ fontSize: 13, color: '#fef3c7', marginBottom: 8 }}>Remaining</Text>
          </LinearGradient>
        </ScrollView>

        {/* Promo/Info Banners - Smaller, More Colorful, Theme Adaptive */}
        <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginBottom: 12 }}>
          <LinearGradient
            colors={theme.colors.background === '#fff'
              ? ['#fde68a', '#fbbf24']
              : ['#eab308', '#fbbf24']}
            style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 10, marginHorizontal: 2, elevation: 1, minHeight: 56 }}
          >
            <Feather name="gift" size={20} color={theme.colors.text} style={{ marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '700', fontSize: 13, color: theme.colors.text }}>Earn 50 USDT Bonus!</Text>
              <Text style={{ fontSize: 11, color: theme.colors.secondaryText }}>Complete your first trade <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>Trade <Feather name="arrow-right" size={11} color={theme.colors.primary} /></Text></Text>
            </View>
          </LinearGradient>
          <LinearGradient
            colors={theme.colors.background === '#fff'
              ? ['#dbeafe', '#38bdf8']
              : ['#0ea5e9', '#38bdf8']}
            style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 10, marginHorizontal: 2, elevation: 1, minHeight: 56 }}
          >
            <Feather name="users" size={20} color={theme.colors.text} style={{ marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '700', fontSize: 13, color: theme.colors.text }}>Try P2P Trading!</Text>
              <Text style={{ fontSize: 11, color: theme.colors.secondaryText }}>Trade with users</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions - now above Quick Links, polished style */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 12, color: theme.colors.text, paddingHorizontal: 16 }}>Quick Actions</Text>
          <View style={styles.quickActionGrid}>
            <View style={styles.quickActionGridCell}>
              <TouchableOpacity activeOpacity={0.85} style={[styles.quickActionGridBtn, { backgroundColor: theme.colors.primary + '22' }]}> 
                <Feather name="arrow-down-circle" size={20} color={theme.colors.primary} style={{ marginRight: 7 }} />
                <Text style={[styles.quickActionGridLabel, { color: theme.colors.text }]}>Deposit</Text>
                <Feather name="chevron-right" size={16} color={theme.colors.text + '99'} style={styles.quickActionGridChevron} />
              </TouchableOpacity>
              <Text style={[styles.quickActionGridNote, { color: theme.colors.secondaryText }]}>Add funds to your wallet</Text>
            </View>
            <View style={styles.quickActionGridCell}>
              <TouchableOpacity activeOpacity={0.85} style={[styles.quickActionGridBtn, { backgroundColor: '#fbbf24' + '22' }]}> 
                <Feather name="repeat" size={20} color="#fbbf24" style={{ marginRight: 7 }} />
                <Text style={[styles.quickActionGridLabel, { color: theme.colors.text }]}>Swap</Text>
                <Feather name="chevron-right" size={16} color={theme.colors.text + '99'} style={styles.quickActionGridChevron} />
              </TouchableOpacity>
              <Text style={[styles.quickActionGridNote, { color: theme.colors.secondaryText }]}>Exchange one crypto for another</Text>
            </View>
            <View style={styles.quickActionGridCell}>
              <TouchableOpacity activeOpacity={0.85} style={[styles.quickActionGridBtn, { backgroundColor: '#6366f1' + '22' }]}> 
                <Feather name="arrow-up-circle" size={20} color="#6366f1" style={{ marginRight: 7 }} />
                <Text style={[styles.quickActionGridLabel, { color: theme.colors.text }]}>Withdraw</Text>
                <Feather name="chevron-right" size={16} color={theme.colors.text + '99'} style={styles.quickActionGridChevron} />
              </TouchableOpacity>
              <Text style={[styles.quickActionGridNote, { color: theme.colors.secondaryText }]}>Transfer funds out</Text>
            </View>
            <View style={styles.quickActionGridCell}>
              <TouchableOpacity activeOpacity={0.85} style={[styles.quickActionGridBtn, { backgroundColor: '#10b981' + '22' }]}> 
                <Feather name="send" size={20} color="#10b981" style={{ marginRight: 7 }} />
                <Text style={[styles.quickActionGridLabel, { color: theme.colors.text }]}>Send</Text>
                <Feather name="chevron-right" size={16} color={theme.colors.text + '99'} style={styles.quickActionGridChevron} />
              </TouchableOpacity>
              <Text style={[styles.quickActionGridNote, { color: theme.colors.secondaryText }]}>Send crypto to another user</Text>
            </View>
          </View>
        </View>

        {/* Quick Links - 2-column grid, new design */}
        <View style={{ paddingHorizontal: 16, marginBottom: 28 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.colors.text, marginBottom: 12 }}>Quick Links</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {/* Wallet */}
            <TouchableOpacity
              style={{ width: '48%', backgroundColor: theme.colors.card, borderRadius: 18, paddingVertical: 28, marginBottom: 18, alignItems: 'center', elevation: 3, shadowColor: theme.colors.primary, shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 3 } }}
              onPress={() => navigation.navigate('WalletPage' as never)}
              activeOpacity={0.8}
            >
              <View style={{ backgroundColor: theme.colors.primary + '22', borderRadius: 32, padding: 16, marginBottom: 12 }}>
                <Feather name="credit-card" size={30} color={theme.colors.primary} />
              </View>
              <Text style={{ fontWeight: '700', color: theme.colors.text, fontSize: 15, marginTop: 2 }}>Wallet</Text>
            </TouchableOpacity>
            {/* Trade */}
            <TouchableOpacity
              style={{ width: '48%', backgroundColor: theme.colors.card, borderRadius: 18, paddingVertical: 28, marginBottom: 18, alignItems: 'center', elevation: 3, shadowColor: theme.colors.primary, shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 3 } }}
              onPress={() => navigation.navigate('TradePage' as never)}
              activeOpacity={0.8}
            >
              <View style={{ backgroundColor: theme.colors.primary + '22', borderRadius: 32, padding: 16, marginBottom: 12 }}>
                <Feather name="repeat" size={30} color={theme.colors.primary} />
              </View>
              <Text style={{ fontWeight: '700', color: theme.colors.text, fontSize: 15, marginTop: 2 }}>Trade</Text>
            </TouchableOpacity>
            {/* P2P */}
            <TouchableOpacity
              style={{ width: '48%', backgroundColor: theme.colors.card, borderRadius: 18, paddingVertical: 28, marginBottom: 18, alignItems: 'center', elevation: 3, shadowColor: theme.colors.primary, shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 3 } }}
              onPress={() => navigation.navigate('P2POffersList' as never)}
              activeOpacity={0.8}
            >
              <View style={{ backgroundColor: theme.colors.primary + '22', borderRadius: 32, padding: 16, marginBottom: 12 }}>
                <Feather name="users" size={30} color={theme.colors.primary} />
              </View>
              <Text style={{ fontWeight: '700', color: theme.colors.text, fontSize: 15, marginTop: 2 }}>P2P</Text>
            </TouchableOpacity>
            {/* Markets */}
            <TouchableOpacity
              style={{ width: '48%', backgroundColor: theme.colors.card, borderRadius: 18, paddingVertical: 28, marginBottom: 18, alignItems: 'center', elevation: 3, shadowColor: theme.colors.primary, shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 3 } }}
              onPress={() => navigation.navigate('MarketPage' as never)}
              activeOpacity={0.8}
            >
              <View style={{ backgroundColor: theme.colors.primary + '22', borderRadius: 32, padding: 16, marginBottom: 12 }}>
                <Feather name="bar-chart-2" size={30} color={theme.colors.primary} />
              </View>
              <Text style={{ fontWeight: '700', color: theme.colors.text, fontSize: 15, marginTop: 2 }}>Markets</Text>
            </TouchableOpacity>
            {/* KYC */}
            <TouchableOpacity
              style={{ width: '48%', backgroundColor: theme.colors.card, borderRadius: 18, paddingVertical: 28, marginBottom: 18, alignItems: 'center', elevation: 3, shadowColor: theme.colors.primary, shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 3 } }}
              onPress={() => navigation.navigate('KycIntro' as never)}
              activeOpacity={0.8}
            >
              <View style={{ backgroundColor: theme.colors.primary + '22', borderRadius: 32, padding: 16, marginBottom: 12 }}>
                <Feather name="shield" size={30} color={theme.colors.primary} />
              </View>
              <Text style={{ fontWeight: '700', color: theme.colors.text, fontSize: 15, marginTop: 2 }}>KYC</Text>
            </TouchableOpacity>
            {/* Profile */}
            <TouchableOpacity
              style={{ width: '48%', backgroundColor: theme.colors.card, borderRadius: 18, paddingVertical: 28, marginBottom: 18, alignItems: 'center', elevation: 3, shadowColor: theme.colors.primary, shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 3 } }}
              onPress={() => navigation.navigate('Profile' as never)}
              activeOpacity={0.8}
            >
              <View style={{ backgroundColor: theme.colors.primary + '22', borderRadius: 32, padding: 16, marginBottom: 12 }}>
                <Feather name="user" size={30} color={theme.colors.primary} />
              </View>
              <Text style={{ fontWeight: '700', color: theme.colors.text, fontSize: 15, marginTop: 2 }}>Profile</Text>
            </TouchableOpacity>
            {/* Support */}
            <TouchableOpacity
              style={{ width: '48%', backgroundColor: theme.colors.card, borderRadius: 18, paddingVertical: 28, marginBottom: 18, alignItems: 'center', elevation: 3, shadowColor: theme.colors.primary, shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 3 } }}
              onPress={() => navigation.navigate('Contact' as never)}
              activeOpacity={0.8}
            >
              <View style={{ backgroundColor: theme.colors.primary + '22', borderRadius: 32, padding: 16, marginBottom: 12 }}>
                <Feather name="help-circle" size={30} color={theme.colors.primary} />
              </View>
              <Text style={{ fontWeight: '700', color: theme.colors.text, fontSize: 15, marginTop: 2 }}>Support</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={{ paddingHorizontal: 16, marginBottom: 32 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: theme.colors.text }}>Recent Transactions</Text>
            <TouchableOpacity><Text style={{ fontSize: 12, color: theme.colors.primary, fontWeight: '600' }}>View All</Text></TouchableOpacity>
          </View>
          <View style={{ backgroundColor: theme.colors.card, borderRadius: 16, padding: 8, shadowColor: theme.colors.text, shadowOpacity: 0.04, shadowRadius: 8 }}>
            {recentTransactions.map(tx => (
              <View key={tx.id} style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: theme.colors.border || theme.colors.text + '18', paddingVertical: 10, paddingHorizontal: 6 }}>
                <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Feather name={tx.type === 'swap' ? 'repeat' : 'bar-chart-2'} size={18} color={theme.colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '600', fontSize: 14, color: theme.colors.text }}>{tx.type === 'swap' ? 'Swap' : 'Trade'}</Text>
                  <Text style={{ fontSize: 11, color: theme.colors.secondaryText }}>{tx.createdAt}</Text>
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 14, color: tx.type === 'swap' ? '#22d3ee' : '#10b981' }}>+{tx.amount} {tx.currency}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Spacer for bottom nav */}
        <View style={{ height: 90 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ===== STYLES =====
const styles = StyleSheet.create({
  quickActionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  quickActionGridCell: {
    width: '48%',
    marginBottom: 14,
    alignItems: 'center',
  },
  quickActionGridBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  quickActionGridLabel: {
    fontWeight: '700',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  quickActionGridChevron: {
    marginLeft: 6,
  },
  quickActionGridNote: {
    fontSize: 11,
    marginTop: 4,
    marginBottom: 0,
    textAlign: 'center',
  },

  container: { flex: 1 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  scrollContent: { paddingBottom: 80 },
  section: { paddingHorizontal: 20, marginBottom: 18 },
  welcome: { fontSize: 17, fontWeight: '700', marginBottom: 2 },
  subtitle: { fontSize: 14, marginBottom: 8 },
  // Overview Cards
  overviewRow: { flexDirection: 'row', gap: 14, marginBottom: 14, paddingHorizontal: 10 },
  overviewCard: { flex: 1, borderRadius: 18, padding: 18, marginHorizontal: 2, minWidth: 120, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 } },
  overviewLabel: { fontSize: 13, color: '#64748b', fontWeight: '600' },
  overviewValue: { fontSize: 20, fontWeight: 'bold', marginVertical: 2, color: '#1a237e' },
  overviewSub: { fontSize: 12, color: '#64748b', marginBottom: 6 },
  overviewAction: { alignSelf: 'flex-end', marginTop: 2 },
  overviewActionText: { fontSize: 12, color: '#10b981', fontWeight: '600' },
  // Banners
  bannerRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 10, marginBottom: 12 },
  bannerCard: { flex: 1, flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 14, marginHorizontal: 2, elevation: 1 },
  bannerTitle: { fontWeight: '600', fontSize: 14, color: '#1a237e' },
  bannerDesc: { fontSize: 12, color: '#64748b' },
  bannerLink: { color: '#6366f1', fontWeight: '600' },
  // Quick Actions
  quickActionsBox: { marginBottom: 18, paddingHorizontal: 10 },
  quickActionsTitle: { fontSize: 15, fontWeight: '700', marginBottom: 10 },
  quickActionsRow: { flexDirection: 'row', gap: 10 },
  quickAction: { flex: 1, alignItems: 'center', borderRadius: 14, padding: 12, marginHorizontal: 2, elevation: 1 },
  quickActionIconBox: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  quickActionLabel: { fontSize: 12, fontWeight: '600' },
  // Links & Transactions
  linksRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 10 },
  linksCol: { flex: 1 },
  transactionsCol: { flex: 1 },
  quickLinksTitle: { fontSize: 15, fontWeight: '700', marginBottom: 10 },
  quickLink: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, padding: 10, marginBottom: 10 },
  quickLinkLabel: { fontWeight: '600', fontSize: 13 },
  quickLinkSub: { fontSize: 11 },
  transactionsHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  transactionsTitle: { fontSize: 15, fontWeight: '700' },
  transactionsViewAll: { fontSize: 12, color: '#6366f1', fontWeight: '600' },
  transactionsList: { borderRadius: 12, padding: 10, gap: 10, elevation: 1 },
  transactionItem: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 6 },
  transactionLabel: { fontWeight: '600', fontSize: 13 },
  transactionDate: { fontSize: 11, color: '#64748b' },
  transactionAmount: { fontWeight: 'bold', fontSize: 13 },
});

export default Dashboard;