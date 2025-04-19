import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "@/contexts/AuthContext";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";

// Create a stack navigator
const Stack = createNativeStackNavigator();

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      {user ? (
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        // Add other auth-only screens here if needed
      ) : (
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        // Add other public screens here if needed
      )}
    </Stack.Navigator>
  );
};

export default Index;
