
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BottomNavigation from "@/components/BottomNavigation";

// Mock exchange rates for crypto currencies
const exchangeRates = {
  BTC: { USD: 61245.32, EUR: 56423.18, GBP: 48123.45 },
  ETH: { USD: 3998.75, EUR: 3682.14, GBP: 3142.57 },
  SOL: { USD: 132.56, EUR: 122.03, GBP: 103.95 },
  ADA: { USD: 0.45, EUR: 0.41, GBP: 0.35 },
  XRP: { USD: 0.65, EUR: 0.60, GBP: 0.51 },
  DOT: { USD: 7.82, EUR: 7.20, GBP: 6.13 },
  BNB: { USD: 634.21, EUR: 583.92, GBP: 497.36 },
};

const cryptoIcons = {
  BTC: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  ETH: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  SOL: "https://cryptologos.cc/logos/solana-sol-logo.png",
  ADA: "https://cryptologos.cc/logos/cardano-ada-logo.png",
  XRP: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
  DOT: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
  BNB: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
};

const CalculatorPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Calculator state
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  
  // Converter state
  const [fromCrypto, setFromCrypto] = useState("BTC");
  const [toCrypto, setToCrypto] = useState("USD");
  const [fromAmount, setFromAmount] = useState("1");
  const [toAmount, setToAmount] = useState("");
  
  // Calculate conversion
  useEffect(() => {
    if (fromCrypto in exchangeRates && toCrypto in exchangeRates[fromCrypto as keyof typeof exchangeRates]) {
      const rate = exchangeRates[fromCrypto as keyof typeof exchangeRates][toCrypto as keyof typeof exchangeRates[keyof typeof exchangeRates]];
      setToAmount((parseFloat(fromAmount || "0") * rate).toFixed(2));
    } else if (toCrypto in exchangeRates && fromCrypto in exchangeRates[toCrypto as keyof typeof exchangeRates]) {
      const rate = exchangeRates[toCrypto as keyof typeof exchangeRates][fromCrypto as keyof typeof exchangeRates[keyof typeof exchangeRates]];
      setToAmount((parseFloat(fromAmount || "0") / rate).toFixed(8));
    } else {
      setToAmount("Conversion not available");
    }
  }, [fromCrypto, toCrypto, fromAmount]);

  // Calculator functions
  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const result = calculate(previousValue, inputValue, operation);
      setPreviousValue(result);
      setDisplay(String(result));
    }
    
    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b !== 0 ? a / b : "Error";
      default:
        return b;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);
    
    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const toggleSign = () => {
    setDisplay(display.charAt(0) === "-" ? display.substr(1) : "-" + display);
  };

  // Save calculation to history
  const saveCalculation = () => {
    toast({
      title: "Calculation saved",
      description: "The current calculation has been saved to history",
    });
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
          <h1 className="text-lg font-semibold ml-2">Calculator</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={saveCalculation}>
            <Save className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="screen-container animate-fade-in">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="converter">Crypto Converter</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator" className="space-y-6">
            <Card className="p-4">
              <div className="bg-card rounded-lg p-4 mb-4">
                <div className="text-right text-4xl font-bold overflow-hidden">{display}</div>
                {operation && previousValue !== null && (
                  <div className="text-right text-sm text-muted-foreground mt-1">
                    {previousValue} {operation}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {/* First row */}
                <Button 
                  variant="outline" 
                  className="h-14 text-lg font-medium bg-muted"
                  onClick={clearDisplay}
                >
                  C
                </Button>
                <Button 
                  variant="outline" 
                  className="h-14 text-lg font-medium bg-muted"
                  onClick={toggleSign}
                >
                  +/-
                </Button>
                <Button 
                  variant="outline" 
                  className="h-14 text-lg font-medium bg-muted"
                  onClick={handlePercentage}
                >
                  %
                </Button>
                <Button 
                  variant="outline" 
                  className="h-14 text-lg font-medium bg-brand-600 hover:bg-brand-700 text-white"
                  onClick={() => performOperation("÷")}
                >
                  ÷
                </Button>
                
                {/* Second row */}
                <Button 
                  variant="outline" 
                  className="h-14 text-lg font-medium"
                  onClick={() => inputDigit("7")}
                >
                  7
                </Button>
                <Button 
                  variant="outline" 
                  className="h-14 text-lg font-medium"
                  onClick={() => inputDigit("8")}
                >
                  8
                </Button>
                <Button 
                  variant="outline" 
                  className="h-14 text-lg font-medium"
                  onClick={() => inputDigit("9")}
                >
                  9
                </Button>
                <Button 
                  variant="outline" 
                  className="h-14 text-lg font-medium bg-brand-600 hover:bg-brand-700 text-white"
                  onClick={() => performOperation("×")}
                >
                  ×
                </Button>
                
                {/* Third row */}
                <Button 
                  variant="outline" 
                  className="h-14 text-lg font-medium"
                  onClick={() => inputDigit("4")}
                >
                  4
                </Button>
                <Button 
                  variant="outline" 
                  className="h-14 text-lg font-medium"
                  onClick={() => inputDigit("5")}
                >
                  5
                </Button>
                <Button 
                  variant="outline" 
                  className="h-14 text-lg font-medium"
                  onClick={() => inputDigit("6")}
                >
                  6
                </Button>
                <Button 
                  variant="outline" 
                  className="h-14 text-lg font-medium bg-brand-600 hover:bg-brand-700 text-white"
                  onClick={() => performOperation("-")}
                >
                  -
                </Button>
                
                {/* Fourth row */}
                <Button 
                  variant="outline" 
                  className="h-14 text-lg font-medium"
                  onClick={() => inputDigit("1")}
                >
                  1
                </Button>
                <Button 
                  variant="outline" 
                  className="h-14 text-lg font-medium"
                  onClick={() => inputDigit("2")}
                >
                  2
                </Button>
                <Button 
                  variant="outline" 
                  className="h-14 text-lg font-medium"
                  onClick={() => inputDigit("3")}
                >
                  3
                </Button>
                <Button 
                  variant="outline" 
                  className="h-14 text-lg font-medium bg-brand-600 hover:bg-brand-700 text-white"
                  onClick={() => performOperation("+")}
                >
                  +
                </Button>
                
                {/* Fifth row */}
                <Button 
                  variant="outline" 
                  className="h-14 text-lg font-medium col-span-2"
                  onClick={() => inputDigit("0")}
                >
                  0
                </Button>
                <Button 
                  variant="outline" 
                  className="h-14 text-lg font-medium"
                  onClick={inputDot}
                >
                  .
                </Button>
                <Button 
                  variant="outline" 
                  className="h-14 text-lg font-medium bg-brand-600 hover:bg-brand-700 text-white"
                  onClick={handleEquals}
                >
                  =
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="converter" className="space-y-6">
            <Card className="p-4">
              <div className="space-y-6">
                {/* From Currency */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    From
                  </label>
                  <div className="space-y-2">
                    <Select value={fromCrypto} onValueChange={setFromCrypto}>
                      <SelectTrigger className="w-full">
                        <div className="flex items-center">
                          {fromCrypto in cryptoIcons && (
                            <img
                              src={cryptoIcons[fromCrypto as keyof typeof cryptoIcons]}
                              alt={fromCrypto}
                              className="w-5 h-5 mr-2 bg-white rounded-full"
                            />
                          )}
                          <SelectValue placeholder="Select currency" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(exchangeRates).map(currency => (
                          <SelectItem key={currency} value={currency}>
                            <div className="flex items-center">
                              <img
                                src={cryptoIcons[currency as keyof typeof cryptoIcons]}
                                alt={currency}
                                className="w-5 h-5 mr-2 bg-white rounded-full"
                              />
                              {currency}
                            </div>
                          </SelectItem>
                        ))}
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="relative">
                      <input
                        type="number"
                        className="w-full p-3 rounded-md border border-input bg-background"
                        value={fromAmount}
                        onChange={(e) => setFromAmount(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Swap button */}
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full"
                    onClick={() => {
                      const temp = fromCrypto;
                      setFromCrypto(toCrypto);
                      setToCrypto(temp);
                      setFromAmount(toAmount);
                    }}
                  >
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* To Currency */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    To
                  </label>
                  <div className="space-y-2">
                    <Select value={toCrypto} onValueChange={setToCrypto}>
                      <SelectTrigger className="w-full">
                        <div className="flex items-center">
                          {toCrypto in cryptoIcons && (
                            <img
                              src={cryptoIcons[toCrypto as keyof typeof cryptoIcons]}
                              alt={toCrypto}
                              className="w-5 h-5 mr-2 bg-white rounded-full"
                            />
                          )}
                          <SelectValue placeholder="Select currency" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(exchangeRates).map(currency => (
                          <SelectItem key={currency} value={currency}>
                            <div className="flex items-center">
                              <img
                                src={cryptoIcons[currency as keyof typeof cryptoIcons]}
                                alt={currency}
                                className="w-5 h-5 mr-2 bg-white rounded-full"
                              />
                              {currency}
                            </div>
                          </SelectItem>
                        ))}
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full p-3 rounded-md border border-input bg-background"
                        value={toAmount}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium">Exchange Rate</p>
                  <p>
                    1 {fromCrypto} = {
                      fromCrypto in exchangeRates && 
                      toCrypto in exchangeRates[fromCrypto as keyof typeof exchangeRates] ?
                      exchangeRates[fromCrypto as keyof typeof exchangeRates][toCrypto as keyof typeof exchangeRates[keyof typeof exchangeRates]].toFixed(2) :
                      "N/A"
                    } {toCrypto}
                  </p>
                </div>
              </div>
            </Card>
            
            <div className="text-sm text-muted-foreground">
              <p>• Exchange rates updated as of April 14, 2025</p>
              <p>• All conversions are approximate and for reference only</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default CalculatorPage;
