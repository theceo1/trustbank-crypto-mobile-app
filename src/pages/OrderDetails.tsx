import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { P2PStackParamList } from '../App';

type OrderDetailsProps = {
  order: any;
  onTradeCreated: (trade: any) => void;
  onBack: () => void;
};

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onTradeCreated, onBack }) => {
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
      onTradeCreated(data);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{order.type.toUpperCase()} {order.currency}</Text>
      <Text style={styles.price}>Price: {order.price}</Text>
      <Text style={styles.limits}>Min: {order.min_order} / Max: {order.max_order}</Text>
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Initiate Trade" onPress={initiateTrade} disabled={loading} />
      <Button title="Back" onPress={onBack} color="#64748b" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 8 },
  price: { color: '#1e90ff', fontSize: 16 },
  limits: { color: '#888', fontSize: 14, marginBottom: 14 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 14, padding: 10, borderRadius: 8 },
});

export default OrderDetails;
