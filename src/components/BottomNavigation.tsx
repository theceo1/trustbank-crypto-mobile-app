import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const navItems = [
  {
    name: "Dashboard",
    icon: "home",
    route: "Dashboard",
  },
  {
    name: "Wallet",
    icon: "credit-card",
    route: "Wallet",
  },
  {
    name: "Trade",
    icon: "bar-chart-2",
    route: "Trade",
  },
  {
    name: "Transfer",
    icon: "send",
    route: "Transfer",
  },
  {
    name: "Profile",
    icon: "user",
    route: "Profile",
  },
];

const BottomNavigation: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
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
              color={isActive ? "#10b981" : "#6b7280"}
            />
            <Text style={[styles.label, isActive && styles.activeLabel]}>
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