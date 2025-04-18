import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Feather } from '@expo/vector-icons';

const ContactScreen = () => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Dummy submit handler (replace with actual API call if needed)
  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    setTimeout(() => {
      setSuccess(true);
      setSubmitting(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ padding: 24 }}>
      <Text style={[styles.header, { color: theme.colors.text }]}>Contact Us</Text>
      <Text style={[styles.subheader, { color: theme.colors.textSecondary || theme.colors.text }]}>We'd love to hear from you! Reach out with questions, feedback, or partnership opportunities.</Text>
      <View style={styles.infoSection}>
        <Feather name="mail" size={18} color={theme.colors.primary} style={{ marginRight: 8 }} />
        <Text style={[styles.infoText, { color: theme.colors.text }]} selectable onPress={() => Linking.openURL('mailto:support@trustbank.com')}>support@trustbank.com</Text>
      </View>
      <View style={styles.infoSection}>
        <Feather name="globe" size={18} color={theme.colors.primary} style={{ marginRight: 8 }} />
        <Text style={[styles.infoText, { color: theme.colors.text }]} selectable onPress={() => Linking.openURL('https://trustbank.com')}>trustbank.com</Text>
      </View>
      <View style={styles.infoSection}>
        <Feather name="twitter" size={18} color={theme.colors.primary} style={{ marginRight: 8 }} />
        <Text style={[styles.infoText, { color: theme.colors.text }]} selectable onPress={() => Linking.openURL('https://twitter.com/trustbank')}>@trustbank</Text>
      </View>
      <View style={styles.formSection}>
        <Text style={[styles.formLabel, { color: theme.colors.text }]}>Name</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text, borderColor: theme.colors.border }]}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          placeholderTextColor={theme.colors.secondaryText || '#888'}
        />
        <Text style={[styles.formLabel, { color: theme.colors.text }]}>Email</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text, borderColor: theme.colors.border }]}
          value={email}
          onChangeText={setEmail}
          placeholder="you@email.com"
          placeholderTextColor={theme.colors.secondaryText || '#888'}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={[styles.formLabel, { color: theme.colors.text }]}>Message</Text>
        <TextInput
          style={[styles.input, styles.textArea, { backgroundColor: theme.colors.card, color: theme.colors.text, borderColor: theme.colors.border }]}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message here..."
          placeholderTextColor={theme.colors.secondaryText || '#888'}
          multiline
          numberOfLines={4}
        />
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {!!success && <Text style={styles.successText}>Thank you for contacting us! We'll get back to you soon.</Text>}
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: theme.colors.primary, opacity: submitting ? 0.6 : 1 }]}
          onPress={handleSubmit}
          disabled={submitting || !name || !email || !message}
        >
          <Text style={styles.submitButtonText}>{submitting ? 'Sending...' : 'Send Message'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 15,
    marginBottom: 22,
    textAlign: 'center',
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  formSection: {
    marginTop: 26,
  },
  formLabel: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 7,
    padding: 10,
    fontSize: 16,
    marginBottom: 14,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 12,
    borderRadius: 7,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#dc2626',
    marginBottom: 8,
    textAlign: 'center',
  },
  successText: {
    color: '#059669',
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default ContactScreen;
