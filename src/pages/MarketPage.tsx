
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather, FontAwesome } from '@expo/vector-icons';
import { View, Image, Text } from "react-native";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNavigation from "@/components/BottomNavigation";
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
        <Button
          style={{ backgroundColor: 'transparent', borderWidth: 0, padding: 0, margin: 0 }}
          onPress={() => navigation.navigate("Dashboard" as never)}
        >
          <Feather name="chevron-left" size={20} />
        </Button>
        <View style={{ marginLeft: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Market</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={{ flex: 1, padding: 16 }}>
        {/* Search bar */}
        <View style={{ position: 'relative', marginBottom: 24 }}>
          <Feather name="search" size={16} style={{ position: 'absolute', left: 12, top: 14, color: '#888' }} />
          <Input
            style={{ paddingLeft: 36 }}
            placeholder="Search coins..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Overview */}
        <Card style={{ padding: 16, marginBottom: 24 }}>
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
          <View style={{ marginTop: 16, height: 96 }}>
            <Svg width={96} height={96} style={StyleSheet.absoluteFill}>
              <Defs>
                <LinearGradient id="colorMarketCap" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <Stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </LinearGradient>
              </Defs>
            </Svg>
            <AreaChart
              style={{ height: 96 }}
              data={[2.2, 2.25, 2.3, 2.32, 2.35, 2.38, 2.4]}
              contentInset={{ top: 10, bottom: 10 }}
              curve={shape.curveMonotoneX}
              svg={{ fill: 'url(#colorMarketCap)' }}
            >
              <Grid />
            </AreaChart>
          </View>
        </Card>

        {/* Tabs and Coin List */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger tabValue="all">All</TabsTrigger>
            <TabsTrigger tabValue="favorites">Favorites</TabsTrigger>
            <TabsTrigger tabValue="gainers">Gainers</TabsTrigger>
            <TabsTrigger tabValue="losers">Losers</TabsTrigger>
          </TabsList>

          <TabsContent tabValue={activeTab}>
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
              {data.length > 0 ? (
                data.map((coin) => (
                  <View
                    key={coin.id}
                    style={{ flexDirection: 'row', padding: 16, alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' }}
                  >
                    <View style={{ flex: 5, flexDirection: 'row', alignItems: 'center' }}>
                      <Button
                        style={{ height: 32, width: 32, marginRight: 12, backgroundColor: 'transparent' }}
                        onPress={() => toggleFavorite(coin.id)}
                      >
                        <FontAwesome name="star" size={16} color={coin.isFavorite ? "#facc15" : "#888"} solid={coin.isFavorite} />
                      </Button>
                      <Image
                        source={{ uri: coin.iconUrl }}
                        style={{ height: 32, width: 32, marginRight: 12, backgroundColor: '#fff', borderRadius: 16, padding: 2 }}
                      />
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>{coin.name}</Text>
                        <Text style={{ fontSize: 12, color: '#888' }}>{coin.symbol}</Text>
                      </View>
                    </View>
                    <View style={{ flex: 3, alignItems: 'flex-end' }}>
                      <Text style={{ fontWeight: 'bold' }}>${coin.price.toLocaleString()}</Text>
                    </View>
                    <View style={{ flex: 2, alignItems: 'flex-end' }}>
                      <Text style={{ color: coin.change >= 0 ? '#10b981' : '#ef4444' }}>
                        {coin.change >= 0 ? '+' : ''}{coin.change}%
                      </Text>
                    </View>
                    <View style={{ flex: 2 }}>
                      <View style={{ height: 40 }}>
                        <LineChart
                          style={{ height: 40, width: 60 }}
                          data={coin.priceHistory}
                          svg={{ stroke: coin.change >= 0 ? "#10b981" : "#ef4444", strokeWidth: 2 }}
                          contentInset={{ top: 8, bottom: 8 }}
                          curve={shape.curveMonotoneX}
                        />
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <View style={{ padding: 32, alignItems: 'center' }}>
                  <Text style={{ color: '#888' }}>No coins found matching your criteria.</Text>
                </View>
              )}
            </View>
          </TabsContent>
        </Tabs>
      </View>
      <BottomNavigation />
    </View>
  );
};

export default MarketPage;
