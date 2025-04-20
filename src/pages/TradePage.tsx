//src/pages/TradePage.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { P2PStackParamList } from '../App';
import P2POffersList from './P2POffersList';
import OrderDetails from './OrderDetails';
import TradeRoom from './TradeRoom';

// trustBank TradePage: simple tabbed UI (Swap, P2P, History)

const TradePage = () => {
  const { theme } = useTheme();
  // Tab state
  const [tab, setTab] = useState<'swap' | 'p2p' | 'history'>('swap');
  // Swap state
  const [fromCurrency] = useState('USDT');
  const [toCurrency] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [quote, setQuote] = useState<any>(null);
  const [swapResult, setSwapResult] = useState<any>(null);

  // Amount currency selector
  const [selectedAmountCurrency, setSelectedAmountCurrency] = useState<'Crypto' | 'NGN' | 'USD'>('Crypto');

  // P2P UI state
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [activeTrade, setActiveTrade] = useState<any | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<P2PStackParamList>>();

  useEffect(() => {
    if (selectedOrder && !activeTrade) {
      navigation.navigate('OrderDetails', { order: selectedOrder });
      setSelectedOrder(null);
    }
  }, [selectedOrder, activeTrade, navigation]);

  // P2P and History dummy state for demo
  const [selectedPair, setSelectedPair] = useState('BTC/USDT');
  const [maxAmount] = useState(10); // Example max amount

  // Handlers
  const handleGetQuote = () => {
    setQuote({ rate: '1 BTC = 60,000 USDT', fee: '0.1%', receive: '0.016 BTC' });
  };
  const handleConfirmSwap = () => {
    setSwapResult({ success: true, message: 'Swap successful!' });
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
          <View style={[styles.card, { backgroundColor: theme.colors.card }]}> 
            <Text style={[styles.label, { color: theme.colors.secondaryText }]}>From</Text>
            <View style={[styles.input, { backgroundColor: theme.colors.background }]}><Text style={{color: theme.colors.text}}>{fromCurrency}</Text></View>
            <Text style={[styles.label, { color: theme.colors.secondaryText }]}>To</Text>
            <View style={[styles.input, { backgroundColor: theme.colors.background }]}><Text style={{color: theme.colors.text}}>{toCurrency}</Text></View>
            <Text style={[styles.label, { color: theme.colors.secondaryText }]}>Amount</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="Enter amount"
              placeholderTextColor={theme.colors.secondaryText}
            />
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
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
            <TouchableOpacity style={[styles.greenBtn, { backgroundColor: theme.colors.brandGreen }]} onPress={handleGetQuote}>
              <Text style={styles.greenBtnText}>Get Quote</Text>
            </TouchableOpacity>
            {quote && (
              <View style={[styles.quoteBox, { backgroundColor: theme.colors.card }]}> 
                <Text style={[styles.quoteText, { color: theme.colors.text }]}>{quote.rate}</Text>
                <Text style={[styles.quoteText, { color: theme.colors.text }]}>Fee: {quote.fee}</Text>
                <Text style={[styles.quoteText, { color: theme.colors.text }]}>You receive: {quote.receive}</Text>
                <TouchableOpacity style={[styles.greenBtn, { backgroundColor: theme.colors.brandGreen }]} onPress={handleConfirmSwap}>
                  <Text style={styles.greenBtnText}>Confirm Swap</Text>
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
          <P2POffersList onSelectOrder={setSelectedOrder} />
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

      {/* --- Trade Room Modal --- */}
      {activeTrade && (
        <TradeRoom trade={activeTrade} onBack={() => setActiveTrade(null)} />
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