import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

// Minimal Carousel context for mobile (optional, can be omitted for simple cases)
const CarouselContext = React.createContext({} as any);

// Carousel component using ScrollView for horizontal scrolling
const Carousel = ({ children, style }: { children: React.ReactNode; style?: any }) => {
  return (
    <View style={[styles.carouselContainer, style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {children}
      </ScrollView>
    </View>
  );
};

// CarouselItem as a wrapper for each slide
const CarouselItem = ({ children, style }: { children: React.ReactNode; style?: any }) => (
  <View style={[styles.carouselItem, style]}>{children}</View>
);

// Previous arrow button
const CarouselPrevious = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.arrowLeft} onPress={onPress}>
    <Feather name="chevron-left" size={24} color="#333" />
  </TouchableOpacity>
);

// Next arrow button
const CarouselNext = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.arrowRight} onPress={onPress}>
    <Feather name="chevron-right" size={24} color="#333" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  carouselContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    alignItems: 'center',
  },
  carouselItem: {
    width: 300,
    height: 180,
    marginHorizontal: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowLeft: {
    position: 'absolute',
    left: 4,
    top: '50%',
    marginTop: -24,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 6,
    elevation: 2,
  },
  arrowRight: {
    position: 'absolute',
    right: 4,
    top: '50%',
    marginTop: -24,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 6,
    elevation: 2,
  },
});

export { Carousel, CarouselItem, CarouselPrevious, CarouselNext };
