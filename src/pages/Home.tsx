
import { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Image, StatusBar } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import Button from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import WalletCard from "@/components/WalletCard";
import TransactionItem from "@/components/TransactionItem";
import BottomNavigation from "@/components/BottomNavigation";
import { mockWallets, mockTransactions } from "@/lib/quidax";
import { useAuth } from "@/contexts/AuthContext";
 
const Home = () => {
  const { user } = useAuth();
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // TODO: Navigate to login screen (use navigation.navigate if using React Navigation)
      return;
    }
    // Calculate total balance from all wallets
    const total = mockWallets.reduce((sum, wallet) => sum + wallet.fiatValue, 0);
    setTotalBalance(total);
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [user]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafd' }}>
        <View style={{ marginBottom: 24, opacity: 0.7 }}>
          <Logo size="lg" />
        </View>
        <Text style={{ color: '#888', fontSize: 16 }}>Loading your dashboard...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafd' }}>
      <StatusBar barStyle="light-content" />
      {/* Header with gradient and avatar */}
      <LinearGradient
        colors={["#1a237e", "#3949ab"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerRow}>
          <Logo size="md" />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="bell" size={22} color="#fff" />
            </TouchableOpacity>
            <ThemeToggle />
            <Image
              source={{ uri: user?.user_metadata?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User')}` }}
              style={styles.avatar}
            />
          </View>
        </View>
        <View style={styles.banner}>
          <Text style={styles.bannerWelcome}>Welcome back,</Text>
          <Text style={styles.bannerName}>{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}</Text>
        </View>
      </LinearGradient>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 90 }}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceValue}>${totalBalance.toLocaleString()}</Text>
          {/* Quick Actions */}
          <View style={styles.quickActionsRow}>
            <Button style={styles.quickActionBtn} onPress={() => {/* navigate to Deposit */}}>
              <Feather name="arrow-down-circle" size={20} color="#1a237e" />
              <Text style={styles.quickActionText}>Deposit</Text>
            </Button>
            <Button style={styles.quickActionBtn} onPress={() => {/* navigate to Withdraw */}}>
              <Feather name="arrow-up-circle" size={20} color="#1a237e" />
              <Text style={styles.quickActionText}>Withdraw</Text>
            </Button>
            <Button style={styles.quickActionBtn} onPress={() => {/* navigate to Transfer */}}>
              <Feather name="repeat" size={20} color="#1a237e" />
              <Text style={styles.quickActionText}>Transfer</Text>
            </Button>
          </View>
        </View>

        {/* Wallets */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Your Wallets</Text>
          <TouchableOpacity onPress={() => {/* navigate to Wallets */}}>
            <Text style={styles.sectionAction}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
          {mockWallets.map((wallet, idx) => (
            <WalletCard
              key={wallet.id}
              name={wallet.name}
              symbol={wallet.symbol}
              balance={wallet.balance}
              fiatValue={wallet.fiatValue}
              iconUrl={wallet.iconUrl}
              style={{ ...styles.walletCard, marginLeft: idx === 0 ? 16 : 0, marginRight: 16 }}
            />
          ))}
        </ScrollView>

        {/* Recent Transactions */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => {/* navigate to Transactions */}}>
            <Text style={styles.sectionAction}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.transactionsCard}>
          {mockTransactions.slice(0, 3).map((tx) => (
            <TransactionItem
              key={tx.id}
              id={tx.id}
              type={tx.type as "deposit" | "withdrawal"}
              amount={tx.amount}
              currency={tx.currency}
              status={tx.status as "pending" | "completed" | "failed"}
              createdAt={tx.createdAt}
              fee={tx.fee}
            />
          ))}
        </View>
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 48,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 8,
    shadowColor: '#1a237e',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  banner: {
    marginTop: 18,
  },
  bannerWelcome: {
    color: '#fff',
    fontSize: 18,
    opacity: 0.85,
    fontWeight: '500',
  },
  bannerName: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 2,
  },
  balanceCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 18,
    marginTop: -36,
    padding: 24,
    elevation: 4,
    shadowColor: '#3949ab',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#888',
    fontSize: 15,
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 18,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  quickActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f4ff',
    borderRadius: 10,
    marginHorizontal: 4,
    paddingVertical: 10,
  },
  quickActionText: {
    marginLeft: 6,
    color: '#1a237e',
    fontWeight: '600',
    fontSize: 15,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  sectionAction: {
    color: '#3949ab',
    fontWeight: '600',
    fontSize: 15,
  },
  walletCard: {
    width: 220,
  },
  transactionsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 0,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#3949ab',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  transactionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

export default Home;
