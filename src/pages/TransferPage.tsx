
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search, Send, QrCode, Copy, CheckCircle, Wallet, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockWallets } from "@/lib/quidax";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const walletAddresses = {
  btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  eth: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  usdt: "0x8Fc6aed4abea47B34C46A18D5989c3dC6E933d3a",
};

const TransferPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(mockWallets[0].id);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [copiedAddress, setCopiedAddress] = useState(false);
  
  const currentWallet = mockWallets.find(wallet => wallet.id === selectedWallet);
  
  const filteredWallets = mockWallets.filter(wallet => 
    wallet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    wallet.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    toast({
      title: "Address copied",
      description: "Address copied to clipboard",
    });
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleSend = () => {
    if (!recipientAddress || !amount || Number(amount) <= 0) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid recipient address and amount",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Transfer initiated",
      description: `${amount} ${currentWallet?.symbol} will be sent to the recipient`,
    });
    
    // In a real app, this would send the transaction
    setTimeout(() => {
      navigate("/transactions");
    }, 1500);
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
          <h1 className="text-lg font-semibold ml-2">Transfer</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="screen-container animate-fade-in">
        <Tabs defaultValue="send" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="send">Send</TabsTrigger>
            <TabsTrigger value="receive">Receive</TabsTrigger>
          </TabsList>
          
          <TabsContent value="send" className="space-y-6">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Select Wallet
                  </label>
                  <Select value={selectedWallet} onValueChange={setSelectedWallet}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select wallet" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockWallets.map(wallet => (
                        <SelectItem key={wallet.id} value={wallet.id}>
                          <div className="flex items-center">
                            <img
                              src={wallet.iconUrl}
                              alt={wallet.symbol}
                              className="w-5 h-5 mr-2 rounded-full bg-white p-0.5"
                            />
                            <span>{wallet.name} ({wallet.balance} {wallet.symbol})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="mt-2 text-sm">
                    <span className="text-muted-foreground">Available: </span>
                    <span className="font-medium">{currentWallet?.balance} {currentWallet?.symbol}</span>
                    <span className="text-muted-foreground ml-1">
                      (${currentWallet?.fiatValue.toLocaleString()})
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Recipient Address
                  </label>
                  <div className="relative">
                    <Input
                      placeholder={`Enter ${currentWallet?.symbol} address`}
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => navigate("/scan-qr")}
                    >
                      <QrCode className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Amount
                  </label>
                  <div className="grid grid-cols-7 gap-2">
                    <Input
                      className="col-span-5"
                      placeholder={`Amount in ${currentWallet?.symbol}`}
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      className="col-span-2"
                      onClick={() => setAmount(currentWallet?.balance || "0")}
                    >
                      Max
                    </Button>
                  </div>
                  {amount && (
                    <p className="text-sm text-muted-foreground">
                      ≈ ${(Number(amount) * (currentWallet?.fiatValue || 0) / Number(currentWallet?.balance || 1)).toFixed(2)}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Memo (Optional)
                  </label>
                  <Input
                    placeholder="Add a note to this transaction"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                  />
                </div>
                
                <Button
                  className="w-full bg-brand-600 hover:bg-brand-700 mt-4"
                  onClick={handleSend}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send {currentWallet?.symbol}
                </Button>
              </CardContent>
            </Card>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Network fees will be calculated before confirmation</p>
              <p>• Always double check the recipient address before sending</p>
              <p>• Transactions cannot be reversed once confirmed</p>
            </div>
          </TabsContent>
          
          <TabsContent value="receive" className="space-y-6">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Select Wallet
                  </label>
                  <Select value={selectedWallet} onValueChange={setSelectedWallet}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select wallet" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockWallets.map(wallet => (
                        <SelectItem key={wallet.id} value={wallet.id}>
                          <div className="flex items-center">
                            <img
                              src={wallet.iconUrl}
                              alt={wallet.symbol}
                              className="w-5 h-5 mr-2 rounded-full bg-white p-0.5"
                            />
                            <span>{wallet.name} ({wallet.symbol})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="rounded-lg border border-dashed border-border p-4 flex flex-col items-center space-y-4">
                  <div className="p-2 bg-white rounded-lg">
                    <QrCode className="h-48 w-48" />
                  </div>
                  <p className="text-center font-medium">Scan to receive {currentWallet?.symbol}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Your {currentWallet?.name} Address
                  </label>
                  <div className="relative">
                    <Input
                      value={walletAddresses[currentWallet?.currency as keyof typeof walletAddresses] || ""}
                      readOnly
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => handleCopyAddress(walletAddresses[currentWallet?.currency as keyof typeof walletAddresses] || "")}
                    >
                      {copiedAddress ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => handleCopyAddress(walletAddresses[currentWallet?.currency as keyof typeof walletAddresses] || "")}
                    className="w-full"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Address
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Only send {currentWallet?.symbol} to this address</p>
              <p>• Sending any other cryptocurrency may result in permanent loss</p>
              <p>• Your deposit will be available after network confirmations</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default TransferPage;
