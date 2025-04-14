
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import KycIntro from "./pages/KycIntro";
import KycVerification from "./pages/KycVerification";
import VerificationPending from "./pages/VerificationPending";
import WalletPage from "./pages/WalletPage";
import TradePage from "./pages/TradePage";
import TransferPage from "./pages/TransferPage";
import CalculatorPage from "./pages/CalculatorPage";
import MarketPage from "./pages/MarketPage";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/kyc-intro" element={<KycIntro />} />
              <Route path="/kyc-verification" element={<KycVerification />} />
              <Route path="/verification-pending" element={<VerificationPending />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/trade" element={<TradePage />} />
              <Route path="/transfer" element={<TransferPage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/market" element={<MarketPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
