import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Logo from "@/components/Logo";
import { LinearGradient } from 'expo-linear-gradient';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigation = useNavigation();
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
      toast({
        title: "Reset Email Sent",
        description: "Check your inbox for password reset instructions.",
      });
    } catch (error: any) {
      toast({
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

const styles = StyleSheet.create({
  bg: {
    flex: 1,
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
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingVertical: 32,
    paddingHorizontal: 22,
    shadowColor: '#10b981',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 32,
    elevation: 8,
    alignItems: 'center',
  },
  logo: {
    marginBottom: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#5c5e6b',
    marginBottom: 18,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    fontSize: 16,
    color: '#222',
    paddingVertical: 10,
    backgroundColor: '#f6f8fa',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e0e7ef',
    marginBottom: 18,
    marginTop: 12,
    paddingHorizontal: 12,
  },
  resetBtn: {
    width: '100%',
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
  },
  backLink: {
    marginTop: 4,
  },
  link: {
    color: '#10b981',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default ForgotPassword;
