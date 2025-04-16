
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Checkbox from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import Logo from "@/components/Logo";
import BiometricPrompt from "@/components/BiometricPrompt";
import { signInWithGoogle } from "@/lib/supabase";
import { LinearGradient } from 'expo-linear-gradient';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);
  
  const { signIn } = useAuth();
  const navigation = useNavigation();
  const { toast } = useToast();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const { data, error } = await signIn(email, password);
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome back to trustBank!",
        });
        navigation.navigate("Home" as never);
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast({
          title: "Google Login Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Google Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleBiometricAuth = () => {
    // In a real app, check if biometric is registered first
    setShowBiometric(true);
  };

  const handleBiometricSuccess = () => {
    setShowBiometric(false);
    // In a real app, this would use stored credentials
    toast({
      title: "Biometric Authentication Successful",
      description: "Welcome back to trustBank!",
    });
    navigation.navigate("Home" as never);
  };

  const handleBiometricFailure = () => {
    setShowBiometric(false);
    toast({
      title: "Biometric Authentication Failed",
      description: "Please try again or use email and password.",
      variant: "destructive",
    });
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
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <View style={styles.logo}><Logo size="lg" /></View>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to access your trustBank account</Text>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Label>Email</Label>
              <View style={styles.inputIconRow}>
                <FontAwesome name="user" size={18} color="#bdbdbd" style={styles.inputIcon} />
                <Input
                  placeholder="you@example.com"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  importantForAutofill="yes"
                  autoComplete="email"
                  returnKeyType="next"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Label>Password</Label>
              <View style={styles.inputIconRow}>
                <Feather name="key" size={18} color="#bdbdbd" style={styles.inputIcon} />
                <Input
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  importantForAutofill="yes"
                  autoComplete="password"
                  returnKeyType="done"
                />
                <TouchableOpacity
                  style={styles.inputIconRight}
                  onPress={() => setShowPassword((v) => !v)}
                  accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                >
                  <Feather name={showPassword ? "eye-off" : "eye"} size={18} color="#bdbdbd" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me & Forgot Password */}
            <View style={styles.rowBetween}>
              <View style={styles.rowCenter}>
                <Checkbox
                  checked={rememberMe}
                  onChange={setRememberMe}
                  style={styles.checkbox}
                />
                <Text style={styles.rememberText}>Remember me</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword" as never)}
                style={styles.forgotBtn}
                accessibilityLabel="Forgot password?"
              >
                <Text style={styles.link}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <Button
              style={styles.loginBtn}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : "Sign in"}
            </Button>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.divider} />
            </View>

            {/* Google Login */}
            <TouchableOpacity
              style={styles.googleBtn}
              onPress={handleGoogleLogin}
              disabled={googleLoading}
              activeOpacity={0.8}
            >
              <FontAwesome name="google" size={18} color="#ea4335" style={{ marginRight: 8 }} />
              <Text style={styles.googleBtnText}>{googleLoading ? "Connecting..." : "Sign in with Google"}</Text>
            </TouchableOpacity>

            {/* Biometric Login */}
            <TouchableOpacity
              style={styles.biometricBtn}
              onPress={handleBiometricAuth}
              activeOpacity={0.8}
              accessibilityLabel="Sign in with Face ID or Touch ID"
            >
              <MaterialCommunityIcons name="fingerprint" size={22} color="#10b981" style={{ marginRight: 8 }} />
              <Text style={styles.biometricBtnText}>Sign in with Face ID / Touch ID</Text>
            </TouchableOpacity>

            {/* Signup Link */}
            <View style={styles.loginRow}>
              <Text style={styles.loginText}>
                Don't have an account?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate("Signup" as never)}>Sign up</Text>
              </Text>
            </View>

          {/* Signup Link (already rendered below, removed duplicate) */}
        </View>
      </ScrollView>
      <BiometricPrompt
        isOpen={showBiometric}
        onClose={() => setShowBiometric(false)}
        onSuccess={handleBiometricSuccess}
        onFailure={handleBiometricFailure}
      />
    </KeyboardAvoidingView>
  </LinearGradient>
);
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
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
  inputGroup: {
    width: '100%',
    marginBottom: 14,
  },
  inputIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f8fa',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e0e7ef',
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 6,
  },
  inputIcon: {
    marginRight: 6,
  },
  inputIconRight: {
    marginLeft: 'auto',
    padding: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
    borderColor: '#10b981',
  },
  rememberText: {
    fontSize: 14,
    color: '#5c5e6b',
  },
  forgotBtn: {
    padding: 0,
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 4,
    marginBottom: 12,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e7ef',
  },
  dividerText: {
    fontSize: 12,
    color: '#a1a1aa',
    marginHorizontal: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 13,
    width: '100%',
    backgroundColor: '#f6f8fa',
    marginBottom: 10,
  },
  googleBtnText: {
    color: '#10b981',
    fontWeight: 'bold',
    fontSize: 15,
  },
  biometricBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 13,
    width: '100%',
    backgroundColor: '#e8fdf3',
    marginBottom: 8,
  },
  biometricBtnText: {
    color: '#10b981',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loginRow: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    fontSize: 14,
    color: '#5c5e6b',
  },
  link: {
    color: '#10b981',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default Login;
