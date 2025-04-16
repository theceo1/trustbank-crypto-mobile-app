
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import Button from "@/components/ui/button";
import { Feather } from '@expo/vector-icons';
import BottomNavigation from "@/components/BottomNavigation";
 
const Profile = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const navigation = useNavigation();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigation.navigate("Login" as never);
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
      icon: "help-circle",
      route: "Help",
      description: "FAQs, contact support, and help center",
    },
  ];

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <View style={styles.bg}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity
            style={styles.themeToggleRow}
            onPress={toggleTheme}
            accessibilityLabel="Toggle theme"
          >
            <Feather
              name={resolvedTheme === "light" ? "sun" : "moon"}
              size={22}
              color="#10b981"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.themeToggleText}>
              {resolvedTheme === "light" ? "Light mode" : "Dark mode"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* User Profile */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Feather name="user" size={38} color="#10b981" />
          </View>
          <View>
            <Text style={styles.profileName}>{user?.email?.split('@')[0] || 'User'}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuList}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.title}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.route as never)}
              activeOpacity={0.85}
              accessibilityLabel={item.title}
            >
              <View style={styles.menuIconBox}>
                <Feather name={item.icon as any} size={22} color="#10b981" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDesc}>{item.description}</Text>
              </View>
              <Feather name="chevron-right" size={22} color="#a1a1aa" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <Button
          style={styles.logoutBtn}
          onPress={handleSignOut}
        >
          <Feather name="log-out" size={18} color="#e11d48" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Log out</Text>
        </Button>

        <Text style={styles.versionText}>trustBank App v1.0.0</Text>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  scroll: {
    flexGrow: 1,
    padding: 0,
    paddingBottom: 90,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#10b981',
  },
  themeToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8fdf3',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 14,
  },
  themeToggleText: {
    fontSize: 15,
    color: '#10b981',
    fontWeight: 'bold',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 22,
    marginHorizontal: 18,
    marginBottom: 18,
    shadowColor: '#10b981',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    elevation: 7,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e8fdf3',
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
  menuList: {
    marginHorizontal: 18,
    marginBottom: 18,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 10,
    shadowColor: '#10b981',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 3,
  },
  menuIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#e8fdf3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  menuDesc: {
    fontSize: 13,
    color: '#5c5e6b',
    marginTop: 2,
  },
  logoutBtn: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: '#e11d48',
  },
  logoutText: {
    color: '#e11d48',
    fontWeight: 'bold',
    fontSize: 16,
  },
  versionText: {
    color: '#a1a1aa',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 14,
  },
});

export default Profile;
