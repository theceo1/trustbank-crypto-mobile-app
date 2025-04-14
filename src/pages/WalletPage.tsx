
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus, History, CreditCard, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WalletCard from "@/components/WalletCard";
import TransactionItem from "@/components/TransactionItem";
import BottomNavigation from "@/components/BottomNavigation";
import { mockWallets, mockTransactions } from "@/lib/quidax";

const WalletPage = () => {
  const navigate = useNavigate();
  const totalBalance = mockWallets.reduce((sum, wallet) => sum + wallet.fiatValue, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="ios-header">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold ml-2">Wallets</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/wallet-settings")}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="screen-container animate-fade-in">
        {/* Total Balance */}
        <section className="mb-6">
          <Card className="p-6 rounded-xl bg-card">
            <div className="mb-2">
              <p className="text-muted-foreground">Total Balance</p>
            </div>
            <h2 className="text-3xl font-bold">${totalBalance.toLocaleString()}</h2>

            <div className="flex gap-2 mt-4">
              <Button 
                className="flex-1 bg-brand-600 hover:bg-brand-700"
                onClick={() => navigate("/deposit")}
              >
                <Plus className="h-4 w-4 mr-1" />
                Deposit
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate("/withdraw")}
              >
                Send
              </Button>
            </div>
          </Card>
        </section>

        {/* Tabs */}
        <Tabs defaultValue="wallets" className="mb-8">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="wallets">
              <CreditCard className="h-4 w-4 mr-2" />
              My Wallets
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wallets" className="space-y-4 animate-fade-in">
            {mockWallets.map((wallet) => (
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

            <Button 
              variant="outline" 
              className="w-full mt-4 border-dashed border-2"
              onClick={() => navigate("/add-wallet")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Wallet
            </Button>
          </TabsContent>

          <TabsContent value="history" className="animate-fade-in">
            <Card className="bg-card rounded-xl border border-border overflow-hidden">
              {mockTransactions.map((tx) => (
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
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default WalletPage;
