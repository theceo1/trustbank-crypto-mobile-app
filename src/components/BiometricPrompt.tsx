
import React, { useState, useEffect } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";

interface BiometricPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onFailure: () => void;
  title?: string;
  description?: string;
}

const BiometricPrompt = ({
  isOpen,
  onClose,
  onSuccess,
  onFailure,
  title = "Biometric Authentication",
  description = "Verify your identity using Face ID or Touch ID",
}: BiometricPromptProps) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Prevent the component from immediately closing when rendered
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  // Simulate biometric authentication
  useEffect(() => {
    if (isAuthenticating) {
      const timer = setTimeout(() => {
        // In a real app, this would be actual biometric auth
        const success = Math.random() > 0.3; // 70% chance of success for demo
        setIsAuthenticating(false);
        
        if (success) {
          onSuccess();
        } else {
          onFailure();
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticating, onSuccess, onFailure]);

  const handleAuthenticate = () => {
    setIsAuthenticating(true);
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={[styles.iconWrapper, isAuthenticating && styles.iconWrapperActive]}>
            <Feather
              name="lock"
              size={48}
              color={isAuthenticating ? '#2563eb' : '#6b7280'}
              style={isAuthenticating ? styles.iconActive : styles.icon}
            />
            {isAuthenticating && <ActivityIndicator size="small" color="#2563eb" style={{ position: 'absolute', bottom: 8, right: 8 }} />}
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.outlineButton, isAuthenticating && styles.disabledButton]}
              onPress={onClose}
              disabled={isAuthenticating}
            >
              <Feather name="x" size={18} color="#6b7280" style={{ marginRight: 8 }} />
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, isAuthenticating && styles.disabledButton]}
              onPress={handleAuthenticate}
              disabled={isAuthenticating}
            >
              <Feather name="lock" size={18} color="#2563eb" style={{ marginRight: 8 }} />
              <Text style={styles.buttonText}>{isAuthenticating ? "Authenticating..." : "Authenticate"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111827',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#6b7280',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconWrapperActive: {
    borderColor: '#2563eb',
  },
  icon: {},
  iconActive: {},
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    marginHorizontal: 4,
  },
  outlineButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default BiometricPrompt;

