import React, { useState } from "react";
import { Share } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { Feather } from "@expo/vector-icons";

const TABS = [
  { key: "personal", label: "Personal Information", icon: "user" },
  { key: "security", label: "Security", icon: "shield" },
  { key: "referral", label: "Referral Program", icon: "users" },
];

const mockUser = {
  name: "John Doe",
  email: "test1735848851306@trustbank.tech",
  phone: "",
  country: "Nigeria",
  verificationStatus: "verified",
  joinedDate: "2024-01-01",
  timezone: "Africa/Lagos",
  language: "English",
};

const Profile = () => {
  const [tab, setTab] = useState("personal");
  const { user, signOut } = useAuth();
  const { theme, setThemeName } = useTheme();
  const navigation = useNavigation();
  const { toast } = useToast();
  const dark = theme.colors.background === '#101522';

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      // Do not navigate to Login after signOut; let navigation guard handle it.
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    {
      title: "Account Settings",
      icon: "user",
      route: "AccountSettings",
      description: "Manage your personal information",
    },
    {
      title: "Security",
      icon: "shield",
      route: "SecuritySettings",
      description: "Change password, 2FA, and security settings",
    },
    {
      title: "Payment Methods",
      icon: "credit-card",
      route: "PaymentMethods",
      description: "Manage connected bank accounts and cards",
    },
    {
      title: "Notifications",
      icon: "bell",
      route: "NotificationSettings",
      description: "Configure push and email notifications",
    },
    {
      title: "Help & Support",
      icon: "headphones",
      route: "HelpSupport",
      description: "Get assistance with any issues or questions",
    },
  ];

  // Set text color based on theme
  const textColor = dark ? '#fff' : '#222';

  return (
    <View style={[styles.bg, { backgroundColor: theme.colors.background }]}>
      {/* Tabs */}
      {/* Segmented Control Tab Bar */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 18,
          marginBottom: 0,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: dark ? '#23272f' : '#f3f4f6',
            borderRadius: 24,
            padding: 4,
            borderWidth: 1,
            borderColor: dark ? '#343a40' : '#fdba74',
            minHeight: 48,
            width: '96%',
            alignSelf: 'center',
            shadowColor: dark ? '#000' : '#fdba74',
            shadowOpacity: 0.07,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          {TABS.map((t, idx) => (
            <TouchableOpacity
              key={t.key}
              style={{
                flex: 1,
                backgroundColor: tab === t.key ? '#fdba74' : 'transparent',
                borderRadius: 20,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: idx === 0 ? 0 : 4,
                marginRight: idx === TABS.length - 1 ? 0 : 4,

              }}
              onPress={() => setTab(t.key)}
              activeOpacity={0.85}
            >
              <Feather name={t.icon as any} size={18} color={tab === t.key ? '#fff' : '#fdba74'} style={{ marginRight: 6 }} />
              <Text style={{ color: tab === t.key ? '#fff' : '#fdba74', fontWeight: 'bold', fontSize: 14 }}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Scrollable Tab Content */}
      <ScrollView contentContainerStyle={styles.scroll} style={{ flex: 1 }}>
        {/* Tab Content */}
        {tab === 'personal' && (
          <>
            {/* Profile Header */}
            <View style={[
              styles.profileCard,
              {
                backgroundColor: dark ? '#16a35a' : theme.colors.card,
                borderWidth: dark ? 1 : 0,
                borderColor: dark ? '#23272f' : 'transparent',
                shadowColor: dark ? '#000' : '#222',
                shadowOpacity: dark ? 0.12 : 0.06,
                shadowRadius: 8,
                elevation: 3,
              },
            ]}>

              <View style={styles.avatarCircle}>
                <Feather name="user" size={38} color="#10b981" />
              </View>
              <View>
                <Text style={[styles.profileName, { color: textColor }]}>{user?.email?.split('@')[0] || 'User'}</Text>
                <Text style={[styles.profileEmail, { color: textColor }]}>{user?.email}</Text>
                <View style={{ flexDirection: 'row', marginTop: 6 }}>
                  <View style={{ backgroundColor: theme.colors.card, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, marginRight: 8 }}>
                    <Text style={{ color: '#10b981', fontWeight: 'bold', fontSize: 12 }}>{mockUser.verificationStatus === 'verified' ? 'Verified' : 'Unverified'}</Text>
                  </View>
                  <View style={{ backgroundColor: theme.colors.card, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 }}>
                    <Text style={{ color: '#64748b', fontWeight: 'bold', fontSize: 12 }}>Member since {mockUser.joinedDate}</Text>
                  </View>
                </View>
              </View>
            </View>
            {/* Details Grid */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginHorizontal: 18 }}>
              {/* Contact Information */}
              <View style={[styles.infoCard, { width: '100%', marginBottom: 14 }]}> 
                <Text style={[styles.infoCardTitle, { color: textColor }]}>Contact Information</Text>
                <Text style={[styles.infoCardLabel, { color: textColor }]}>Email:</Text>
                <Text style={[styles.infoCardValue, { color: textColor }]}>{mockUser.email}</Text>
                <Text style={[styles.infoCardLabel, { color: textColor }]}>Phone:</Text>
                <Text style={[styles.infoCardValue, { color: textColor }]}>{mockUser.phone || 'Not set'}</Text>
              </View>
              {/* Location & Preferences */}
              <View style={[styles.infoCard, { width: '100%', marginBottom: 14 }]}> 
                <Text style={[styles.infoCardTitle, { color: textColor }]}>Location & Preferences</Text>
                <Text style={[styles.infoCardLabel, { color: textColor }]}>Country:</Text>
                <Text style={[styles.infoCardValue, { color: textColor }]}>{mockUser.country}</Text>
                <Text style={[styles.infoCardLabel, { color: textColor }]}>Language:</Text>
                <Text style={[styles.infoCardValue, { color: textColor }]}>{mockUser.language}</Text>
              </View>
              {/* Account Status */}
              <View style={[styles.infoCard, { width: '100%', marginBottom: 14 }]}> 
                <Text style={[styles.infoCardTitle, { color: textColor }]}>Account Status</Text>
                <Text style={[styles.infoCardLabel, { color: textColor }]}>Verification Status:</Text>
                <Text style={[styles.infoCardValue, { color: textColor }]}>{mockUser.verificationStatus}</Text>
                <Text style={[styles.infoCardLabel, { color: textColor }]}>Member Since:</Text>
                <Text style={[styles.infoCardValue, { color: textColor }]}>{mockUser.joinedDate}</Text>
              </View>
              {/* Time Settings */}
              <View style={[
                styles.infoCard,
                {
                  width: '100%',
                  backgroundColor: dark ? '#181c24' : '#f9fafb',
                  borderWidth: dark ? 1 : 0,
                  borderColor: dark ? '#23272f' : 'transparent',
                },
              ]}> 
                <Text style={[styles.infoCardTitle, { color: textColor }]}>Time Settings</Text>
                <Text style={[styles.infoCardLabel, { color: textColor }]}>Timezone:</Text>
                <Text style={[styles.infoCardValue, { color: textColor }]}>{mockUser.timezone}</Text>
                <Text style={[styles.infoCardLabel, { color: textColor }]}>Last Updated:</Text>
                <Text style={[styles.infoCardValue, { color: textColor }]}>Just now</Text>
              </View>
            </View>
          </>
        )}
        {tab === 'security' && (
          <View style={[styles.infoCard, { margin: 18, alignItems: 'center' }]}> 
            <Text style={styles.infoCardTitle}>Security Settings</Text>
            <Text style={styles.infoCardValue}>Change your password, enable 2FA, and manage security settings here.</Text>
          </View>
        )}
        {tab === 'referral' && (
          <View style={{ paddingHorizontal: 18, paddingTop: 8 }}>
            {/* Referral Summary Card */}
            <View style={{
              backgroundColor: dark ? '#23272f' : '#f3f4f6',
              borderRadius: 18,
              padding: 18,
              marginBottom: 18,
              shadowColor: dark ? '#000' : '#fdba74',
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 2,
              borderWidth: 1,
              borderColor: dark ? '#343a40' : '#fdba74',
            }}>
              <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 17, marginBottom: 12 }}>Your Referral Code</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: '#fdba74', fontWeight: 'bold', fontSize: 20, letterSpacing: 1 }} selectable>TRUST123</Text>
                  <TouchableOpacity style={{ marginLeft: 10 }} onPress={async () => {
                    await require('expo-clipboard').setStringAsync('TRUST123');
                    toast({ title: 'Referral code copied!' });
                  }}>
                    <Feather name="copy" size={20} color="#fdba74" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fdba74', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 }}
                  onPress={async () => {
                    await Share.share({
  message: 'https://www.trustbank.tech/signup?ref=TRUST123',
  title: 'Share your TrustBank referral link!'
});
                  }}>
                  <Feather name="share-2" size={18} color="#fff" style={{ marginRight: 4 }} />
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>Share</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Text style={{ color: textColor, fontSize: 14, marginRight: 6 }}>Referral Link:</Text>
                <Text style={{ color: '#10b981', fontSize: 14 }} selectable>https://www.trustbank.tech/signup?ref=TRUST123</Text>
                <TouchableOpacity style={{ marginLeft: 8 }} onPress={async () => {
                  await require('expo-clipboard').setStringAsync('https://www.trustbank.tech/signup?ref=TRUST123');
                  toast({ title: 'Referral link copied!' });
                }}>
                  <Feather name="copy" size={18} color="#10b981" />
                </TouchableOpacity>
              </View>
              {/* Stats Grid */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                <View style={{ alignItems: 'center', flex: 1 }}>
                  <Feather name="users" size={20} color="#fdba74" />
                  <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 16, marginTop: 2 }}>12</Text>
                  <Text style={{ color: textColor, fontSize: 12 }}>Total Referred</Text>
                </View>
                <View style={{ alignItems: 'center', flex: 1 }}>
                  <Feather name="clock" size={20} color="#fdba74" />
                  <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 16, marginTop: 2 }}>2</Text>
                  <Text style={{ color: textColor, fontSize: 12 }}>Pending Rewards</Text>
                </View>
                <View style={{ alignItems: 'center', flex: 1 }}>
                  <Feather name="gift" size={20} color="#fdba74" />
                  <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 16, marginTop: 2 }}>$50</Text>
                  <Text style={{ color: textColor, fontSize: 12 }}>Total Earned</Text>
                </View>
              </View>
            </View>

            {/* Referral History */}
            <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Referral History</Text>
            <View style={{ backgroundColor: dark ? '#181c24' : '#fff', borderRadius: 12, padding: 12, marginBottom: 18, borderWidth: 1, borderColor: dark ? '#23272f' : '#eee' }}>
              {/* Mock Data */}
              {[{ name: 'John Doe', date: '2024-03-01', status: 'Active' }, { name: 'Jane Smith', date: '2024-03-10', status: 'Pending' }].map((ref, idx) => (
                <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: idx === 1 ? 0 : 10 }}>
                  <Feather name="user" size={18} color="#fdba74" style={{ marginRight: 10 }} />
                  <Text style={{ color: textColor, flex: 1 }}>{ref.name}</Text>
                  <Text style={{ color: '#64748b', fontSize: 12, marginRight: 8 }}>{ref.date}</Text>
                  <Text style={{ color: ref.status === 'Active' ? '#10b981' : '#fdba74', fontWeight: 'bold', fontSize: 12 }}>{ref.status}</Text>
                </View>
              ))}
            </View>

            {/* How It Works */}
            <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>How the Referral Program Works</Text>
            <View style={{ backgroundColor: dark ? '#23272f' : '#f3f4f6', borderRadius: 12, padding: 14, marginBottom: 24, borderWidth: 1, borderColor: dark ? '#343a40' : '#fdba74' }}>
              <Text style={{ color: textColor, marginBottom: 6 }}>
                1. Share your referral link or code with friends.
              </Text>
              <Text style={{ color: textColor, marginBottom: 6 }}>
                2. When they sign up and verify, you both earn rewards.
              </Text>
              <Text style={{ color: textColor, marginBottom: 6 }}>
                3. Track your referrals and rewards here. Payouts are automatic after verification.
              </Text>
              <Text style={{ color: textColor }}>
                Learn more at <Text style={{ color: '#10b981', textDecorationLine: 'underline' }}>www.trustbank.tech/referral</Text>
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    // backgroundColor moved to inline style
  },
  scroll: {
    flexGrow: 1,
    padding: 0,
    paddingBottom: 90,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    padding: 22,
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // backgroundColor moved to inline style
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  profileEmail: {
    fontSize: 14,
    color: '#5c5e6b',
    marginTop: 2,
  },
  infoCard: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 8,
  },
  infoCardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#10b981',
    marginBottom: 6,
  },
  infoCardLabel: {
    fontWeight: '600',
    color: '#64748b',
    marginTop: 2,
    fontSize: 13,
  },
  infoCardValue: {
    color: '#222',
    fontSize: 14,
    marginBottom: 4,
  },
});

export default Profile;
