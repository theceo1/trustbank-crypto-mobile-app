import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const Checkbox = ({ checked, onChange, style }: { checked: boolean; onChange: (checked: boolean) => void; style?: any }) => {
  return (
    <TouchableOpacity
      style={[styles.box, style]}
      onPress={() => onChange(!checked)}
      activeOpacity={0.8}
    >
      {checked && <Feather name="check" size={20} color="#2563eb" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#2563eb',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default Checkbox;
