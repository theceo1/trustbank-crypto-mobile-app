
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  PlusCircle, 
  Wallet,
  BarChart2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import BottomNavigation from "@/components/BottomNavigation";
import WalletCard from "@/components/WalletCard";
import { mockWallets, mockTransactions } from "@/lib/quidax";
import TransactionItem from "@/components/TransactionItem";

const mockChartData = [
  { date: "Apr 08", btc: 54000, eth: 3200 },
  { date: "Apr 09", btc: 56000, eth: 3100 },
  { date: "Apr 10", btc: 57500, eth: 3300 },
  { date: "Apr 11", btc: 55000, eth: 3400 },
  { date: "Apr 12", btc: 58000, eth: 3600 },
  { date: "Apr 13", btc: 59500, eth: 3800 },
  { date: "Apr 14", btc: 61000, eth: 4000 },
];

const marketData = [
  { name: "Bitcoin", symbol: "BTC", price: 61245.32, change: 2.4, iconUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
  { name: "Ethereum", symbol: "ETH", price: 3998.75, change: 4.2, iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
  { name: "Solana", symbol: "SOL", price: 132.56, change: -1.3, iconUrl: "https://cryptologos.cc/logos/solana-sol-logo.png" },
  { name: "Cardano", symbol: "ADA", price: 0.45, change: 1.2, iconUrl: "https://cryptologos.cc/logos/cardano-ada-logo.png" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const totalBalance = mockWallets.reduce((sum, wallet) => sum + wallet.fiatValue, 0);

  const firstName = user?.email?.split('@')[0] || "User";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="ios-header">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/notifications")}
          >
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="screen-container animate-fade-in">
        <section className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Welcome, {firstName}</h1>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-10" 
              placeholder="Search assets, transactions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Portfolio Overview */}
        <section className="mb-6">
          <Card className="p-6 rounded-xl bg-card">
            <div className="mb-2">
              <p className="text-muted-foreground">Total Balance</p>
            </div>
            <h2 className="text-3xl font-bold">${totalBalance.toLocaleString()}</h2>
            <div className="flex items-center mt-1 text-sm text-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+5.12% today</span>
            </div>

            <div className="mt-6 h-36">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip />
                  <Area type="monotone" dataKey="btc" stroke="#10b981" fillOpacity={1} fill="url(#colorBalance)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex gap-2 mt-4">
              <Button 
                className="flex-1 bg-brand-600 hover:bg-brand-700"
                onClick={() => navigate("/deposit")}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Deposit
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate("/transfer")}
              >
                <Wallet className="h-4 w-4 mr-1" />
                Transfer
              </Button>
            </div>
          </Card>
        </section>

        {/* Quick Access */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 text-xs"
              onClick={() => navigate("/deposit")}
            >
              <PlusCircle className="h-8 w-8 mb-2" />
              Deposit
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 text-xs"
              onClick={() => navigate("/transfer")}
            >
              <Wallet className="h-8 w-8 mb-2" />
              Transfer
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 text-xs"
              onClick={() => navigate("/trade")}
            >
              <BarChart2 className="h-8 w-8 mb-2" />
              Trade
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 text-xs"
              onClick={() => navigate("/calculator")}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-8 w-8 mb-2"
              >
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <line x1="8" x2="16" y1="6" y2="6" />
                <line x1="16" x2="16" y1="14" y2="18" />
                <path d="M16 10h.01" />
                <path d="M12 10h.01" />
                <path d="M8 10h.01" />
                <path d="M12 14h.01" />
                <path d="M8 14h.01" />
                <path d="M12 18h.01" />
                <path d="M8 18h.01" />
              </svg>
              Calculator
            </Button>
          </div>
        </section>

        {/* My Assets */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">My Assets</h2>
            <Button 
              variant="link" 
              className="text-sm flex items-center"
              onClick={() => navigate("/wallet")}
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {mockWallets.slice(0, 2).map((wallet) => (
              <WalletCard
                key={wallet.id}
                name={wallet.name}
                symbol={wallet.symbol}
                balance={wallet.balance}
                fiatValue={wallet.fiatValue}
                iconUrl={wallet.iconUrl}
                className="cursor-pointer"
                onClick={() => navigate(`/wallet/${wallet.id}`)}
              />
            ))}
          </div>
        </section>

        {/* Market Overview */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Market Overview</h2>
            <Button 
              variant="link" 
              className="text-sm flex items-center"
              onClick={() => navigate("/market")}
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <Card className="bg-card overflow-hidden">
            <div className="divide-y divide-border">
              {marketData.map((coin, index) => (
                <div 
                  key={coin.symbol} 
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => navigate(`/market/${coin.symbol}`)}
                >
                  <div className="flex items-center">
                    <img 
                      src={coin.iconUrl} 
                      alt={coin.name} 
                      className="h-8 w-8 mr-3 bg-white p-1 rounded-full" 
                    />
                    <div>
                      <h3 className="font-medium">{coin.name}</h3>
                      <p className="text-sm text-muted-foreground">{coin.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${coin.price}</p>
                    <p className={`text-sm ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center justify-end`}>
                      {coin.change >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {coin.change >= 0 ? '+' : ''}{coin.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Recent Transactions */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <Button 
              variant="link" 
              className="text-sm flex items-center"
              onClick={() => navigate("/transactions")}
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <Card className="bg-card rounded-xl border border-border overflow-hidden">
            {mockTransactions.slice(0, 3).map((tx) => (
              <TransactionItem
                key={tx.id}
                id={tx.id}
                type={tx.type as "deposit" | "withdrawal"}
                amount={tx.amount}
                currency={tx.currency}
                status={tx.status as "pending" | "completed" | "failed"}
                createdAt={tx.createdAt}
                fee={tx.fee}
              />
            ))}
          </Card>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
