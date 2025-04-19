//src/components/AppLayout.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/types/navigation';
import { Feather } from "@expo/vector-icons";
import { ThemeToggle } from "@/components/ThemeToggle";
import BottomNavigation from "@/components/BottomNavigation";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/lib/supabase";

const HEADER_HEIGHT = 56;
const BOTTOM_NAV_HEIGHT = 64;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme, setThemeName } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  // Helper to check if a menu item is active
  const isActive = (name: string) => route.name === name;

  // Define menu items array
  const PUBLIC_MENU = [
    { name: 'Market', icon: 'bar-chart-2', label: 'Market Page', route: 'Market' },
    { name: 'Blog', icon: 'book-open', label: 'Blog', route: 'Blog' },
    { name: 'Mission', icon: 'globe', label: 'Mission', route: 'Mission' },
    { name: 'Vision', icon: 'eye', label: 'Vision', route: 'Vision' },
    { name: 'FAQ', icon: 'help-circle', label: 'FAQ', route: 'FAQ' },
    { name: 'Contact', icon: 'mail', label: 'Contact', route: 'Contact' },
    { name: 'TradeGuide', icon: 'book', label: 'Trade Guide', route: 'TradeGuide' }, // Always show Trade Guide
  ];
  const AUTH_MENU = [
    { name: 'Dashboard', icon: 'grid', label: 'Dashboard', route: 'Dashboard' },
    { name: 'Wallet', icon: 'credit-card', label: 'Wallet', route: 'Wallet' },
    { name: 'Trade', icon: 'repeat', label: 'Trade', route: 'Trade' },
    { name: 'Profile', icon: 'user', label: 'Profile', route: 'Profile' },
    { name: 'KycIntro', icon: 'user-check', label: 'KYC Intro', route: 'KycIntro' },
    { name: 'KycVerification', icon: 'user-check', label: 'KYC Verification', route: 'KycVerification' },
    { name: 'VerificationPending', icon: 'clock', label: 'Verification Pending', route: 'VerificationPending' },
    { name: 'Calculator', icon: 'cpu', label: 'Calculator', route: 'Calculator' },
    { name: 'TradeGuide', icon: 'book', label: 'Trade Guide', route: 'TradeGuide' }, // Always show Trade Guide
  ];
  const menuToShow = user ? [...AUTH_MENU, ...PUBLIC_MENU] : PUBLIC_MENU;
  const menuItems = [
    ...menuToShow.map(item => (
      <TouchableOpacity
        key={item.name}
        style={[styles.menuItem, isActive(item.route) && { backgroundColor: '#059669' }]}
        activeOpacity={0.85}
        onPress={() => {
          setShowMenu(false);
          if (!user && AUTH_MENU.some(auth => auth.route === item.route)) {
            toast({
              title: 'Sign in required',
              description: 'Please sign in to access this page.',
              variant: 'destructive',
            });
            return;
          }
          if (!isActive(item.route)) {
            try {
              navigation.navigate(item.route as never);
            } catch (err: any) {
              toast({
                title: 'Navigation error',
                description: err?.message || 'Could not navigate to page.',
                variant: 'destructive',
              });
            }
          }
        }}
      >
        <Feather name={item.icon as any} size={18} color={isActive(item.route) ? '#fff' : (theme.colors.background === '#101522' ? '#fff' : '#000')} style={{ marginRight: 8 }} />
        <Text style={[styles.menuItemText, isActive(item.route) ? { color: '#fff' } : { color: theme.colors.background === '#101522' ? '#fff' : '#000' }]}>{item.label}</Text>
      </TouchableOpacity>
    )),
    user && (
      <TouchableOpacity
        key="signout"
        style={[styles.menuItem, { borderTopWidth: 1, borderTopColor: '#eee', marginTop: 10 }]}
        activeOpacity={0.85}
        onPress={async () => {
          try {
            await signOut();
            setShowMenu(false);
            toast({
              title: 'Goodbye!',
              description: 'You have been signed out.',
            });
            navigation.reset({ index: 0, routes: [{ name: 'Home' as never }] });
          } catch (err: any) {
            toast({
              title: 'Sign out failed',
              description: err?.message || 'Could not sign out.',
              variant: 'destructive',
            });
            console.error('[AppLayout] Error signing out:', err);
          }
        }}
      >
        <Feather name="log-out" size={18} color="#f43f5e" style={{ marginRight: 8 }} />
        <Text style={[styles.menuItemText, { color: '#f43f5e', fontWeight: 'bold' }]}>Sign Out</Text>
      </TouchableOpacity>
    ),
    !user && (
      <TouchableOpacity
        key="signin"
        style={[styles.menuItem, { borderTopWidth: 1, borderTopColor: '#eee', marginTop: 10 }]}
        activeOpacity={0.85}
        onPress={() => {
          setShowMenu(false);
          navigation.navigate('Login' as never);
        }}
      >
        <Feather name="log-in" size={18} color="#059669" style={{ marginRight: 8 }} />
        <Text style={[styles.menuItemText, { color: '#059669', fontWeight: 'bold' }]}>Sign In</Text>
      </TouchableOpacity>
    ),
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {showMenu && (
        <>
          <TouchableOpacity
            style={styles.menuOverlay}
            activeOpacity={1}
            onPress={() => setShowMenu(false)}
          />
          <View style={[styles.menuDropdown, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]} pointerEvents="box-none">
            {menuItems}
          </View>
        </>
      )}
      {/* HEADER SECTION RESTORED */}
      <View style={[styles.header, theme.colors.background === '#101522' && styles.headerDark]}>
        {/* Logo/Brand (left) */}
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Index' as never }] })} activeOpacity={0.7} accessibilityLabel="Go to homepage">
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: theme.colors.background === '#101522' ? '#fff' : '#000', letterSpacing: 0.5 }}>trustBank</Text>
          </TouchableOpacity>
        </View>
        {/* Menu Button & Theme Toggle (right) */}
        <View style={styles.headerRightRow}>
          <ThemeToggle />
          <TouchableOpacity onPress={() => setShowMenu(!showMenu)} style={styles.menuButton} accessibilityLabel="Open menu">
            <Feather
              name="menu"
              size={26}
              color={theme.colors.background === '#101522' ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* CONTENT AND NAVIGATION */}
      <View style={[styles.contentWrapper, { flex: 1 }]} > 
        <View style={[styles.content, { flex: 1, backgroundColor: theme.colors.background }]}>{children}</View>
      </View>
      <View style={[styles.bottomNavWrapper, { height: BOTTOM_NAV_HEIGHT, backgroundColor: theme.colors.background }]} > 
        <BottomNavigation />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menuDropdown: {
    position: 'absolute',
    top: 56,
    right: 16,
    minWidth: 180,
    borderRadius: 10,
    borderWidth: 1.5,
    paddingVertical: 4,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 998,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  menuItemText: {
    fontSize: 15,
    color: '#222',
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafd",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  safeAreaDark: {
    backgroundColor: "#101426",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 6,
    // backgroundColor: "#fff", // REMOVED for theme support
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    zIndex: 10,
  },
  headerDark: {
    backgroundColor: "#181c2f",
    borderBottomColor: "#22263a",
  },
  headerLeft: {
    flex: 1,
    alignItems: "flex-start",
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  headerRightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
  },
  menuButton: {
    padding: 6,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: "transparent",
  },
  bottomNavWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 99,
  },
  content: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
