
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search, Filter, Star, TrendingUp, TrendingDown, ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BottomNavigation from "@/components/BottomNavigation";
import {
  Area,
  AreaChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
  const navigate = useNavigate();
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
      return sortDirection === "asc" ? 
        <ArrowUp className="h-4 w-4" /> : 
        <ArrowDown className="h-4 w-4" />;
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
          <h1 className="text-lg font-semibold ml-2">Markets</h1>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Filter className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="marketCap">Market Cap</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price">Price</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="change">24h Change</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="volume24h">24h Volume</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="screen-container animate-fade-in">
        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-10" 
            placeholder="Search coins..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Overview */}
        <section className="mb-6">
          <Card className="p-4">
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Market Cap</p>
                <p className="text-lg font-bold">$2.4T</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">24h Volume</p>
                <p className="text-lg font-bold">$87.5B</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">BTC Dominance</p>
                <p className="text-lg font-bold">43.2%</p>
              </div>
            </div>
            <div className="mt-4 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { date: "Apr 07", cap: 2.2 },
                  { date: "Apr 08", cap: 2.25 },
                  { date: "Apr 09", cap: 2.3 },
                  { date: "Apr 10", cap: 2.32 },
                  { date: "Apr 11", cap: 2.35 },
                  { date: "Apr 12", cap: 2.38 },
                  { date: "Apr 13", cap: 2.4 },
                ]}>
                  <defs>
                    <linearGradient id="colorMarketCap" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip />
                  <Area type="monotone" dataKey="cap" stroke="#10b981" fillOpacity={1} fill="url(#colorMarketCap)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* Tabs and Coin List */}
        <section>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="gainers">Gainers</TabsTrigger>
              <TabsTrigger value="losers">Losers</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="space-y-6">
              <div className="rounded-lg border border-border overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-12 gap-2 p-3 bg-muted text-sm font-medium">
                  <div className="col-span-5 flex items-center cursor-pointer" onClick={() => handleSort("name")}>
                    Name {getSortIcon("name")}
                  </div>
                  <div className="col-span-3 text-right cursor-pointer" onClick={() => handleSort("price")}>
                    Price {getSortIcon("price")}
                  </div>
                  <div className="col-span-4 text-right cursor-pointer" onClick={() => handleSort("change")}>
                    24h Change {getSortIcon("change")}
                  </div>
                </div>
                
                {/* Data rows */}
                <div className="divide-y divide-border">
                  {data.length > 0 ? (
                    data.map((coin) => (
                      <div 
                        key={coin.id}
                        className="grid grid-cols-12 gap-2 p-4 items-center cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => navigate(`/market/${coin.id}`)}
                      >
                        <div className="col-span-5 flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 mr-3"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(coin.id);
                            }}
                          >
                            <Star
                              className={`h-4 w-4 ${coin.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                            />
                          </Button>
                          <img
                            src={coin.iconUrl}
                            alt={coin.name}
                            className="h-8 w-8 mr-3 bg-white p-1 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{coin.name}</p>
                            <p className="text-xs text-muted-foreground">{coin.symbol}</p>
                          </div>
                        </div>
                        <div className="col-span-3 text-right">
                          <p className="font-medium">${coin.price.toLocaleString()}</p>
                        </div>
                        <div className="col-span-2 text-right">
                          <p className={`${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {coin.change >= 0 ? '+' : ''}{coin.change}%
                          </p>
                        </div>
                        <div className="col-span-2">
                          <div className="h-10">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={coin.priceHistory.map((price, i) => ({ time: i, price }))}>
                                <Line 
                                  type="monotone" 
                                  dataKey="price" 
                                  stroke={coin.change >= 0 ? "#10b981" : "#ef4444"} 
                                  strokeWidth={2}
                                  dot={false}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      No coins found matching your criteria.
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default MarketPage;
