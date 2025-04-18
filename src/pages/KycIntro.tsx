
import React from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import Button from "@/components/ui/button";
import Logo from "@/components/Logo";
import { useTheme } from "@/contexts/ThemeContext";

const KycIntro = ({ navigation }: any) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    stepCard: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: theme.colors?.card || '#fff',
      borderRadius: 14,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors?.border || '#e5e7eb',
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 2,
    },
    stepIconWrap: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: theme.colors?.background || '#f1f5f9',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    stepTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors?.text || '#1a237e',
      marginBottom: 2,
    },
    stepDesc: {
      fontSize: 13,
      color: theme.colors?.secondaryText || '#64748b',
    },
    info: {
      fontSize: 14,
      color: theme.colors?.secondaryText || '#64748b',
      marginBottom: 16,
      marginTop: 8,
      textAlign: 'center',
    },
    footer: {
      marginTop: 24,
      alignItems: 'center',
    },
    footerButton: {
      marginTop: 16,
      width: '100%',
      maxWidth: 340,
      alignSelf: 'center',
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.colors?.text || '#1a237e',
      marginBottom: 2,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 15,
      color: theme.colors?.secondaryText || '#64748b',
      textAlign: 'center',
      marginBottom: 18,
    },
  });

  // Feather icon names: file-text, shield, credit-card
  const steps = [
    {
      title: "Identity Verification",
      description: "Verify your identity using a government-issued ID",
      icon: "file-text",
    },
    {
      title: "Biometric Verification",
      description: "Complete a quick face scan to confirm your identity",
      icon: "shield",
    },
    {
      title: "Wallet Setup",
      description: "Set up your crypto wallet to start transacting",
      icon: "credit-card",
    },
  ];

  const handleStartKyc = () => {
    // Replace this with your navigation logic
    if (navigation && navigation.navigate) {
      navigation.navigate("KycVerification");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafd' }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }}>
        {/* Header */}
        <View style={{ alignItems: 'center', marginBottom: 32, marginTop: 16 }}>
          <Logo size="lg" />
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            Just a few quick steps to verify your identity and start using trustBank
          </Text>
        </View>

        {/* Steps */}
        <View style={{ maxWidth: 420, alignSelf: 'center', width: '100%' }}>
          {steps.map((step, index) => (
            <View
              key={index}
              style={[styles.stepCard, { opacity: 1, marginBottom: 18 }]}
            >
              <View style={styles.stepIconWrap}>
                <Feather name={step.icon as any} size={28} color="#3949ab" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.description}</Text>
              </View>
              <Feather name="check-circle" size={22} color="#bbb" style={{ opacity: 0.5, marginLeft: 8 }} />
            </View>
          ))}
        </View>

        {/* Info */}
        <View style={{ alignItems: 'center', marginTop: 24, marginBottom: 32 }}>
          <Text style={styles.info}>
            Your information is encrypted and secure.{"\n"}
            This process usually takes less than 5 minutes.
          </Text>
        </View>
      </ScrollView>
      {/* Footer */}
      <View style={styles.footer}>
        <Button
          style={styles.footerButton}
          onPress={handleStartKyc}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 17 }}>Start Verification</Text>
          <Feather name="chevron-right" size={22} color="#fff" style={{ marginLeft: 6 }} />
        </Button>
      </View>
    </SafeAreaView>
  );
};


export default KycIntro;
