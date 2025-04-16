import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";

export const Select = ({
  selectedValue,
  onValueChange,
  items,
  placeholder,
  style,
  ...props
}: {
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: { label: string; value: string }[];
  placeholder?: string;
  style?: any;
}) => (
  <View style={[styles.container, style]}>
    <View style={styles.pickerWrapper}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
        {...props}
      >
        {placeholder && <Picker.Item label={placeholder} value="" />}
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
      <Feather name="chevron-down" size={18} color="#6b7280" style={styles.icon} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 6,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#fff",
    position: "relative",
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: 44,
    color: "#111827",
    paddingLeft: 8,
  },
  icon: {
    position: "absolute",
    right: 12,
    top: 13,
    pointerEvents: "none",
  },
});