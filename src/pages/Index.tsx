import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "@/contexts/AuthContext";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import CalculatorPage from "@/pages/CalculatorPage";
import KycIntro from "@/pages/KycIntro";
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
      <Stack.Screen name="Home" children={() => <AppLayout><Home /></AppLayout>} options={{ headerShown: false }} />
      <Stack.Screen name="Calculator" children={() => <AppLayout><CalculatorPage /></AppLayout>} options={{ headerShown: false }} />
      <Stack.Screen name="KycIntro" children={() => <AppLayout><KycIntro /></AppLayout>} options={{ headerShown: false }} />
      {user ? (
        <Stack.Screen name="Dashboard" children={() => <AppLayout><Dashboard /></AppLayout>} options={{ headerShown: false }} />
        // Add other auth-only screens here if needed
      ) : (
        <Stack.Screen name="Login" children={() => <AppLayout><Login /></AppLayout>} options={{ headerShown: false }} />
        // Add other public screens here if needed
      )}
    </Stack.Navigator>
  );
};

export default Index;
