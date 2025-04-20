import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/toast";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Logo from "@/components/Logo";
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from "@/contexts/ThemeContext";

const ForgotPassword = () => {
  const { showToast } = useToast();
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    bg: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    card: {
      width: '100%',
      maxWidth: 420,
      backgroundColor: theme.colors.card,
      borderRadius: 22,
      paddingVertical: 32,
      paddingHorizontal: 22,
      alignSelf: 'center',
      marginTop: 24,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
    },
    logo: {
      width: 64,
      height: 64,
      alignSelf: 'center',
      marginBottom: 8,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 2,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 15,
      color: theme.colors.secondaryText,
      textAlign: 'center',
      marginBottom: 18,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: theme.colors.card,
      marginBottom: 8,
    },
    resetBtn: {
      marginTop: 12,
      width: '100%',
      maxWidth: 340,
      alignSelf: 'center',
    },
    backLink: {
      marginTop: 18,
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    link: {
      color: theme.colors?.primary || '#1a237e',
      fontWeight: '600',
      marginLeft: 6,
    },
  });

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigation = useNavigation();
  const { resetPassword } = useAuth();
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
      showToast({
        title: "Reset Email Sent",
        description: "Check your inbox for password reset instructions.",
      });
    } catch (error: any) {
      showToast({
        title: "Error",
        description: error.message || "Failed to send reset email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#10b981", "#1a237e"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.bg}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.centered} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <View style={styles.logo}><Logo size="lg" /></View>
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              Enter your email address and we'll send you a link to reset your password.
            </Text>
            <Input
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              importantForAutofill="yes"
              autoComplete="email"
              returnKeyType="done"
            />
            <Button
              style={styles.resetBtn}
              onPress={handleSubmit}
              disabled={loading || sent || !email}
            >
              {loading ? <ActivityIndicator color="#fff" /> : sent ? "Email Sent" : "Send Reset Link"}
            </Button>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backLink}>
              <Text style={styles.link}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default ForgotPassword;
