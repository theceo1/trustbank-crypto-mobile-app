//src/pages/TradePage.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Feather } from '@expo/vector-icons';
import { quidax } from '../lib/quidax';
import { supabase } from '../lib/supabase';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { P2PStackParamList } from '../App';
import P2POffersList from './P2POffersList';
import OrderDetails from './OrderDetails';
import { Modal, TouchableOpacity, FlatList } from 'react-native';
// import TradeRoom from './TradeRoom'; // No longer rendered directly

// trustBank TradePage: simple tabbed UI (Swap, P2P, History)

type TradePageRouteParams = {
  initialTab?: 'swap' | 'p2p' | 'history';
};

const TradePage = () => {
  // Only declare these ONCE
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: TradePageRouteParams }, 'params'>>();
  const { theme } = useTheme();
  // Tab state
  // Accept initialTab from navigation params
  const [tab, setTab] = useState<'swap' | 'p2p' | 'history'>(() => {
    const initial = route.params?.initialTab;
    if (initial === 'swap' || initial === 'p2p' || initial === 'history') return initial;
    return 'swap';
  });
  // Swap state
  const [fromCurrency, setFromCurrency] = useState('USDT');
  const [toCurrency, setToCurrency] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [quote, setQuote] = useState<any>(null);
  const [swapResult, setSwapResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quidaxId, setQuidaxId] = useState<string | null>(null);
  const [wallets, setWallets] = useState<any[]>([]);
  const [walletsLoading, setWalletsLoading] = useState(false);
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);

  // Amount currency selector
  const [selectedAmountCurrency, setSelectedAmountCurrency] = useState<'Crypto' | 'NGN' | 'USD'>('Crypto');

  // Handler for selecting an order from P2POffersList
  const handleSelectOrder = (trade: any) => {
    navigation.navigate('TradeRoom', { trade });
  };

  // P2P and History dummy state for demo
  const [selectedPair, setSelectedPair] = useState('BTC/USDT');
  const [maxAmount] = useState(10); // Example max amount

  // Fetch user's Quidax ID and wallets on mount
  useEffect(() => {
    const fetchQuidaxIdAndWallets = async () => {
      setLoading(true);
      setWalletsLoading(true);
      setError(null);
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) throw new Error('Not authenticated');
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('quidax_id')
          .eq('user_id', user.id)
          .maybeSingle();
        if (profileError || !profile || !profile.quidax_id) throw new Error('No Quidax account linked to this user');
        setQuidaxId(profile.quidax_id);
        // Fetch wallets with balances > 0
        const res = await quidax.getWalletsForUser(profile.quidax_id);
        const walletList = res?.data || [];
        const filteredWallets = walletList.filter((w: any) => parseFloat(w.balance) > 0);
        setWallets(filteredWallets);
        // Debug output
        console.log('[TradePage] Loaded wallets:', filteredWallets);
        // Set default from/to if available and always valid
        if (filteredWallets.length > 0) {
          setFromCurrency(fc => filteredWallets.find(w => w.currency.toUpperCase() === fc) ? fc : filteredWallets[0].currency.toUpperCase());
          const toOptions = filteredWallets.filter(w => w.currency.toUpperCase() !== filteredWallets[0].currency.toUpperCase());
          setToCurrency(tc => toOptions.find(w => w.currency.toUpperCase() === tc) ? tc : (toOptions[0]?.currency.toUpperCase() || filteredWallets[0].currency.toUpperCase()));
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch wallets');
        setWallets([]);
      } finally {
        setLoading(false);
        setWalletsLoading(false);
      }
    };
    fetchQuidaxIdAndWallets();
  }, []);

  // Handlers
  const handleGetQuote = async () => {
    setQuote(null);
    setError(null);
    setSwapResult(null);
    if (!quidaxId) {
      setError('No Quidax account linked.');
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Enter a valid amount');
      return;
    }
    setLoading(true);
    try {
      const res = await quidax.createSwapQuotation({
        from_currency: fromCurrency.toLowerCase(),
        to_currency: toCurrency.toLowerCase(),
        from_amount: amount,
      });
      if (!res || !res.data) throw new Error('No quote returned');
      // Example response: { data: { rate, fee, receive, id } }
      setQuote(res.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch quote');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSwap = async () => {
    setSwapResult(null);
    setError(null);
    if (!quidaxId) {
      setError('No Quidax account linked.');
      return;
    }
    if (!quote || !quote.id) {
      setError('No quote to confirm.');
      return;
    }
    setLoading(true);
    try {
      const res = await quidax.confirmSwapQuotation(quote.id);
      if (res && res.data && res.data.status === 'completed') {
        setSwapResult({ success: true, message: 'Swap successful!' });
      } else {
        setSwapResult({ success: false, message: 'Swap failed. Please try again.' });
      }
    } catch (err: any) {
      setSwapResult({ success: false, message: err.message || 'Swap failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <View style={{ paddingTop: 40, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 4, color: theme.colors.brandGreen }}>Welcome to trustBank Trading</Text>
        <Text style={{ fontSize: 15, color: theme.colors.secondaryText, textAlign: 'center' }}>
          Buy, sell, and swap crypto instantly with ease. Choose your preferred method below.
        </Text>
      </View>

      {/* Tabs Row */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 18, marginBottom: 2, backgroundColor: theme.colors.background }}>
        <TouchableOpacity onPress={() => setTab('swap')} style={{ flex: 1, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: tab === 'swap' ? theme.colors.brandGreen : 'transparent', paddingVertical: 12, backgroundColor: tab === 'swap' ? theme.colors.card : 'transparent' }}>
          <Text style={{ color: tab === 'swap' ? theme.colors.brandGreen : theme.colors.secondaryText, fontWeight: '600', fontSize: 15 }}>Swap</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('p2p')} style={{ flex: 1, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: tab === 'p2p' ? theme.colors.brandGreen : 'transparent', paddingVertical: 12, backgroundColor: tab === 'p2p' ? theme.colors.card : 'transparent' }}>
          <Text style={{ color: tab === 'p2p' ? theme.colors.brandGreen : theme.colors.secondaryText, fontWeight: '600', fontSize: 15 }}>P2P</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('history')} style={{ flex: 1, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: tab === 'history' ? theme.colors.brandGreen : 'transparent', paddingVertical: 12, backgroundColor: tab === 'history' ? theme.colors.card : 'transparent' }}>
          <Text style={{ color: tab === 'history' ? theme.colors.brandGreen : theme.colors.secondaryText, fontWeight: '600', fontSize: 15 }}>History</Text>
        </TouchableOpacity>
      </View>

      {/* --- Swap Tab --- */}
      {tab === 'swap' && (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={[styles.card, { backgroundColor: theme.colors.card, paddingBottom: 18 }]}> 
            <Text style={[styles.label, { color: theme.colors.secondaryText }]}>From</Text>
            <TouchableOpacity
              style={[styles.input, { backgroundColor: theme.colors.background, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
              onPress={() => setShowFromModal(true)}
              disabled={walletsLoading || wallets.length === 0}
            >
              <Text style={{ color: theme.colors.text, fontSize: 16 }}>
                {fromCurrency ? `${fromCurrency}` : (walletsLoading ? 'Loading...' : 'Select currency')}
              </Text>
              <Feather name="chevron-down" size={18} color="#6b7280" />
            </TouchableOpacity>
            <Modal visible={showFromModal} transparent animationType="slide">
              <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 18, width: '85%' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Select From Currency</Text>
                  <FlatList
                    data={wallets}
                    keyExtractor={item => item.currency}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' }}
                        onPress={() => {
                          setFromCurrency(item.currency.toUpperCase());
                          setShowFromModal(false);
                          // Auto-select different To currency if same
                          if (item.currency.toUpperCase() === toCurrency) {
                            const nextTo = wallets.find(w => w.currency.toUpperCase() !== item.currency.toUpperCase())?.currency.toUpperCase();
                            if (nextTo) setToCurrency(nextTo);
                          }
                        }}
                      >
                        <Text style={{ fontSize: 16 }}>{item.currency.toUpperCase()} ({parseFloat(item.balance)} {item.currency.toUpperCase()})</Text>
                      </TouchableOpacity>
                    )}
                    ListEmptyComponent={<Text>No wallets found</Text>}
                  />
                  <TouchableOpacity onPress={() => setShowFromModal(false)} style={{ marginTop: 10, alignSelf: 'flex-end' }}><Text style={{ color: '#007AFF', fontWeight: 'bold' }}>Close</Text></TouchableOpacity>
                </View>
              </View>
            </Modal>
            <Text style={[styles.label, { color: theme.colors.secondaryText }]}>To</Text>
            <TouchableOpacity
              style={[styles.input, { backgroundColor: theme.colors.background, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
              onPress={() => setShowToModal(true)}
              disabled={walletsLoading || wallets.length === 0}
            >
              <Text style={{ color: theme.colors.text, fontSize: 16 }}>
                {toCurrency ? `${toCurrency}` : (walletsLoading ? 'Loading...' : 'Select currency')}
              </Text>
              <Feather name="chevron-down" size={18} color="#6b7280" />
            </TouchableOpacity>
            <Modal visible={showToModal} transparent animationType="slide">
              <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 18, width: '85%' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Select To Currency</Text>
                  <FlatList
                    data={wallets.filter(w => w.currency.toUpperCase() !== fromCurrency)}
                    keyExtractor={item => item.currency}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' }}
                        onPress={() => {
                          setToCurrency(item.currency.toUpperCase());
                          setShowToModal(false);
                        }}
                      >
                        <Text style={{ fontSize: 16 }}>{item.currency.toUpperCase()} ({parseFloat(item.balance)} {item.currency.toUpperCase()})</Text>
                      </TouchableOpacity>
                    )}
                    ListEmptyComponent={<Text>No wallets found</Text>}
                  />
                  <TouchableOpacity onPress={() => setShowToModal(false)} style={{ marginTop: 10, alignSelf: 'flex-end' }}><Text style={{ color: '#007AFF', fontWeight: 'bold' }}>Close</Text></TouchableOpacity>
                </View>
              </View>
            </Modal>
            {walletsLoading && (
              <Text style={{ color: theme.colors.secondaryText, marginBottom: 8 }}>Loading wallets...</Text>
            )}
            {!walletsLoading && wallets.length === 0 && (
              <Text style={{ color: '#e74c3c', marginBottom: 8 }}>No wallets with balance found. Please deposit funds.</Text>
            )}
            {fromCurrency && wallets.find(w => w.currency.toUpperCase() === fromCurrency) && (
              <Text style={{ color: theme.colors.secondaryText, fontSize: 13, marginBottom: 4 }}>
                Balance: {parseFloat(wallets.find(w => w.currency.toUpperCase() === fromCurrency)?.balance || '0')} {fromCurrency}
              </Text>
            )}
            <Text style={[styles.label, { color: theme.colors.secondaryText }]}>Amount</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text, marginBottom: 12 }]}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="Enter amount"
              placeholderTextColor={theme.colors.secondaryText}
            />
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
              {(['Crypto', 'NGN', 'USD'] as Array<'Crypto' | 'NGN' | 'USD'>).map(option => (
                <TouchableOpacity
                  key={option}
                  onPress={() => setSelectedAmountCurrency(option)}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    backgroundColor: selectedAmountCurrency === option ? theme.colors.brandGreen : 'transparent',
                    borderRadius: 8,
                    marginRight: 6,
                  }}
                >
                  <Text style={{ color: selectedAmountCurrency === option ? '#fff' : theme.colors.text, fontWeight: '600', fontSize: 14 }}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={[styles.greenBtn, { backgroundColor: theme.colors.brandGreen }]} onPress={handleGetQuote} disabled={loading}>
              <Text style={styles.greenBtnText}>{loading ? 'Loading...' : 'Get Quote'}</Text>
            </TouchableOpacity>
            {error && (
              <Text style={{ color: '#e74c3c', marginTop: 8 }}>{error}</Text>
            )}
            {quote && (
              <View style={[styles.quoteBox, { backgroundColor: theme.colors.card }]}> 
                <Text style={[styles.quoteText, { color: theme.colors.text }]}>Rate: {quote.rate || `${amount} ${fromCurrency} → ${quote.receive} ${toCurrency}`}</Text>
                <Text style={[styles.quoteText, { color: theme.colors.text }]}>Fee: {quote.fee}</Text>
                <Text style={[styles.quoteText, { color: theme.colors.text }]}>You receive: {quote.receive} {toCurrency}</Text>
                <TouchableOpacity style={[styles.greenBtn, { backgroundColor: theme.colors.brandGreen }]} onPress={handleConfirmSwap} disabled={loading}>
                  <Text style={styles.greenBtnText}>{loading ? 'Processing...' : 'Confirm Swap'}</Text>
                </TouchableOpacity>
              </View>
            )}
            {swapResult && (
              <Text style={{ color: swapResult.success ? theme.colors.brandGreen : '#e74c3c', marginTop: 10 }}>{swapResult.message}</Text>
            )}
          </View>
        </ScrollView>
      )}

      {/* --- P2P Tab --- */}
      {tab === 'p2p' && (
        <View style={{ flex: 1 }}>
          <P2POffersList onSelectOrder={handleSelectOrder} />
        </View>
      )}

      {/* --- History Tab --- */}
      {tab === 'history' && (
        <View style={[styles.card, { backgroundColor: theme.colors.card }]}> 
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Trade History</Text>
          <Text style={{ color: theme.colors.secondaryText, textAlign: 'center', marginTop: 10 }}>No trades yet.</Text>
          <Text style={{ color: theme.colors.secondaryText, marginTop: 8 }}>Your recent swaps and trades will appear here.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#16a34a',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  label: {
    color: '#64748b',
    fontSize: 13,
    marginTop: 10,
    marginBottom: 2,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  greenBtn: {
    backgroundColor: '#16a34a',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  greenBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quoteBox: {
    backgroundColor: '#e6fbe8',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    marginBottom: 6,
  },
  quoteText: {
    color: '#1a1a1a',
    fontSize: 15,
    marginBottom: 2,
  },
});

export default TradePage;