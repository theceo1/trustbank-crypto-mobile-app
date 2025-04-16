
import React from "react";
import { View, Image, Text, StyleSheet, ViewStyle, TouchableOpacity } from "react-native";

export interface WalletCardProps {
  name: string;
  symbol: string;
  balance: string;
  fiatValue: number;
  iconUrl?: string;
  style?: ViewStyle;
  onPress?: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({
  name,
  symbol,
  balance,
  fiatValue,
  iconUrl,
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.rowTop}>
        {iconUrl && (
          <Image
            source={{ uri: iconUrl }}
            style={styles.icon}
            resizeMode="contain"
          />
        )}
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.symbol}>{symbol}</Text>
        </View>
      </View>
      <View style={styles.balanceSection}>
        <View>
          <Text style={styles.balanceLabel}>Balance</Text>
          <Text style={styles.balanceValue}>{balance} {symbol}</Text>
        </View>
        <View>
          <Text style={styles.valueLabel}>Value</Text>
          <Text style={styles.valueAmount}>${fiatValue.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#10b981',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    minWidth: 180,
    minHeight: 120,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  symbol: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  balanceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  balanceLabel: {
    fontSize: 12,
    color: '#888',
  },
  balanceValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a237e',
    marginTop: 2,
  },
  valueLabel: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  valueAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#10b981',
    marginTop: 2,
    textAlign: 'right',
  },
});

export default WalletCard;

