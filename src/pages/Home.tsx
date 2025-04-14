
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import WalletCard from "@/components/WalletCard";
import TransactionItem from "@/components/TransactionItem";
import BottomNavigation from "@/components/BottomNavigation";
import { mockWallets, mockTransactions } from "@/lib/quidax";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user) {
      // If no user is logged in, redirect to login
      navigate("/login");
      return;
    }

    // Calculate total balance from all wallets
    const total = mockWallets.reduce((sum, wallet) => sum + wallet.fiatValue, 0);
    setTotalBalance(total);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Logo size="lg" className="mx-auto mb-6 animate-pulse" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="ios-header">
        <Logo />
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="screen-container animate-fade-in">
        {/* Balance Summary */}
        <section className="mb-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">
              {user?.email?.split('@')[0] || 'User'}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">Total Balance</p>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="text-3xl font-bold">${totalBalance.toLocaleString()}</h2>
            <div className="flex gap-2 mt-4">
              <Button 
                className="flex-1 bg-brand-600 hover:bg-brand-700"
                onClick={() => navigate("/deposit")}
              >
                Deposit
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate("/withdraw")}
              >
                Withdraw
              </Button>
            </div>
          </div>
        </section>

        {/* Wallets */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Wallets</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/wallet")}
            >
              See All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {mockWallets.map((wallet, index) => (
              <WalletCard
                key={wallet.id}
                name={wallet.name}
                symbol={wallet.symbol}
                balance={wallet.balance}
                fiatValue={wallet.fiatValue}
                iconUrl={wallet.iconUrl}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </section>

        {/* Recent Transactions */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/transactions")}
            >
              See All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="bg-card rounded-xl border border-border overflow-hidden">
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
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Home;
