import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { P2PStackParamList } from '../App';

type TradeRoomProps = {
  trade: any;
  onBack: () => void;
};

const TradeRoom: React.FC<TradeRoomProps> = ({ trade, onBack }) => {
  const [paymentProof, setPaymentProof] = useState('');
  const [status, setStatus] = useState(trade.status);

  const uploadProof = async () => {
    const { error } = await supabase
      .from('p2p_trades')
      .update({ payment_proof: paymentProof, status: 'paid' })
      .eq('id', trade.id);
    if (error) Alert.alert('Error', error.message);
    else setStatus('paid');
  };

  const confirmPayment = async () => {
    const { error } = await supabase
      .from('p2p_trades')
      .update({ status: 'completed' })
      .eq('id', trade.id);
    if (error) Alert.alert('Error', error.message);
    else setStatus('completed');
  };

  const openDispute = async () => {
    const { error } = await supabase
      .from('p2p_disputes')
      .insert([{ trade_id: trade.id, reason: 'User dispute', status: 'open' }]);
    if (error) Alert.alert('Error', error.message);
    else setStatus('disputed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>Status: {status}</Text>
      {status === 'pending' && (
        <>
          <TextInput
            placeholder="Enter payment proof (e.g. transfer ref)"
            value={paymentProof}
            onChangeText={setPaymentProof}
            style={styles.input}
          />
          <Button title="Upload Payment Proof" onPress={uploadProof} />
        </>
      )}
      {status === 'paid' && (
        <Button title="Seller: Confirm Payment" onPress={confirmPayment} />
      )}
      <Button title="Open Dispute" onPress={openDispute} color="#e74c3c" />
      <Button title="Back" onPress={onBack} color="#64748b" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 24 },
  status: { fontWeight: 'bold', fontSize: 16, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 14, padding: 10, borderRadius: 8 },
});

export default TradeRoom;
