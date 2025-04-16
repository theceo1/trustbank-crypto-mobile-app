import React from "react";
import { View, StyleSheet } from "react-native";
import SliderRN from "@react-native-community/slider";

export const Slider = ({ value, onValueChange, minimumValue = 0, maximumValue = 1, step = 0.01, style, ...props }) => (
  <View style={[styles.container, style]}>
    <SliderRN
      value={value}
      onValueChange={onValueChange}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      step={step}
      style={{ flex: 1 }}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
