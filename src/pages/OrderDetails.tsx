import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { P2PStackParamList } from '../App';

type OrderDetailsScreenNavigationProp = NativeStackNavigationProp<P2PStackParamList, 'OrderDetails'>;
type OrderDetailsScreenRouteProp = RouteProp<P2PStackParamList, 'OrderDetails'>;

const OrderDetails: React.FC = () => {
  const navigation = useNavigation<OrderDetailsScreenNavigationProp>();
  const route = useRoute<OrderDetailsScreenRouteProp>();
  const { order } = route.params;
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const initiateTrade = async () => {
    if (!amount || Number(amount) < order.min_order || Number(amount) > order.max_order) {
      Alert.alert('Invalid amount');
      return;
    }
    setLoading(true);
    // TODO: Replace with backend API call for security in production!
    const { data, error } = await supabase
      .from('p2p_trades')
      .insert([
        {
          order_id: order.id,
          amount: Number(amount),
          price: order.price,
          total: Number(amount) * order.price,
          status: 'pending'
        }
      ])
      .select()
      .single();
    setLoading(false);
    if (error) {
      Alert.alert('Failed to initiate trade', error.message);
    } else {
      // Navigate to TradeRoom with the created trade
      navigation.replace('TradeRoom', { trade: data });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.assetIcon}>{order.currency === 'BTC' ? '₿' : order.currency === 'ETH' ? 'Ξ' : order.currency === 'USDT' ? '🪙' : '💱'}</Text>
        <Text style={styles.title}>{order.type.toUpperCase()} {order.currency}</Text>
        <Text style={styles.price}>Price: <Text style={styles.priceValue}>{order.price}</Text></Text>
        <Text style={styles.limits}>Min: <Text style={styles.limitsValue}>{order.min_order}</Text> / Max: <Text style={styles.limitsValue}>{order.max_order}</Text></Text>
        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="#a3a3a3"
        />
        <View style={styles.buttonRow}>
          <Button title="Initiate Trade" onPress={initiateTrade} disabled={loading} color="#2563eb" />
        </View>
        <View style={styles.buttonRow}>
          <Button title="Back" onPress={() => navigation.goBack()} color="#64748b" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  assetIcon: {
    fontSize: 36,
    marginBottom: 6,
    color: '#2563eb',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
    color: '#18181b',
    textAlign: 'center',
  },
  price: {
    color: '#64748b',
    fontSize: 16,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  priceValue: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
  limits: {
    color: '#888',
    fontSize: 14,
    marginBottom: 14,
    textAlign: 'center',
  },
  limitsValue: {
    color: '#18181b',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 14,
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#f3f4f6',
    width: '100%',
    color: '#18181b',
  },
  buttonRow: {
    width: '100%',
    marginBottom: 8,
  },
});

export default OrderDetails;
