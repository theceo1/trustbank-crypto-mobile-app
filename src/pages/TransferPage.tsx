import React, { memo, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons, Feather, FontAwesome } from "@expo/vector-icons";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockWallets } from "@/lib/quidax";
import { useToast } from "@/hooks/use-toast";
import { Select } from "@/components/ui/select";
import BottomNavigation from "@/components/BottomNavigation";

const walletAddresses = {
  btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  eth: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  usdt: "0x8Fc6aed4abea47B34C46A18D5989c3dC6E933d3a",
};

const TransferPage = () => {
  const navigation = useNavigation();
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
    // Clipboard API for React Native
    import("expo-clipboard").then(Clipboard => {
      Clipboard.setStringAsync(address);
      setCopiedAddress(true);
      toast({
        title: "Address copied",
        description: "Address copied to clipboard",
      });
      setTimeout(() => setCopiedAddress(false), 2000);
    });
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
      navigation.navigate("Transactions" as never);
    }, 1500);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8fafd' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 40, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: '#1a237e' }}>
        <Button style={{ backgroundColor: 'transparent', marginRight: 8 }} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </Button>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Transfer</Text>
      </View>

      {/* Main Content */}
      <View style={{ flex: 1, padding: 16 }}>
        <Tabs value={"send"} onValueChange={() => {}}>
          <TabsList>
            <TabsTrigger tabValue="send">Send</TabsTrigger>
            <TabsTrigger tabValue="receive">Receive</TabsTrigger>
          </TabsList>

          <TabsContent tabValue="send">
            <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#3949ab', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Select Wallet</Text>
              <Select
                selectedValue={selectedWallet}
                onValueChange={setSelectedWallet}
                items={mockWallets.map(wallet => ({ label: `${wallet.name} (${wallet.symbol})`, value: wallet.id }))}
                placeholder="Select wallet"
              />
              <Text style={{ color: '#888', fontSize: 13, marginTop: 8 }}>
                Available: <Text style={{ fontWeight: '600', color: '#222' }}>{currentWallet?.balance} {currentWallet?.symbol}</Text> <Text style={{ color: '#888' }}>(${currentWallet?.fiatValue.toLocaleString()})</Text>
              </Text>

              <View style={{ marginTop: 16, marginBottom: 12 }}>
                <Text style={{ color: '#222', fontSize: 16, fontWeight: 'bold' }}>Recipient Address</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 8 }}>Memo (Optional)</Text>
              <TextInput
                placeholder="Add a note to this transaction"
                value={memo}
                onChangeText={setMemo}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 8 }}
              />

              <Button style={{ backgroundColor: '#10b981', marginTop: 12 }} onPress={handleSend}>
                <Feather name="send" size={18} color="#fff" style={{ marginRight: 8 }} />
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send {currentWallet?.symbol}</Text>
              </Button>
            </View>

            <View style={{ marginTop: 12, marginBottom: 24 }}>
              <Text style={{ color: '#888', fontSize: 13 }}>• Network fees will be calculated before confirmation</Text>
                  <TextInput
                    placeholder="Enter recipient address"
                    value={recipientAddress}
                    onChangeText={setRecipientAddress}
                    style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 8 }}
                  />
                  <Button style={{ marginLeft: 8, padding: 8, backgroundColor: '#f1f4ff' }} onPress={() => navigation.navigate('ScanQR' as never)}>
                    <MaterialCommunityIcons name="qrcode-scan" size={20} color="#1a237e" />
                  </Button>
                </View>
              </View>

              <View style={{ marginTop: 16, marginBottom: 12 }}>
                <Text style={{ color: '#222', fontSize: 16, fontWeight: 'bold' }}>Amount</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    placeholder={`Amount in ${currentWallet?.symbol}`}
                    value={amount}
                    onChangeText={setAmount}
                    style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 8 }}
                  />
                  <Button style={{ marginLeft: 8, padding: 8, backgroundColor: '#f1f4ff' }} onPress={() => setAmount(currentWallet?.balance || "0")}>
                    Max
                  </Button>
                </View>
                {!!amount && (
                  <Text style={{ fontSize: 13, color: '#888', marginTop: 6 }}>
                    ≈ ${((Number(amount) * (currentWallet?.fiatValue || 0)) / Number(currentWallet?.balance || 1)).toFixed(2)}
                  </Text>
                )}
              </View>

              <View style={{ marginTop: 16, marginBottom: 12 }}>
                <Text style={{ color: '#222', fontSize: 16, fontWeight: 'bold' }}>Memo (Optional)</Text>
                <TextInput
                  placeholder="Add a note to this transaction"
                  value={memo}
                  onChangeText={setMemo}
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 8 }}
                />
              </View>

              <Button
                style={{ backgroundColor: '#10b981', marginTop: 12 }}
                onPress={handleSend}
              >
                <Feather name="send" size={18} style={{ marginRight: 8 }} />
                Send {currentWallet?.symbol}
              </Button>

              <View style={{ marginTop: 12, marginBottom: 24 }}>
                <Text style={{ color: '#888', fontSize: 13 }}>• Network fees will be calculated before confirmation</Text>
                <Text style={{ color: '#888', fontSize: 13 }}>• Always double check the recipient address before sending</Text>
                <Text style={{ color: '#888', fontSize: 13 }}>• Transactions cannot be reversed once confirmed</Text>
              </View>
            </View>
          </TabsContent>

          <TabsContent tabValue="receive">
            <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#3949ab', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Select Wallet</Text>
              <Select
                selectedValue={selectedWallet}
                onValueChange={setSelectedWallet}
                items={mockWallets.map(wallet => ({ label: `${wallet.name} (${wallet.symbol})`, value: wallet.id }))}
                placeholder="Select wallet"
              />
              <View style={{ alignItems: 'center', marginVertical: 16 }}>
                <MaterialCommunityIcons name="qrcode" size={128} color="#1a237e" />
                <Text style={{ fontSize: 15, fontWeight: '500', marginTop: 8 }}>Scan to receive {currentWallet?.symbol}</Text>
              </View>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 8 }}>Your {currentWallet?.name} Address</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <TextInput
                  value={walletAddresses[currentWallet?.currency as keyof typeof walletAddresses] || ""}
                  editable={false}
                  style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 8 }}
                />
                <Button style={{ marginLeft: 8, padding: 8, backgroundColor: '#f1f4ff' }} onPress={() => handleCopyAddress(walletAddresses[currentWallet?.currency as keyof typeof walletAddresses] || "")}> 
                  {copiedAddress ? (
                    <FontAwesome name="check-circle" size={20} color="green" />
                  ) : (
                    <Feather name="copy" size={20} color="#1a237e" />
                  )}
                </Button>
              </View>
              <Button style={{ backgroundColor: '#f1f4ff', marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => handleCopyAddress(walletAddresses[currentWallet?.currency as keyof typeof walletAddresses] || "")}> 
                <Feather name="copy" size={18} color="#1a237e" style={{ marginRight: 8 }} />
                <Text style={{ color: '#1a237e', fontWeight: 'bold' }}>Copy Address</Text>
              </Button>
              <View style={{ marginTop: 12, marginBottom: 24 }}>
                <Text style={{ color: '#888', fontSize: 13 }}>• Only send {currentWallet?.symbol} to this address</Text>
                <Text style={{ color: '#888', fontSize: 13 }}>• Always double check the recipient address before sending</Text>
                <Text style={{ color: '#888', fontSize: 13 }}>• Transactions cannot be reversed once confirmed</Text>
              </View>
            </View>
          </TabsContent>
        </Tabs>
      </View>
      <BottomNavigation />
    </View>
  );
};

export default TransferPage;
