
import React from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import Button from "@/components/ui/button";
import Logo from "@/components/Logo";

const KycIntro = ({ navigation }: any) => {
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

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#1a237e',
    textAlign: 'center',
  },
  subtitle: {
    color: '#666',
    fontSize: 15,
    textAlign: 'center',
    maxWidth: 320,
    marginBottom: 0,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 0,
    shadowColor: '#3949ab',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  stepIconWrap: {
    backgroundColor: '#f1f4ff',
    borderRadius: 32,
    padding: 8,
    marginRight: 14,
    marginTop: 2,
  },
  stepTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 2,
    color: '#222',
  },
  stepDesc: {
    color: '#888',
    fontSize: 13,
  },
  info: {
    color: '#888',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    backgroundColor: '#f8fafd',
    borderTopWidth: 1,
    borderTopColor: '#ececec',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3949ab',
    borderRadius: 12,
    paddingVertical: 16,
    width: '100%',
  },
});

export default KycIntro;
