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
} from 'react-native';
import { Select } from '../components/ui/select';
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

  // Search/filter state
  const [filterAsset, setFilterAsset] = useState('');
  const [filterType, setFilterType] = useState<'buy' | 'sell' | ''>('');
  const [filterPayment, setFilterPayment] = useState('');
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
      Toast.show({ type: 'error', text1: 'Failed to create order' });
    } else {
      Toast.show({ type: 'success', text1: 'Order created!' });
      // Refetch offers after creating
      const { data, error: fetchError } = await supabase
        .from('p2p_orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(PAGE_SIZE);
      if (!fetchError) setOffers(data || []);
    }
    setCreating(false);
    setShowCreateModal(false);
  };

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('p2p_orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(PAGE_SIZE);
      if (error) {
        Toast.show({ type: 'error', text1: 'Failed to load offers' });
        setOffers([]);
      } else {
        setOffers(data || []);
      }
      setLoading(false);
    };
    fetchOffers();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Main offers list and UI goes here */}
      <TouchableOpacity style={styles.createBtn} onPress={() => setShowCreateModal(true)}>
        <Text style={styles.createBtnText}>Create Offer</Text>
      </TouchableOpacity>
      {/* Example Offers List */}
      {loading ? (
        <ActivityIndicator size="large" color="#f59e42" />
      ) : offers.length === 0 ? (
        <Text
          style={{
            color: '#16a34a',
            marginTop: 32,
            textAlign: 'center',
          }}
        >No offers found.</Text>
      ) : (
        <FlatList
          data={offers}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelectOrder?.(item)}>
              <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#eee' }}>
                <Text style={{ fontWeight: 'bold', color: '#16a34a' }}>{item.currency || 'Asset'}</Text>
                <Text style={{ color: '#16a34a' }}>Type: {item.type}</Text>
                <Text style={{ color: '#16a34a' }}>Price: {item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
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
              style={styles.polishedModalContainer}
            >
              <ScrollView>
                <Text style={styles.label}>Type</Text>
                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                  {['buy', 'sell'].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.typeBtn,
                        createType === type && styles.typeBtnActive,
                      ]}
                      onPress={() => setCreateType(type as 'buy' | 'sell')}
                    >
                      <Text
                        style={[
                          styles.typeBtnText,
                          createType === type && styles.typeBtnTextActive,
                        ]}
                      >
                        {type.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.label}>Asset</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowAssetModal(true)}
                >
                  <Text>{createCurrency}</Text>
                </TouchableOpacity>
                <Text style={styles.label}>Price</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="decimal-pad"
                  value={createPrice}
                  onChangeText={setCreatePrice}
                  placeholder="Enter price"
                />
                {errors.price && (
                  <Text style={{ color: 'red', marginBottom: 8 }}>{errors.price}</Text>
                )}
                <Text style={styles.label}>Min Order</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="decimal-pad"
                  value={createMinOrder}
                  onChangeText={setCreateMinOrder}
                  placeholder="Enter min order"
                />
                {errors.min && (
                  <Text style={{ color: 'red', marginBottom: 8 }}>{errors.min}</Text>
                )}
                <Text style={styles.label}>Max Order</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="decimal-pad"
                  value={createMaxOrder}
                  onChangeText={setCreateMaxOrder}
                  placeholder="Enter max order"
                />
                {errors.max && (
                  <Text style={{ color: 'red', marginBottom: 8 }}>{errors.max}</Text>
                )}
                <Text style={styles.label}>Payment Methods</Text>
                <TextInput
                  style={styles.input}
                  value={createPayment.join(', ')}
                  onChangeText={(text) =>
                    setCreatePayment(text.split(',').map((t) => t.trim()))
                  }
                  placeholder="e.g. Bank Transfer, Mobile Money"
                />
                {errors.payment && (
                  <Text style={{ color: 'red', marginBottom: 8 }}>{errors.payment}</Text>
                )}
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
                    <Text style={styles.createBtnText}>
                      {creating ? 'Creating...' : 'Create'}
                    </Text>
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
              {/* Example asset options, replace with actual asset list */}
              {['USDT', 'BTC', 'ETH', 'NGN'].map((asset) => (
                <TouchableOpacity
                  key={asset}
                  onPress={() => {
                    setCreateCurrency(asset);
                    setShowAssetModal(false);
                  }}
                  style={{
                    padding: 12,
                    borderBottomWidth: 1,
                    borderColor: '#eee',
                  }}
                >
                  <Text>{asset}</Text>
                </TouchableOpacity>
              ))}
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
};

export default P2POffersList;