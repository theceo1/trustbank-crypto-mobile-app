import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/types/navigation';
import { Feather } from "@expo/vector-icons";
import { ThemeToggle } from "@/components/ThemeToggle";
import BottomNavigation from "@/components/BottomNavigation";
import { useTheme } from "@/contexts/ThemeContext";

const HEADER_HEIGHT = 56;
const BOTTOM_NAV_HEIGHT = 64;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme, setThemeName } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  // Helper to check if a menu item is active
  const isActive = (name: string) => route.name === name;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Overlay and Dropdown as siblings for proper zIndex and touch handling */}
      {showMenu && (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.menuOverlay}
            activeOpacity={1}
            onPress={() => setShowMenu(false)}
          />
          <View style={[styles.menuDropdown, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]} pointerEvents="box-none">
            
            {/* Market Page */}
            <TouchableOpacity
              style={[styles.menuItem, isActive('Market') && { backgroundColor: '#059669' }]}
              activeOpacity={0.85}
              onPress={() => {
                setShowMenu(false);
                if (!isActive('Market')) navigation.navigate('Market');
              }}
            >
              <Feather name="bar-chart-2" size={18} color={isActive('Market') ? '#fff' : (theme.colors.background === '#101522' ? '#fff' : '#000')} style={{ marginRight: 8 }} />
              <Text style={[styles.menuItemText, isActive('Market') ? { color: '#fff' } : { color: theme.colors.background === '#101522' ? '#fff' : '#000' }]}>Market Page</Text>
            </TouchableOpacity>
            {/* Trade Guide */}
            <TouchableOpacity
              style={[styles.menuItem, isActive('TradeGuide') && { backgroundColor: '#059669' }]}
              activeOpacity={0.85}
              onPress={() => {
                setShowMenu(false);
                if (!isActive('TradeGuide')) navigation.navigate('TradeGuide');
              }}
            >
              <Feather name="book" size={18} color={isActive('TradeGuide') ? '#fff' : (theme.colors.background === '#101522' ? '#fff' : '#000')} style={{ marginRight: 8 }} />
              <Text style={[styles.menuItemText, isActive('TradeGuide') ? { color: '#fff' } : { color: theme.colors.background === '#101522' ? '#fff' : '#000' }]}>Trade Guide</Text>
            </TouchableOpacity>
            {/* Calculator */}
            <TouchableOpacity
              style={[styles.menuItem, isActive('Calculator') && { backgroundColor: '#059669' }]}
              activeOpacity={0.85}
              onPress={() => {
                setShowMenu(false);
                if (!isActive('Calculator')) navigation.navigate('Calculator');
              }}
            >
              <Feather name="cpu" size={18} color={isActive('Calculator') ? '#fff' : (theme.colors.background === '#101522' ? '#fff' : '#000')} style={{ marginRight: 8 }} />
              <Text style={[styles.menuItemText, isActive('Calculator') ? { color: '#fff' } : { color: theme.colors.background === '#101522' ? '#fff' : '#000' }]}>Calculator</Text>
            </TouchableOpacity>
            {/* Dashboard */}
            <TouchableOpacity
              style={[styles.menuItem, isActive('Dashboard') && { backgroundColor: '#059669' }]}
              activeOpacity={0.85}
              onPress={() => {
                setShowMenu(false);
                if (!isActive('Dashboard')) navigation.navigate('Dashboard');
              }}
            >
              <Feather name="home" size={18} color={isActive('Dashboard') ? '#fff' : (theme.colors.background === '#101522' ? '#fff' : '#000')} style={{ marginRight: 8 }} />
              <Text style={[styles.menuItemText, isActive('Dashboard') ? { color: '#fff' } : { color: theme.colors.background === '#101522' ? '#fff' : '#000' }]}>Dashboard</Text>
            </TouchableOpacity>
            {/* Mission */}
            <TouchableOpacity
              style={[styles.menuItem, isActive('Mission') && { backgroundColor: '#059669' }]}
              activeOpacity={0.85}
              onPress={() => {
                setShowMenu(false);
                if (!isActive('Mission')) navigation.navigate('Mission');
              }}
            >
              <Feather name="globe" size={18} color={isActive('Mission') ? '#fff' : (theme.colors.background === '#101522' ? '#fff' : '#000')} style={{ marginRight: 8 }} />
              <Text style={[styles.menuItemText, isActive('Mission') ? { color: '#fff' } : { color: theme.colors.background === '#101522' ? '#fff' : '#000' }]}>Mission</Text>
            </TouchableOpacity>
            {/* Blog */}
            <TouchableOpacity
              style={[styles.menuItem, isActive('Blog') && { backgroundColor: '#059669' }]}
              activeOpacity={0.85}
              onPress={() => {
                setShowMenu(false);
                if (!isActive('Blog')) navigation.navigate('Blog');
              }}
            >
              <Feather name="book-open" size={18} color={isActive('Blog') ? '#fff' : (theme.colors.background === '#101522' ? '#fff' : '#000')} style={{ marginRight: 8 }} />
              <Text style={[styles.menuItemText, isActive('Blog') ? { color: '#fff' } : { color: theme.colors.background === '#101522' ? '#fff' : '#000' }]}>Blog</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={[styles.header, theme.colors.background === '#101522' && styles.headerDark, { height: HEADER_HEIGHT, backgroundColor: theme.colors.background }]}> 
        {/* Brand Name (left) */}
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} activeOpacity={0.7}>
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
        {/* Custom Header Menu */}
        {showMenu && (
          <>
            {/* Overlay to close menu when clicking outside */}
            <TouchableOpacity
              style={styles.menuOverlay}
              activeOpacity={1}
              onPress={() => setShowMenu(false)}
            />
            <View style={[styles.menuDropdown, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
              {/* Market Page */}
              <TouchableOpacity
                style={[styles.menuItem, isActive('Market') && { backgroundColor: '#059669' }]}
                activeOpacity={0.85}
                onPress={() => {
                  setShowMenu(false);
                  if (!isActive('Market')) navigation.navigate('Market');
                }}
              >
                <Feather name="bar-chart-2" size={18} color={isActive('Market') ? '#fff' : (theme.colors.background === '#101522' ? '#fff' : '#000')} style={{ marginRight: 8 }} />
                <Text style={[styles.menuItemText, isActive('Market') ? { color: '#fff' } : { color: theme.colors.background === '#101522' ? '#fff' : '#000' }]}>Market Page</Text>
              </TouchableOpacity>
              {/* Trade Guide */}
              <TouchableOpacity
                style={[styles.menuItem, isActive('TradeGuide') && { backgroundColor: '#059669' }]}
                activeOpacity={0.85}
                onPress={() => {
                  setShowMenu(false);
                  if (!isActive('TradeGuide')) navigation.navigate('TradeGuide');
                }}
              >
                <Feather name="book" size={18} color={isActive('TradeGuide') ? '#fff' : (theme.colors.background === '#101522' ? '#fff' : '#000')} style={{ marginRight: 8 }} />
                <Text style={[styles.menuItemText, isActive('TradeGuide') ? { color: '#fff' } : { color: theme.colors.background === '#101522' ? '#fff' : '#000' }]}>Trade Guide</Text>
              </TouchableOpacity>
              {/* Calculator */}
              <TouchableOpacity
                style={[styles.menuItem, isActive('Calculator') && { backgroundColor: '#059669' }]}
                activeOpacity={0.85}
                onPress={() => {
                  setShowMenu(false);
                  if (!isActive('Calculator')) navigation.navigate('Calculator');
                }}
              >
                <Feather name="cpu" size={18} color={isActive('Calculator') ? '#fff' : (theme.colors.background === '#101522' ? '#fff' : '#000')} style={{ marginRight: 8 }} />
                <Text style={[styles.menuItemText, isActive('Calculator') ? { color: '#fff' } : { color: theme.colors.background === '#101522' ? '#fff' : '#000' }]}>Calculator</Text>
              </TouchableOpacity>
              {/* Dashboard */}
              <TouchableOpacity
                style={[styles.menuItem, isActive('Dashboard') && { backgroundColor: '#059669' }]}
                activeOpacity={0.85}
                onPress={() => {
                  setShowMenu(false);
                  if (!isActive('Dashboard')) navigation.navigate('Dashboard');
                }}
              >
                <Feather name="home" size={18} color={isActive('Dashboard') ? '#fff' : (theme.colors.background === '#101522' ? '#fff' : '#000')} style={{ marginRight: 8 }} />
                <Text style={[styles.menuItemText, isActive('Dashboard') ? { color: '#fff' } : { color: theme.colors.background === '#101522' ? '#fff' : '#000' }]}>Dashboard</Text>
              </TouchableOpacity>
              {/* Mission */}
              <TouchableOpacity
                style={[styles.menuItem, isActive('Mission') && { backgroundColor: '#059669' }]}
                activeOpacity={0.85}
                onPress={() => {
                  setShowMenu(false);
                  if (!isActive('Mission')) navigation.navigate('Mission');
                }}
              >
                <Feather name="globe" size={18} color={isActive('Mission') ? '#fff' : (theme.colors.background === '#101522' ? '#fff' : '#000')} style={{ marginRight: 8 }} />
                <Text style={[styles.menuItemText, isActive('Mission') ? { color: '#fff' } : { color: theme.colors.background === '#101522' ? '#fff' : '#000' }]}>Mission</Text>
              </TouchableOpacity>
              {/* Blog */}
              <TouchableOpacity
                style={[styles.menuItem, isActive('Blog') && { backgroundColor: '#059669' }]}
                activeOpacity={0.85}
                onPress={() => {
                  setShowMenu(false);
                  if (!isActive('Blog')) navigation.navigate('Blog');
                }}
              >
                <Feather name="book-open" size={18} color={isActive('Blog') ? '#fff' : (theme.colors.background === '#101522' ? '#fff' : '#000')} style={{ marginRight: 8 }} />
                <Text style={[styles.menuItemText, isActive('Blog') ? { color: '#fff' } : { color: theme.colors.background === '#101522' ? '#fff' : '#000' }]}>Blog</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
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
