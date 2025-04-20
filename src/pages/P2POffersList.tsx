//src/pages/P2POffersList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, useColorScheme, Modal, TextInput, Platform } from 'react-native';
import { supabase } from '../lib/supabase';

type P2POffersListProps = { onSelectOrder: (order: any) => void };
const P2POffersList: React.FC<P2POffersListProps> = ({ onSelectOrder }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  // Simulate user wallets for now (replace with prop or fetch if needed)
  const walletOptions = [
    { symbol: 'USDT', name: 'Tether USD' },
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'NGN', name: 'Nigerian Naira' },
    { symbol: 'USD', name: 'US Dollar' },
    // ...add more as needed
  ];
  const [currency, setCurrency] = useState('USDT');
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [currencySearch, setCurrencySearch] = useState('');
  const [price, setPrice] = useState('');
  const [minOrder, setMinOrder] = useState('');
  const [maxOrder, setMaxOrder] = useState('');
  const [inputUnit, setInputUnit] = useState<'NGN'|'USD'|string>('NGN');
  const [conversionRates, setConversionRates] = useState<{[key:string]: number}>({}); // e.g. {BTCUSDT: 65000, USDNGN: 1500}
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? '#fff' : '#000';
  const subTextColor = colorScheme === 'dark' ? '#d1d5db' : '#64748b';

  useEffect(() => {
    fetchOffers();
    fetchConversionRates();
  }, []);

  // Fetch Quidax ticker rates (USDT pairs and NGN/USD)
  const fetchConversionRates = async () => {
    try {
      // Quidax public API for tickers
      const res = await fetch('https://www.quidax.com/api/v1/markets/tickers');
      const json = await res.json();
      const tickers = json.data;
      // Example: BTCUSDT, ETHUSDT, USDTNGN, USDNGN
      const rates: {[key:string]: number} = {};
      ['BTCUSDT', 'ETHUSDT', 'USDTNGN', 'USDNGN', 'BTCNGN', 'ETHNGN', 'USDNGN'].forEach(pair => {
        if (tickers[pair]) rates[pair] = parseFloat(tickers[pair].ticker.last);
      });
      setConversionRates(rates);
    } catch (e) {
      // fallback
      setConversionRates({BTCUSDT: 65000, USDTNGN: 1500, USDNGN: 1500});
    }
  };


  const fetchOffers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('p2p_orders')
      .select('*')
      .eq('status', 'active');
    if (!error) setOffers(data || []);
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#eee' }}>
      <Text style={{ color: textColor, fontWeight: 'bold' }}>{item.type.toUpperCase()} {item.currency}</Text>
      <Text style={{ color: textColor }}>Price: {item.price}</Text>
      <Text style={{ color: subTextColor }}>Min: {item.min_order} / Max: {item.max_order}</Text>
      <Text style={{ color: subTextColor }}>Payment: {item.payment_methods?.join(', ')}</Text>
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        <TouchableOpacity
          style={{ backgroundColor: '#16a34a', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 18, marginRight: 10 }}
          onPress={() => { console.log('Take Offer', item); onSelectOrder(item); }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Take Offer</Text>
        </TouchableOpacity>
        {/* Placeholder for future Chat or Details */}
      </View>
    </View>
  );

  const resetCreateForm = () => {
    setOrderType('buy');
    setCurrency('USDT');
    setPrice('');
    setMinOrder('');
    setMaxOrder('');
    setPaymentMethods([]);
  };

  const handleOpenCreate = () => {
    resetCreateForm();
    setShowCreateModal(true);
  };

  const handleCreateOrder = async () => {
    // Get current user for creator_id
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user?.id) {
      setErrors({ submit: 'Unable to get user. Please log in again.' });
      return;
    }
    const creator_id = userData.user.id;
    // Inline validation
    let newErrors: { [key: string]: string } = {};
    if (!currency) newErrors.currency = 'Please select a currency.';
    
    if (!price) newErrors.price = 'Price is required.';
    if (!minOrder) newErrors.minOrder = 'Min order is required.';
    if (!maxOrder) newErrors.maxOrder = 'Max order is required.';
    if (paymentMethods.length === 0) newErrors.paymentMethods = 'Select at least one payment method.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setFormLoading(true);
    setFormSuccess(false);
    // Compose the order object
    const order = {
      type: orderType,
      currency,
      price: parseFloat(price),
      min_order: parseFloat(minOrder),
      max_order: parseFloat(maxOrder),
      input_unit: inputUnit,
      payment_methods: paymentMethods,
      status: 'active',
      created_at: new Date().toISOString(),
      creator_id,
    };
    try {
      const { data, error } = await supabase
        .from('p2p_orders')
        .insert([order]);
      if (error) {
        setFormLoading(false);
        setFormSuccess(false);
        setErrors({ submit: 'Failed to create order. Please try again.' });
        console.error('Error creating order:', error);
      } else {
        setFormLoading(false);
        setFormSuccess(true);
        setTimeout(() => {
          setShowCreateModal(false);
          setFormSuccess(false);
        }, 1200);
        fetchOffers();
      }
    } catch (err) {
      setFormLoading(false);
      setFormSuccess(false);
      setErrors({ submit: 'Unexpected error. Please try again.' });
      console.error('Unexpected error creating order:', err);
    }
  };


  // Convert inputUnit to crypto equivalent using conversionRates
  function convertToCrypto(value: string, from: string, to: string, rates: {[key:string]: number}) {
    const v = parseFloat(value);
    if (!v || !rates) return '-';
    // Example: from NGN to BTC via USDT
    if (from === 'NGN' && to === 'BTC' && rates['USDNGN'] && rates['BTCUSDT']) {
      const usdt = v / rates['USDNGN'];
      return (usdt / rates['BTCUSDT']).toFixed(6);
    }
    if (from === 'USD' && to === 'BTC' && rates['BTCUSDT']) {
      return (v / rates['BTCUSDT']).toFixed(6);
    }
    if (from === to) return v.toString();
    // Add more conversion logic as needed
    return '-';
  }

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  // Helper for error display
  const showError = (field: string) => errors[field] ? (
    <Text style={{ color: '#ef4444', fontSize: 12, marginTop: 2 }}>{errors[field]}</Text>
  ) : null; 

  // Only show Create Order as floating top right, and Refresh as text link below empty state
  const CreateOrderFAB = (
    <TouchableOpacity
      style={[
        {
          backgroundColor: '#16a34a',
          shadowColor: colorScheme === 'dark' ? '#000' : '#16a34a',
          paddingVertical: 7,
          paddingHorizontal: 16,
          borderRadius: 12,
          position: 'absolute',
          top: 18,
          right: 16,
          zIndex: 10,
          shadowOpacity: 0.14,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: 3,
        },
      ]}
      activeOpacity={0.7}
      onPress={handleOpenCreate}
    >
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>+ Create Order</Text>
    </TouchableOpacity>
  );

  console.log('P2P offers:', offers);
  // Always render the top-right action row
  const TopActionRow = (
    <View style={{ flexDirection: 'row', position: 'absolute', top: 18, right: 16, zIndex: 20 }}>
      {CreateOrderFAB}
      <TouchableOpacity
        onPress={fetchOffers}
        style={{ marginLeft: 10, alignItems: 'center', flexDirection: 'row', backgroundColor: 'transparent', padding: 0 }}
        accessibilityLabel="Refresh"
      >
        <Text style={{ fontSize: 22, color: '#16a34a', fontWeight: 'bold' }}>🔄</Text>
      </TouchableOpacity>
    </View>
  );

  if (!offers.length) {
    console.log('Rendering empty state, offers.length:', offers.length);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {/* Action Row at absolute top right of the page */}
        <View style={{ position: 'absolute', top: 18, right: 16, flexDirection: 'row', zIndex: 20 }}>
          <TouchableOpacity
            style={{ backgroundColor: '#16a34a', borderRadius: 14, paddingVertical: 4, paddingHorizontal: 10, marginRight: 8, justifyContent: 'center', alignItems: 'center' }}
            activeOpacity={0.7}
            onPress={handleOpenCreate}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>+ Create Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={fetchOffers}
            style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: 'transparent', padding: 0 }}
            accessibilityLabel="Refresh"
          >
            <Text style={{ fontSize: 22, color: '#16a34a', fontWeight: 'bold' }}>🔄</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 18, color: textColor || '#222', marginBottom: 10, fontWeight: '600', textAlign: 'center' }}>No active offers</Text>
        <Text style={{ color: subTextColor || '#666', marginBottom: 24, textAlign: 'center' }}>
          There are currently no P2P offers available. Try creating a new offer.
        </Text>
        <Modal
          visible={showCreateModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowCreateModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.polishedModalContainer] }>
              <Text style={styles.modalTitle}>Create P2P Order</Text>
              <View style={styles.formRow}>
                <Text style={styles.label}>Type</Text>
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <TouchableOpacity onPress={() => setOrderType('buy')} style={[styles.typeBtn, orderType==='buy' && styles.typeBtnActive]}>
                    <Text style={[styles.typeBtnText, orderType==='buy' && styles.typeBtnTextActive]}>Buy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setOrderType('sell')} style={[styles.typeBtn, orderType==='sell' && styles.typeBtnActive]}>
                    <Text style={[styles.typeBtnText, orderType==='sell' && styles.typeBtnTextActive]}>Sell</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>Asset</Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#fde68a',
                    borderRadius: 8,
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    marginBottom: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  onPress={() => setShowCurrencyModal(true)}
                  activeOpacity={0.7}
                >
                  <Text style={{ color: '#78350f', fontWeight: '700', fontSize: 15 }}>{currency}</Text>
                  <Text style={{ color: '#78350f', fontWeight: '400', fontSize: 13 }}>
                    {walletOptions.find(w => w.symbol === currency)?.name || ''} ▼
                  </Text>
                </TouchableOpacity>
                <Modal visible={showCurrencyModal} animationType="slide" transparent onRequestClose={() => setShowCurrencyModal(false)}>
                  <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#fff', borderRadius: 16, width: '90%', maxHeight: '70%' }}>
                      <TextInput
                        placeholder="Search asset..."
                        value={currencySearch}
                        onChangeText={setCurrencySearch}
                        style={{ padding: 12, fontSize: 16, borderBottomWidth: 1, borderColor: '#fde68a' }}
                        autoFocus
                      />
                      <FlatList
                        data={walletOptions.filter(w => w.symbol.toLowerCase().includes(currencySearch.toLowerCase()) || w.name.toLowerCase().includes(currencySearch.toLowerCase()))}
                        keyExtractor={item => item.symbol}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={{ padding: 16, borderBottomWidth: 1, borderColor: '#fde68a' }}
                            onPress={() => { setCurrency(item.symbol); setShowCurrencyModal(false); setCurrencySearch(''); }}
                          >
                            <Text style={{ fontWeight: '700', color: '#78350f', fontSize: 15 }}>{item.symbol} <Text style={{ fontWeight: '400', color: '#a16207', fontSize: 13 }}>{item.name}</Text></Text>
                          </TouchableOpacity>
                        )}
                      />
                      <TouchableOpacity style={{ alignItems: 'center', padding: 14 }} onPress={() => setShowCurrencyModal(false)}>
                        <Text style={{ color: '#ef4444', fontWeight: '600', fontSize: 15 }}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

                {/* Input Unit Selector */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ color: '#78350f', fontSize: 14, fontWeight: '700', marginRight: 8 }}>Input Unit:</Text>
                  {['NGN', 'USD', currency].map(unit => (
                    <TouchableOpacity
                      key={unit}
                      onPress={() => setInputUnit(unit)}
                      style={{
                        backgroundColor: inputUnit === unit ? '#16a34a' : '#fde68a',
                        borderRadius: 8,
                        paddingVertical: 6,
                        paddingHorizontal: 14,
                        marginRight: 8,
                      }}
                    >
                      <Text style={{ color: inputUnit === unit ? '#fff' : '#78350f', fontWeight: '700' }}>{unit}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={{ color: '#a16207', fontSize: 12, marginBottom: 2 }}>All values below will use this unit.</Text>
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>Price</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    value={price}
                    onChangeText={setPrice}
                    style={[styles.input, { flex: 1 }]}
                    keyboardType="numeric"
                    placeholder="e.g. 1000"
                    placeholderTextColor="#a16207"
                    returnKeyType="done"
                    blurOnSubmit={true}
                  />
                  <Text style={{ marginLeft: 8, color: '#78350f', fontWeight: '700', fontSize: 15 }}>{inputUnit}</Text>
                </View>
                <Text style={{ color: '#a16207', fontSize: 12, marginTop: 2 }}>Set your price per unit in {inputUnit}.</Text>
                {/* Crypto equivalent display */}
                {inputUnit !== currency && price ? (
                  <Text style={{ color: '#0ea5e9', fontSize: 13, marginTop: 2 }}>
                    ≈ {convertToCrypto(price, inputUnit, currency, conversionRates)} {currency}
                  </Text>
                ) : null}
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>Min Order</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    value={minOrder}
                    onChangeText={setMinOrder}
                    style={[styles.input, { flex: 1 }]}
                    keyboardType="numeric"
                    placeholder="e.g. 100"
                    placeholderTextColor="#a16207"
                    returnKeyType="done"
                    blurOnSubmit={true}
                  />
                  <Text style={{ marginLeft: 8, color: '#78350f', fontWeight: '700', fontSize: 15 }}>{inputUnit}</Text>
                </View>
                <Text style={{ color: '#a16207', fontSize: 12, marginTop: 2 }}>Minimum order size allowed (in {inputUnit}).</Text>
                {inputUnit !== currency && minOrder ? (
                  <Text style={{ color: '#0ea5e9', fontSize: 13, marginTop: 2 }}>
                    ≈ {convertToCrypto(minOrder, inputUnit, currency, conversionRates)} {currency}
                  </Text>
                ) : null}
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>Max Order</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    value={maxOrder}
                    onChangeText={setMaxOrder}
                    style={[styles.input, { flex: 1 }]}
                    keyboardType="numeric"
                    placeholder="e.g. 10000"
                    placeholderTextColor="#a16207"
                    returnKeyType="done"
                    blurOnSubmit={true}
                  />
                  <Text style={{ marginLeft: 8, color: '#78350f', fontWeight: '700', fontSize: 15 }}>{inputUnit}</Text>
                </View>
                <Text style={{ color: '#a16207', fontSize: 12, marginTop: 2 }}>Maximum order size allowed (in {inputUnit}).</Text>
                {inputUnit !== currency && maxOrder ? (
                  <Text style={{ color: '#0ea5e9', fontSize: 13, marginTop: 2 }}>
                    ≈ {convertToCrypto(maxOrder, inputUnit, currency, conversionRates)} {currency}
                  </Text>
                ) : null}
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>Payment Methods <Text style={{ fontWeight: '400', color: '#a16207', fontSize: 12 }}>(Select all that apply)</Text></Text>
                <Text style={{ color: '#a16207', fontSize: 12, marginBottom: 2 }}>
                  {orderType === 'buy' ? 'How will you accept payment?' : 'How will you pay the seller?'}
                </Text>
                {showError('paymentMethods')}
                <View style={{ flexDirection: 'row', marginBottom: 4, flexWrap: 'wrap' }}>
                  {['Bank Transfer', 'USSD', 'Mobile Money', 'Cash Deposit'].map(option => {
                    const selected = paymentMethods.includes(option);
                    return (
                      <TouchableOpacity
                        key={option}
                        onPress={() => {
                          setPaymentMethods(selected ? paymentMethods.filter(m => m !== option) : [...paymentMethods, option]);
                        }}
                        style={{
                          paddingVertical: 8,
                          paddingHorizontal: 16,
                          borderRadius: 8,
                          backgroundColor: selected ? '#16a34a' : '#fde68a',
                          marginRight: 10,
                          marginBottom: 6,
                        }}
                      >
                        <Text style={{ color: selected ? '#fff' : '#78350f', fontWeight: '700', fontSize: 15 }}>{option}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              <View style={styles.modalBtnRow}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  activeOpacity={0.7}
                  onPress={() => setShowCreateModal(false)}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.createBtn}
                  activeOpacity={0.7}
                  onPress={handleCreateOrder}
                >
                  <Text style={styles.createBtnText}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Top right: Create Order and Refresh always visible */}
      <View style={{ flexDirection: 'row', position: 'absolute', top: 18, right: 16, zIndex: 20 }}>
        {CreateOrderFAB}
        <TouchableOpacity
          onPress={fetchOffers}
          style={{ marginLeft: 10, alignItems: 'center', flexDirection: 'row', backgroundColor: 'transparent', padding: 0 }}
          accessibilityLabel="Refresh"
        >
          <Text style={{ fontSize: 22, color: '#16a34a', fontWeight: 'bold' }}>🔄</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={offers}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40, color: textColor }}>No active offers</Text>}
        contentContainerStyle={{ padding: 16 }}
      />
      <Modal
        visible={showCreateModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.polishedModalContainer}>
            <Text style={styles.modalTitle}>Create P2P Order</Text>
            <Text style={styles.label}>Type</Text>
            <View style={{ flexDirection: 'row', marginBottom: 4, flexWrap: 'wrap' }}>
              <TouchableOpacity
                onPress={() => setOrderType('buy')}
                style={{
                  marginRight: 10,
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                  backgroundColor: orderType==='buy' ? '#16a34a' : '#fde68a',
                  borderWidth: orderType==='buy' ? 0 : 1,
                  borderColor: orderType==='buy' ? '#16a34a' : '#fdba74',
                }}>
                <Text style={{ color: orderType==='buy' ? '#fff' : '#16a34a', fontWeight: 'bold', fontSize: 15 }}>Buy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setOrderType('sell')}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                  backgroundColor: orderType==='sell' ? '#16a34a' : '#fde68a',
                  borderWidth: orderType==='sell' ? 0 : 1,
                  borderColor: orderType==='sell' ? '#16a34a' : '#fdba74',
                }}>
                <Text style={{ color: orderType==='sell' ? '#fff' : '#16a34a', fontWeight: 'bold', fontSize: 15 }}>Sell</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.label}>Currency</Text>
            <TextInput value={currency} onChangeText={setCurrency} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, color: textColor, padding: 8, marginBottom: 12 }} placeholder="e.g. USDT" placeholderTextColor={subTextColor} />
            <Text style={styles.label}>Price</Text>
            <TextInput value={price} onChangeText={setPrice} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, color: textColor, padding: 8, marginBottom: 12 }} keyboardType="numeric" placeholder="e.g. 1000" placeholderTextColor={subTextColor} />
            <Text style={styles.label}>Min Order</Text>
            <TextInput value={minOrder} onChangeText={setMinOrder} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, color: textColor, padding: 8, marginBottom: 12 }} keyboardType="numeric" placeholder="e.g. 100" placeholderTextColor={subTextColor} />
            <Text style={styles.label}>Max Order</Text>
            <TextInput value={maxOrder} onChangeText={setMaxOrder} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, color: textColor, padding: 8, marginBottom: 12 }} keyboardType="numeric" placeholder="e.g. 10000" placeholderTextColor={subTextColor} />
            <Text style={styles.label}>Payment Methods (comma separated)</Text>
            <TextInput value={paymentMethods.join(', ')} onChangeText={(text) => setPaymentMethods(text.split(',').map(m => m.trim()).filter(Boolean))} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, color: textColor, padding: 8, marginBottom: 18 }} placeholder="e.g. Bank Transfer, PayPal" placeholderTextColor={subTextColor} />
            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.7} onPress={() => setShowCreateModal(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createBtn} activeOpacity={0.7} onPress={handleCreateOrder}>
                <Text style={styles.createBtnText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  polishedModalContainer: {
    backgroundColor: '#fdba74', // orange-300
    borderRadius: 22,
    padding: 16,
    width: '92%',
    maxWidth: 400,
    alignSelf: 'center',
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#a16207', // orange-700
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  formRow: {
    marginBottom: 2,
  },
  offerCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#16a34a',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    color: '#78350f', // orange-900
    fontWeight: '700',
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#fff7ed', // orange-50
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fdba74',
    padding: 10,
    fontSize: 15,
    color: '#78350f',
  },
  pickerWrapper: {
    backgroundColor: '#fff7ed',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fdba74',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    color: '#78350f',
    fontSize: 15,
    minHeight: 40,
  },
  typeBtn: {
    backgroundColor: '#fde68a', // orange-200
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 18,
    marginRight: 10,
  },
  typeBtnActive: {
    backgroundColor: '#f59e42', // orange-400
  },
  typeBtnText: {
    color: '#78350f',
    fontWeight: '700',
    fontSize: 15,
  },
  typeBtnTextActive: {
    color: '#fff',
  },
  modalBtnRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 4,
    marginBottom: 4,
  },
  createBtn: {
    backgroundColor: '#16a34a',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 22,
    alignItems: 'center',
    marginLeft: 8,
  },
  createBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelBtn: {
    backgroundColor: '#fff7ed',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fdba74',
  },
  cancelBtnText: {
    color: '#a16207',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default P2POffersList;
