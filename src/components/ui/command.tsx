import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface CommandProps {
  children: React.ReactNode;
}

const Command = ({ children }: CommandProps) => {
  return <View style={styles.command}>{children}</View>;
};

const CommandInput = React.forwardRef<TextInput, React.ComponentPropsWithoutRef<typeof TextInput>>(
  (props, ref) => (
    <TextInput
      ref={ref}
      style={styles.input}
      placeholder="Type a command or search..."
      {...props}
    />
  )
);

CommandInput.displayName = "CommandInput";

const styles = StyleSheet.create({
  command: {
    width: '100%',
    padding: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
});

export {
  Command,
  CommandInput,
}
