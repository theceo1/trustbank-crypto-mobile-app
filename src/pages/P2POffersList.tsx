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
  const [currency, setCurrency] = useState('USDT');
  const [price, setPrice] = useState('');
  const [minOrder, setMinOrder] = useState('');
  const [maxOrder, setMaxOrder] = useState('');
  const [paymentMethods, setPaymentMethods] = useState('');
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? '#fff' : '#000';
  const subTextColor = colorScheme === 'dark' ? '#d1d5db' : '#64748b';

  useEffect(() => {
    fetchOffers();
  }, []);

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
    setPaymentMethods('');
  };

  const handleOpenCreate = () => {
    resetCreateForm();
    setShowCreateModal(true);
  };

  const handleCreateOrder = async () => {
    // Compose the order object
    const order = {
      type: orderType,
      currency,
      price: parseFloat(price),
      min_order: parseFloat(minOrder),
      max_order: parseFloat(maxOrder),
      payment_methods: paymentMethods.split(',').map(m => m.trim()).filter(Boolean),
      status: 'active',
      created_at: new Date().toISOString(),
    };
    try {
      const { data, error } = await supabase
        .from('p2p_orders')
        .insert([order]);
      if (error) {
        console.error('Error creating order:', error);
      } else {
        setShowCreateModal(false);
        fetchOffers();
      }
    } catch (err) {
      console.error('Unexpected error creating order:', err);
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  // Only show Create Order as floating top right, and Refresh as text link below empty state
  const CreateOrderFAB = (
    <TouchableOpacity
      style={[
        styles.createOrderBtn,
        {
          backgroundColor: '#16a34a',
          shadowColor: colorScheme === 'dark' ? '#000' : '#16a34a',
          paddingVertical: 7,
          paddingHorizontal: 16,
          borderRadius: 12,
          position: 'absolute',
          top: 18,
          right: 16,
          zIndex: 10
        }
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
            <View style={[styles.modalContainer, { backgroundColor: colorScheme === 'dark' ? '#18181b' : '#fff' }] }>
              <Text style={{ color: textColor, fontSize: 18, fontWeight: '700', marginBottom: 16 }}>Create P2P Order</Text>
              <Text style={{ color: subTextColor, marginBottom: 6 }}>Type</Text>
              <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                <TouchableOpacity onPress={() => setOrderType('buy')} style={{ marginRight: 12, padding: 8, borderRadius: 8, backgroundColor: orderType==='buy' ? '#16a34a' : '#f3f4f6' }}>
                  <Text style={{ color: orderType==='buy' ? '#fff' : textColor }}>Buy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOrderType('sell')} style={{ padding: 8, borderRadius: 8, backgroundColor: orderType==='sell' ? '#16a34a' : '#f3f4f6' }}>
                  <Text style={{ color: orderType==='sell' ? '#fff' : textColor }}>Sell</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ color: subTextColor, marginBottom: 6 }}>Currency</Text>
              <TextInput value={currency} onChangeText={setCurrency} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, color: textColor, padding: 8, marginBottom: 12 }} placeholder="e.g. USDT" placeholderTextColor={subTextColor} />
              <Text style={{ color: subTextColor, marginBottom: 6 }}>Price</Text>
              <TextInput value={price} onChangeText={setPrice} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, color: textColor, padding: 8, marginBottom: 12 }} keyboardType="numeric" placeholder="e.g. 1000" placeholderTextColor={subTextColor} />
              <Text style={{ color: subTextColor, marginBottom: 6 }}>Min Order</Text>
              <TextInput value={minOrder} onChangeText={setMinOrder} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, color: textColor, padding: 8, marginBottom: 12 }} keyboardType="numeric" placeholder="e.g. 100" placeholderTextColor={subTextColor} />
              <Text style={{ color: subTextColor, marginBottom: 6 }}>Max Order</Text>
              <TextInput value={maxOrder} onChangeText={setMaxOrder} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, color: textColor, padding: 8, marginBottom: 12 }} keyboardType="numeric" placeholder="e.g. 10000" placeholderTextColor={subTextColor} />
              <Text style={{ color: subTextColor, marginBottom: 6 }}>Payment Methods (comma separated)</Text>
              <TextInput value={paymentMethods} onChangeText={setPaymentMethods} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, color: textColor, padding: 8, marginBottom: 18 }} placeholder="e.g. Bank Transfer, PayPal" placeholderTextColor={subTextColor} />
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 16, marginTop: 10 }}>
                <TouchableOpacity
                  style={[styles.secondaryBtn, {backgroundColor: colorScheme==='dark' ? '#444' : '#f3f4f6'}]}
                  activeOpacity={0.7}
                  onPress={() => setShowCreateModal(false)}
                >
                  <Text style={{ color: textColor, fontWeight: '600', fontSize: 15 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.primaryBtn, {backgroundColor: '#16a34a'}]}
                  activeOpacity={0.7}
                  onPress={handleCreateOrder}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Create</Text>
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
          <View style={[styles.modalContainer, { backgroundColor: colorScheme === 'dark' ? '#18181b' : '#fafafa' }] }>
            <Text style={{ color: textColor, fontSize: 18, fontWeight: '700', marginBottom: 16 }}>Create P2P Order</Text>
            <Text style={{ color: subTextColor, marginBottom: 6 }}>Type</Text>
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
              <TouchableOpacity onPress={() => setOrderType('buy')} style={{ marginRight: 12, padding: 8, borderRadius: 8, backgroundColor: orderType==='buy' ? '#16a34a' : '#f3f4f6' }}>
                <Text style={{ color: orderType==='buy' ? '#fff' : textColor }}>Buy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOrderType('sell')} style={{ padding: 8, borderRadius: 8, backgroundColor: orderType==='sell' ? '#16a34a' : '#f3f4f6' }}>
                <Text style={{ color: orderType==='sell' ? '#fff' : textColor }}>Sell</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ color: subTextColor, marginBottom: 6 }}>Currency</Text>
            <TextInput value={currency} onChangeText={setCurrency} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, color: textColor, padding: 8, marginBottom: 12 }} placeholder="e.g. USDT" placeholderTextColor={subTextColor} />
            <Text style={{ color: subTextColor, marginBottom: 6 }}>Price</Text>
            <TextInput value={price} onChangeText={setPrice} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, color: textColor, padding: 8, marginBottom: 12 }} keyboardType="numeric" placeholder="e.g. 1000" placeholderTextColor={subTextColor} />
            <Text style={{ color: subTextColor, marginBottom: 6 }}>Min Order</Text>
            <TextInput value={minOrder} onChangeText={setMinOrder} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, color: textColor, padding: 8, marginBottom: 12 }} keyboardType="numeric" placeholder="e.g. 100" placeholderTextColor={subTextColor} />
            <Text style={{ color: subTextColor, marginBottom: 6 }}>Max Order</Text>
            <TextInput value={maxOrder} onChangeText={setMaxOrder} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, color: textColor, padding: 8, marginBottom: 12 }} keyboardType="numeric" placeholder="e.g. 10000" placeholderTextColor={subTextColor} />
            <Text style={{ color: subTextColor, marginBottom: 6 }}>Payment Methods (comma separated)</Text>
            <TextInput value={paymentMethods} onChangeText={setPaymentMethods} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, color: textColor, padding: 8, marginBottom: 18 }} placeholder="e.g. Bank Transfer, PayPal" placeholderTextColor={subTextColor} />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
              <TouchableOpacity style={[styles.secondaryBtn, {backgroundColor: colorScheme==='dark' ? '#444' : '#f3f4f6'}]} activeOpacity={0.7} onPress={() => setShowCreateModal(false)}>
                <Text style={{ color: textColor, fontWeight: '600', fontSize: 15 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.primaryBtn, {backgroundColor: '#16a34a'}]} activeOpacity={0.7} onPress={handleCreateOrder}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  type: { fontWeight: 'bold', fontSize: 15, marginBottom: 2 },
  price: { color: '#16a34a', fontSize: 15, marginBottom: 2 },
  limits: { color: '#64748b', fontSize: 13 },
  payment: { color: '#444', fontSize: 13, marginTop: 2 },
  createOrderBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 12 : 8,
    right: 18,
    zIndex: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 22,
    shadowOpacity: 0.14,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  primaryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 18,
    alignItems: 'center',
    shadowColor: '#16a34a',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  secondaryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 18,
    alignItems: 'center',
    shadowColor: '#64748b',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 18,
    marginRight: 12,
    marginBottom: 10,
    zIndex: 20,
  },
  refreshBtn: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 18,
    alignItems: 'center',
    shadowColor: '#16a34a',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
    borderWidth: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    padding: 24,
    borderRadius: 18,
    width: '90%',
  },
});

export default P2POffersList;
