import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import Button from "@/components/ui/button";
import { useToast } from 'react-native-toast-notifications';
import { useAuth } from "@/contexts/AuthContext";
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

import { supabase } from '@/lib/supabase';
import { ActivityIndicator } from 'react-native';

const KYC_TIERS = [
  {
    key: 'TIER_1',
    name: 'Basic',
    icon: 'shield',
    requirements: ['email', 'basic_info', 'phone'],
    features: ['Basic trading features', 'Limited trading volume', 'Basic support'],
    dailyLimit: 100,
    monthlyLimit: 1000,
    withdrawalLimit: 200,
  },
  {
    key: 'TIER_2',
    name: 'Starter',
    icon: 'star',
    requirements: ['nin', 'selfie'],
    features: ['Increased trading limits', 'P2P trading access', 'Priority support'],
    dailyLimit: 500,
    monthlyLimit: 5000,
    withdrawalLimit: 1000,
  },
  {
    key: 'TIER_3',
    name: 'Intermediate',
    icon: 'arrow-up-down',
    requirements: ['bvn'],
    features: ['Higher trading limits', 'OTC trading access', 'Dedicated support line'],
    dailyLimit: 2000,
    monthlyLimit: 20000,
    withdrawalLimit: 5000,
  },
  {
    key: 'TIER_4',
    name: 'Advanced',
    icon: 'lock',
    requirements: ['livecheck'],
    features: ['Premium trading features', 'VIP support', 'Advanced market tools'],
    dailyLimit: 10000,
    monthlyLimit: 100000,
    withdrawalLimit: 20000,
  },
  {
    key: 'TIER_5',
    name: 'Premium',
    icon: 'crown',
    requirements: ['government_id', 'passport'],
    features: ['Unlimited trading', 'Institutional features', 'Dedicated account manager'],
    dailyLimit: 50000,
    monthlyLimit: 500000,
    withdrawalLimit: 100000,
  },
];

const KYC_LABELS = {
  email: 'Email Verification',
  phone: 'Phone Number Verification',
  basic_info: 'Basic Personal Information',
  nin: 'NIN Verification',
  bvn: 'BVN Verification',
  livecheck: 'LiveCheck Verification',
  government_id: 'Government-issued ID',
  passport: 'International Passport',
  selfie: 'Selfie Verification',
};

import React from 'react';

const KycVerification = ({ navigation }: any) => {
  const { theme } = useTheme();
  const toast = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<any>({});

  // Fetch verification status from Supabase
  React.useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      try {
        const { data: { user: supaUser } } = await supabase.auth.getUser();
        if (!supaUser) {
          setLoading(false);
          return;
        }
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('verification_history')
          .eq('user_id', supaUser.id)
          .single();
        if (error) {
          toast.show('Failed to fetch verification status', { type: 'danger' });
          setLoading(false);
          return;
        }
        setVerificationStatus(profile?.verification_history || {});
      } catch (err) {
        toast.show('Error fetching KYC status', { type: 'danger' });
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);
  const [activeTab, setActiveTab] = useState("id-verification");
  const [idType, setIdType] = useState("passport");

  // Helper: Check if previous tier is complete
  const isPreviousTierComplete = (tierIndex: number) => {
    if (tierIndex === 0) return true;
    const prevTier = KYC_TIERS[tierIndex - 1];
    return prevTier.requirements.every(req => verificationStatus[req]);
  };

  // Helper: Calculate progress for a tier
  const getTierProgress = (tier) => {
    const total = tier.requirements.length;
    const completed = tier.requirements.filter(req => verificationStatus[req]).length;
    return { completed, total, percent: Math.round((completed / total) * 100) };
  };

  // UI rendering
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <Text style={{ color: theme.colors.text, marginBottom: 12 }}>Loading your KYC status...</Text>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme.colors.text, marginBottom: 10 }}>KYC Verification Tiers</Text>
      {KYC_TIERS.map((tier, idx) => {
        const progress = getTierProgress(tier);
        const prevComplete = isPreviousTierComplete(idx);
        return (
          <View key={tier.key} style={{ marginBottom: 28, borderRadius: 12, backgroundColor: theme.colors.card, padding: 16, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Feather name={tier.icon as any} size={22} color={progress.percent === 100 ? '#4caf50' : '#3949ab'} style={{ marginRight: 8 }} />
              <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.text }}>{tier.name}</Text>
              {progress.percent === 100 && <Text style={{ marginLeft: 8, color: '#4caf50', fontWeight: 'bold' }}>(Completed)</Text>}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
              <Text style={{ fontSize: 14, color: theme.colors.text }}>Progress: {progress.completed}/{progress.total}</Text>
              <Text style={{ fontSize: 14, color: theme.colors.text }}>{progress.percent}%</Text>
            </View>
            <View style={{ height: 7, backgroundColor: '#eee', borderRadius: 4, marginBottom: 10 }}>
              <View style={{ height: 7, width: `${progress.percent}%`, backgroundColor: progress.percent === 100 ? '#4caf50' : '#3949ab', borderRadius: 4 }} />
            </View>
            <Text style={{ fontWeight: '600', marginBottom: 4, color: theme.colors.text }}>Requirements:</Text>
            {tier.requirements.map(req => (
              <View key={req} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Feather name={verificationStatus[req] ? 'check-circle' : 'clock'} size={16} color={verificationStatus[req] ? '#4caf50' : '#fbbf24'} style={{ marginRight: 6 }} />
                <Text style={{ color: verificationStatus[req] ? '#4caf50' : theme.colors.text }}>{KYC_LABELS[req]}</Text>
                {!verificationStatus[req] && (
                  <TouchableOpacity
                    disabled={!prevComplete}
                    style={{ marginLeft: 10, backgroundColor: prevComplete ? '#3949ab' : '#ccc', borderRadius: 6, paddingVertical: 3, paddingHorizontal: 12 }}
                    onPress={() => toast.show('Start verification for ' + KYC_LABELS[req], { type: 'info' })}
                  >
                    <Text style={{ color: '#fff', fontSize: 13 }}>{prevComplete ? 'Verify' : 'Locked'}</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <Text style={{ fontWeight: '600', marginTop: 10, color: theme.colors.text }}>Features:</Text>
            {tier.features.map(feature => (
              <Text key={feature} style={{ color: '#666', marginLeft: 8, marginBottom: 2 }}>• {feature}</Text>
            ))}
            <Text style={{ fontWeight: '600', marginTop: 10, color: theme.colors.text }}>Trading Limits:</Text>
            <Text style={{ color: theme.colors.text, marginLeft: 8 }}>Daily: ${tier.dailyLimit.toLocaleString()}</Text>
            <Text style={{ color: theme.colors.text, marginLeft: 8 }}>Monthly: ${tier.monthlyLimit.toLocaleString()}</Text>
            <Text style={{ color: theme.colors.text, marginLeft: 8, marginBottom: 2 }}>Withdrawal: ${tier.withdrawalLimit.toLocaleString()}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default KycVerification;

