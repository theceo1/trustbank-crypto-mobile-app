import * as React from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions, PanResponder } from "react-native";
import { Feather } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;

export type ToastVariant = "default" | "destructive";

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastData, "id">) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const showToast = React.useCallback((toast: Omit<ToastData, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration ?? 3500);
  }, []);

  const removeToast = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastViewport>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => {
              toast.onClose?.();
              removeToast(toast.id);
            }}
          />
        ))}
      </ToastViewport>
    </ToastContext.Provider>
  );
};

export const ToastViewport: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.viewport}>{children}</View>
);

export interface ToastProps extends ToastData {}

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  variant = "default",
  actionLabel,
  onAction,
  onClose,
}) => {
  const translateX = React.useRef(new Animated.Value(0)).current;
  const [dismissed, setDismissed] = React.useState(false);

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 10,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dx > 0) translateX.setValue(gesture.dx);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 60) {
          Animated.timing(translateX, {
            toValue: SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            setDismissed(true);
            onClose?.();
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (dismissed) return null;

  return (
    <Animated.View
      style={[
        styles.toast,
        variant === "destructive" ? styles.toastDestructive : styles.toastDefault,
        { transform: [{ translateX }] },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.toastContent}>
        <View style={{ flex: 1 }}>
          {title ? <ToastTitle>{title}</ToastTitle> : null}
          {description ? <ToastDescription>{description}</ToastDescription> : null}
        </View>
        {actionLabel && (
          <ToastAction onPress={onAction}>{actionLabel}</ToastAction>
        )}
        <ToastClose onPress={onClose} />
      </View>
    </Animated.View>
  );
};

export const ToastTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={styles.toastTitle}>{children}</Text>
);

export const ToastDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={styles.toastDescription}>{children}</Text>
);

export const ToastClose: React.FC<{ onPress?: () => void }> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.toastClose} accessibilityLabel="Close notification">
    <Feather name="x" size={18} color="#888" />
  </TouchableOpacity>
);

export const ToastAction: React.FC<{ children: React.ReactNode; onPress?: () => void }> = ({ children, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.toastAction} accessibilityLabel={typeof children === "string" ? children : undefined}>
    <Text style={styles.toastActionText}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  viewport: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: 16,
    width: "100%",
    flexDirection: "column-reverse",
    alignItems: "flex-end",
    pointerEvents: "box-none",
  },
  toast: {
    minWidth: 240,
    maxWidth: 420,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  toastDefault: {
    borderColor: "#eee",
  },
  toastDestructive: {
    borderColor: "#ff4d4f",
    backgroundColor: "#fff0f0",
  },
  toastContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  toastTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 2,
    color: "#222",
  },
  toastDescription: {
    fontSize: 14,
    color: "#555",
    opacity: 0.9,
  },
  toastClose: {
    marginLeft: 10,
    padding: 5,
  },
  toastAction: {
    marginLeft: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#f2f2f2",
  },
  toastActionText: {
    color: "#007aff",
    fontWeight: "600",
    fontSize: 14,
  },
});


