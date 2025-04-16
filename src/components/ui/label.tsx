import * as React from "react";
import { Text, TextProps, StyleSheet } from "react-native";

interface LabelProps extends TextProps {
  children: React.ReactNode;
  style?: any;
}

const Label = React.forwardRef<Text, LabelProps>(({ children, style, ...props }, ref) => (
  <Text ref={ref} style={[styles.label, style]} {...props}>
    {children}
  </Text>
));

Label.displayName = "Label";

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    opacity: 1,
  },
});

export { Label };
