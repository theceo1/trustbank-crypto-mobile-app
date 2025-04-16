import * as React from "react";
import { Modal, View, TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export type SheetSide = "left" | "right" | "top" | "bottom";

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: SheetSide;
  overlayColor?: string;
  sheetStyle?: any;
}

export function Sheet({ open, onClose, children, side = "right", overlayColor = "rgba(0,0,0,0.5)", sheetStyle }: SheetProps) {
  const translateAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (open) {
      Animated.timing(translateAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [open]);

  // Calculate transform for sliding
  const getTransform = () => {
    switch (side) {
      case "left":
        return [{ translateX: translateAnim.interpolate({ inputRange: [0, 1], outputRange: [-SCREEN_WIDTH, 0] }) }];
      case "right":
        return [{ translateX: translateAnim.interpolate({ inputRange: [0, 1], outputRange: [SCREEN_WIDTH, 0] }) }];
      case "top":
        return [{ translateY: translateAnim.interpolate({ inputRange: [0, 1], outputRange: [-SCREEN_HEIGHT, 0] }) }];
      case "bottom":
        return [{ translateY: translateAnim.interpolate({ inputRange: [0, 1], outputRange: [SCREEN_HEIGHT, 0] }) }];
      default:
        return [];
    }
  };

  return (
    <Modal
      visible={open}
      animationType="none"
      transparent
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={[styles.overlay, { backgroundColor: overlayColor }]}
        activeOpacity={1}
        onPress={onClose}
      />
      <Animated.View
        style={[
          styles.sheet,
          styles[side],
          { transform: getTransform() },
          sheetStyle,
        ]}
      >
        {children}
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={onClose}
          accessibilityLabel="Close sheet"
        >
          <Feather name="x" size={22} color="#888" />
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
}

export function SheetHeader({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function SheetFooter({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

export function SheetTitle({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={[styles.titleBox, style]}><Animated.Text style={styles.title}>{children}</Animated.Text></View>;
}

export function SheetDescription({ children, style }: { children: React.ReactNode; style?: any }) {
  return <Animated.Text style={[styles.description, style]}>{children}</Animated.Text>;
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  sheet: {
    position: "absolute",
    zIndex: 20,
    backgroundColor: "#fff",
    minHeight: 180,
    minWidth: 180,
    maxHeight: SCREEN_HEIGHT,
    maxWidth: SCREEN_WIDTH,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
    padding: 20,
  },
  right: {
    top: 0,
    right: 0,
    height: "100%",
    width: SCREEN_WIDTH * 0.8,
  },
  left: {
    top: 0,
    left: 0,
    height: "100%",
    width: SCREEN_WIDTH * 0.8,
  },
  top: {
    left: 0,
    top: 0,
    width: "100%",
    height: SCREEN_HEIGHT * 0.6,
  },
  bottom: {
    left: 0,
    bottom: 0,
    width: "100%",
    height: SCREEN_HEIGHT * 0.6,
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#f3f3f3",
    borderRadius: 18,
    padding: 6,
    zIndex: 30,
  },
  header: {
    marginBottom: 16,
  },
  footer: {
    marginTop: 16,
  },
  titleBox: {
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },
  description: {
    fontSize: 15,
    color: "#666",
    marginBottom: 8,
  },
});

