
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather, FontAwesome } from '@expo/vector-icons';
import { View, Image, Text } from "react-native";
// import Button from "@/components/ui/button";
// import Input from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// NOTE: The above custom UI components are commented out to isolate a native crash.
import { AreaChart, LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import Svg, { Defs, LinearGradient, Stop } from "react-native-svg";

// Mock Market Data
const marketData = [
  { 
    id: "btc",
    name: "Bitcoin", 
    symbol: "BTC", 
    price: 61245.32, 
    change: 2.4, 
    marketCap: 1202.45,
    volume24h: 28.56,
    high24h: 62100.25,
    low24h: 59870.18,
    iconUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    priceHistory: [61000, 60500, 61200, 61600, 61400, 61800, 62000, 61245],
    isFavorite: true
  },
  { 
    id: "eth",
    name: "Ethereum", 
    symbol: "ETH", 
    price: 3998.75, 
    change: 4.2, 
    marketCap: 482.34,
    volume24h: 15.21,
    high24h: 4050.10,
    low24h: 3850.75,
    iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    priceHistory: [3850, 3880, 3920, 3960, 4010, 4050, 4030, 3998],
    isFavorite: true
  },
  { 
    id: "sol",
    name: "Solana", 
    symbol: "SOL", 
    price: 132.56, 
    change: -1.3, 
    marketCap: 58.67,
    volume24h: 3.45,
    high24h: 135.20,
    low24h: 130.10,
    iconUrl: "https://cryptologos.cc/logos/solana-sol-logo.png",
    priceHistory: [134, 133.5, 133, 132, 131.5, 131, 132, 132.56],
    isFavorite: false
  },
  { 
    id: "ada",
    name: "Cardano", 
    symbol: "ADA", 
    price: 0.45, 
    change: 1.2, 
    marketCap: 15.78,
    volume24h: 0.65,
    high24h: 0.46,
    low24h: 0.44,
    iconUrl: "https://cryptologos.cc/logos/cardano-ada-logo.png",
    priceHistory: [0.44, 0.44, 0.45, 0.45, 0.46, 0.45, 0.45, 0.45],
    isFavorite: false
  },
  { 
    id: "xrp",
    name: "XRP", 
    symbol: "XRP", 
    price: 0.65, 
    change: -0.8, 
    marketCap: 35.2,
    volume24h: 1.82,
    high24h: 0.66,
    low24h: 0.64,
    iconUrl: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
    priceHistory: [0.66, 0.65, 0.65, 0.64, 0.64, 0.65, 0.65, 0.65],
    isFavorite: false
  },
  { 
    id: "dot",
    name: "Polkadot", 
    symbol: "DOT", 
    price: 7.82, 
    change: 3.1, 
    marketCap: 9.85,
    volume24h: 0.53,
    high24h: 8.05,
    low24h: 7.55,
    iconUrl: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
    priceHistory: [7.6, 7.65, 7.7, 7.75, 7.9, 8.0, 7.95, 7.82],
    isFavorite: true
  },
  { 
    id: "bnb",
    name: "BNB", 
    symbol: "BNB", 
    price: 634.21, 
    change: 0.5, 
    marketCap: 97.54,
    volume24h: 2.31,
    high24h: 638.50,
    low24h: 630.25,
    iconUrl: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    priceHistory: [630, 632, 634, 636, 638, 637, 635, 634.21],
    isFavorite: false
  },
];

const MarketPage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(marketData);
  const [sortBy, setSortBy] = useState("marketCap");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter and sort data
  useEffect(() => {
    let filtered = [...marketData];
    
    // Filter by tab
    if (activeTab === "favorites") {
      filtered = filtered.filter(coin => coin.isFavorite);
    } else if (activeTab === "gainers") {
      filtered = filtered.filter(coin => coin.change > 0);
    } else if (activeTab === "losers") {
      filtered = filtered.filter(coin => coin.change < 0);
    }
    
    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        coin => coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort data
    filtered.sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortBy as keyof typeof a] > b[sortBy as keyof typeof b] ? 1 : -1;
      } else {
        return a[sortBy as keyof typeof a] < b[sortBy as keyof typeof b] ? 1 : -1;
      }
    });
    
    setData(filtered);
  }, [searchQuery, sortBy, sortDirection, activeTab]);

  const toggleFavorite = (id: string) => {
    setData(prev => 
      prev.map(coin => 
        coin.id === id ? { ...coin, isFavorite: !coin.isFavorite } : coin
      )
    );
  };

  const getSortIcon = (field: string) => {
    if (sortBy === field) {
      return sortDirection === "asc" ? (
        <Feather name="arrow-up" size={16} />
      ) : (
        <Feather name="arrow-down" size={16} />
      );
    }
    return null;
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("desc");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={{ paddingTop: 40, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' }}>
        
        <View style={{ marginLeft: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Market</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={{ flex: 1, padding: 16 }}>
        {/* Search bar */}
        <View style={{ position: 'relative', marginBottom: 24 }}>
          <Feather name="search" size={16} style={{ position: 'absolute', left: 12, top: 14, color: '#888' }} />
          <View style={{ borderWidth: 1, borderColor: '#eee', borderRadius: 8, paddingLeft: 36 }}>
  <Text style={{ color: '#888', paddingVertical: 8 }}>{searchQuery || 'Search coins...'}</Text>
</View>
        </View>

        {/* Overview */}
        <View style={{ padding: 16, marginBottom: 24, backgroundColor: '#fff', borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <View>
              <Text style={{ fontSize: 12, color: '#888' }}>Market Cap</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>$2.4T</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, color: '#888' }}>24h Volume</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>$87.5B</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, color: '#888' }}>BTC Dominance</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>43.2%</Text>
            </View>
          </View>
          <View style={{ marginTop: 16, height: 96, backgroundColor: '#e8fdf3', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
  <Text style={{ color: '#10b981' }}>Market chart unavailable</Text>
</View>
        </View>

        {/* Tabs and Coin List */}
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
  {['all', 'favorites', 'gainers', 'losers'].map(tab => (
    <Text
      key={tab}
      onPress={() => setActiveTab(tab)}
      style={{
        padding: 8,
        marginRight: 8,
        backgroundColor: activeTab === tab ? '#10b981' : '#f6f6f6',
        color: activeTab === tab ? '#fff' : '#333',
        borderRadius: 4,
        fontWeight: 'bold',
      }}
    >
      {tab.charAt(0).toUpperCase() + tab.slice(1)}
    </Text>
  ))}
</View>
<View>
            <View style={{ borderRadius: 8, borderWidth: 1, borderColor: '#eee', overflow: 'hidden' }}>
              {/* Table header */}
              <View style={{ flexDirection: 'row', padding: 12, backgroundColor: '#f6f6f6' }}>
                <View style={{ flex: 5, flexDirection: 'row', alignItems: 'center' }}>
                  <Text onPress={() => handleSort("name")} style={{ fontWeight: 'bold' }}>Name {getSortIcon("name")}</Text>
                </View>
                <View style={{ flex: 3, alignItems: 'flex-end' }}>
                  <Text onPress={() => handleSort("price")} style={{ fontWeight: 'bold' }}>Price {getSortIcon("price")}</Text>
                </View>
                <View style={{ flex: 4, alignItems: 'flex-end' }}>
                  <Text onPress={() => handleSort("change")} style={{ fontWeight: 'bold' }}>24h Change {getSortIcon("change")}</Text>
                </View>
              </View>
              {/* Data rows */}
              {/* Coin list rendering temporarily commented out to isolate crash */}
<Text>Test</Text>
            </View>
          </View>
      </View>
    </View>
  );
};

export default MarketPage;
