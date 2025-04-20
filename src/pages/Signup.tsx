
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/toast";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Checkbox from "@/components/ui/checkbox";
import Logo from "@/components/Logo";
import { signInWithGoogle } from "@/lib/supabase";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
 
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { signUp } = useAuth();
  const navigation = useNavigation();
  const { showToast } = useToast();

  const handleSignup = async () => {
    if (password.length < 8) {
      showToast({
        title: "Password Error",
        description: "Password must be at least 8 characters.",
        variant: "destructive",
      });
      return;
    }
    if (password !== confirmPassword) {
      showToast({
        title: "Password Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (!agreedToTerms) {
      showToast({
        title: "Terms Agreement Required",
        description: "You must agree to the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await signUp(email, password, fullName);
      
      if (error) {
        showToast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        showToast({
          title: "Account Created",
          description: "Check your email to verify your account.",
        });
        // Navigate to the KYC verification process
        navigation.navigate("kyc-intro" as never);
      }
    } catch (error) {
      showToast({
        title: "Signup Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        showToast({
          title: "Google Signup Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        showToast({
          title: "Account Created with Google",
          description: "Welcome to trustBank!",
        });
      }
    } catch (error) {
      showToast({
        title: "Google Signup Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGoogleLoading(false);
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
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Logo size="lg"/>
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>Join trustBank and access the future of finance</Text>

            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Label>Full Name</Label>
              <View style={styles.inputIconRow}>
                <Feather name="user" size={18} color="#bdbdbd" style={styles.inputIcon} />
                <Input
                  placeholder="John Doe"
                  value={fullName}
                  onChangeText={setFullName}
                  style={styles.input}
                  autoCapitalize="words"
                  returnKeyType="next"
                  importantForAutofill="yes"
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Label>Email</Label>
              <View style={styles.inputIconRow}>
                <Feather name="mail" size={18} color="#bdbdbd" style={styles.inputIcon} />
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
                <Feather name="lock" size={18} color="#bdbdbd" style={styles.inputIcon} />
                <Input
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  importantForAutofill="yes"
                  autoComplete="password"
                  returnKeyType="next"
                  
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

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <Label>Confirm Password</Label>
              <View style={styles.inputIconRow}>
                <Feather name="lock" size={18} color="#bdbdbd" style={styles.inputIcon} />
                <Input
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  importantForAutofill="yes"
                  autoComplete="password"
                  returnKeyType="done"
                  
                />
              </View>
            </View>

            {/* Terms Checkbox */}
            <View style={styles.termsRow}>
              <Checkbox
                checked={agreedToTerms}
                onChange={setAgreedToTerms}
                style={styles.checkbox}
              />
              <Text style={styles.termsText}>
                I agree to the
                <Text style={styles.link} onPress={() => navigation.navigate("Terms" as never)}> Terms of Service</Text>
                {' '}and{' '}
                <Text style={styles.link} onPress={() => navigation.navigate("Privacy" as never)}>Privacy Policy</Text>
              </Text>
            </View>

            {/* Signup Button */}
            <Button
              style={styles.signupBtn}
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : "Create account"}
            </Button>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.divider} />
            </View>

            {/* Google Signup */}
            <TouchableOpacity
              style={styles.googleBtn}
              onPress={handleGoogleSignup}
              disabled={googleLoading}
              activeOpacity={0.8}
            >
              <Feather name="globe" size={18} color="#10b981" style={{ marginRight: 8 }} />
              <Text style={styles.googleBtnText}>{googleLoading ? "Connecting..." : "Sign up with Google"}</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginRow}>
              <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate("Login" as never)}>Sign in</Text>
              </Text>
            </View>
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
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  checkbox: {
    marginRight: 10,
    borderColor: '#10b981',
  },
  termsText: {
    fontSize: 14,
    color: '#5c5e6b',
    flex: 1,
    flexWrap: 'wrap',
  },
  link: {
    color: '#10b981',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  signupBtn: {
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
    marginBottom: 8,
  },
  googleBtnText: {
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
});

export default Signup;
