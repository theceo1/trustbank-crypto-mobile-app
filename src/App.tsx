import './polyfills';
//src/App.tsx
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
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import KycIntro from './pages/KycIntro';
import KycVerification from './pages/KycVerification';
import VerificationPending from './pages/VerificationPending';
import WalletPage from './pages/WalletPage';
import TradePage from './pages/TradePage';
import TransferPage from './pages/TransferPage';
import CalculatorPage from './pages/CalculatorPage';
import MarketPage from './pages/MarketPage';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

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
              <Stack.Screen name="Index" component={Index} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="KycIntro" component={KycIntro} />
              <Stack.Screen name="KycVerification" component={KycVerification} />
              <Stack.Screen name="VerificationPending" component={VerificationPending} />
              <Stack.Screen name="Wallet" component={WalletPage} />
              <Stack.Screen name="Trade" component={TradePage} />
              <Stack.Screen name="Transfer" component={TransferPage} />
              <Stack.Screen name="Calculator" component={CalculatorPage} />
              <Stack.Screen name="Market" component={MarketPage} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="NotFound" component={NotFound} />
            </Stack.Navigator>
          </NavigationContainer>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;