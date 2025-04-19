import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, Modal, Platform, Keyboard, TouchableWithoutFeedback, TextStyle } from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { useTheme } from '@/contexts/ThemeContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 18,
    borderWidth: 2,
    padding: 22,
    marginVertical: 16,
    shadowColor: '#16a34a',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 15,
    marginBottom: 18,
    textAlign: 'center',
    opacity: 0.8,
  },
  selectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  selectorBtn: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 1,
  },
  selectorLabel: {
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.7,
  },
  selectorValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  wheelModalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.32)',
    justifyContent: 'flex-end',
  },
  wheelModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 20,
    alignItems: 'center',
  },
  wheelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  wheelDoneBtn: {
    backgroundColor: '#16a34a',
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderRadius: 8,
  },
  input: {
    width: 180,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 18,
    textAlign: 'center',
  },
  convertBtn: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 8,
    alignItems: 'center',
  },
  convertBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  resultText: {
    marginTop: 18,
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorText: {
    color: '#ff5252',
    marginTop: 18,
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 18,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomColor: '#16a34a',
    backgroundColor: '#e0fbea',
  },
  tabText: {
    color: '#64748b',
    fontWeight: '600',
    fontSize: 16,
  },
  tabTextActive: {
    color: '#16a34a',
  },
});


const CRYPTOS = [
  { label: 'Bitcoin', value: 'BTC' },
  { label: 'Ethereum', value: 'ETH' },
  { label: 'Tether', value: 'USDT' },
];
const FIATS = [
  { label: 'Naira', value: 'NGN' },
  { label: 'US Dollar', value: 'USD' },
  { label: 'Pound', value: 'GBP' },
];

function CryptoConverter() {
  const { theme } = useTheme();
  const [crypto, setCrypto] = React.useState('BTC');
  const [fiat, setFiat] = React.useState('NGN');
  const [amount, setAmount] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [showCryptoWheel, setShowCryptoWheel] = useState(false);
  const [showFiatWheel, setShowFiatWheel] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const market = `${crypto.toLowerCase()}${fiat.toLowerCase()}`;
      const url = `https://www.quidax.com/api/v1/markets/tickers/${market}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch rate');
      const data = await res.json();
      const price = parseFloat(data?.data?.ticker?.last);
      const amt = parseFloat(amount);
      if (isNaN(price) || isNaN(amt)) throw new Error('Invalid input');
      setResult(`${amt} ${crypto} ≈ ${(amt * price).toLocaleString()} ${fiat}`);
    } catch (e: any) {
      setError(e.message || 'Conversion failed');
    }
    setLoading(false);
  };


  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.primary }]}>  
      <Text style={{ textAlign: 'center', marginBottom: 2 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme.colors.text }}>trust</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme.colors.primary }}>Rate™</Text>
      </Text>
      <Text style={[styles.sectionSubtitle, { color: theme.colors.text }]}>Convert crypto to fiat instantly with live rates</Text>
      {/* Selectors */}
      <View style={styles.selectorRow}>
        {/* Crypto Selector */}
        <TouchableOpacity style={styles.selectorBtn} onPress={() => setShowCryptoWheel(true)}>
          <Text style={[styles.selectorLabel, { color: theme.colors.text }]}>Crypto</Text>
          <Text style={[styles.selectorValue, { color: theme.colors.primary }]}>{crypto}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectorBtn} onPress={() => setShowFiatWheel(true)}>
          <Text style={[styles.selectorLabel, { color: theme.colors.text }]}>Fiat</Text>
          <Text style={[styles.selectorValue, { color: theme.colors.primary }]}>{fiat}</Text>
        </TouchableOpacity>
      </View>
      {/* Wheel Pickers */}
      <Modal visible={showCryptoWheel} transparent animationType="slide" onRequestClose={() => setShowCryptoWheel(false)}>
        <View style={[styles.wheelModalBg, {backgroundColor: 'transparent'}]}>
          <View style={[styles.wheelModalContent, {backgroundColor: theme.colors.card, shadowOpacity: 0.15}]}> 
            <Text style={[styles.wheelTitle, { color: theme.colors.primary }]}>Select Crypto</Text>
            <WheelPickerExpo
              height={220}
              width={240}
              initialSelectedIndex={CRYPTOS.findIndex(c => c.value === crypto)}
              items={CRYPTOS}
              onChange={({ item }) => setCrypto(item.value)}
              backgroundColor={Platform.OS === 'android' ? 'transparent' : theme.colors.card}
            />
            <TouchableOpacity style={styles.wheelDoneBtn} onPress={() => setShowCryptoWheel(false)}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={showFiatWheel} transparent animationType="slide" onRequestClose={() => setShowFiatWheel(false)}>
        <View style={[styles.wheelModalBg, {backgroundColor: 'transparent'}]}>
          <View style={[styles.wheelModalContent, {backgroundColor: theme.colors.card, shadowOpacity: 0.15}]}> 
            <Text style={[styles.wheelTitle, { color: theme.colors.primary }]}>Select Fiat</Text>
            <WheelPickerExpo
              height={220}
              width={240}
              initialSelectedIndex={FIATS.findIndex(f => f.value === fiat)}
              items={FIATS}
              onChange={({ item }) => setFiat(item.value)}
              backgroundColor={Platform.OS === 'android' ? 'transparent' : theme.colors.card}
            />
            <TouchableOpacity style={styles.wheelDoneBtn} onPress={() => setShowFiatWheel(false)}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Amount Input */}
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
        keyboardType="numeric"
        returnKeyType="done"
        blurOnSubmit={true}
        onSubmitEditing={Keyboard.dismiss}
      />
      <TouchableOpacity style={[styles.convertBtn, { backgroundColor: theme.colors.primary }]} onPress={handleConvert} disabled={loading || !amount}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.convertBtnText}>Convert</Text>
        )}
      </TouchableOpacity>
      {result && <Text style={[styles.resultText, { color: theme.colors.primary }]}>{result}</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}


const TAB_CONVERTER = 'Crypto Converter';
const TAB_CALCULATOR = 'Calculator';

const CalculatorPage = () => {
  const { theme } = useTheme();
  // Default to Crypto Converter tab
  const [activeTab, setActiveTab] = useState(TAB_CONVERTER);

  // Calculator logic
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState('');

  const handleCalcPress = (btn: string) => {
    if (btn === 'C') {
      setCalcInput('');
      setCalcResult('');
      return;
    }
    if (btn === '%') {
      // Find the last number in the input and convert it to percent
      const match = calcInput.match(/(\d*\.?\d*)$/);
      if (match && match[0]) {
        const percent = (parseFloat(match[0]) / 100).toString();
        setCalcInput(calcInput.replace(/(\d*\.?\d*)$/, percent));
      }
      return;
    }
    if (btn === '=') {
      try {
        // Replace × and ÷ with * and /
        const safeExpr = calcInput.replace(/×/g, '*').replace(/÷/g, '/');
        // eslint-disable-next-line no-eval
        let evalResult = eval(safeExpr);
        if (typeof evalResult === 'number' && !isNaN(evalResult)) {
          setCalcResult(evalResult.toString());
        } else {
          setCalcResult('Err');
        }
      } catch {
        setCalcResult('Err');
      }
      return;
    }
    // Prevent multiple decimals in a number
    if (btn === '.' && /\d*\.?\d*$/.test(calcInput.split(/[-+×÷]/).pop() || '')) {
      if ((calcInput.split(/[-+×÷]/).pop() || '').includes('.')) return;
    }
    // Prevent leading operator
    if (calcInput === '' && ['+','-','×','÷'].includes(btn)) return;
    // Prevent two operators in a row
    if (['+','-','×','÷'].includes(btn) && ['+','-','×','÷'].includes(calcInput.slice(-1))) return;
    setCalcInput(prev => prev + btn);
    setCalcResult('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {/* Page Title & Subtitle */}
        <View style={{ paddingTop: 36, paddingHorizontal: 24, paddingBottom: 16 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 4 }}>Calculator</Text>
          <Text style={{ fontSize: 16, color: theme.colors.secondaryText || theme.colors.text, marginBottom: 10 }}>
            Simple calculator and crypto converter with live rates
          </Text>
        </View>
        {/* Tab Header */}
        <View style={styles.tabBar}>
          {[TAB_CONVERTER, TAB_CALCULATOR].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Tab Content */}
        <View style={{ flex: 1, padding: 24 }}>
          {/* Calculator state and logic */}
          {activeTab === TAB_CONVERTER ? (
            <>
              <CryptoConverter />
              <View style={{ marginTop: 8, backgroundColor: 'transparent' }}>
                <Text style={{ fontWeight: '600', color: theme.colors.text, marginBottom: 2 }}>Note:</Text>
                <Text style={{ color: theme.colors.text, opacity: 0.8 }}>
                  The conversion results shown are estimates. Actual rates may vary slightly at the time of transaction due to market volatility and network conditions.
                </Text>
              </View>
            </>
          ) : (
            <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.primary, justifyContent: 'flex-start', alignItems: 'stretch', minHeight: 320, paddingHorizontal: 12 }]}> 
              <Text style={{ color: theme.colors.primary, fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' }}>Calculator</Text>
              {/* Calculator Display */}
              <View style={{ backgroundColor: theme.colors.background, borderRadius: 8, padding: 16, marginBottom: 18, minHeight: 60 }}>
                <Text style={{ fontSize: 26, color: theme.colors.text, textAlign: 'right', minHeight: 32 }}>{calcInput || '0'}</Text>
                <Text style={{ fontSize: 18, color: theme.colors.secondaryText, textAlign: 'right', minHeight: 22 }}>{calcResult !== '' ? `= ${calcResult}` : ''}</Text>
              </View>
              {/* Calculator Buttons */}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {/* Calculator Buttons Grid */}
                <View style={{ width: '100%' }}>
                  {/* First 3 rows: 4 buttons each */}
                  {[
                    ['7','8','9','÷'],
                    ['4','5','6','×'],
                    ['1','2','3','-'],
                  ].map((row, ridx) => (
                    <View key={ridx} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                      {row.map((btn) => (
                        <TouchableOpacity
                          key={btn}
                          onPress={() => handleCalcPress(btn)}
                          style={{
                            flex: 1,
                            aspectRatio: 1,
                            marginHorizontal: 4,
                            backgroundColor: theme.colors.card,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 24, color: theme.colors.text, fontWeight: 'bold' }}>{btn}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                  {/* Last row: %, 0, ., =, C */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {['%','0','.','=','C'].map((btn) => (
                      <TouchableOpacity
                        key={btn}
                        onPress={() => handleCalcPress(btn)}
                        style={{
                          flex: 1,
                          aspectRatio: 1,
                          marginHorizontal: 4,
                          backgroundColor:
                            btn === '=' ? '#16a34a' : btn === 'C' ? '#ef4444' : theme.colors.card,
                          borderRadius: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          shadowColor: btn === '=' ? '#16a34a' : undefined,
                          shadowOpacity: btn === '=' ? 0.12 : 0,
                          elevation: btn === '=' ? 2 : 0,
                        }}
                      >
                        <Text style={{ fontSize: 24, color: btn === '=' || btn === 'C' ? '#fff' : theme.colors.text, fontWeight: 'bold' }}>{btn}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CalculatorPage;