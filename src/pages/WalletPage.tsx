import React from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Button from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigation } from "@react-navigation/native";

const WalletPage = () => {
  const navigation = useNavigation();
  // Mock data
  const wallets = [
    { id: '1', currency: 'NGN', balance: 0, estimatedValue: 0 },
    { id: '2', currency: 'BTC', balance: 0.00000220, estimatedValue: 0 },
    { id: '3', currency: 'ETH', balance: 0, estimatedValue: 0 },
    { id: '4', currency: 'XRP', balance: 0, estimatedValue: 0 },
    { id: '5', currency: 'USDT', balance: 0, estimatedValue: 0 },
    { id: '6', currency: 'TRUMP', balance: 0, estimatedValue: 0 },
  ];
  const totalPortfolioValue = 531.94;
  const transactions = [
    { id: '1', type: 'swap', amount: 0.00000576, currency: 'BTC', status: 'completed', createdAt: '2025-04-15' },
    { id: '2', type: 'trade', amount: 100, currency: 'USDT', status: 'completed', createdAt: '2025-04-14' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton} accessibilityLabel="Back">
          <Feather name="chevron-left" size={22} color="#1a237e" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Wallet</Text>
          <Text style={styles.headerSubtitle}>Manage your crypto assets and transactions</Text>
        </View>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Profile" as never)} accessibilityLabel="Profile">
          <Feather name="user" size={22} color="#1a237e" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 90 }}>
        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#10b981' }]}
            onPress={() => navigation.navigate("Deposit" as never)}>
            <Feather name="download" size={22} color="#fff" />
            <Text style={styles.actionLabel}>Deposit</Text>
            <Text style={styles.actionSub}>Add funds to your wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#a21caf' }]}
            onPress={() => navigation.navigate("Withdraw" as never)}>
            <Feather name="upload" size={22} color="#fff" />
            <Text style={styles.actionLabel}>Withdraw</Text>
            <Text style={styles.actionSub}>Send funds to external wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#f59e42' }]}
            onPress={() => navigation.navigate("Swap" as never)}>
            <Feather name="repeat" size={22} color="#fff" />
            <Text style={styles.actionLabel}>Instant Swap</Text>
            <Text style={styles.actionSub}>Exchange between currencies</Text>
          </TouchableOpacity>
        </View>

        {/* Portfolio Value Card */}
        <View style={styles.portfolioCard}>
          <Text style={styles.portfolioLabel}>Total Portfolio Value</Text>
          <Text style={styles.portfolioValue}>₦{totalPortfolioValue}</Text>
          <Text style={styles.portfolioSub}>Your total balance across all wallets</Text>
        </View>

        {/* Wallets Header */}
        <View style={styles.walletsHeader}>
          <Text style={styles.walletsCount}>{wallets.length} wallets</Text>
          <TouchableOpacity style={styles.addWalletBtn} onPress={() => navigation.navigate("AddWallet" as never)}>
            <Feather name="plus" size={18} color="#10b981" />
            <Text style={styles.addWalletText}>Add New</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchBox}>
          <Feather name="search" size={16} color="#888" style={{ marginRight: 6 }} />
          <Text style={styles.searchPlaceholder}>Search wallets...</Text>
        </View>

        {/* Wallet List */}
        <View style={styles.walletsList}>
          {wallets.map(wallet => (
            <View key={wallet.id} style={styles.walletCard}>
              <View style={styles.walletCardRow}>
                <Text style={styles.walletCurrency}>{wallet.currency}</Text>
                <Text style={styles.walletBalance}>{wallet.currency === 'BTC' ? wallet.balance : `₦${wallet.balance}`}</Text>
              </View>
              <Text style={styles.walletEstValue}>Estimated Value ₦{wallet.estimatedValue}</Text>
              <View style={styles.walletActionsRow}>
                <Button style={styles.walletActionBtn}><Text style={styles.walletActionText}>Deposit</Text></Button>
                <Button style={styles.walletActionBtn}><Text style={styles.walletActionText}>Withdraw</Text></Button>
                <Button style={styles.walletActionBtn}><Text style={styles.walletActionText}>Swap</Text></Button>
              </View>
            </View>
          ))}
        </View>

        {/* Asset Distribution Placeholder */}
        <View style={styles.assetDistributionCard}>
          <Text style={styles.assetDistributionTitle}>Asset Distribution</Text>
          <View style={styles.assetDistributionChartPlaceholder} />
          <Text style={styles.assetDistributionLegend}>BTC (40.3%)   USDT (33.8%)   SOL (25.8%)</Text>
        </View>

        {/* Transaction History */}
        <View style={styles.transactionsCard}>
          <Text style={styles.transactionsTitle}>Recent Transactions</Text>
          {transactions.map(tx => (
            <View key={tx.id} style={styles.transactionItem}>
              <Feather name={tx.type === 'swap' ? 'repeat' : 'bar-chart-2'} size={18} color={tx.type === 'swap' ? '#6366f1' : '#a21caf'} style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.transactionLabel}>{tx.type === 'swap' ? 'Swap' : 'Trade'}</Text>
                <Text style={styles.transactionDate}>{tx.createdAt}</Text>
              </View>
              <Text style={[styles.transactionAmount, { color: tx.type === 'swap' ? '#6366f1' : '#a21caf' }]}>+{tx.amount} {tx.currency}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafd' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 18,
    paddingTop: 32,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a237e',
    textAlign: 'center',
    marginBottom: 2,
  },
  headerSubtitle: {
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
    backgroundColor: '#fff',
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
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  searchPlaceholder: { color: '#888', fontSize: 13 },
  walletsList: { marginHorizontal: 14, marginTop: 2 },
  walletCard: {
    backgroundColor: '#fff',
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
  walletBalance: { fontWeight: 'bold', color: '#6366f1', fontSize: 15 },
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
    backgroundColor: '#fff',
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
    width: 110, height: 110, borderRadius: 55, backgroundColor: '#f3f4f6', marginVertical: 8,
  },
  assetDistributionLegend: { color: '#64748b', fontSize: 12, marginTop: 4, textAlign: 'center' },
  transactionsCard: {
    backgroundColor: '#fff',
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