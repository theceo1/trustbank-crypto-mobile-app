//src/components/BottomNavigation.tsx
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";

import { useAuth } from "@/contexts/AuthContext";

const BottomNavigation: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();

  const backgroundColor = theme.colors.background === '#101522' ? '#181c2f' : '#fff';
  const borderTopColor = theme.colors.background === '#101522' ? '#22263a' : '#e5e7eb';
  const inactiveColor = theme.colors.background === '#101522' ? '#a3aed6' : '#6b7280';
  const activeColor = "#059669";

  const publicNavItems = [
    { name: "Home", icon: "home", route: "Home" },
    { name: "Market", icon: "bar-chart-2", route: "Market" },
    { name: "Trade Guide", icon: "book", route: "TradeGuide" },
    { name: "Login", icon: "log-in", route: "Login" },
  ];
  const authNavItems = [
    { name: "Dashboard", icon: "home", route: "Dashboard" },
    { name: "Wallet", icon: "credit-card", route: "Wallet" },
    { name: "Trade", icon: "repeat", route: "Trade" },
    { name: "Profile", icon: "user", route: "Profile" },
  ];
  const navItems = user ? authNavItems : publicNavItems;

  return (
    <View style={[styles.container, { backgroundColor, borderTopColor }] }>
      {navItems.map((item) => {
        const isActive = route.name === item.route;
        return (
          <TouchableOpacity
            key={item.route}
            style={styles.tab}
            onPress={() => navigation.navigate(item.route as never)}
          >
            <Feather
              name={item.icon as any}
              size={22}
              color={isActive ? activeColor : inactiveColor}
            />
            <Text style={[styles.label, { color: isActive ? activeColor : inactiveColor }, isActive && styles.activeLabel]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
    height: 60,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  activeLabel: {
    color: "#10b981",
    fontWeight: "bold",
  },
});

export default BottomNavigation;