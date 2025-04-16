
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "@/components/ui/button";
import Logo from "@/components/Logo";
import { Feather } from '@expo/vector-icons';

const VerificationPending = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.logo}><Logo size="lg" /></View>
        <View style={styles.statusIconCircle}>
          <Feather name="clock" size={48} color="#f59e42" />
        </View>
        <Text style={styles.title}>Verification in Progress</Text>
        <Text style={styles.subtitle}>
          We've received your verification documents and are currently reviewing them. This usually takes 24-48 hours.
        </Text>
        <View style={styles.statusList}>
          <View style={styles.statusRow}>
            <Feather name="check-circle" size={22} color="#10b981" style={styles.statusIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.statusHeading}>Documents Submitted</Text>
              <Text style={styles.statusDesc}>Your documents have been successfully uploaded</Text>
            </View>
          </View>
          <View style={styles.statusRow}>
            <Feather name="clock" size={22} color="#f59e42" style={styles.statusIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.statusHeading}>Under Review</Text>
              <Text style={styles.statusDesc}>Our team is reviewing your information</Text>
            </View>
          </View>
        </View>
        <View style={styles.infoBox}>
          <Feather name="alert-triangle" size={20} color="#f59e42" style={styles.infoIcon} />
          <Text style={styles.infoText}>
            You'll receive an email notification once your verification is complete.
          </Text>
        </View>
        <Button
          style={styles.loginBtn}
          variant="outline"
          onPress={() => navigation.navigate("Login" as never)}
        >
          Back to Login
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f8fa',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingVertical: 32,
    paddingHorizontal: 22,
    shadowColor: '#10b981',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 32,
    elevation: 8,
    alignItems: 'center',
  },
  logo: {
    marginBottom: 18,
  },
  statusIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#fef3c7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#5c5e6b',
    marginBottom: 20,
    textAlign: 'center',
  },
  statusList: {
    width: '100%',
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f6f8fa',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  statusIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  statusHeading: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
  },
  statusDesc: {
    fontSize: 13,
    color: '#5c5e6b',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff7ed',
    borderColor: '#fde68a',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginTop: 14,
    marginBottom: 16,
    width: '100%',
  },
  infoIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  infoText: {
    color: '#b45309',
    fontSize: 13,
    flex: 1,
    flexWrap: 'wrap',
  },
  loginBtn: {
    width: '100%',
    marginTop: 18,
    backgroundColor: '#fff',
    borderColor: '#10b981',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 14,
  },
});

export default VerificationPending;
