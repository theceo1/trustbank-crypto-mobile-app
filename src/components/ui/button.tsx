import React from "react";
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ViewStyle, TextStyle } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

const Button = ({ children, variant = "primary", style, textStyle, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        variant === "outline" ? styles.outline : styles.primary,
        style,
        props.disabled && styles.disabled,
      ]}
      activeOpacity={0.8}
      {...props}
    >
      <Text style={[styles.text, variant === "outline" ? styles.textOutline : {}, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primary: {
    backgroundColor: '#10b981',
    borderWidth: 0,
  },
  outline: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#10b981',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textOutline: {
    color: '#10b981',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Button;
