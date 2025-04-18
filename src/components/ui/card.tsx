//src/components/ui/card.tsx
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = React.forwardRef(({ style, ...props }: any, ref) => (
  <View ref={ref} style={[styles.card, style]} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ style, ...props }: any, ref) => (
  <View ref={ref} style={[styles.cardHeader, style]} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ style, ...props }: any, ref) => (
  <Text ref={ref} style={[styles.cardTitle, style]} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ style, ...props }: any, ref) => (
  <Text ref={ref} style={[styles.cardDescription, style]} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ style, ...props }: any, ref) => (
  <View ref={ref} style={[styles.cardContent, style]} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ style, ...props }: any, ref) => (
  <View ref={ref} style={[styles.cardFooter, style]} {...props} />
));
CardFooter.displayName = "CardFooter";

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 8,
  },
  cardHeader: {
    flexDirection: 'column',
    padding: 16,
    paddingBottom: 0,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1a237e',
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  cardContent: {
    padding: 16,
    paddingTop: 0,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 0,
  },
});

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
