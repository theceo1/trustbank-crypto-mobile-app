//src/pages/Home.tsx
import { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import Logo from "@/components/Logo";
import { mockWallets } from "@/lib/quidax";
import { useAuth } from "@/contexts/AuthContext";
 
import HeroSection from "@/components/HeroSection";
import { useTheme } from "@/contexts/ThemeContext";
import { Dimensions } from 'react-native';
import CallToAction from "@/components/CallToAction";
import { useNavigation } from "@react-navigation/native";
import VisionBoard from "@/components/VisionBoard";

// --- Main Home Page ---
const Home = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<ScrollView | null>(null);
  const navigation = useNavigation();

  // --- Network connectivity test ---
  useEffect(() => {
    fetch("https://xkxihvafbyegowhryojd.supabase.co")
      .then(res => console.log("[NetworkTest] Supabase reachable:", res.status))
      .catch(err => console.log("[NetworkTest] Supabase not reachable:", err));
    fetch("https://google.com")
      .then(res => console.log("[NetworkTest] Google reachable:", res.status))
      .catch(err => console.log("[NetworkTest] Google not reachable:", err));
  }, []);

  useEffect(() => {
    // Calculate total balance from all wallets if authenticated
    if (user) {
      const total = mockWallets.reduce((sum, wallet) => sum + wallet.fiatValue, 0);
      setTotalBalance(total);
    }
    // Simulate loading for all users
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [user]);

  const scrollToNext = () => {
    scrollRef.current?.scrollTo({ y: 360, animated: true });
  };

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
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle={theme.colors.background === '#101522' ? 'light-content' : 'dark-content'} />
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          ref={scrollRef}
          contentContainerStyle={{
            flexGrow: 1,
            minHeight: Dimensions.get('window').height + 1,
            paddingTop: 0,
            paddingBottom: 90, // Ensures content is not hidden behind CTA
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* --- HERO SECTION --- */}
          <HeroSection user={user} navigation={navigation} scrollToNext={scrollToNext} />

          {/* --- VisionBoard (includes FeatureShowcase, UserFeedback) --- */}
          <VisionBoard />
        </ScrollView>
      </View>
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
