import * as React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export const Accordion = ({ sections }: { sections: { title: string; content: React.ReactNode }[] }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  return (
    <View style={styles.accordion}>
      {sections.map((section, idx) => (
        <View key={idx} style={styles.item}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            <Text style={styles.title}>{section.title}</Text>
            <Feather name="chevron-down" size={20} style={{ transform: [{ rotate: openIndex === idx ? "180deg" : "0deg" }] }} />
          </TouchableOpacity>
          {openIndex === idx && <View style={styles.content}>{section.content}</View>}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  accordion: {
    width: '100%',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  content: {
    padding: 12,
    backgroundColor: '#f9fafb',
  },
});
