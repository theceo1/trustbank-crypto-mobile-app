import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export interface RadioGroupOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioGroupOption[];
  value: string;
  onChange: (value: string) => void;
  style?: any;
  itemStyle?: any;
}

export function RadioGroup({ options, value, onChange, style, itemStyle }: RadioGroupProps) {
  return (
    <View style={[styles.group, style]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[styles.radioItem, itemStyle, option.disabled && styles.disabled]}
          onPress={() => !option.disabled && onChange(option.value)}
          disabled={option.disabled}
          accessibilityRole="radio"
          accessibilityState={{ selected: value === option.value, disabled: !!option.disabled }}
        >
          <View style={[styles.radioCircle, value === option.value && styles.radioCircleChecked, option.disabled && styles.radioCircleDisabled]}>
            {value === option.value && <Feather name="circle" size={16} color="#007aff" />}
          </View>
          <Text style={[styles.radioLabel, option.disabled && styles.disabledLabel]}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    flexDirection: "column",
    gap: 8,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#007aff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  radioCircleChecked: {
    backgroundColor: "#e8f0fe",
    borderColor: "#007aff",
  },
  radioCircleDisabled: {
    borderColor: "#ccc",
    backgroundColor: "#f5f5f5",
  },
  radioLabel: {
    fontSize: 16,
    color: "#222",
  },
  disabled: {
    opacity: 0.5,
  },
  disabledLabel: {
    color: "#aaa",
  },
});
