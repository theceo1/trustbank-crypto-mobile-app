import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather, FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { View, Image, Text } from "react-native";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Picker } from '@react-native-picker/picker';
import { Slider } from "@/components/ui/slider";
// import BottomNavigation from "@/components/BottomNavigation";
import { LineChart } from 'react-native-chart-kit';
import * as shape from "d3-shape";
import Svg, { LinearGradient as SvgLinearGradient, Stop, Defs } from "react-native-svg";

const pairs = [
  { pair: "BTC/USDT", price: "61,245.32", change: 2.4, iconUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
  { pair: "ETH/USDT", price: "3,998.75", change: 4.2, iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
  { pair: "SOL/USDT", price: "132.56", change: -1.3, iconUrl: "https://cryptologos.cc/logos/solana-sol-logo.png" },
  { pair: "ADA/USDT", price: "0.45", change: 1.2, iconUrl: "https://cryptologos.cc/logos/cardano-ada-logo.png" },
  { pair: "XRP/USDT", price: "0.65", change: -0.8, iconUrl: "https://cryptologos.cc/logos/xrp-xrp-logo.png" },
  { pair: "DOT/USDT", price: "7.82", change: 3.1, iconUrl: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png" },
];

const mockChartData = [61000, 61200, 61100, 61400, 61350, 61500, 61700, 61900, 61800];

import { useTheme } from '@/contexts/ThemeContext';

const TradePage = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPair, setSelectedPair] = useState("BTC/USDT");
  const [tradeType, setTradeType] = useState("buy");
  const [amount, setAmount] = useState(0);
  const [timeRange, setTimeRange] = useState("day");

  const currentPair = pairs.find(p => p.pair === selectedPair);
  const maxAmount = tradeType === "buy" ? 1000 : 0.05;

  const handleAmountChange = (newValue: number[]) => {
    setAmount(newValue[0]);
  };

  const executeOrder = () => {
    if (amount > 0) {
      toast({
        title: "Order Submitted",
        description: `${tradeType === 'buy' ? 'Buy' : 'Sell'} order for ${amount} ${selectedPair.split('/')[0]} submitted`,
      });
    }
  };

  // Filter pairs based on search query
  const filteredPairs = pairs.filter(p => 
    p.pair.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <View style={{ paddingTop: 40, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button
          style={{ backgroundColor: 'transparent', borderWidth: 0, padding: 0, margin: 0 }}
          onPress={() => navigation.navigate("Dashboard" as never)}
        >
          <Feather name="chevron-left" size={20} />
        </Button>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Trade</Text>
        <Button style={{ backgroundColor: 'transparent', borderWidth: 0, padding: 0, margin: 0 }} onPress={() => setTimeRange(prev => prev === "day" ? "week" : "day")}> 
          <Feather name="refresh-cw" size={20} />
        </Button>
      </View>

      {/* Main Content */}
      <View style={{ flex: 1, padding: 16 }}>
        {/* Chart Section */}
        <Card style={{ marginBottom: 24, padding: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image 
                source={{ uri: currentPair?.iconUrl }}
                style={{ height: 32, width: 32, marginRight: 8, backgroundColor: theme.colors.background, borderRadius: 16, padding: 2 }}
              />
              <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{selectedPair}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>${currentPair?.price}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
                    {currentPair?.change && currentPair.change >= 0 ? (
                      <Feather name="arrow-up" size={12} color="#10b981" style={{ marginRight: 4 }} />
                    ) : (
                      <Feather name="arrow-down" size={12} color="#ef4444" style={{ marginRight: 4 }} />
                    )}
                    <Text style={{ fontSize: 12, color: currentPair?.change && currentPair.change >= 0 ? '#10b981' : '#ef4444' }}>
                      {currentPair?.change && currentPair.change >= 0 ? '+' : ''}{currentPair?.change}%
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Picker
              selectedValue={selectedPair}
              onValueChange={setSelectedPair}
              style={{ height: 48, width: '100%' }}
            >
              {pairs.map((pair) => (
                <Picker.Item key={pair.pair} label={pair.pair} value={pair.pair} />
              ))}
            </Picker>
          </View>
          <View style={{ height: 180 }}>
            <LineChart
              data={{
                labels: ["", "", "", "", "", "", "", "", ""],
                datasets: [
                  {
                    data: mockChartData,
                    color: () => theme.colors.primary, // optional, can use theme
                    strokeWidth: 2,
                  },
                ],
              }}
              width={340} // or use Dimensions.get('window').width - padding
              height={180}
              withDots={false}
              withShadow={false}
              withInnerLines={true}
              withOuterLines={false}
              chartConfig={{
                backgroundGradientFrom: theme.colors.background,
                backgroundGradientTo: theme.colors.background,
                color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`, // #10b981
                labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                propsForBackgroundLines: {
                  strokeDasharray: '',
                  stroke: '#e0e0e0',
                },
                propsForDots: {
                  r: "0",
                },
              }}
              bezier
              style={{ borderRadius: 8 }}
            />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 16 }}>
            <Button 
              style={{ marginRight: 4, backgroundColor: timeRange === "day" ? theme.colors.primary : theme.colors.background, borderColor: '#10b981', borderWidth: 1 }}
              onPress={() => setTimeRange("day")}
            >
              <Text style={{ color: timeRange === "day" ? theme.colors.background : theme.colors.primary }}>24H</Text>
            </Button>
            <Button 
              style={{ marginRight: 4, backgroundColor: timeRange === "week" ? '#10b981' : '#fff', borderColor: '#10b981', borderWidth: 1 }}
              onPress={() => setTimeRange("week")}
            >
              <Text style={{ color: timeRange === "week" ? '#fff' : '#10b981' }}>1W</Text>
            </Button>
            <Button 
              style={{ marginRight: 4, backgroundColor: timeRange === "month" ? '#10b981' : '#fff', borderColor: '#10b981', borderWidth: 1 }}
              onPress={() => setTimeRange("month")}
            >
              <Text style={{ color: timeRange === "month" ? '#fff' : '#10b981' }}>1M</Text>
            </Button>
            <Button 
              style={{ backgroundColor: timeRange === "year" ? '#10b981' : '#fff', borderColor: '#10b981', borderWidth: 1 }}
              onPress={() => setTimeRange("year")}
            >
              <Text style={{ color: timeRange === "year" ? '#fff' : '#10b981' }}>1Y</Text>
            </Button>
          </View>
        </Card>

        {/* Trading Interface */}
        <Tabs value="buy" onValueChange={setTradeType}>
          <TabsList>
            <TabsTrigger 
              tabValue="buy" 
              style={{ backgroundColor: tradeType === "buy" ? '#10b981' : '#fff', color: tradeType === "buy" ? '#fff' : '#10b981', flex: 1 }}
            >
              Buy
            </TabsTrigger>
            <TabsTrigger 
              tabValue="sell" 
              style={{ backgroundColor: tradeType === "sell" ? '#ef4444' : '#fff', color: tradeType === "sell" ? '#fff' : '#ef4444', flex: 1 }}
            >
              Sell
            </TabsTrigger>
          </TabsList>
          <TabsContent tabValue="buy">
            <Card style={{ padding: 16 }}>
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, color: '#888', marginBottom: 4 }}>Amount ({selectedPair.split('/')[0]})</Text>
                <Input
  value={amount.toString()}
  onChangeText={text => setAmount(Number(text))}
  keyboardType="numeric"
  style={{}}
/>
                <Slider
                  value={[amount]}
                  max={maxAmount}
                  step={0.001}
                  onValueChange={handleAmountChange}
                  style={{ marginVertical: 16 }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, color: '#888' }}>Min: 0</Text>
                  <Text style={{ fontSize: 12, color: '#888' }}>Max: {maxAmount}</Text>
                </View>
              </View>
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, color: '#888', marginBottom: 4 }}>Estimated Cost (USDT)</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>${(amount * Number(currentPair?.price.replace(',', ''))).toFixed(2)}</Text>
              </View>
              <Button 
                style={{ width: '100%', backgroundColor: '#10b981' }}
                onPress={executeOrder}
                disabled={amount <= 0}
              >
                <Text style={{ color: '#fff' }}>Buy {selectedPair.split('/')[0]}</Text>
              </Button>
            </Card>
          </TabsContent>
          <TabsContent tabValue="sell">
            <Card style={{ padding: 16, backgroundColor: theme.colors.card }}>
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, color: '#888', marginBottom: 4 }}>Amount ({selectedPair.split('/')[0]})</Text>
                <Input
                  value={amount.toString()}
                  onChangeText={text => setAmount(Number(text))}
                  keyboardType="numeric"
                  style={{}}
                />
                <Slider
                  value={[amount]}
                  max={maxAmount}
                  step={0.001}
                  onValueChange={handleAmountChange}
                  style={{ marginVertical: 16 }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, color: '#888' }}>Min: 0</Text>
                  <Text style={{ fontSize: 12, color: '#888' }}>Max: {maxAmount}</Text>
                </View>
              </View>
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, color: '#888', marginBottom: 4 }}>Estimated Proceeds (USDT)</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>${(amount * Number(currentPair?.price.replace(',', ''))).toFixed(2)}</Text>
              </View>
              <Button 
                style={{ width: '100%', backgroundColor: '#ef4444' }}
                onPress={executeOrder}
                disabled={amount <= 0}
              >
                <Text style={{ color: '#fff' }}>Sell {selectedPair.split('/')[0]}</Text>
              </Button>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Market Pairs */}
        <View style={{ marginTop: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Trading Pairs</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.card, borderRadius: 8, paddingHorizontal: 8 }}>
              <Feather name="search" size={16} color="#888" style={{ marginRight: 4 }} />
              <Input
  style={{ height: 32, width: 120 }}
  placeholder="Search..."
  value={searchQuery}
  onChangeText={setSearchQuery}
/>
            </View>
          </View>
          <Card style={{ backgroundColor: theme.colors.background, overflow: 'hidden' }}>
            {filteredPairs.map((pair) => (
              <View 
                key={pair.pair} 
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: selectedPair === pair.pair ? '#f3f4f6' : '#fff' }}
                onTouchEnd={() => setSelectedPair(pair.pair)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image 
                    source={{ uri: pair.iconUrl }} 
                    style={{ height: 32, width: 32, marginRight: 12, backgroundColor: theme.colors.background, borderRadius: 16, padding: 2 }} 
                  />
                  <Text style={{ fontWeight: '500' }}>{pair.pair}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontWeight: '500' }}>${pair.price}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {pair.change >= 0 ? (
                      <Feather name="arrow-up" size={12} color="#10b981" style={{ marginRight: 2 }} />
                    ) : (
                      <Feather name="arrow-down" size={12} color="#ef4444" style={{ marginRight: 2 }} />
                    )}
                    <Text style={{ fontSize: 12, color: pair.change >= 0 ? '#10b981' : '#ef4444' }}>
                      {pair.change >= 0 ? '+' : ''}{pair.change}%
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </Card>
        </View>
      </View>
      {/* <BottomNavigation /> */}
    </View>
  );
};

export default TradePage;