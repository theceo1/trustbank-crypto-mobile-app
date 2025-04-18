import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";

const CTA_STATES = {
  SIGNUP: { screen: 'Signup', text: 'Start Your Journey' },
  KYC: { screen: 'KycIntro', text: 'Complete Your Profile' },
  TRADE: { screen: 'TradePage', text: 'Start Trading' },
};

type HeroSectionProps = {
  user: any;
  navigation: any;
  scrollToNext?: () => void;
};

export default function HeroSection({ user, navigation, scrollToNext }: HeroSectionProps) {
  const { theme } = useTheme();
  const { width, height } = Dimensions.get('window');

  // Animated down arrow
  const arrowAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(arrowAnim, { toValue: 1, duration: 450, useNativeDriver: true }),
        Animated.timing(arrowAnim, { toValue: 0, duration: 450, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // Animated green blobs
  // Define anchor points for blobs, spread across the hero area
  const blobAnchors = [
    // (left, top) pairs, normalized 0-1
    [0.05, 0.12], [0.35, 0.05], [0.65, 0.09], [0.85, 0.18],
    [0.12, 0.38], [0.55, 0.25], [0.80, 0.36],
    [0.18, 0.62], [0.42, 0.55], [0.72, 0.60],
    [0.30, 0.82], [0.60, 0.80],
  ];
  const blobs = Array.from({ length: blobAnchors.length });
  const anims = blobs.map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    anims.forEach((anim, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 3000 + Math.random() * 2000,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 3000 + Math.random() * 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  // Dynamic CTA logic (mock profile)
  const profile = user?.profile;
  let cta = CTA_STATES.SIGNUP;
  if (user) {
    if (!profile?.quidax_id) cta = CTA_STATES.KYC;
    else cta = CTA_STATES.TRADE;
  }

  // Scroll to next section (handled in parent)
  // Down arrow handler is expected to be passed as prop if needed

  return (
    <View style={[heroStyles.heroWrap, { backgroundColor: theme.colors.background, minHeight: height }]}>
      {/* Animated Blobs */}
      <View style={heroStyles.blobWrap} pointerEvents="none">
        {blobs.map((_, i) => {
          // Use anchor points for even distribution
          const [xNorm, yNorm] = blobAnchors[i];
          const size = 180 + Math.random() * 120; // 180–300
          const leftBase = xNorm * (width - size * 0.7);
          const topBase = yNorm * (height - size * 0.7);
          const opacity = 0.10 + Math.random() * 0.16;
          const zIndex = Math.floor(Math.random() * 2);
          const anim = anims[i];
          // Unique movement per blob: alternate between X, Y, diagonal, and circular
          let translateY, translateX;
          if (i % 4 === 0) {
            translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 60] });
            translateX = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -60] });
          } else if (i % 4 === 1) {
            translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -50] });
            translateX = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 40] });
          } else if (i % 4 === 2) {
            translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 30] });
            translateX = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 30] });
          } else {
            // Simulate circular motion
            translateY = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 20, 0] });
            translateX = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, -20, 0] });
          }
          const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.15] });
          return (
            <Animated.View
              key={i}
              style={{
                position: 'absolute',
                width: size,
                height: size,
                left: leftBase,
                top: topBase,
                borderRadius: size / 2,
                backgroundColor: '#10b981',
                opacity,
                zIndex,
                transform: [{ translateY }, { translateX }, { scale }],
              }}
            />
          );
        })} 
      </View>
      {/* Title, Tagline, CTA */}
      <View style={heroStyles.heroContent}>
        <View style={heroStyles.heroTitleWrap}>
          <Text style={heroStyles.heroTitle}>trustBank</Text>
        </View>
        <Text style={heroStyles.heroTagline}>CRYPTO | SIMPLIFIED</Text>
        <Text style={heroStyles.heroDesc}>❝simplifying crypto, amplifying possibilities.❞</Text>
        <TouchableOpacity
          style={heroStyles.ctaBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate(cta.screen)}
        >
          <Text style={heroStyles.ctaBtnText}>{cta.text}</Text>
          <Feather name="arrow-right" size={18} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
      {/* Down Arrow */}
      <Animated.View style={{
        position: 'absolute',
        left: '50%',
        marginLeft: -16,
        bottom: 212,
        zIndex: 3,
        transform: [{
          translateY: arrowAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 14] })
        }],
      }}>
        <TouchableOpacity style={heroStyles.downArrowBtn} onPress={scrollToNext} activeOpacity={0.7}>
          <Feather name="chevron-down" size={32} color="#10b981" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const heroStyles = StyleSheet.create({
  heroWrap: {
    // minHeight is set dynamically in the component
    // backgroundColor is set dynamically in the component
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: 28,
    paddingBottom: 16,
    marginBottom: 2,
  },
  blobWrap: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  heroContent: {
    zIndex: 2,
    alignItems: 'center',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  heroTitleWrap: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    marginBottom: 4,
    overflow: 'hidden',
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#059669',
    textShadowColor: '#34d399',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
    letterSpacing: 1.2,
  },
  heroTagline: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    marginTop: 2,
    marginBottom: 8,
    letterSpacing: 1.2,
  },
  heroDesc: {
    fontSize: 15,
    color: '#64748b',
    fontStyle: 'italic',
    marginBottom: 18,
    textAlign: 'center',
    maxWidth: 320,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginTop: 12,
    shadowColor: '#059669',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  ctaBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  downArrowBtn: {
    position: 'absolute',
    bottom: 12,
    left: '50%',
    marginLeft: -16,
    backgroundColor: 'rgba(16,185,129,0.08)',
    borderRadius: 100,
    padding: 6,
    zIndex: 3,
  },
});
