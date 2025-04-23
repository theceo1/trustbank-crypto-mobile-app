//src/pages/TradeRoom.tsx
import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { P2PStackParamList } from '../App';
import { useTheme } from '../contexts/ThemeContext';
import BottomNavigation from '../components/BottomNavigation';

type TradeRoomProps = {
  trade: any;
  onBack: () => void;
};

const TradeRoom: React.FC<TradeRoomProps> = ({ trade, onBack }) => {
  const { theme } = useTheme();
  // Defensive fallback for trade
  const safeTrade = trade || {};
  const assetSymbol = (safeTrade.currency || '').toUpperCase();
  const assetIcon = assetSymbol === 'BTC' ? '₿' : assetSymbol === 'ETH' ? 'Ξ' : assetSymbol === 'USDT' ? '🪙' : '💱';
  const tradeType = (safeTrade.type || '').toUpperCase();
  const price = safeTrade.price !== undefined ? safeTrade.price : '--';
  const minOrder = safeTrade.min_order !== undefined ? safeTrade.min_order : '--';
  const maxOrder = safeTrade.max_order !== undefined ? safeTrade.max_order : '--';
  const [paymentProof, setPaymentProof] = useState('');
  const [status, setStatus] = useState(safeTrade.status || 'pending');

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
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      {/* Header - match TradePage style */}
      <View style={{ paddingTop: 40, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 4, color: theme.colors.brandGreen }}>Trade Room</Text>
        <Text style={{ fontSize: 15, color: theme.colors.secondaryText, textAlign: 'center' }}>
          Manage your active trade. Upload payment proof, confirm, or dispute.
        </Text>
      </View>
      {/* Trade Summary Card */}
      <View style={styles.summaryCardWrapper}>
        <View style={[styles.summaryAccent, { backgroundColor: theme.colors.primary }]} />
        <View style={[styles.summaryCard, { backgroundColor: theme.colors.card, shadowColor: theme.colors.primary }]}> 
          <View style={[styles.assetIconWrapper, { backgroundColor: theme.colors.card }]}> 
            <Text style={[styles.assetIcon, { color: theme.colors.primary }]}>{assetIcon}</Text>
          </View>
          <Text style={[styles.tradeType, { color: theme.colors.text }]}>{tradeType} <Text style={styles.asset}>{assetSymbol}</Text></Text>
          <Text style={[styles.summaryDetail, { color: theme.colors.secondaryText }]}><Text style={styles.summaryLabel}>Price:</Text> {price}</Text>
          <Text style={[styles.summaryDetail, { color: theme.colors.secondaryText }]}><Text style={styles.summaryLabel}>Min:</Text> {minOrder} <Text style={styles.summaryLabel}>/ Max:</Text> {maxOrder}</Text>
          <Text style={styles.statusLabel}>Status: <Text style={[styles.statusValue, status === 'pending' ? styles.statusPending : status === 'paid' ? styles.statusPaid : status === 'completed' ? styles.statusCompleted : styles.statusDisputed]}>{status}</Text></Text>
        </View>
      </View>
      {/* Action Section */}
      <View style={[styles.actionSection, { backgroundColor: theme.colors.card }]}> 
        {status === 'pending' && (
          <View style={{marginBottom: 16}}>
            <TextInput
              placeholder="Enter payment proof (e.g. transfer ref)"
              value={paymentProof}
              onChangeText={setPaymentProof}
              style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
              placeholderTextColor={theme.colors.secondaryText}
            />
            <View style={{marginTop: 4}}>
              <Button title="Upload Payment Proof" onPress={uploadProof} />
            </View>
          </View>
        )}
        {status === 'paid' && (
          <View style={{marginBottom: 16}}>
            <Button title="Seller: Confirm Payment" onPress={confirmPayment} />
          </View>
        )}
        <View style={{marginBottom: 10}}>
          <Button title="Open Dispute" onPress={openDispute} color="#e74c3c" />
        </View>
      </View>
      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    paddingTop: 0,
    justifyContent: 'flex-start',
  },
  // header removed, using AppHeader instead
  headerBack: {
    fontSize: 28,
    color: '#64748b',
    width: 28,
    textAlign: 'left',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#18181b',
    flex: 1,
    textAlign: 'center',
  },
  summaryCardWrapper: {
    marginTop: 12,
    marginBottom: 8,
    alignItems: 'center',
    position: 'relative',
  },
  summaryAccent: {
    position: 'absolute',
    top: 0,
    left: '10%',
    right: '10%',
    height: 10,
    backgroundColor: '#facc15',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    zIndex: 1,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#facc15',
    shadowOpacity: 0.13,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    marginTop: 6,
    zIndex: 2,
  },
  assetIconWrapper: {
    backgroundColor: '#fef3c7',
    borderRadius: 32,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  assetIcon: {
    fontSize: 28,
    color: '#eab308',
  },
  tradeType: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#18181b',
    marginBottom: 2,
  },
  asset: {
    color: '#16a34a',
    fontWeight: 'bold',
    fontSize: 18,
  },
  summaryDetail: {
    fontSize: 14,
    color: '#52525b',
    marginBottom: 2,
  },
  summaryLabel: {
    fontWeight: '600',
    color: '#64748b',
  },
  statusLabel: {
    marginTop: 6,
    fontWeight: '600',
    fontSize: 14,
    color: '#64748b',
  },
  statusValue: {
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  statusPending: {
    color: '#f59e42',
  },
  statusPaid: {
    color: '#2563eb',
  },
  statusCompleted: {
    color: '#16a34a',
  },
  statusDisputed: {
    color: '#e74c3c',
  },
  actionSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 18,
    marginTop: 12,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 6,
    padding: 10,
    borderRadius: 8,
    fontSize: 15,
    backgroundColor: '#fafafa',
  },
  actionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 6,
    padding: 10,
    borderRadius: 8,
    fontSize: 15,
    backgroundColor: '#fafafa',
  },
});

export default TradeRoom;
