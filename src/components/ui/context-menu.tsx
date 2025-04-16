import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

// Minimal mobile context menu placeholder
export function ContextMenu({ children }: { children: React.ReactNode }) {
  return <View style={styles.menuContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
});
