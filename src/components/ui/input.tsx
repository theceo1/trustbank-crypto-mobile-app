import React from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";

const Input = React.forwardRef<TextInput, TextInputProps>((props, ref) => {
  return <TextInput ref={ref} {...props} style={[styles.input, props.style]} />;
});

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    color: '#222',
    paddingVertical: 10,
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e0e7ef',
    paddingHorizontal: 12,
  },
});

Input.displayName = "Input";

export default Input;
