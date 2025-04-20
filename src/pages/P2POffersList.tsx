//src/pages/P2POffersList.tsx
import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput, Platform } from 'react-native';
import { supabase } from '../lib/supabase';
import { useTheme } from '../contexts/ThemeContext';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { P2PStackParamList } from '../App';

const P2POffersList: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<P2PStackParamList>>();
  const [offers, setOffers] = useState([]);
  // Search/filter state
  const [filterAsset, setFilterAsset] = useState('');
  const [filterType, setFilterType] = useState<'buy'|'sell'|''>('');
  const [filterPayment, setFilterPayment] = useState('');
  const [filterMinPrice, setFilterMinPrice] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);

  const { theme } = useTheme();
  const textColor = theme.colors.text;
  const subTextColor = theme.colors.secondaryText;

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
    <View style={{ padding: 16, borderBottomWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.card, borderRadius: 12, marginBottom: 12 }}>
      <Text style={{ color: textColor, fontWeight: 'bold' }}>{item.type.toUpperCase()} {item.currency}</Text>
      <Text style={{ color: textColor }}>Price: {item.price}</Text>
      <Text style={{ color: subTextColor }}>Min: {item.min_order} / Max: {item.max_order}</Text>
      <Text style={{ color: subTextColor }}>Payment: {item.payment_methods?.join(', ')}</Text>
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        <TouchableOpacity
          style={{ backgroundColor: '#16a34a', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 18, marginRight: 10 }}
          onPress={() => navigation.navigate('OrderDetails', { order: item })}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Take Offer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );



  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }


  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Search/filter bar */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, padding: 12, paddingTop: 50, backgroundColor: theme.colors.card, zIndex: 2 }}>
        <TextInput placeholder="Asset" value={filterAsset} onChangeText={setFilterAsset} style={{ flex: 1, minWidth: 60, backgroundColor: theme.colors.background, borderRadius: 8, borderWidth: 1, borderColor: theme.colors.border, padding: 7, marginRight: 6, color: textColor }} placeholderTextColor={theme.colors.secondaryText} />
        <TextInput placeholder="Payment" value={filterPayment} onChangeText={setFilterPayment} style={{ flex: 1, minWidth: 60, backgroundColor: theme.colors.background, borderRadius: 8, borderWidth: 1, borderColor: theme.colors.border, padding: 7, marginRight: 6, color: textColor }} placeholderTextColor={theme.colors.secondaryText} />
        <TextInput placeholder="Min Price" value={filterMinPrice} onChangeText={setFilterMinPrice} keyboardType="numeric" style={{ width: 80, backgroundColor: theme.colors.background, borderRadius: 8, borderWidth: 1, borderColor: theme.colors.border, padding: 7, marginRight: 6, color: textColor }} placeholderTextColor={theme.colors.secondaryText} />
        <TextInput placeholder="Max Price" value={filterMaxPrice} onChangeText={setFilterMaxPrice} keyboardType="numeric" style={{ width: 80, backgroundColor: theme.colors.background, borderRadius: 8, borderWidth: 1, borderColor: theme.colors.border, padding: 7, marginRight: 6, color: textColor }} placeholderTextColor={theme.colors.secondaryText} />
        <TouchableOpacity onPress={() => setFilterType(filterType === 'buy' ? '' : 'buy')} style={{ backgroundColor: filterType==='buy' ? '#16a34a' : '#fde68a', borderRadius: 8, paddingVertical: 7, paddingHorizontal: 14, marginRight: 6 }}>
          <Text style={{ color: filterType==='buy' ? '#fff' : '#78350f', fontWeight: '700' }}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterType(filterType === 'sell' ? '' : 'sell')} style={{ backgroundColor: filterType==='sell' ? '#16a34a' : '#fde68a', borderRadius: 8, paddingVertical: 7, paddingHorizontal: 14 }}>
          <Text style={{ color: filterType==='sell' ? '#fff' : '#78350f', fontWeight: '700' }}>Sell</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={offers.filter(o =>
          (!filterAsset || o.currency.toLowerCase().includes(filterAsset.toLowerCase())) &&
          (!filterType || o.type === filterType) &&
          (!filterPayment || (o.payment_methods && o.payment_methods.some((p: string) => p.toLowerCase().includes(filterPayment.toLowerCase())))) &&
          (!filterMinPrice || o.price >= Number(filterMinPrice)) &&
          (!filterMaxPrice || o.price <= Number(filterMaxPrice))
        )}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40, color: textColor }}>No active offers</Text>}
        contentContainerStyle={{ padding: 16 }}
      />

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

const P2POffersListWithToast = (props: any) => (
  <>
    <P2POffersList {...props} />
    <Toast />
  </>
);

export default P2POffersListWithToast;
