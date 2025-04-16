import * as React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const Breadcrumb = React.forwardRef<any, { children: React.ReactNode; style?: any }>(
  ({ children, style, ...props }, ref) => (
    <View ref={ref} accessibilityRole="header" style={[styles.breadcrumbNav, style]} {...props}>
      {children}
    </View>
  )
);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<any, { children: React.ReactNode; style?: any }>(
  ({ children, style, ...props }, ref) => (
    <View ref={ref} style={[styles.breadcrumbList, style]} {...props}>
      {children}
    </View>
  )
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<any, { children: React.ReactNode; style?: any }>(
  ({ children, style, ...props }, ref) => (
    <View ref={ref} style={[styles.breadcrumbItem, style]} {...props}>
      {children}
    </View>
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<any, { onPress?: () => void; children: React.ReactNode; style?: any }>(
  ({ onPress, children, style, ...props }, ref) => (
    <TouchableOpacity ref={ref} onPress={onPress} style={[styles.breadcrumbLink, style]} {...props}>
      <Text style={styles.breadcrumbLinkText}>{children}</Text>
    </TouchableOpacity>
  )
);
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<any, { children: React.ReactNode; style?: any }>(
  ({ children, style, ...props }, ref) => (
    <Text ref={ref} style={[styles.breadcrumbPage, style]} {...props} accessibilityRole="text" accessibilityState={{ disabled: true }}>
      {children}
    </Text>
  )
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, style }: { children?: React.ReactNode; style?: any }) => (
  <View style={[styles.breadcrumbSeparator, style]}>
    {children ?? <Feather name="chevron-right" size={16} color="#888" />}
  </View>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ style }: { style?: any }) => (
  <View style={[styles.breadcrumbEllipsis, style]}>
    <Feather name="more-horizontal" size={18} color="#888" />
    <Text style={styles.srOnly}>More</Text>
  </View>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

const styles = StyleSheet.create({
  breadcrumbNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  breadcrumbList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },
  breadcrumbItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  breadcrumbLink: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  breadcrumbLinkText: {
    color: '#007bff',
    fontSize: 15,
  },
  breadcrumbPage: {
    color: '#333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  breadcrumbSeparator: {
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breadcrumbEllipsis: {
    height: 36,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  srOnly: {
    position: 'absolute',
    width: 1,
    height: 1,
    margin: -1,
    padding: 0,
    overflow: 'hidden',
    borderWidth: 0,
  },
});

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
