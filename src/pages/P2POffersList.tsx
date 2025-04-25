//src/pages/P2POffersList.tsx
import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Platform,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { supabase } from '../lib/supabase';
import { env } from '../config/env';
import { useTheme } from '../contexts/ThemeContext';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { P2PStackParamList } from '../App';

interface P2POffersListProps {
  onSelectOrder?: (order: any) => void;
}

const PAGE_SIZE = 20;
const OFFER_CARD_SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  polishedModalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '92%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    color: '#78350f',
    fontWeight: '700',
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#fff7ed',
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
    backgroundColor: '#fde68a',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 18,
    marginRight: 10,
  },
  typeBtnActive: {
    backgroundColor: '#f59e42',
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

const P2POffersList: React.FC<P2POffersListProps> = ({ onSelectOrder }) => {

  const navigation = useNavigation<NativeStackNavigationProp<P2PStackParamList>>();
  const theme = useTheme();
  const [offers, setOffers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState<'created_at' | 'price'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterAsset, setFilterAsset] = useState('');
  const [filterType, setFilterType] = useState<'buy' | 'sell' | ''>('');
  const [filterPayment, setFilterPayment] = useState('');
  const [highlightedOfferId, setHighlightedOfferId] = useState<string | number | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [typeDropdownVisible, setTypeDropdownVisible] = useState(false);
  const [filterMinPrice, setFilterMinPrice] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal state for create order
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createType, setCreateType] = useState<'buy' | 'sell'>('buy');
  const [createCurrency, setCreateCurrency] = useState('USDT');
  const [createPrice, setCreatePrice] = useState('');
  const [createMinOrder, setCreateMinOrder] = useState('');
  const [createMaxOrder, setCreateMaxOrder] = useState('');
  const [createPayment, setCreatePayment] = useState<string[]>([]);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [walletSearch, setWalletSearch] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [wallets, setWallets] = useState<any[]>([]);
  const [walletsLoading, setWalletsLoading] = useState(false);
  const [walletsError, setWalletsError] = useState<string | null>(null);
  const [tickers, setTickers] = useState<any>(null);

  // ...any other logic, functions, and effects...

  const [tickersLoading, setTickersLoading] = useState(false);
  const [tickersError, setTickersError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [createUnit, setCreateUnit] = useState<string>('NGN');

  // Dynamically build input unit options: NGN, USD, and current crypto
  const inputUnitOptions = ['NGN', 'USD'];
  if (createCurrency && !['NGN', 'USD'].includes(createCurrency)) {
    inputUnitOptions.push(createCurrency);
  }

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    if (!createPrice || isNaN(Number(createPrice)) || Number(createPrice) <= 0)
      newErrors.price = 'Enter a valid price.';
    if (!createMinOrder || isNaN(Number(createMinOrder)) || Number(createMinOrder) <= 0)
      newErrors.min = 'Enter a valid min order.';
    if (!createMaxOrder || isNaN(Number(createMaxOrder)) || Number(createMaxOrder) <= 0)
      newErrors.max = 'Enter a valid max order.';
    if (Number(createMinOrder) > Number(createMaxOrder))
      newErrors.min = 'Min order cannot exceed max order.';
    if (!createPayment.length) newErrors.payment = 'Select at least one payment method.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    if (!validateFields() || submitted) return;
    try {
      // ... your submit logic here ...
    } catch (err: any) {
      // ... your error handling here ...
    } finally {
      setSubmitted(false);
    }
  };

  const fetchWallets = async () => {
    setWalletsLoading(true);
    setWalletsError(null);
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('Not authenticated');
      const { data: profiles, error: profileError } = await supabase
        .from('user_profiles')
        .select('quidax_id')
        .eq('user_id', user.id)
        .maybeSingle();
      if (profileError || !profiles || !profiles.quidax_id)
        throw new Error('No Quidax account linked to this user');
      const quidaxId = profiles.quidax_id;
      const url = `${env.QUIDAX_API_URL}/users/${quidaxId}/wallets`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${env.QUIDAX_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        throw new Error('Failed to parse Quidax API response');
      }
      if (!response.ok) throw new Error(`Failed to fetch wallets: ${data?.message || response.status}`);
      setWallets(data.data || []);
    } catch (err: any) {
      setWalletsError(err.message || 'Failed to fetch wallets');
      setWallets([]);
    } finally {
      setWalletsLoading(false);
    }
  };

  const getUsdtEquivalent = (amount: string, currency: string, type: 'buy' | 'sell') => {
    if (!tickers || !amount || isNaN(Number(amount))) return null;
    if (currency.toUpperCase() === 'USDT') return Number(amount).toFixed(2);
    const market = `${currency.toLowerCase()}usdt`;
    const ticker = tickers[market]?.ticker;
    if (!ticker) return null;
    const rate = type === 'buy' ? Number(ticker.sell) : Number(ticker.buy);
    if (!rate || isNaN(rate)) return null;
    return (Number(amount) * rate).toFixed(2);
  };

  const getFromUsdtEquivalent = (amount: string, currency: string, type: 'buy' | 'sell') => {
    if (!tickers || !amount || isNaN(Number(amount))) return null;
    if (currency.toUpperCase() === 'USDT') return Number(amount).toFixed(2);
    const market = `${currency.toLowerCase()}usdt`;
    const ticker = tickers[market]?.ticker;
    if (!ticker) return null;
    const rate = type === 'buy' ? Number(ticker.sell) : Number(ticker.buy);
    if (!rate || isNaN(rate)) return null;
    return (Number(amount) / rate).toFixed(6);
  };

  const handleCreateOrder = async () => {
    setCreating(true);
    if (!createPrice || !createMinOrder || !createMaxOrder || !createPayment.length) {
      Toast.show({ type: 'error', text1: 'All fields required' });
      setCreating(false);
      return;
    }
    const { error } = await supabase.from('p2p_orders').insert([
      {
        type: createType,
        currency: createCurrency,
        price: Number(createPrice),
        min_order: Number(createMinOrder),
        max_order: Number(createMaxOrder),
        payment_methods: createPayment,
        status: 'active',
      },
    ]);
    if (error) {
      Toast.show({ type: 'error', text1: error.message || 'Failed to create order' });
    } else {
      Toast.show({ type: 'success', text1: 'Order created!' });
      // Prevent duplicate offers (client-side)
      const duplicate = offers.find(o =>
        o.type === createType &&
        o.currency === createCurrency &&
        o.price === Number(createPrice) &&
        o.min_order === Number(createMinOrder) &&
        o.max_order === Number(createMaxOrder) &&
        JSON.stringify(o.payment_methods) === JSON.stringify(createPayment)
      );
      if (duplicate) {
        Toast.show({ type: 'error', text1: 'Duplicate offer exists' });
        setCreating(false);
        return;
      }
      // Refetch offers after creating
      fetchOffers(true);
    }
    setCreating(false);
    setShowCreateModal(false);
  };

  // Fetch offers with pagination, sorting, filtering
  const fetchOffers = async (reset = false) => {
    if (reset) setPage(1);
    const currentPage = reset ? 1 : page;
    if (reset) setLoading(true);
    let query = supabase
      .from('p2p_orders')
      .select('*')
      .order(sortBy, { ascending: sortOrder === 'asc' })
      .range((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE - 1);
    if (filterAsset) query = query.eq('currency', filterAsset);
    if (filterType) query = query.eq('type', filterType);
    if (filterPayment) query = query.contains('payment_methods', [filterPayment]);
    const { data, error } = await query;
    if (error) {
      Toast.show({ type: 'error', text1: 'Failed to load offers' });
      if (reset) setOffers([]);
    } else {
      if (reset) {
        setOffers(data || []);
      } else {
        setOffers((prev) => [...prev, ...(data || [])]);
      }
      setHasMore((data?.length || 0) === PAGE_SIZE);
    }
    setLoading(false);
    setRefreshing(false);
  };

  // Real-time Supabase subscription for live updates
  useEffect(() => {
    const channel = supabase
      .channel('p2p_orders_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'p2p_orders' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setOffers((prev) => [payload.new, ...prev]);
          setHighlightedOfferId(payload.new.id);
          setTimeout(() => setHighlightedOfferId(null), 2000);
        } else if (payload.eventType === 'UPDATE') {
          setOffers((prev) => prev.map(o => o.id === payload.new.id ? payload.new : o));
        } else if (payload.eventType === 'DELETE') {
          setOffers((prev) => prev.filter(o => o.id !== payload.old.id));
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  useEffect(() => {
    // Fetch current user ID on mount
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    })();
    fetchOffers(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortOrder, filterAsset, filterType, filterPayment]);

  return (
    <View style={{ flex: 1 }}>
      {/* Main offers list and UI goes here */}
      <TouchableOpacity style={styles.createBtn} onPress={() => setShowCreateModal(true)}>
        <Text style={styles.createBtnText}>Create Offer</Text>
      </TouchableOpacity>
      {/* Compact Filter Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 6, paddingVertical: 2 }}
        style={{ marginBottom: 4 }}
      >
        {/* Sort by Date Icon */}
        <TouchableOpacity onPress={() => setSortBy('created_at')} style={{ marginRight: 8, padding: 4 }}>
          <Feather name="clock" size={18} color={sortBy === 'created_at' ? '#16a34a' : '#888'} />
        </TouchableOpacity>
        {/* Sort by Price Icon */}
        <TouchableOpacity onPress={() => setSortBy('price')} style={{ marginRight: 8, padding: 4 }}>
          <Feather name="tag" size={18} color={sortBy === 'price' ? '#16a34a' : '#888'} />
        </TouchableOpacity>
        {/* Sort Order Icon */}
        <TouchableOpacity onPress={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')} style={{ marginRight: 8, padding: 4 }}>
          <Feather name={sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'} size={18} color="#f59e42" />
        </TouchableOpacity>
        {/* Asset Input */}
        <TextInput
          style={{ backgroundColor: '#222', color: '#fff', borderRadius: 6, borderWidth: 1, borderColor: '#444', padding: 4, width: 60, marginRight: 8, fontSize: 13 }}
          placeholder="Asset"
          placeholderTextColor="#bbb"
          value={filterAsset}
          onChangeText={setFilterAsset}
        />
        {/* Type Dropdown (custom modal) */}
        <TouchableOpacity
          style={{ width: 70, marginRight: 8, backgroundColor: '#222', borderRadius: 6, borderWidth: 1, borderColor: '#444', paddingVertical: 4, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => setTypeDropdownVisible(true)}
        >
          <Text style={{ color: '#fff', fontSize: 13 }}>{filterType ? (filterType === 'buy' ? 'Buy' : 'Sell') : 'All'}</Text>
          <Feather name="chevron-down" size={14} color="#bbb" style={{ position: 'absolute', right: 8, top: 8 }} />
        </TouchableOpacity>
        {/* Payment Input */}
        <TextInput
          style={{ backgroundColor: '#222', color: '#fff', borderRadius: 6, borderWidth: 1, borderColor: '#444', padding: 4, width: 80, fontSize: 13, marginRight: 8 }}
          placeholder="Payment"
          placeholderTextColor="#bbb"
          value={filterPayment}
          onChangeText={setFilterPayment}
        />
        {/* Refresh Button */}
        <TouchableOpacity onPress={() => fetchOffers(true)} style={{ padding: 4 }}>
          <Feather name="refresh-cw" size={16} color="#16a34a" />
        </TouchableOpacity>
      </ScrollView>

      {/* Offers List Area */}
      {offers.length === 0 ? (
        <Text style={{ color: '#16a34a', marginTop: 32, textAlign: 'center' }}>No offers found.</Text>
      ) : (
        <FlatList
          data={offers}
          keyExtractor={(item, idx) => (item.id ? item.id.toString() : idx.toString())}
          renderItem={({ item }) => {
            const isOwnOffer = currentUserId && item.user_id === currentUserId;
            return (
              <TouchableOpacity
                onPress={() => !isOwnOffer && onSelectOrder?.(item)}
                activeOpacity={isOwnOffer ? 1 : 0.8}
                disabled={isOwnOffer}
              >
                <View style={{
                  backgroundColor: highlightedOfferId === item.id ? '#f59e42' : '#222',
                  borderRadius: 12,
                  marginHorizontal: 14,
                  marginVertical: 8,
                  padding: 18,
                  ...OFFER_CARD_SHADOW,
                  borderWidth: highlightedOfferId === item.id ? 2 : 0,
                  borderColor: highlightedOfferId === item.id ? '#fff' : 'transparent',
                }}>
                  {/* User avatar/username */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                    {/* Placeholder avatar */}
                    <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#16a34a', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
                      <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.username ? item.username[0].toUpperCase() : '?'}</Text>
                    </View>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>{item.username || 'User'}</Text>
                    <Text style={{ color: '#bbb', marginLeft: 10, fontSize: 12 }}>{new Date(item.created_at).toLocaleString()}</Text>
                  </View>
                  {/* Asset type icon and name */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    {/* Example: Feather icon for asset */}
                    <Feather name="dollar-sign" size={18} color="#16a34a" style={{ marginRight: 6 }} />
                    <Text style={{ color: '#16a34a', fontWeight: 'bold', fontSize: 16 }}>{item.currency || 'Asset'}</Text>
                    <Text style={{ color: '#fff', marginLeft: 8, fontSize: 15 }}>{item.type?.toUpperCase()}</Text>
                    {isOwnOffer && (
                      <View style={{ backgroundColor: '#f59e42', borderRadius: 6, paddingHorizontal: 8, marginLeft: 10 }}>
                        <Text style={{ color: '#222', fontWeight: 'bold', fontSize: 12 }}>Your Offer</Text>
                      </View>
                    )}
                  </View>
                  <Text style={{ color: '#fff', marginBottom: 2 }}>Price: <Text style={{ color: '#16a34a' }}>{item.price}</Text></Text>
                  <Text style={{ color: '#fff', marginBottom: 2 }}>Min: {item.min_order}  Max: {item.max_order}</Text>
                  {/* Payment methods with icon */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                    <Feather name="credit-card" size={16} color="#16a34a" style={{ marginRight: 4 }} />
                    <Text style={{ color: '#fff' }}>Payment: <Text style={{ color: '#16a34a' }}>{Array.isArray(item.payment_methods) ? item.payment_methods.join(', ') : item.payment_methods}</Text></Text>
                  </View>
                  {/* Action Button */}
                  {!isOwnOffer && (
                    <TouchableOpacity
                      style={{ marginTop: 10, backgroundColor: '#f59e42', borderRadius: 8, paddingVertical: 8, alignItems: 'center' }}
                      onPress={() => onSelectOrder?.(item)}
                    >
                      <Text style={{ color: '#222', fontWeight: 'bold', fontSize: 15 }}>Take Offer</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fetchOffers(true);
              }}
              colors={["#f59e42"]}
              progressViewOffset={64}
            />
          }
          onEndReached={() => {
            if (!loading && hasMore) {
              setPage((p) => p + 1);
              fetchOffers();
            }
          }}
          onEndReachedThreshold={0.2}
          contentContainerStyle={{ paddingBottom: 90 }}
        />
      )}
      {/* Create Offer Modal */}
      <Modal
        visible={showCreateModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={[
                styles.polishedModalContainer,
                {
                  backgroundColor: '#fdba74',
                  borderRadius: 28,
                  padding: 24,
                  maxHeight: '88%',
                  marginVertical: 36,
                  justifyContent: 'flex-start',
                },
              ]}
            >
              <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#78350f', textAlign: 'center', marginBottom: 18 }}>Create P2P Order</Text>
                {/* Type Selector */}
                <Text style={[styles.label, { marginTop: 0 }]}>Type</Text>
                <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                  {['buy', 'sell'].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.typeBtn,
                        createType === type && styles.typeBtnActive,
                        { backgroundColor: createType === type ? '#f59e42' : '#fde68a', paddingHorizontal: 28 }
                      ]}
                      onPress={() => setCreateType(type as 'buy' | 'sell')}
                    >
                      <Text
                        style={[
                          styles.typeBtnText,
                          createType === type && styles.typeBtnTextActive,
                          { fontWeight: 'bold' }
                        ]}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.label}>Asset</Text>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fde68a', borderRadius: 10, padding: 12, marginBottom: 8 }}
                  onPress={() => setShowAssetModal(true)}
                  activeOpacity={0.85}
                >
                  {(() => {
                    const wallet = wallets.find(w => w.currency === createCurrency);
                    const assetName = wallet ? wallet.name || assetNameFallback(wallet.currency) : '';
                    return (
                      <Text style={{ fontWeight: 'bold', color: '#78350f', fontSize: 16 }}>
                        {createCurrency} {assetName}
                      </Text>
                    );
                  })()}
                </TouchableOpacity>
                {/* Input Unit Selector */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={[styles.label, { marginBottom: 0, marginRight: 8 }]}>Input Unit:</Text>
                  {['NGN', 'USD', 'USDT'].map((unit) => (
                    <TouchableOpacity
                      key={unit}
                      onPress={() => setCreateUnit(unit)}
                      style={{
                        backgroundColor: createUnit === unit ? '#16a34a' : '#fde68a',
                        borderRadius: 8,
                        paddingVertical: 7,
                        paddingHorizontal: 14,
                        marginRight: 8,
                      }}
                    >
                      <Text style={{ color: createUnit === unit ? '#fff' : '#78350f', fontWeight: 'bold' }}>{unit}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={{ color: '#78350f', fontSize: 12, marginBottom: 10 }}>All values below will use this unit.</Text>
                {/* Price Input */}
                <Text style={styles.label}>Price</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                  <TextInput
                    style={[styles.input, { flex: 1, marginRight: 8 }]}
                    keyboardType="decimal-pad"
                    value={createPrice}
                    onChangeText={setCreatePrice}
                    placeholder={`e.g. 1000`}
                  />
                  <Text style={{ color: '#78350f', fontWeight: 'bold' }}>{createUnit}</Text>
                </View>
                <Text style={{ color: '#78350f', fontSize: 12, marginBottom: 10 }}>Set your price per unit in {createUnit}.</Text>
                {errors.price && (
                  <Text style={{ color: 'red', marginBottom: 8 }}>{errors.price}</Text>
                )}
                {/* Min Order */}
                <Text style={styles.label}>Min Order</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                  <TextInput
                    style={[styles.input, { flex: 1, marginRight: 8 }]}
                    keyboardType="decimal-pad"
                    value={createMinOrder}
                    onChangeText={setCreateMinOrder}
                    placeholder="e.g. 100"
                  />
                  <Text style={{ color: '#78350f', fontWeight: 'bold' }}>{createUnit}</Text>
                </View>
                <Text style={{ color: '#78350f', fontSize: 12, marginBottom: 10 }}>Minimum order size allowed (in {createUnit}).</Text>
                {errors.min && (
                  <Text style={{ color: 'red', marginBottom: 8 }}>{errors.min}</Text>
                )}
                {/* Max Order */}
                <Text style={styles.label}>Max Order</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                  <TextInput
                    style={[styles.input, { flex: 1, marginRight: 8 }]}
                    keyboardType="decimal-pad"
                    value={createMaxOrder}
                    onChangeText={setCreateMaxOrder}
                    placeholder="e.g. 10000"
                  />
                  <Text style={{ color: '#78350f', fontWeight: 'bold' }}>{createUnit}</Text>
                </View>
                <Text style={{ color: '#78350f', fontSize: 12, marginBottom: 10 }}>Maximum order size allowed (in {createUnit}).</Text>
                {errors.max && (
                  <Text style={{ color: 'red', marginBottom: 8 }}>{errors.max}</Text>
                )}
                {/* Payment Methods */}
                <Text style={styles.label}>Payment Methods <Text style={{ color: '#78350f', fontWeight: 'normal', fontSize: 12 }}>(Select all that apply)</Text></Text>
                <Text style={{ color: '#78350f', fontSize: 12, marginBottom: 7 }}>
                  {createType === 'buy' ? 'How will you accept payment?' : 'How will you make payment?'}
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 }}>
  {['Bank Transfer', 'USSD', 'Mobile Money', 'Cash Deposit'].map((option) => (
    <TouchableOpacity
      key={option}
      style={{
        backgroundColor: createPayment.includes(option) ? '#16a34a' : '#fde68a',
        borderRadius: 8,
        paddingVertical: 11,
        paddingHorizontal: 18,
        marginRight: 10,
        marginBottom: 10,
      }}
      onPress={() => {
        if (createPayment.includes(option)) {
          setCreatePayment(createPayment.filter((m) => m !== option));
        } else {
          setCreatePayment([...createPayment, option]);
        }
      }}
    >
      <Text style={{ color: createPayment.includes(option) ? '#fff' : '#78350f', fontWeight: 'bold', fontSize: 15 }}>{option}</Text>
    </TouchableOpacity>
  ))}
</View>
              {errors.payment && (
                <Text style={{ color: 'red', marginBottom: 8 }}>{errors.payment}</Text>
              )}
              {/* Buttons */}
              <View style={styles.modalBtnRow}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setShowCreateModal(false)}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.createBtn}
                  onPress={handleCreateOrder}
                  disabled={creating}
                >
                  <Text style={styles.createBtnText}>{creating ? 'Creating...' : 'Create'}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

    {/* Asset Selector Modal */}
    <Modal
      visible={showAssetModal}
      animationType="slide"
      transparent
      onRequestClose={() => setShowAssetModal(false)}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.polishedModalContainer}>
            <Text style={styles.label}>Select Asset</Text>
            {wallets.length === 0 ? (
              <Text style={{ color: '#78350f', textAlign: 'center', marginVertical: 32 }}>No assets found.</Text>
            ) : (
              <ScrollView style={{ maxHeight: 340 }}>
                {wallets.map((wallet) => (
                  <TouchableOpacity
                    key={wallet.currency}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 12,
                      borderBottomWidth: 1,
                      borderColor: '#eee',
                      backgroundColor: createCurrency === wallet.currency ? '#16a34a' : 'transparent',
                    }}
                    onPress={() => {
                      setCreateCurrency(wallet.currency);
                      setShowAssetModal(false);
                    }}
                  >
                    <Text style={{ color: createCurrency === wallet.currency ? '#fff' : '#000', fontWeight: createCurrency === wallet.currency ? 'bold' : '600', fontSize: 16 }}>
                      {wallet.currency}
                    </Text>
                    <Text style={{ color: createCurrency === wallet.currency ? '#fff' : '#666', marginLeft: 8, fontSize: 15 }}>
                      {wallet.name || assetNameFallback(wallet.currency)}
                    </Text>
                    <Text style={{ color: createCurrency === wallet.currency ? '#fff' : '#888', marginLeft: 8, fontSize: 15, marginRight: 6 }}>
                      ({wallet.balance})
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            <TouchableOpacity
              style={[styles.cancelBtn, { marginTop: 12 }]}
              onPress={() => setShowAssetModal(false)}
            >
              <Text style={styles.cancelBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  </View>
  );
}

// Helper to fallback to known asset names if not present from API
const assetNameFallback = (symbol: string) => {
  const map: { [key: string]: string } = {
    BTC: 'Bitcoin',
    ETH: 'Ethereum',
    USDT: 'Tether USD',
    USDC: 'USD Coin',
    NGN: 'Naira',
    USD: 'US Dollar',
    BNB: 'Binance Coin',
    XRP: 'Ripple',
    LTC: 'Litecoin',
    TRX: 'Tron',
    DOGE: 'Dogecoin',
    SOL: 'Solana',
    DAI: 'Dai',
    ADA: 'Cardano',
    DOT: 'Polkadot',
    MATIC: 'Polygon',
    SHIB: 'Shiba Inu',
    // Add more as needed
  };
  return map[symbol] || symbol;
};

export default P2POffersList;