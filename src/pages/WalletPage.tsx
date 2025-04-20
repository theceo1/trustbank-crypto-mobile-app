//src/pages/WalletPage.tsx
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Modal, ActivityIndicator, FlatList, Image, useColorScheme } from "react-native";
import { useTheme } from '@/contexts/ThemeContext';
import { Feather } from "@expo/vector-icons";
import React, { useState, useMemo, useEffect } from "react";
import { quidax } from '@/lib/quidax';
import { supabase } from '@/lib/supabase';

// Modal components for Deposit, Withdraw, Receive, Send (simple placeholders)
const ActionModal = ({ visible, onClose, title, children }: any) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{title}</Text>
        {children}
        <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
          <Text style={styles.modalCloseText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

import { useNavigation } from '@react-navigation/native';

const WalletPage = () => {
  const { theme } = useTheme();
  const colorScheme = useColorScheme(); // Detect dark/light mode
  const navigation = useNavigation();
  const [wallets, setWallets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllWallets, setShowAllWallets] = useState(false);
  const [modal, setModal] = useState<null | 'deposit' | 'withdraw' | 'receive' | 'send'>(null);
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  

  // Sign out handler
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      if (navigation && navigation.reset) {
        navigation.reset({ index: 0, routes: [{ name: 'Login' as never }] });
      } else if (navigation && navigation.navigate) {
        navigation.navigate('Login' as never);
      }
    } catch (err) {
      console.error('[WalletPage] Error signing out:', err);
    }
  };


  useEffect(() => {
    const fetchWallets = async () => {
      console.log('[WalletPage] Fetching wallets...'); // [DEBUG]
      setLoading(true);
      setError(null);
      try {
        // 1. Get current user's Supabase session
        console.log('[WalletPage] About to call supabase.auth.getUser()'); // [DEBUG]
        let userResult;
        try {
          userResult = await supabase.auth.getUser();
          console.log('[WalletPage] supabase.auth.getUser() result:', JSON.stringify(userResult)); // [DEBUG]
        } catch (err) {
          console.error('[WalletPage] supabase.auth.getUser() threw error:', err);
          throw err;
        }
        const { data: { user }, error: userError } = userResult || {};
        console.log('[WalletPage] Supabase user:', user, userError); // [DEBUG]
        if (userError || !user) throw new Error('Not authenticated');

        // 2. Fetch user profile (get quidax_id)
        const profileResult = await supabase
          .from('user_profiles')
          .select('quidax_id')
          .eq('user_id', user.id)
          .maybeSingle();
        const { data: profile, error: profileError } = profileResult;
        if (profileError) {
          setError('Could not load your profile. Please try again or contact support.');
          setWallets([]);
          setLoading(false);
          console.error('[WalletPage] Error fetching user profile:', profileError, 'user id:', user.id);
          return;
        }
        if (!profile) {
          setError('Unable to locate your trustBank profile. Please contact support.');
          setWallets([]);
          setLoading(false);
          console.error('[WalletPage] No user profile found for Supabase user id:', user.id);
          return;
        }
        if (!profile.quidax_id) {
          setError('A required identifier is missing from your trustBank profile. Please contact support.');
          setWallets([]);
          setLoading(false);
          console.error('[WalletPage] quidax_id missing in profile for Supabase user id:', user.id);
          return;
        }

        // 3. Fetch wallets for this user
        try {
          // Fetch wallets using quidax_id from profile
          const res = await quidax.getWalletsForUser(profile.quidax_id);
          if (!res || !res.data) throw new Error('No wallets returned');
          setWallets(res.data);
        } catch (walletErr) {
          setError('Unable to load your wallets. Please try again.');
          setWallets([]);
          console.error('[WalletPage] Error fetching wallets for quidax_id:', profile.quidax_id, walletErr);
        }
      } catch (e: any) {
        console.error('[WalletPage] fetchWallets error:', e);
        setError('Failed to load wallets.');
      } finally {
        setLoading(false);
        console.log('[WalletPage] Loading set to false'); // [DEBUG]
      }
    };

    fetchWallets();
  }, []);

  // Add a log before rendering wallet list
  useEffect(() => {
    console.log('[WalletPage] Rendering, loading:', loading, 'error:', error, 'wallets:', wallets); // [DEBUG]
  }, [loading, error, wallets]);


  const totalPortfolioValue = useMemo(() => {
    return wallets.reduce((sum, w) => sum + (parseFloat(w.fiat_value || w.fiatValue || 0)), 0);
  }, [wallets]);
  const transactions = [
    { id: '1', type: 'deposit', amount: 0.05, currency: 'BTC', status: 'completed', createdAt: '2025-04-15' },
    { id: '2', type: 'withdrawal', amount: 100, currency: 'USDT', status: 'completed', createdAt: '2025-04-14' },
    { id: '3', type: 'deposit', amount: 300, currency: 'NGN', status: 'pending', createdAt: '2025-04-13' },
  ];
  const [search, setSearch] = useState("");
  const [showSecurityTip, setShowSecurityTip] = useState(true);

  const filteredTransactions = useMemo(() => {
    if (!search) return transactions;
    const q = search.toLowerCase();
    return transactions.filter(tx =>
      tx.type.toLowerCase().includes(q) ||
      tx.currency.toLowerCase().includes(q) ||
      String(tx.amount).includes(q) ||
      tx.status.toLowerCase().includes(q)
    );
  }, [transactions, search]);

  return (
    <View style={{ flex: 1 }}>
      {/* Top menu/header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: theme.colors.background, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.text }}>Wallets</Text>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 90 }}>
        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.primary }]} onPress={() => setModal('deposit')}>
            <Feather name="download" size={22} color={theme.colors.background} />
            <Text style={styles.actionLabel}>Deposit</Text>
            <Text style={styles.actionSub}>Add funds to your wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.primary }]} onPress={() => setModal('withdraw')}>
            <Feather name="upload" size={22} color={theme.colors.background} />
            <Text style={styles.actionLabel}>Withdraw</Text>
            <Text style={styles.actionSub}>Send funds to external wallet</Text>
          </TouchableOpacity>
        </View>

        {/* Modals for actions */}
        <ActionModal visible={modal==='deposit'} onClose={() => setModal(null)} title="Deposit">
          <Text>Deposit modal for {selectedWallet?.currency || 'your wallet'} (placeholder)</Text>
        </ActionModal>
        <ActionModal visible={modal==='withdraw'} onClose={() => setModal(null)} title="Withdraw">
          <Text>Withdraw modal for {selectedWallet?.currency || 'your wallet'} (placeholder)</Text>
        </ActionModal>
        <ActionModal visible={modal==='receive'} onClose={() => setModal(null)} title="Receive">
          <Text>Receive modal for {selectedWallet?.currency || 'your wallet'} (placeholder)</Text>
        </ActionModal>
        <ActionModal visible={modal==='send'} onClose={() => setModal(null)} title="Send">
          <Text>Send modal for {selectedWallet?.currency || 'your wallet'} (placeholder)</Text>
        </ActionModal>

        {/* Portfolio Value Card */}
        <View style={[styles.portfolioCard, { backgroundColor: theme.colors.background }]}> 
          <Text style={styles.portfolioLabel}>Total Portfolio Value</Text>
          <Text style={styles.portfolioValue}>₦{totalPortfolioValue}</Text>
          <Text style={styles.portfolioSub}>Your total balance across all wallets</Text>
        </View>

        {/* Asset Distribution Chart Placeholder */}
        <View style={styles.assetDistributionCard}>
          <Text style={styles.assetDistributionTitle}>Asset Distribution</Text>
          {/* Replace below with real chart if available */}
          <View style={styles.assetDistributionChartPlaceholder} />
          <Text style={styles.assetDistributionLegend}>See how your assets are distributed across wallets</Text>
        </View>

        {/* Wallets Header */}
        <View style={styles.walletsHeader}>
          <Text style={styles.walletsCount}>{wallets.length} wallets</Text>
          <TouchableOpacity style={styles.showAllBtn} onPress={() => setShowAllWallets((v) => !v)}>
            <Feather name={showAllWallets ? 'chevron-up' : 'chevron-down'} size={18} color="#10b981" />
            <Text style={styles.showAllText}>{showAllWallets ? 'Show Less' : 'Show All Wallets'}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.searchBox, { backgroundColor: theme.colors.card }]}>
          <Feather name="search" size={16} color="#888" style={{ marginRight: 6 }} />
          <TextInput
            style={[styles.searchPlaceholder, { flex: 1 }]}
            placeholder="Search transactions..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Security Reminder */}
        {showSecurityTip && (
          <View style={{ backgroundColor: '#fffbe6', borderRadius: 10, marginHorizontal: 14, marginVertical: 10, padding: 12, flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="shield" size={18} color="#f59e42" style={{ marginRight: 8 }} />
            <Text style={{ color: '#b45309', fontSize: 13, flex: 1 }}>
              For your security, enable 2FA and verify your account. Never share your recovery phrases or passwords.
            </Text>
            <TouchableOpacity onPress={() => setShowSecurityTip(false)} style={{ marginLeft: 6 }}>
              <Feather name="x" size={16} color="#b45309" />
            </TouchableOpacity>
          </View>
        )}

        {/* Wallet List */}
        <View style={styles.walletsList}>
  {loading ? (
    <ActivityIndicator size="large" color="#10b981" style={{ marginVertical: 30 }} />
  ) : error ? (
    <Text style={{ color: 'red', textAlign: 'center', margin: 18 }}>{error}</Text>
  ) : (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {(showAllWallets ? wallets : wallets.slice(0, 6)).map((wallet, idx) => {
        // Debug: log wallet object and idx
        console.log('WALLET DEBUG', idx, wallet);

        // Color palette for cards (separate for light/dark theme)
        // These colors are chosen for vibrance and theme contrast
        const cardColors = colorScheme === 'dark'
          ? [
              '#232946', // dark blue
              '#3a3b5a', // deep indigo
              '#2d3a3a', // teal
              '#33334d', // purple
              '#1a2a2a', // greenish
              theme.colors.card, // fallback theme card
            ]
          : [
              theme.colors.card,
              '#e0f7fa', // cyan
              '#fce4ec', // pink
              '#f3e8ff', // purple
              '#fffde7', // yellow
              '#e8f5e9', // green
            ];
        let bgColor = cardColors[idx % cardColors.length]; // rotate palette for variety
        // In dark mode, if the card color is theme.colors.card (likely black), override to visible dark gray
        if (colorScheme === 'dark' && bgColor === theme.colors.card) {
          bgColor = '#232946'; // visible dark blue-gray for default cards in dark mode
        }
        return (
          <View
            key={wallet.id}
            style={[
              styles.walletCardGrid,
              {
                backgroundColor: bgColor,
                width: '48%',
                marginBottom: 14,
                marginRight: idx % 2 === 0 ? '4%' : 0,
                borderColor: theme.colors.border,
              },
            ]}
          >
            {/* Removed wallet icon for a cleaner look as requested */}
            <View style={styles.walletCardLeft}>
              <View>
                {/* In dark mode, force all card text to pure white for readability */}
                {/* Explicit contrast: #fff for dark mode, #1a1a1a for light mode */}
                {/* Explicitly force text color for currency and name for maximum contrast */}
                {/* Always use dark text for maximum contrast on all card backgrounds */}
                <Text style={[styles.walletCurrencyModern, { color: '#1a1a1a' }]}>{wallet.currency?.toUpperCase()}</Text>
                <Text style={[styles.walletName, { color: '#1a1a1a' }]}>{wallet.name || wallet.currency}</Text>
              </View>
            </View>
            <View style={styles.walletCardRight}>
              {/* In dark mode, force all card text to pure white for readability */}
              {/* Always use dark text for maximum contrast on all card backgrounds */}
              <Text style={[styles.walletBalanceModern, { color: '#1a1a1a' }]}>{parseFloat(wallet.balance).toLocaleString()}</Text>
              <Text style={[styles.walletEstValueModern, { color: '#1a1a1a' }]}>₦{parseFloat(wallet.fiat_value || wallet.fiatValue || 0).toLocaleString()}</Text>
              <View style={styles.walletActionsRowModern}>
                {/* In dark mode, set button backgrounds to #394867 and text to white for contrast */}
                {/* Button backgrounds: #394867 (dark), #e0e7ff (light); text always dark for contrast */}
                <TouchableOpacity style={[styles.walletActionBtnModern, { backgroundColor: colorScheme === 'dark' ? '#394867' : '#e0e7ff' }]} onPress={() => { setSelectedWallet(wallet); setModal('receive'); }}>
                  <Feather name="arrow-down-left" size={16} color="#10b981" />
                  <Text style={[styles.walletActionTextModern, { color: '#1a1a1a' }]}>Receive</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.walletActionBtnModern, { backgroundColor: colorScheme === 'dark' ? '#394867' : '#e0e7ff' }]} onPress={() => { setSelectedWallet(wallet); setModal('send'); }}>
                  <Feather name="arrow-up-right" size={16} color="#f43f5e" />
                  <Text style={[styles.walletActionTextModern, { color: '#1a1a1a' }]}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  )}
</View>

        {/* Transactions Card */}
        <View style={styles.transactionsCard}>
          <Text style={styles.transactionsTitle}>Transaction History</Text>
          {filteredTransactions.length === 0 ? (
            <Text style={{ color: '#64748b', textAlign: 'center', margin: 18 }}>No transactions found.</Text>
          ) : (
            filteredTransactions.map(tx => (
              <View key={tx.id} style={styles.transactionItem}>
                <Text style={styles.transactionLabel}>{tx.type.toUpperCase()}</Text>
                <Text style={styles.transactionDate}>{tx.createdAt}</Text>
                <Text style={styles.transactionAmount}>{tx.amount} {tx.currency}</Text>
                <Text style={{ color: tx.status === 'completed' ? '#10b981' : '#f59e42', fontSize: 12 }}>{tx.status}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 }, // backgroundColor moved to inline style for theme support

  // --- Modal Styles ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    minWidth: '80%',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1a237e',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalCloseBtn: {
    marginTop: 18,
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: '#e0e7ff',
    borderRadius: 8,
  },
  modalCloseText: {
    color: '#1a237e',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // --- Show All Wallets Button ---
  showAllBtn: {
    borderWidth: 1,
    borderColor: '#10b981',
    backgroundColor: '#e6fcf5',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  showAllText: {
    color: '#10b981',
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 13,
  },

  // --- Modern Wallet Card Styles ---
  walletCardGrid: {
    flexDirection: 'column',
    borderRadius: 16,
    // backgroundColor set inline for theme/palette
    padding: 14,
    elevation: 2,
    shadowColor: '#1a237e',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    borderWidth: 1,
  },
  walletCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  walletIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 14,
    backgroundColor: '#f1f5f9',
  },
  walletCurrencyModern: {
    fontWeight: 'bold',
    fontSize: 15,
    // color removed; set via inline style for theme contrast
  },
  walletName: {
    fontSize: 12,
    // color removed; set via inline style for theme contrast
    fontStyle: 'italic',
  },
  walletCardRight: {
    alignItems: 'flex-end',
    minWidth: 90,
  },
  walletBalanceModern: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1a237e',
  },
  walletEstValueModern: {
    fontSize: 12,
    color: '#10b981',
    marginBottom: 4,
  },
  walletActionsRowModern: {
    flexDirection: 'row',
    marginTop: 2,
  },
  walletActionBtnModern: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
    borderRadius: 8,
    marginHorizontal: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  walletActionTextModern: {
    color: '#1a237e',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 4,
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 18,
    paddingTop: 32,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  Title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a237e',
    textAlign: 'center',
    marginBottom: 2,
  },
  Subtitle: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(26,35,126,0.05)',
    marginHorizontal: 2,
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  actionBtn: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    minWidth: 0,
  },
  actionLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 4,
  },
  actionSub: {
    color: '#e0e7ff',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 1,
  },
  portfolioCard: {
    borderRadius: 18,
    marginHorizontal: 14,
    marginBottom: 18,
    padding: 22,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#3949ab',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  portfolioLabel: { color: '#64748b', fontSize: 14, marginBottom: 2 },
  portfolioValue: { fontSize: 28, fontWeight: 'bold', color: '#1a237e', marginBottom: 2 },
  portfolioSub: { color: '#64748b', fontSize: 12, marginTop: 2 },
  walletsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginBottom: 2,
  },
  walletsCount: { color: '#64748b', fontSize: 13 },
  addWalletBtn: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#10b981',
    backgroundColor: '#e6fcf5',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  addWalletText: { color: '#10b981', fontWeight: '600', marginLeft: 4, fontSize: 13 },
  searchBox: {
    marginHorizontal: 18,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  searchPlaceholder: { color: '#888', fontSize: 13 },
  walletsList: { marginHorizontal: 14, marginTop: 2 },
  walletCard: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#1a237e',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  walletCardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  walletCurrency: { fontWeight: 'bold', color: '#1a237e', fontSize: 15 },
  walletBalance: { fontWeight: 'bold', color: '#64748b', fontSize: 15 },
  walletEstValue: { fontSize: 12, color: '#64748b', marginBottom: 8 },
  walletActionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  walletActionBtn: {
    flex: 1,
    backgroundColor: '#10b981',
    borderRadius: 8,
    marginHorizontal: 2,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletActionText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  assetDistributionCard: {
    borderRadius: 14,
    marginHorizontal: 14,
    marginTop: 18,
    marginBottom: 10,
    padding: 16,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#3949ab',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  assetDistributionTitle: { fontWeight: 'bold', color: '#1a237e', fontSize: 15, marginBottom: 6 },
  assetDistributionChartPlaceholder: {
    width: 110, height: 110, borderRadius: 55, marginVertical: 8,
  },
  assetDistributionLegend: { color: '#64748b', fontSize: 12, marginTop: 4, textAlign: 'center' },
  transactionsCard: {
    borderRadius: 14,
    marginHorizontal: 14,
    marginTop: 18,
    marginBottom: 32,
    padding: 0,
    elevation: 1,
    shadowColor: '#3949ab',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  transactionsTitle: { fontWeight: 'bold', color: '#1a237e', fontSize: 15, margin: 14, marginBottom: 0 },
  transactionItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  transactionLabel: { fontWeight: 'bold', fontSize: 13, color: '#1a237e' },
  transactionDate: { fontSize: 11, color: '#64748b' },
  transactionAmount: { fontWeight: 'bold', fontSize: 13 },
});

export default WalletPage;