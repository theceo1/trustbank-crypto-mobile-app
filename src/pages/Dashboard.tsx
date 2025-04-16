import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Button from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";

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
  { label: 'Trade', icon: 'bar-chart-2', color: ['#c084fc', '#a21caf'], onPress: () => {} },
  { label: 'Transaction History', icon: 'clock', color: ['#fbbf24', '#f59e42'], onPress: () => {} },
  { label: 'Account Settings', icon: 'settings', color: ['#a1a1aa', '#64748b'], onPress: () => {} },
];

const quickLinks = [
  { label: 'View Full Portfolio', icon: 'folder', subtitle: 'Check your assets' },
  { label: 'Trade Crypto', icon: 'shopping-cart', subtitle: 'Buy & sell crypto' },
  { label: 'P2P Trading', icon: 'users', subtitle: 'Trade with users' },
];

const Dashboard = () => {
  const navigation = useNavigation();
  const systemColorScheme = useColorScheme();
  // Demo theme toggle: local state (replace with context/provider for app-wide theme)
  const [theme, setTheme] = useState<'light' | 'dark'>(systemColorScheme === 'dark' ? 'dark' : 'light');
  const isDark = theme === 'dark';
  const firstName = mockUser.email.split('@')[0] || "User";

  // Card background helpers
  const cardBg = (colors: string[]) => isDark ? colors.map(c => darken(c)) : colors;
  function darken(hex: string) {
    // Simple darken for demo
    return hex.replace('#', '#1a');
  }

  // Theme toggle handler
  const handleThemeToggle = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#101112' : '#f8fafc' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDark ? '#16181b' : '#fff', borderBottomColor: isDark ? '#222' : '#eee' }]}>
        {/* Menu Button */}
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.openDrawer?.() || {}}>
          <Feather name="menu" size={22} color={isDark ? '#fff' : '#1a237e'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#1a237e', flex: 1, textAlign: 'center' }]}>Dashboard</Text>
        {/* Theme Toggle Button */}
        <TouchableOpacity style={styles.iconBtn} onPress={handleThemeToggle}>
          {isDark ? (
            <Feather name="sun" size={20} color="#fbbf24" />
          ) : (
            <Feather name="moon" size={20} color="#6366f1" />
          )}
        </TouchableOpacity>
        {/* Notification Button */}
        <Button
          variant="outline"
          style={styles.iconBtn}
          onPress={() => navigation.navigate('Notifications' as never)}
        >
          <Feather name="bell" size={20} color={isDark ? '#fff' : '#1a237e'} />
        </Button>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Welcome & Info */}
        <View style={styles.section}>
          <Text style={[styles.welcome, { color: isDark ? '#fff' : '#1a237e' }]}>Welcome back! {firstName}👋</Text>
          <Text style={[styles.subtitle, { color: isDark ? '#cbd5e1' : '#64748b' }]}>Here's an overview of your account and quick actions.</Text>
        </View>

        {/* Overview Cards */}
        <View style={styles.overviewRow}>
          <LinearGradient colors={['#a7f3d0', '#34d399']} style={styles.overviewCard}>
            <Text style={styles.overviewLabel}>Total Balance</Text>
            <Text style={styles.overviewValue}>₦{totalBalance.toLocaleString()}</Text>
            <Text style={styles.overviewSub}>Total value across all wallets</Text>
            <TouchableOpacity style={styles.overviewAction}><Text style={styles.overviewActionText}>View Details <Feather name="chevron-right" size={13} /></Text></TouchableOpacity>
          </LinearGradient>
          <LinearGradient colors={['#dbeafe', '#818cf8']} style={styles.overviewCard}>
            <Text style={styles.overviewLabel}>Monthly Volume</Text>
            <Text style={styles.overviewValue}>₦{monthlyVolume.toLocaleString()}</Text>
            <Text style={styles.overviewSub}>Your trading volume this month</Text>
          </LinearGradient>
          <LinearGradient colors={['#fef9c3', '#fbbf24']} style={styles.overviewCard}>
            <Text style={styles.overviewLabel}>Withdrawal Limit</Text>
            <Text style={styles.overviewValue}>₦{withdrawalLimit.toLocaleString()}</Text>
            <Text style={styles.overviewSub}>Your remaining withdrawal limit</Text>
          </LinearGradient>
        </View>

        {/* Promo/Info Banners */}
        <View style={styles.bannerRow}>
          <LinearGradient colors={['#f3e8ff', '#c084fc']} style={styles.bannerCard}>
            <Feather name="gift" size={20} color="#a21caf" style={{ marginRight: 10 }} />
            <View>
              <Text style={styles.bannerTitle}>Earn 50 USDT Welcome Bonus!</Text>
              <Text style={styles.bannerDesc}>Complete your first trade for bonus <Text style={styles.bannerLink}>Trade <Feather name="arrow-right" size={12} /></Text></Text>
            </View>
          </LinearGradient>
          <LinearGradient colors={['#d1fae5', '#38bdf8']} style={styles.bannerCard}>
            <Feather name="users" size={20} color="#0ea5e9" style={{ marginRight: 10 }} />
            <View>
              <Text style={styles.bannerTitle}>Try P2P Trading!</Text>
              <Text style={styles.bannerDesc}>Trade directly with other users <Text style={styles.bannerLink}>P2P <Feather name="arrow-right" size={12} /></Text></Text>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsBox}>
          <Text style={[styles.quickActionsTitle, { color: isDark ? '#fff' : '#1a237e' }]}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            {quickActions.map((action, idx) => (
              <TouchableOpacity key={action.label} style={[styles.quickAction, { backgroundColor: isDark ? '#18181b' : '#fff' }]} onPress={action.onPress}>
                <LinearGradient colors={['#a7f3d0', '#34d399']} style={styles.quickActionIconBox}>
                  <Feather name={action.icon as any} size={22} color="#fff" />
                </LinearGradient>
                <Text style={[styles.quickActionLabel, { color: isDark ? '#fff' : '#1a237e' }]}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Links & Recent Transactions */}
        <View style={styles.linksRow}>
          <View style={styles.linksCol}>
            <Text style={[styles.quickLinksTitle, { color: isDark ? '#fff' : '#1a237e' }]}>Quick Links</Text>
            {quickLinks.map(link => (
              <TouchableOpacity key={link.label} style={[styles.quickLink, { borderColor: isDark ? '#444' : '#d1d5db', backgroundColor: isDark ? '#18181b' : '#fff' }]}>
                <Feather name={link.icon as any} size={18} color={isDark ? '#818cf8' : '#6366f1'} style={{ marginRight: 10 }} />
                <View>
                  <Text style={[styles.quickLinkLabel, { color: isDark ? '#fff' : '#1a237e' }]}>{link.label}</Text>
                  <Text style={[styles.quickLinkSub, { color: isDark ? '#cbd5e1' : '#64748b' }]}>{link.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.transactionsCol}>
            <View style={styles.transactionsHeader}>
              <Text style={[styles.transactionsTitle, { color: isDark ? '#fff' : '#1a237e' }]}>Recent Transactions</Text>
              <TouchableOpacity><Text style={styles.transactionsViewAll}>View All <Feather name="chevron-right" size={13} /></Text></TouchableOpacity>
            </View>
            <View style={[styles.transactionsList, { backgroundColor: isDark ? '#18181b' : '#fff' }]}>
              {recentTransactions.map(tx => (
                <View key={tx.id} style={styles.transactionItem}>
                  <Feather name={tx.type === 'swap' ? 'repeat' : 'bar-chart-2'} size={18} color={tx.type === 'swap' ? '#6366f1' : '#a21caf'} style={{ marginRight: 10 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.transactionLabel, { color: isDark ? '#fff' : '#1a237e' }]}>{tx.type === 'swap' ? 'Swap' : 'Trade'}</Text>
                    <Text style={styles.transactionDate}>{tx.createdAt}</Text>
                  </View>
                  <Text style={[styles.transactionAmount, { color: tx.type === 'swap' ? '#6366f1' : '#a21caf' }]}>+{tx.amount} {tx.currency}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Spacer for bottom nav */}
        <View style={{ height: 90 }} />
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

// ===== STYLES =====
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 20, fontWeight: '600' },
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