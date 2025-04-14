
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ArrowUpDown, ArrowDown, ArrowUp, Search, Filter, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import BottomNavigation from "@/components/BottomNavigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const pairs = [
  { pair: "BTC/USDT", price: "61,245.32", change: 2.4, iconUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
  { pair: "ETH/USDT", price: "3,998.75", change: 4.2, iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
  { pair: "SOL/USDT", price: "132.56", change: -1.3, iconUrl: "https://cryptologos.cc/logos/solana-sol-logo.png" },
  { pair: "ADA/USDT", price: "0.45", change: 1.2, iconUrl: "https://cryptologos.cc/logos/cardano-ada-logo.png" },
  { pair: "XRP/USDT", price: "0.65", change: -0.8, iconUrl: "https://cryptologos.cc/logos/xrp-xrp-logo.png" },
  { pair: "DOT/USDT", price: "7.82", change: 3.1, iconUrl: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png" },
];

const mockChartData = [
  { time: "9:00", price: 61000 },
  { time: "10:00", price: 61200 },
  { time: "11:00", price: 61100 },
  { time: "12:00", price: 61400 },
  { time: "13:00", price: 61350 },
  { time: "14:00", price: 61500 },
  { time: "15:00", price: 61700 },
  { time: "16:00", price: 61900 },
  { time: "17:00", price: 61800 },
];

const TradePage = () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="ios-header">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold ml-2">Trade</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => setTimeRange(prev => prev === "day" ? "week" : "day")}>
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="screen-container animate-fade-in">
        {/* Chart Section */}
        <section className="mb-6">
          <Card className="chart-card mb-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <img 
                  src={currentPair?.iconUrl}
                  alt={selectedPair.split('/')[0]}
                  className="h-8 w-8 mr-2 bg-white p-1 rounded-full"
                />
                <div>
                  <h2 className="text-lg font-bold">{selectedPair}</h2>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold">${currentPair?.price}</span>
                    <span 
                      className={`ml-2 text-sm ${currentPair?.change && currentPair.change >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}
                    >
                      {currentPair?.change && currentPair.change >= 0 ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      {currentPair?.change && currentPair.change >= 0 ? '+' : ''}{currentPair?.change}%
                    </span>
                  </div>
                </div>
              </div>
              <Select
                value={selectedPair}
                onValueChange={setSelectedPair}
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Select Pair" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {pairs.map((p) => (
                      <SelectItem key={p.pair} value={p.pair}>{p.pair}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} />
                  <YAxis 
                    domain={['dataMin - 200', 'dataMax + 200']}
                    axisLine={false}
                    tickLine={false}
                    orientation="right"
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, "Price"]}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex mt-4">
              <Button 
                variant={timeRange === "day" ? "default" : "outline"} 
                size="sm" 
                className="mr-1" 
                onClick={() => setTimeRange("day")}
              >
                24H
              </Button>
              <Button 
                variant={timeRange === "week" ? "default" : "outline"} 
                size="sm" 
                className="mr-1" 
                onClick={() => setTimeRange("week")}
              >
                1W
              </Button>
              <Button 
                variant={timeRange === "month" ? "default" : "outline"} 
                size="sm" 
                className="mr-1" 
                onClick={() => setTimeRange("month")}
              >
                1M
              </Button>
              <Button 
                variant={timeRange === "year" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setTimeRange("year")}
              >
                1Y
              </Button>
            </div>
          </Card>
        </section>

        {/* Trading Interface */}
        <section className="mb-6">
          <Tabs defaultValue="buy" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger 
                value="buy" 
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                onClick={() => setTradeType("buy")}
              >
                Buy
              </TabsTrigger>
              <TabsTrigger 
                value="sell" 
                className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                onClick={() => setTradeType("sell")}
              >
                Sell
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="buy" className="space-y-4">
              <Card className="p-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Amount ({selectedPair.split('/')[0]})</p>
                    <div className="flex items-center mb-2">
                      <Input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(Number(e.target.value))} 
                        min={0} 
                        max={maxAmount}
                        step={0.001}
                      />
                    </div>
                    <Slider
                      value={[amount]}
                      max={maxAmount}
                      step={0.001}
                      onValueChange={handleAmountChange}
                      className="my-6"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Min: 0</span>
                      <span>Max: {maxAmount}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Estimated Cost (USDT)</p>
                    <p className="text-xl font-bold">${(amount * Number(currentPair?.price.replace(',', ''))).toFixed(2)}</p>
                  </div>
                  
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={executeOrder}
                    disabled={amount <= 0}
                  >
                    Buy {selectedPair.split('/')[0]}
                  </Button>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="sell" className="space-y-4">
              <Card className="p-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Amount ({selectedPair.split('/')[0]})</p>
                    <div className="flex items-center mb-2">
                      <Input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(Number(e.target.value))} 
                        min={0} 
                        max={maxAmount}
                        step={0.001}
                      />
                    </div>
                    <Slider
                      value={[amount]}
                      max={maxAmount}
                      step={0.001}
                      onValueChange={handleAmountChange}
                      className="my-6"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Min: 0</span>
                      <span>Max: {maxAmount}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Estimated Proceeds (USDT)</p>
                    <p className="text-xl font-bold">${(amount * Number(currentPair?.price.replace(',', ''))).toFixed(2)}</p>
                  </div>
                  
                  <Button 
                    className="w-full bg-red-500 hover:bg-red-600"
                    onClick={executeOrder}
                    disabled={amount <= 0}
                  >
                    Sell {selectedPair.split('/')[0]}
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Market Pairs */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Trading Pairs</h2>
            <div className="relative">
              <Search className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-10 h-8 w-36" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Card className="bg-card overflow-hidden">
            <div className="divide-y divide-border">
              {filteredPairs.map((pair) => (
                <div 
                  key={pair.pair} 
                  className={`flex items-center justify-between p-4 cursor-pointer ${selectedPair === pair.pair ? 'bg-muted' : ''}`}
                  onClick={() => setSelectedPair(pair.pair)}
                >
                  <div className="flex items-center">
                    <img 
                      src={pair.iconUrl} 
                      alt={pair.pair.split('/')[0]} 
                      className="h-8 w-8 mr-3 bg-white p-1 rounded-full" 
                    />
                    <h3 className="font-medium">{pair.pair}</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${pair.price}</p>
                    <p className={`text-sm ${pair.change >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center justify-end`}>
                      {pair.change >= 0 ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      {pair.change >= 0 ? '+' : ''}{pair.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default TradePage;
