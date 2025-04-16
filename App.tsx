//app.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { AuthProvider } from './src/contexts/AuthContext';
import { ToastProvider } from 'react-native-toast-notifications';
import { StatusBar } from 'expo-status-bar';

import Index from './src/pages/Index';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Home from './src/pages/Home';
import Dashboard from './src/pages/Dashboard';
import KycIntro from './src/pages/KycIntro';
import KycVerification from './src/pages/KycVerification';
import VerificationPending from './src/pages/VerificationPending';
import WalletPage from './src/pages/WalletPage';
import TradePage from './src/pages/TradePage';
import TransferPage from './src/pages/TransferPage';
import CalculatorPage from './src/pages/CalculatorPage';
import MarketPage from './src/pages/MarketPage';
import Profile from './src/pages/Profile';
import NotFound from './src/pages/NotFound';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
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