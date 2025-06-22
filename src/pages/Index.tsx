//src/pages/Index.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "@/contexts/AuthContext";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import BlogPage from "@/pages/BlogPage";
import CalculatorPage from "@/pages/CalculatorPage";
import Contact from "@/pages/Contact";
import Dashboard from "@/pages/Dashboard";
import FAQ from "@/pages/FAQ";
import ForgotPassword from "@/pages/ForgotPassword";
import KycIntro from "@/pages/KycIntro";
import KycVerification from "@/pages/KycVerification";
import MarketPage from "@/pages/MarketPage";
import MissionPage from "@/pages/MissionPage";
import NotFound from "@/pages/NotFound";
import OrderDetails from "@/pages/OrderDetails";
import P2POffersList from "@/pages/P2POffersList";
import Profile from "@/pages/Profile";
import TradeGuidePage from "@/pages/TradeGuidePage";
import TradePage from "@/pages/TradePage";
import TradeRoom from "@/pages/TradeRoom";
import VerificationPending from "@/pages/VerificationPending";
import Vision from "@/pages/Vision";
import WalletPage from "@/pages/WalletPage";
import AppLayout from "@/components/AppLayout";

// Create a stack navigator
const Stack = createNativeStackNavigator();

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator>
      {/* Public Screens */}
      <Stack.Screen name="Home" children={() => <AppLayout><Home /></AppLayout>} options={{ headerShown: false }} />
      <Stack.Screen name="Login" children={() => <AppLayout><Login /></AppLayout>} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" children={() => <AppLayout><Signup /></AppLayout>} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" children={() => <AppLayout><ForgotPassword /></AppLayout>} options={{ headerShown: false }} />
      <Stack.Screen name="BlogPage" children={() => <AppLayout><BlogPage /></AppLayout>} options={{ headerShown: false }} />
      <Stack.Screen name="CalculatorPage" children={() => <AppLayout><CalculatorPage /></AppLayout>} options={{ headerShown: false }} />
      <Stack.Screen name="Contact" children={() => <AppLayout><Contact /></AppLayout>} options={{ headerShown: false }} />
      <Stack.Screen name="FAQ" children={() => <AppLayout><FAQ /></AppLayout>} options={{ headerShown: false }} />
      <Stack.Screen name="KycIntro" children={() => <AppLayout><KycIntro /></AppLayout>} options={{ headerShown: false }} />
      <Stack.Screen name="MarketPage" children={() => <AppLayout><MarketPage /></AppLayout>} options={{ headerShown: false }} />
      <Stack.Screen name="MissionPage" children={() => <AppLayout><MissionPage /></AppLayout>} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" children={() => <AppLayout><NotFound /></AppLayout>} options={{ headerShown: false }} />
      <Stack.Screen name="TradeGuidePage" children={() => <AppLayout><TradeGuidePage /></AppLayout>} options={{ headerShown: false }} />
      <Stack.Screen name="Vision" children={() => <AppLayout><Vision /></AppLayout>} options={{ headerShown: false }} />
      {/* Auth-required Screens */}
      {user && (
        <>
          <Stack.Screen name="Dashboard" children={() => <AppLayout><Dashboard /></AppLayout>} options={{ headerShown: false }} />
          <Stack.Screen name="WalletPage" children={() => <AppLayout><WalletPage /></AppLayout>} options={{ headerShown: false }} />
          <Stack.Screen name="TradePage" children={() => <AppLayout><TradePage /></AppLayout>} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" children={() => <AppLayout><Profile /></AppLayout>} options={{ headerShown: false }} />
          <Stack.Screen name="OrderDetails" children={() => <AppLayout><OrderDetails /></AppLayout>} options={{ headerShown: false }} />
          <Stack.Screen name="TradeRoom" component={TradeRoom} options={{ headerShown: false }} />
          <Stack.Screen name="P2POffersList" children={() => <AppLayout><P2POffersList /></AppLayout>} options={{ headerShown: false }} />
          <Stack.Screen name="KycVerification" children={() => <AppLayout><KycVerification /></AppLayout>} options={{ headerShown: false }} />
          <Stack.Screen name="VerificationPending" children={() => <AppLayout><VerificationPending /></AppLayout>} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Index;
