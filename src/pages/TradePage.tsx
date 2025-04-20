//src/pages/TradePage.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import P2POffersList from './P2POffersList';
import OrderDetails from './OrderDetails';
import TradeRoom from './TradeRoom';

// trustBank TradePage: simple tabbed UI (Swap, P2P, History)

const TradePage = () => {
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
    <>
      {/* Header */}
      <View style={{ paddingTop: 40, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 4, color: '#16a34a' }}>Welcome to trustBank Trading</Text>
        <Text style={{ fontSize: 15, color: '#64748b', textAlign: 'center' }}>
          Buy, sell, and swap crypto instantly with ease. Choose your preferred method below.
        </Text>
      </View>

      {/* Tabs Row */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 18, marginBottom: 2 }}>
        <TouchableOpacity onPress={() => setTab('swap')} style={{ flex: 1, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: tab === 'swap' ? '#16a34a' : 'transparent', paddingVertical: 12, backgroundColor: tab === 'swap' ? '#e6fbe8' : 'transparent' }}>
          <Text style={{ color: tab === 'swap' ? '#16a34a' : '#64748b', fontWeight: '600', fontSize: 15 }}>Swap</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('p2p')} style={{ flex: 1, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: tab === 'p2p' ? '#16a34a' : 'transparent', paddingVertical: 12, backgroundColor: tab === 'p2p' ? '#e6fbe8' : 'transparent' }}>
          <Text style={{ color: tab === 'p2p' ? '#16a34a' : '#64748b', fontWeight: '600', fontSize: 15 }}>P2P</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('history')} style={{ flex: 1, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: tab === 'history' ? '#16a34a' : 'transparent', paddingVertical: 12, backgroundColor: tab === 'history' ? '#e6fbe8' : 'transparent' }}>
          <Text style={{ color: tab === 'history' ? '#16a34a' : '#64748b', fontWeight: '600', fontSize: 15 }}>History</Text>
        </TouchableOpacity>
      </View>

      {/* --- Swap Tab --- */}
      {tab === 'swap' && (
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Instant Swap</Text>
            <Text style={{ color: '#64748b', fontSize: 13, marginBottom: 10 }}>
              Quickly swap between cryptocurrencies or fiat. Enter the amount in your preferred currency.
            </Text>
            <Text style={styles.label}>From</Text>
            <View style={styles.input}><Text style={{color:'#1a1a1a'}}>{fromCurrency}</Text></View>
            <Text style={styles.label}>To</Text>
            <View style={styles.input}><Text style={{color:'#1a1a1a'}}>{toCurrency}</Text></View>
            <Text style={styles.label}>Amount</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="Enter amount"
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
              />
              <View style={{ marginLeft: 8, flexDirection: 'row', backgroundColor: '#f3f4f6', borderRadius: 8, overflow: 'hidden' }}>
                {(['Crypto', 'NGN', 'USD'] as Array<'Crypto' | 'NGN' | 'USD'>).map(option => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => setSelectedAmountCurrency(option)}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 10,
                      backgroundColor: selectedAmountCurrency === option ? '#16a34a' : 'transparent',
                    }}
                  >
                    <Text style={{ color: selectedAmountCurrency === option ? '#fff' : '#1a1a1a', fontWeight: '600', fontSize: 14 }}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <TouchableOpacity style={styles.greenBtn} onPress={handleGetQuote}>
              <Text style={styles.greenBtnText}>Get Quote</Text>
            </TouchableOpacity>
            {quote && (
              <View style={styles.quoteBox}>
                <Text style={styles.quoteText}>Rate: {quote.rate}</Text>
                <Text style={styles.quoteText}>Fee: {quote.fee}</Text>
                <Text style={styles.quoteText}>You Receive: {quote.receive}</Text>
                <TouchableOpacity style={styles.greenBtn} onPress={handleConfirmSwap}>
                  <Text style={styles.greenBtnText}>Confirm Swap</Text>
                </TouchableOpacity>
              </View>
            )}
            {swapResult && (
              <Text style={{ color: swapResult.success ? '#16a34a' : '#ef4444', marginTop: 8 }}>{swapResult.message}</Text>
            )}
          </View>
        </ScrollView>
      )}

      {/* --- P2P Tab --- */}
      {tab === 'p2p' && (
        <View style={styles.card}>
          {/* P2P Trading Flow */}
          {!selectedOrder && !activeTrade && (
            <P2POffersList onSelectOrder={setSelectedOrder} />
          )}
          {selectedOrder && !activeTrade && (
            <OrderDetails order={selectedOrder} onTradeCreated={trade => { setActiveTrade(trade); setSelectedOrder(null); }} onBack={() => setSelectedOrder(null)} />
          )}
          {activeTrade && (
            <TradeRoom trade={activeTrade} onBack={() => setActiveTrade(null)} />
          )}
        </View>
      )}

      {/* --- History Tab --- */}
      {tab === 'history' && (
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Trade History (Coming Soon)</Text>
            <Text style={{ color: '#64748b', marginTop: 8 }}>Your recent swaps and trades will appear here.</Text>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    // backgroundColor: '#fff', // Removed to support theme
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