//src/pages/MarketPage.tsx
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { View, Image, Text, TextInput, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";


const MarketPage = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("volume");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [activeTab, setActiveTab] = useState("all");

  // Fetch market data from Quidax
  useEffect(() => {
    const fetchMarkets = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://www.quidax.com/api/v1/markets/tickers");
        if (!res.ok) throw new Error("Failed to fetch market rates");
        const result = await res.json();
        // result.data is an object: { btcngn: {ticker}, ethngn: {ticker}, ... }
        const coins = Object.entries(result.data).map(([market, { ticker }]: any) => {
          // Try to extract symbol and name from market string (e.g., btcngn)
          const symbol = market.slice(0, 3).toUpperCase();
          const fiat = market.slice(3).toUpperCase();
          return {
            id: market,
            name: symbol, // Could be improved with a symbol-to-name map
            symbol,
            price: parseFloat(ticker.last),
            change: parseFloat(ticker.price_change_percent),
            volume: parseFloat(ticker.vol),
            high24h: parseFloat(ticker.high),
            low24h: parseFloat(ticker.low),
            fiat,
            iconUrl: `https://cryptologos.cc/logos/${symbol.toLowerCase()}-${symbol.toLowerCase()}-logo.png`,
          };
        });
        setData(coins);
      } catch (e: any) {
        setError(e.message || "Failed to fetch market rates");
      }
      setLoading(false);
    };
    fetchMarkets();
  }, []);

  // Filter and sort data
  const filteredData = data.filter(coin => {
    if (activeTab === "gainers" && coin.change <= 0) return false;
    if (activeTab === "losers" && coin.change >= 0) return false;
    // No favorites logic for now
    if (searchQuery && !(coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || coin.name.toLowerCase().includes(searchQuery.toLowerCase()))) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "name") {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortDirection === "asc"
        ? a[sortBy] - b[sortBy]
        : b[sortBy] - a[sortBy];
    }
  });

  
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("desc");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <View style={{ paddingTop: 40, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <View style={{ marginLeft: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.text }}>Market</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={{ flex: 1, padding: 16 }}>
        {/* Search bar */}
        <View style={{ position: 'relative', marginBottom: 24 }}>
          <Feather name="search" size={16} style={{ position: 'absolute', left: 12, top: 14, color: theme.colors.border }} />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 8,
              paddingLeft: 36,
              color: '#16a34a',
              backgroundColor: theme.colors.card,
              height: 40,
            }}
            placeholder="Search coins..."
            placeholderTextColor="#16a34a"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Market Overview Heading */}
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.text, marginBottom: 12 }}>Market Overview</Text>
        {/* Overview (stats are placeholders) */}
        <View style={{ padding: 16, marginBottom: 24, backgroundColor: theme.colors.card, borderRadius: 8, shadowColor: theme.colors.text, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <View>
              <Text style={{ fontSize: 12, color: '#16a34a' }}>Market Cap</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.secondaryText }}>$-</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, color: '#16a34a' }}>24h Volume</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.secondaryText }}>$-</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, color: '#16a34a' }}>BTC Dominance</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.secondaryText }}>-</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          {['all', 'gainers', 'losers'].map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                padding: 8,
                marginRight: 8,
                backgroundColor: activeTab === tab ? '#10b981' : theme.colors.card,
                borderRadius: 4,
              }}
            >
              <Text style={{ color: activeTab === tab ? '#fff' : theme.colors.text, fontWeight: 'bold' }}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Coin List Table */}
        <View style={{ borderRadius: 8, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden', flex: 1, backgroundColor: theme.colors.card }}>
          {/* Table header */}
          <View style={{ flexDirection: 'row', padding: 12, backgroundColor: theme.colors.card }}>
            <View style={{ flex: 5, flexDirection: 'row', alignItems: 'center' }}>
              <Text onPress={() => setSortBy('name')} style={{ fontWeight: 'bold', color: theme.colors.text }}>Name</Text>
            </View>
            <View style={{ flex: 3, alignItems: 'flex-end' }}>
              <Text onPress={() => setSortBy('price')} style={{ fontWeight: 'bold', color: theme.colors.text }}>Price</Text>
            </View>
            <View style={{ flex: 4, alignItems: 'flex-end' }}>
              <Text onPress={() => setSortBy('change')} style={{ fontWeight: 'bold', color: theme.colors.text }}>24h Change</Text>
            </View>
          </View>
          {/* Data rows */}
          {loading ? (
            <View style={{ padding: 24, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator color={theme.colors.primary} />
            </View>
          ) : filteredData.length === 0 ? (
            <View style={{ padding: 24, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: theme.colors.text }}>No coins found.</Text>
            </View>
          ) : (
            <ScrollView style={{ flex: 1 }}>
              {filteredData.map(coin => (
                <View key={coin.id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderBottomWidth: 1, borderColor: theme.colors.border }}>
                  <Image source={{ uri: coin.iconUrl }} style={{ width: 32, height: 32, marginRight: 12 }} />
                  <View style={{ flex: 5 }}>
                    <Text style={{ fontWeight: 'bold', color: theme.colors.text }}>{coin.symbol}</Text>
                    <Text style={{ color: '#16a34a', fontSize: 12 }}>{coin.fiat}</Text>
                  </View>
                  <View style={{ flex: 3, alignItems: 'flex-end' }}>
                    <Text style={{ color: theme.colors.text }}>${coin.price.toLocaleString()}</Text>
                  </View>
                  <View style={{ flex: 4, alignItems: 'flex-end' }}>
                    <Text style={{ color: coin.change > 0 ? '#10b981' : coin.change < 0 ? '#ef4444' : theme.colors.text, fontWeight: 'bold' }}>
                      {coin.change > 0 ? '+' : ''}{coin.change.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

export default MarketPage;
