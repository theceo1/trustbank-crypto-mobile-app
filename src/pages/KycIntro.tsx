//src/pages/KycIntro.tsx
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

  // KYC Tiers - copy from TradeGuidePage for consistency
  const KYC_TIERS = [
    {
      key: 'basic',
      name: 'Basic',
      icon: 'shield',
      requirements: [
        'Email Verification',
        'Phone Number Verification',
        'Basic Personal Information',
      ],
      features: [
        'Basic trading features',
        'Limited trading volume',
        'Basic support',
      ],
      limits: {
        daily: 100,
        monthly: 1000,
        withdrawal: 200,
      },
    },
    {
      key: 'starter',
      name: 'Starter',
      icon: 'star',
      requirements: [
        'All Basic Tier Requirements',
        'NIN Verification',
        'Selfie Verification',
      ],
      features: [
        'Increased trading limits',
        'Priority support',
        'Access to OTC trading',
      ],
      limits: {
        daily: 500,
        monthly: 5000,
        withdrawal: 1000,
      },
    },
    {
      key: 'intermediate',
      name: 'Intermediate',
      icon: 'arrow-up-right',
      requirements: [
        'All Starter Tier Requirements',
        'BVN Verification',
      ],
      features: [
        'Higher trading limits',
        'Lower trading fees',
        'Dedicated support line',
      ],
      limits: {
        daily: 2000,
        monthly: 20000,
        withdrawal: 5000,
      },
    },
    {
      key: 'advanced',
      name: 'Advanced',
      icon: 'lock',
      requirements: [
        'All Intermediate Tier Requirements',
        'LiveCheck Verification',
      ],
      features: [
        'Premium trading limits',
        'VIP support',
        'Advanced trading tools',
        'Exclusive market insights',
      ],
      limits: {
        daily: 10000,
        monthly: 100000,
        withdrawal: 20000,
      },
    },
    {
      key: 'premium',
      name: 'Premium',
      icon: 'crown',
      requirements: [
        'All Advanced Tier Requirements',
        'Government-issued ID',
        'International Passport',
      ],
      features: [
        'Highest trading limits',
        'Lowest trading fees',
        'Dedicated account manager',
        'Premium support',
        'Advanced trading features',
        'Early access to new features',
      ],
      limits: {
        daily: 50000,
        monthly: 500000,
        withdrawal: 100000,
      },
    },
  ];

  const formatCurrency = (amount: number) => `$${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

  const handleStartKyc = () => {
    // Replace this with your navigation logic
    if (navigation && navigation.navigate) {
      navigation.navigate("KycVerification");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120, backgroundColor: theme.colors.background }}>
        {/* KYC Tiers Overview */}
        <View style={{ maxWidth: 480, alignSelf: 'center', width: '100%' }}>
          <Text style={[styles.title, { marginBottom: 8, color: theme.colors.text }]}>KYC Verification Tiers</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Unlock more features and higher limits as you progress through our verification tiers. Complete each tier to increase your trading power and access premium benefits.
          </Text>
          {KYC_TIERS.map((tier, idx) => {
            const cardBg = theme.colors.card || '#fff';
            const borderCol = theme.colors.border || '#e5e7eb';
            return (
              <View key={tier.key} style={[styles.stepCard, { marginBottom: 18, backgroundColor: cardBg, borderColor: borderCol }]}>  
                <View style={[styles.stepIconWrap, { backgroundColor: theme.colors.background }] }>
                  <Feather name={tier.icon as any} size={28} color={theme.colors.primary || '#3949ab'} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.stepTitle, { color: theme.colors.text }]}>{tier.name}</Text>
                  <Text style={[styles.stepDesc, { color: theme.colors.secondaryText }]}>{tier.features.join(' • ')}</Text>
                  <Text style={[styles.stepDesc, { marginTop: 6, fontWeight: 'bold', color: theme.colors.secondaryText }]}>Requirements:</Text>
                  {tier.requirements.map((req, i) => (
                    <Text key={i} style={[styles.stepDesc, { marginLeft: 8, color: theme.colors.secondaryText }]}>• {req}</Text>
                  ))}
                  <Text style={[styles.stepDesc, { marginTop: 6, fontWeight: 'bold', color: theme.colors.secondaryText }]}>Trading Limits:</Text>
                  <Text style={[styles.stepDesc, { marginLeft: 8, color: theme.colors.secondaryText }]}>Daily: {formatCurrency(tier.limits.daily)}</Text>
                  <Text style={[styles.stepDesc, { marginLeft: 8, color: theme.colors.secondaryText }]}>Monthly: {formatCurrency(tier.limits.monthly)}</Text>
                  <Text style={[styles.stepDesc, { marginLeft: 8, color: theme.colors.secondaryText }]}>Withdrawal: {formatCurrency(tier.limits.withdrawal)}</Text>
                </View>
              </View>
            );
          })}
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
