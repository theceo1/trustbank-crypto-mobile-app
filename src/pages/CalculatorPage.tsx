import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";
import { ScrollView, TextInput, View, Text, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";

// Mock exchange rates for crypto currencies
const exchangeRates = {
  BTC: { USD: 61245.32, EUR: 56423.18, GBP: 48123.45 },
  ETH: { USD: 3998.75, EUR: 3682.14, GBP: 3142.57 },
  SOL: { USD: 132.56, EUR: 122.03, GBP: 103.95 },
  ADA: { USD: 0.45, EUR: 0.41, GBP: 0.35 },
  XRP: { USD: 0.65, EUR: 0.60, GBP: 0.51 },
  DOT: { USD: 7.82, EUR: 7.20, GBP: 6.13 },
  BNB: { USD: 634.21, EUR: 583.92, GBP: 497.36 },
};

const cryptoIcons = {
  BTC: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  ETH: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  SOL: "https://cryptologos.cc/logos/solana-sol-logo.png",
  ADA: "https://cryptologos.cc/logos/cardano-ada-logo.png",
  XRP: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
  DOT: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
  BNB: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
};

const CalculatorPage = () => {
  const navigation = useNavigation();
  const { toast } = useToast();
  
  // Calculator state
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  
  // Converter state
  const [fromCrypto, setFromCrypto] = useState("BTC");
  const [toCrypto, setToCrypto] = useState("USD");
  const [fromAmount, setFromAmount] = useState("1");
  const [toAmount, setToAmount] = useState("");
  
  // Tab state for switching between calculator and converter
  const [displayTab, setDisplayTab] = useState<'calculator' | 'converter'>('calculator');

  // Calculate conversion
  useEffect(() => {
    if (fromCrypto in exchangeRates && toCrypto in exchangeRates[fromCrypto as keyof typeof exchangeRates]) {
      const rate = exchangeRates[fromCrypto as keyof typeof exchangeRates][toCrypto as keyof typeof exchangeRates[keyof typeof exchangeRates]];
      setToAmount((parseFloat(fromAmount || "0") * rate).toFixed(2));
    } else if (toCrypto in exchangeRates && fromCrypto in exchangeRates[toCrypto as keyof typeof exchangeRates]) {
      const rate = exchangeRates[toCrypto as keyof typeof exchangeRates][fromCrypto as keyof typeof exchangeRates[keyof typeof exchangeRates]];
      setToAmount((parseFloat(fromAmount || "0") / rate).toFixed(8));
    } else {
      setToAmount("Conversion not available");
    }
  }, [fromCrypto, toCrypto, fromAmount]);

  // Calculator functions
  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const result = calculate(previousValue, inputValue, operation);
      if (typeof result === 'number') {
        setPreviousValue(result);
        setDisplay(String(result));
      } else {
        setPreviousValue(null);
        setDisplay(result);
      }
    }
    
    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b !== 0 ? a / b : "Error";
      default:
        return b;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);
    
    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const toggleSign = () => {
    setDisplay(display.charAt(0) === "-" ? display.substr(1) : "-" + display);
  };

  // Save calculation to history
  const saveCalculation = () => {
    toast({
      title: "Calculation saved",
      description: "The current calculation has been saved to history",
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Button
            variant="outline"
            style={styles.headerIconBtn}
            onPress={() => navigation.navigate("Dashboard" as never)}
          >
            <Text style={{fontSize: 22}}>{'<'} </Text>
          </Button>
          <Text style={styles.headerTitle}>Calculator</Text>
        </View>
        <View style={styles.headerRight}>
          <Button variant="outline" style={styles.headerIconBtn} onPress={saveCalculation}>
            <Text style={{fontSize: 20}}>💾</Text>
          </Button>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} contentContainerStyle={{ flexGrow: 1 }}>
        {/* Tabs - custom for mobile */}
        <View style={styles.tabsList}>
          <Button
            variant={displayTab === 'calculator' ? 'primary' : 'outline'}
            style={[styles.tabBtn, displayTab === 'calculator' && styles.tabBtnActive]}
            onPress={() => setDisplayTab('calculator')}
          >
            <Text style={styles.tabText}>Calculator</Text>
          </Button>
          <Button
            variant={displayTab === 'converter' ? 'primary' : 'outline'}
            style={[styles.tabBtn, displayTab === 'converter' && styles.tabBtnActive]}
            onPress={() => setDisplayTab('converter')}
          >
            <Text style={styles.tabText}>Crypto Converter</Text>
          </Button>
        </View>

        {/* Calculator Tab */}
        {displayTab === 'calculator' && (
          <Card style={styles.card}>
            <View style={styles.displayBox}>
              <Text style={styles.displayText}>{display}</Text>
              {operation && previousValue !== null && (
                <Text style={styles.displaySubText}>
                  {previousValue} {operation}
                </Text>
              )}
            </View>
            <View style={styles.keypadGrid}>
              {/* First row */}
              <Button variant="outline" style={styles.keyBtn} onPress={clearDisplay}><Text style={styles.keyBtnText}>C</Text></Button>
              <Button variant="outline" style={styles.keyBtn} onPress={toggleSign}><Text style={styles.keyBtnText}>+/-</Text></Button>
              <Button variant="outline" style={styles.keyBtn} onPress={handlePercentage}><Text style={styles.keyBtnText}>%</Text></Button>
              <Button variant="outline" style={[styles.keyBtn, styles.keyBtnOp]} onPress={() => performOperation('÷')}><Text style={styles.keyBtnText}>÷</Text></Button>
              {/* Second row */}
              <Button variant="outline" style={styles.keyBtn} onPress={() => inputDigit('7')}><Text style={styles.keyBtnText}>7</Text></Button>
              <Button variant="outline" style={styles.keyBtn} onPress={() => inputDigit('8')}><Text style={styles.keyBtnText}>8</Text></Button>
              <Button variant="outline" style={styles.keyBtn} onPress={() => inputDigit('9')}><Text style={styles.keyBtnText}>9</Text></Button>
              <Button variant="outline" style={[styles.keyBtn, styles.keyBtnOp]} onPress={() => performOperation('×')}><Text style={styles.keyBtnText}>×</Text></Button>
              {/* Third row */}
              <Button variant="outline" style={styles.keyBtn} onPress={() => inputDigit('4')}><Text style={styles.keyBtnText}>4</Text></Button>
              <Button variant="outline" style={styles.keyBtn} onPress={() => inputDigit('5')}><Text style={styles.keyBtnText}>5</Text></Button>
              <Button variant="outline" style={styles.keyBtn} onPress={() => inputDigit('6')}><Text style={styles.keyBtnText}>6</Text></Button>
              <Button variant="outline" style={[styles.keyBtn, styles.keyBtnOp]} onPress={() => performOperation('-')}><Text style={styles.keyBtnText}>-</Text></Button>
              {/* Fourth row */}
              <Button variant="outline" style={styles.keyBtn} onPress={() => inputDigit('1')}><Text style={styles.keyBtnText}>1</Text></Button>
              <Button variant="outline" style={styles.keyBtn} onPress={() => inputDigit('2')}><Text style={styles.keyBtnText}>2</Text></Button>
              <Button variant="outline" style={styles.keyBtn} onPress={() => inputDigit('3')}><Text style={styles.keyBtnText}>3</Text></Button>
              <Button variant="outline" style={[styles.keyBtn, styles.keyBtnOp]} onPress={() => performOperation('+')}><Text style={styles.keyBtnText}>+</Text></Button>
              {/* Fifth row */}
              <Button variant="outline" style={[styles.keyBtn, styles.keyBtnDouble]} onPress={() => inputDigit('0')}><Text style={styles.keyBtnText}>0</Text></Button>
              <Button variant="outline" style={styles.keyBtn} onPress={inputDot}><Text style={styles.keyBtnText}>.</Text></Button>
              <Button variant="outline" style={[styles.keyBtn, styles.keyBtnOp]} onPress={handleEquals}><Text style={styles.keyBtnText}>=</Text></Button>
            </View>
          </Card>
        )}

        {/* Converter Tab */}
        {displayTab === 'converter' && (
          <Card style={styles.card}>
            <View style={styles.converterSection}>
              {/* From Currency */}
              <Text style={styles.label}>From</Text>
              <View style={styles.pickerRow}>
                <Image source={{ uri: cryptoIcons[fromCrypto] }} style={styles.cryptoIcon} />
                <Picker
                  selectedValue={fromCrypto}
                  style={styles.picker}
                  onValueChange={setFromCrypto}
                >
                  {Object.keys(exchangeRates).map(currency => (
                    <Picker.Item key={currency} label={currency} value={currency} />
                  ))}
                  <Picker.Item label="USD" value="USD" />
                  <Picker.Item label="EUR" value="EUR" />
                  <Picker.Item label="GBP" value="GBP" />
                </Picker>
              </View>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={fromAmount}
                onChangeText={setFromAmount}
              />
              {/* Swap button */}
              <View style={styles.swapRow}>
                <Button variant="outline" style={styles.swapBtn} onPress={() => {
                  const temp = fromCrypto;
                  setFromCrypto(toCrypto);
                  setToCrypto(temp);
                  setFromAmount(toAmount);
                }}>
                  <Text style={{fontSize: 20}}>🔄</Text>
                </Button>
              </View>
              {/* To Currency */}
              <Text style={styles.label}>To</Text>
              <View style={styles.pickerRow}>
                <Image source={{ uri: cryptoIcons[toCrypto] }} style={styles.cryptoIcon} />
                <Picker
                  selectedValue={toCrypto}
                  style={styles.picker}
                  onValueChange={setToCrypto}
                >
                  {Object.keys(exchangeRates).map(currency => (
                    <Picker.Item key={currency} label={currency} value={currency} />
                  ))}
                  <Picker.Item label="USD" value="USD" />
                  <Picker.Item label="EUR" value="EUR" />
                  <Picker.Item label="GBP" value="GBP" />
                </Picker>
              </View>
              <TextInput
                style={styles.input}
                value={toAmount}
                editable={false}
              />
              <View style={styles.exchangeRateBox}>
                <Text style={styles.exchangeRateLabel}>Exchange Rate</Text>
                <Text style={styles.exchangeRateText}>
                  1 {fromCrypto} = {
                    fromCrypto in exchangeRates &&
                    toCrypto in exchangeRates[fromCrypto as keyof typeof exchangeRates] ?
                      exchangeRates[fromCrypto as keyof typeof exchangeRates][toCrypto as keyof typeof exchangeRates[keyof typeof exchangeRates]].toFixed(2) :
                      "N/A"
                  } {toCrypto}
                </Text>
              </View>
            </View>
            <View style={styles.converterNoteBox}>
              <Text style={styles.noteText}>• Exchange rates updated as of April 14, 2025</Text>
            </View>
          </Card>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  );
};

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '600', marginLeft: 12 },
  headerIconBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 4 },
  content: { flex: 1, backgroundColor: '#f8fafc' },
  tabsList: { flexDirection: 'row', marginTop: 8, marginBottom: 16, justifyContent: 'center' },
  tabBtn: { flex: 1, marginHorizontal: 4, borderRadius: 20, paddingVertical: 10 },
  tabBtnActive: { backgroundColor: '#1a237e' },
  tabText: { textAlign: 'center', fontSize: 16, fontWeight: '500', color: '#1a237e' },
  card: { margin: 16, padding: 16, borderRadius: 16, backgroundColor: '#fff', elevation: 2 },
  displayBox: { backgroundColor: '#f1f5f9', borderRadius: 12, padding: 16, marginBottom: 16 },
  displayText: { fontSize: 40, fontWeight: 'bold', textAlign: 'right', color: '#111' },
  displaySubText: { fontSize: 14, color: '#64748b', textAlign: 'right', marginTop: 4 },
  keypadGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  keyBtn: { width: '22%', marginVertical: 6, aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 12, backgroundColor: '#f1f5f9' },
  keyBtnText: { fontSize: 22, fontWeight: '600', color: '#1a237e' },
  keyBtnOp: { backgroundColor: '#1a237e' },
  keyBtnDouble: { width: '47%' },
  converterSection: { marginTop: 8 },
  label: { fontSize: 14, color: '#64748b', marginBottom: 6, fontWeight: '500' },
  pickerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cryptoIcon: { width: 28, height: 28, marginRight: 8, borderRadius: 14, backgroundColor: '#fff' },
  picker: { flex: 1, height: 44 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fff', marginBottom: 8 },
  swapRow: { alignItems: 'center', marginVertical: 12 },
  swapBtn: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  exchangeRateBox: { marginTop: 8 },
  exchangeRateLabel: { fontSize: 13, color: '#64748b', fontWeight: '500' },
  exchangeRateText: { fontSize: 15, color: '#1a237e', fontWeight: '600' },
  converterNoteBox: { marginTop: 14 },
  noteText: { fontSize: 13, color: '#64748b', marginBottom: 2 },
});

export default CalculatorPage;
