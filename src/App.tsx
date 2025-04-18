//src/App.tsx
import './polyfills';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from 'react-native-toast-notifications';
import { StatusBar } from 'expo-status-bar';

import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import KycIntro from './pages/KycIntro';
import KycVerification from './pages/KycVerification';
import VerificationPending from './pages/VerificationPending';
import WalletPage from './pages/WalletPage';
import TradePage from './pages/TradePage';

import CalculatorPage from './pages/CalculatorPage';
import MarketPage from './pages/MarketPage';
import BlogPage from './pages/BlogPage';
import MissionPage from './pages/MissionPage';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import TradeGuidePage from './pages/TradeGuidePage';
import VisionScreen from './pages/Vision';
import FAQScreen from './pages/FAQ';
import ContactScreen from './pages/Contact';
import AppLayout from './components/AppLayout';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator 
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Index" children={() => <AppLayout><Index /></AppLayout>} />
              <Stack.Screen name="Login" children={() => <AppLayout><Login /></AppLayout>} />
              <Stack.Screen name="Signup" children={() => <AppLayout><Signup /></AppLayout>} />
              <Stack.Screen name="Dashboard" children={() => <AppLayout><Dashboard /></AppLayout>} />
              <Stack.Screen name="KycIntro" children={() => <AppLayout><KycIntro /></AppLayout>} />
              <Stack.Screen name="KycVerification" children={() => <AppLayout><KycVerification /></AppLayout>} />
              <Stack.Screen name="VerificationPending" children={() => <AppLayout><VerificationPending /></AppLayout>} />
              <Stack.Screen name="Wallet" children={() => <AppLayout><WalletPage /></AppLayout>} />
              <Stack.Screen name="Trade" children={() => <AppLayout><TradePage /></AppLayout>} />
              <Stack.Screen name="Calculator" children={() => <AppLayout><CalculatorPage /></AppLayout>} />
              <Stack.Screen name="Market" children={() => <AppLayout><MarketPage /></AppLayout>} />
              <Stack.Screen name="Blog" children={() => <AppLayout><BlogPage /></AppLayout>} />
              <Stack.Screen name="Mission" children={() => <AppLayout><MissionPage /></AppLayout>} />
              <Stack.Screen name="Profile" children={() => <AppLayout><Profile /></AppLayout>} />
              <Stack.Screen name="TradeGuide" children={() => <AppLayout><TradeGuidePage /></AppLayout>} />
              <Stack.Screen name="Vision" children={() => <AppLayout><VisionScreen /></AppLayout>} />
              <Stack.Screen name="FAQ" children={() => <AppLayout><FAQScreen /></AppLayout>} />
              <Stack.Screen name="Contact" children={() => <AppLayout><ContactScreen /></AppLayout>} />
              <Stack.Screen name="NotFound" children={() => <AppLayout><NotFound /></AppLayout>} />
            </Stack.Navigator>
          </NavigationContainer>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;