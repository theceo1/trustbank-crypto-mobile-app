import * as React from "react";
import { View, StyleSheet, PanResponder, Animated, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export interface ResizablePanelGroupProps {
  direction?: "horizontal" | "vertical";
  initialRatio?: number; // 0..1
  minRatio?: number;
  maxRatio?: number;
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  topPanel?: React.ReactNode;
  bottomPanel?: React.ReactNode;
  handleSize?: number;
  style?: any;
}

export function ResizablePanelGroup({
  direction = "horizontal",
  initialRatio = 0.5,
  minRatio = 0.15,
  maxRatio = 0.85,
  leftPanel,
  rightPanel,
  topPanel,
  bottomPanel,
  handleSize = 24,
  style,
}: ResizablePanelGroupProps) {
  const [ratio, setRatio] = React.useState(initialRatio);
  const dragging = React.useRef(false);
  const startRatio = React.useRef(ratio);

  // Calculate panel sizes
  const isHorizontal = direction === "horizontal";
  const totalSize = isHorizontal ? SCREEN_WIDTH : SCREEN_HEIGHT;
  const panel1Size = ratio * totalSize;
  const panel2Size = (1 - ratio) * totalSize;

  // PanResponder for dragging
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        dragging.current = true;
        startRatio.current = ratio;
      },
      onPanResponderMove: (_, gestureState) => {
        let delta = isHorizontal ? gestureState.dx : gestureState.dy;
        let newRatio = startRatio.current + delta / totalSize;
        newRatio = Math.max(minRatio, Math.min(maxRatio, newRatio));
        setRatio(newRatio);
      },
      onPanResponderRelease: () => {
        dragging.current = false;
      },
    })
  ).current;

  return (
    <View style={[styles.group, isHorizontal ? styles.row : styles.col, style]}>
      <View style={[styles.panel, isHorizontal ? { width: panel1Size } : { height: panel1Size }]}>
        {isHorizontal ? leftPanel : topPanel}
      </View>
      <View
        style={[styles.handle, isHorizontal ? styles.handleVertical : styles.handleHorizontal, isHorizontal ? { width: handleSize } : { height: handleSize }]}
        {...panResponder.panHandlers}
      >
        <Feather name="more-vertical" size={18} color="#888" style={isHorizontal ? {} : { transform: [{ rotate: "90deg" }] }} />
      </View>
      <View style={[styles.panel, isHorizontal ? { width: panel2Size } : { height: panel2Size }]}>
        {isHorizontal ? rightPanel : bottomPanel}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  col: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  panel: {
    backgroundColor: "#fff",
    minWidth: 30,
    minHeight: 30,
    flexShrink: 0,
  },
  handle: {
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  handleVertical: {
    width: 24,
    height: "100%",
  },
  handleHorizontal: {
    height: 24,
    width: "100%",
  },
});
