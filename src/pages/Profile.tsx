import React, { useState } from "react";
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

  return (
    <View style={[styles.bg, { backgroundColor: theme.colors.background }]}>
      {/* Tabs */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 18, marginBottom: 0 }}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t.key}
            style={{
              backgroundColor: tab === t.key ? '#10b981' : '#e8fdf3',
              paddingVertical: 10,
              paddingHorizontal: 18,
              borderRadius: 18,
              marginHorizontal: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => setTab(t.key)}
          >
            <Feather name={t.icon as any} size={18} color={tab === t.key ? '#fff' : '#10b981'} style={{ marginRight: 6 }} />
            <Text style={{ color: tab === t.key ? '#fff' : '#10b981', fontWeight: 'bold' }}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Tab Content */}
        {tab === 'personal' && (
          <>
            {/* Profile Header */}
            <View style={[styles.profileCard, { backgroundColor: theme.colors.card }]}>
              <View style={styles.avatarCircle}>
                <Feather name="user" size={38} color="#10b981" />
              </View>
              <View>
                <Text style={styles.profileName}>{user?.email?.split('@')[0] || 'User'}</Text>
                <Text style={styles.profileEmail}>{user?.email}</Text>
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
                <Text style={styles.infoCardTitle}>Contact Information</Text>
                <Text style={styles.infoCardLabel}>Email:</Text>
                <Text style={styles.infoCardValue}>{mockUser.email}</Text>
                <Text style={styles.infoCardLabel}>Phone:</Text>
                <Text style={styles.infoCardValue}>{mockUser.phone || 'Not set'}</Text>
              </View>
              {/* Location & Preferences */}
              <View style={[styles.infoCard, { width: '100%', marginBottom: 14 }]}> 
                <Text style={styles.infoCardTitle}>Location & Preferences</Text>
                <Text style={styles.infoCardLabel}>Country:</Text>
                <Text style={styles.infoCardValue}>{mockUser.country}</Text>
                <Text style={styles.infoCardLabel}>Language:</Text>
                <Text style={styles.infoCardValue}>{mockUser.language}</Text>
              </View>
              {/* Account Status */}
              <View style={[styles.infoCard, { width: '100%', marginBottom: 14 }]}> 
                <Text style={styles.infoCardTitle}>Account Status</Text>
                <Text style={styles.infoCardLabel}>Verification Status:</Text>
                <Text style={styles.infoCardValue}>{mockUser.verificationStatus}</Text>
                <Text style={styles.infoCardLabel}>Member Since:</Text>
                <Text style={styles.infoCardValue}>{mockUser.joinedDate}</Text>
              </View>
              {/* Time Settings */}
              <View style={[styles.infoCard, { width: '100%' }]}> 
                <Text style={styles.infoCardTitle}>Time Settings</Text>
                <Text style={styles.infoCardLabel}>Timezone:</Text>
                <Text style={styles.infoCardValue}>{mockUser.timezone}</Text>
                <Text style={styles.infoCardLabel}>Last Updated:</Text>
                <Text style={styles.infoCardValue}>Just now</Text>
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
          <View style={[styles.infoCard, { margin: 18, alignItems: 'center' }]}> 
            <Text style={styles.infoCardTitle}>Referral Program</Text>
            <Text style={styles.infoCardValue}>Invite friends and earn rewards! (Coming soon)</Text>
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
