import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useTheme } from "@/contexts/ThemeContext";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Crypto Enthusiast",
    content: "trustBank has made crypto trading so much easier. Their platform is intuitive and secure.",
    initials: "SJ",
    rating: 5
  },
  {
    name: "Michael Massamba",
    role: "Day Trader",
    content: "Best crypto platform I've used. The instant swap feature is a game-changer!",
    initials: "MM",
    rating: 4
  },
  {
    name: "Aisha Patel",
    role: "Business Owner",
    content: "Excellent customer support and very user-friendly interface. Highly recommended!",
    initials: "AP",
    rating: 5
  },
  {
    name: "Austin Obinna",
    role: "Tech Professional",
    content: "The security features and ease of use make trustBank stand out from other platforms.",
    initials: "AO",
    rating: 4
  },
  {
    name: "Emma Thompson",
    role: "Investment Advisor",
    content: "trustBank's commitment to security and compliance gives me confidence in their platform.",
    initials: "ET",
    rating: 3
  },
  {
    name: "Carlos Rodriguez",
    role: "Blockchain Developer",
    content: "The API integration and technical features are top-notch. Great work!",
    initials: "CR",
    rating: 4
  },
  {
    name: "Aminu Sanni",
    role: "Entrepreneur",
    content: "trustBank has been a game-changer for me. The platform's features and the community support have made a significant difference in my trading success.",
    initials: "AS",
    rating: 5
  }
];

export default function UserFeedback() {
  return (
    <View style={styles.sectionWrap}>
      <Text style={styles.sectionTitle}>Community Voices</Text>
      <Text style={styles.sectionSubtitle}>Real stories from our growing community</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollWrap}
      >
        {testimonials.map((item, idx) => (
          <View key={idx} style={styles.card}>
            <Feather name="message-circle" size={20} color="#10b981" style={styles.quoteIcon} />
            <Text style={styles.content}>{item.content}</Text>
            <View style={styles.userRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.initials}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.role}>{item.role}</Text>
              </View>
              <View style={styles.starsRow}>
                {[...Array(5)].map((_, i) => (
                  <Feather
                    key={i}
                    name="star"
                    size={13}
                    color={i < item.rating ? '#facc15' : '#e5e7eb'}
                    style={{ marginRight: 1 }}
                  />
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
  sectionWrap: {
    marginTop: 24,
    marginBottom: 24,
    alignItems: 'center',
    width: '100%',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#1a237e',
    marginBottom: 2,
    textAlign: 'center',
  },
  sectionSubtitle: {
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 12,
    maxWidth: 220,
  },
  scrollWrap: {
    paddingHorizontal: 10,
    alignItems: 'flex-start',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  card: {
    width: 240,
    marginRight: 14,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#10b981',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  quoteIcon: {
    marginBottom: 8,
    opacity: 0.25,
  },
  content: {
    color: '#475569',
    fontSize: 14,
    marginBottom: 18,
    fontStyle: 'italic',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#d1fae5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },
  avatarText: {
    color: '#10b981',
    fontWeight: 'bold',
    fontSize: 13,
  },
  name: {
    fontWeight: '600',
    color: '#1a237e',
    fontSize: 13,
  },
  role: {
    color: '#64748b',
    fontSize: 11,
  },
  starsRow: {
    flexDirection: 'row',
    marginLeft: 4,
  },
});
