import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Feather } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQ_CATEGORIES = [
  { id: 'general', name: 'General', icon: 'help-circle' },
  { id: 'account', name: 'Account', icon: 'users' },
  { id: 'security', name: 'Security', icon: 'shield' },
  { id: 'trading', name: 'Trading', icon: 'trending-up' },
  { id: 'support', name: 'Support', icon: 'message-circle' },
];

const FAQS = [
  // General
  { category: 'general', question: "What is trustBank?", answer: "trustBank is your gateway to seamless crypto banking. We're dedicated to providing secure, swift, and transparent financial solutions for the underserved." },
  { category: 'general', question: "What drives trustBank's mission?", answer: "Our mission is to bridge the financial gap, connecting millions worldwide to cutting-edge crypto banking services." },
  { category: 'general', question: "What are trustBank's core values?", answer: "Customer-centricity, Innovation, Transparency, Security, Inclusivity." },
  { category: 'general', question: "What services do you offer?", answer: "Cryptocurrency trading platform, secure digital wallet, real-time market data, 24/7 support, educational resources." },
  { category: 'general', question: "What is cryptocurrency?", answer: "Cryptocurrency is a digital or virtual currency that uses cryptography for security, is decentralized, and operates 24/7 globally." },
  { category: 'general', question: "Where does trustBank operate?", answer: "Globally, with a focus on emerging markets: Africa, Asia, and Latin America." },

  // Account
  { category: 'account', question: "How can I create an account?", answer: "Sign up with your email, verify, complete your profile, and start your crypto journey!" },
  { category: 'account', question: "What is KYC verification and why is it required?", answer: "KYC is required to comply with regulations, prevent fraud, and enable higher transaction limits. You'll need ID, proof of address, and a selfie." },
  { category: 'account', question: "How do I reset my password?", answer: "Click 'Forgot Password' on login, follow the email link, and set a new password." },
  { category: 'account', question: "What are the account limits?", answer: "Limits depend on verification level: Basic ($1,000/day), Verified ($100,000/day), Premium (custom/OTC)." },

  // Security
  { category: 'security', question: "Is trustBank secure?", answer: "Yes, we use 2FA, cold storage, encryption, audits, and 24/7 monitoring." },
  { category: 'security', question: "How do I enable two-factor authentication (2FA)?", answer: "Go to Account Settings > Security, enable 2FA, and follow setup instructions." },
  { category: 'security', question: "How do I report suspicious activity?", answer: "Change your password immediately, contact support, and provide details." },
  { category: 'security', question: "What happens if I lose my 2FA device?", answer: "Use backup codes or contact support for recovery and set up 2FA again." },

  // Trading
  { category: 'trading', question: "What cryptocurrencies do you support?", answer: "Bitcoin (BTC), Ethereum (ETH), Tether (USDT), USD Coin (USDC), and more coming soon." },
  { category: 'trading', question: "How do I start trading on trustBank?", answer: "Create and verify your account, complete KYC, fund your wallet, and start trading." },
  { category: 'trading', question: "What are the trading fees?", answer: "Base fee: 4.0%. Volume-based discounts apply. Network fees vary by crypto." },
  { category: 'trading', question: "What trading pairs are available?", answer: "Crypto/Fiat: BTC/NGN, ETH/NGN, USDT/NGN, USDC/NGN. Crypto/Crypto: BTC/USDT, ETH/USDT, ETH/BTC." },

  // Support
  { category: 'support', question: "What are your customer support hours?", answer: "Support is available 24/7. We prioritize urgent security issues and respond within 24 hours." },
  { category: 'support', question: "How can I contact support?", answer: "Live chat (24/7), email (support@trustbank.tech), phone (business hours), or contact form." },
  { category: 'support', question: "What is your typical response time?", answer: "Live chat: Immediate-5min, Email: 24h, Security: priority, General: 24-48h." },
  { category: 'support', question: "Do you offer educational resources?", answer: "Yes: trading guides, video tutorials, webinars, market analysis, security best practices." },
];

const AccordionItem = ({ question, answer, expanded, onPress, theme }: any) => (
  <View style={styles.accordionItem}>
    <TouchableOpacity
      style={styles.accordionHeader}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.accordionQuestion, { color: theme.colors.text }]}>{question}</Text>
      <Feather name={expanded ? 'chevron-up' : 'chevron-down'} size={20} color={theme.colors.primary} />
    </TouchableOpacity>
    {expanded && (
      <View style={styles.accordionContent}>
        <Text style={[styles.accordionAnswer, { color: theme.colors.secondaryText }]}>{answer}</Text>
      </View>
    )}
  </View>
);

const FAQScreen = () => {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ padding: 24 }}>
      <Text style={[styles.header, { color: theme.colors.text }]}>Frequently Asked Questions</Text>
      {FAQ_CATEGORIES.map((category) => {
        const faqs = FAQS.filter(f => f.category === category.id);
        if (!faqs.length) return null;
        return (
          <View key={category.id} style={{ marginBottom: 28 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Feather name={category.icon as any} size={18} color={theme.colors.primary} style={{ marginRight: 8 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: theme.colors.text }}>{category.name}</Text>
            </View>
            {faqs.map((faq, idx) => {
              const key = `${category.id}-${idx}`;
              return (
                <AccordionItem
                  key={key}
                  question={faq.question}
                  answer={faq.answer}
                  expanded={expanded === key}
                  onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setExpanded(expanded === key ? null : key);
                  }}
                  theme={theme}
                />
              );
            })}
          </View>
        );
      })}
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
    marginBottom: 24,
    textAlign: 'center',
  },
  // Accordion styles
  accordionItem: {
    borderRadius: 8,
    marginBottom: 14,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  accordionQuestion: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  accordionContent: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: 'transparent',
  },
  accordionAnswer: {
    fontSize: 15,
    lineHeight: 22,
  },
});

export default FAQScreen;
