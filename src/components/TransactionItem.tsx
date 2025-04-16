
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";

interface TransactionItemProps {
  id: string;
  type: "deposit" | "withdrawal";
  amount: string;
  currency: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
  fee: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  type,
  amount,
  currency,
  status,
  createdAt,
  fee,
}) => {
  const isDeposit = type === "deposit";
  const date = new Date(createdAt);
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={[styles.iconCircle, isDeposit ? styles.depositBg : styles.withdrawalBg]}>
          <Feather
            name={isDeposit ? "arrow-down-left" : "arrow-up-right"}
            size={20}
            color={isDeposit ? "#059669" : "#dc2626"}
          />
        </View>
        <View>
          <Text style={styles.titleText}>
            {isDeposit ? "Received" : "Sent"} {currency}
          </Text>
          <Text style={styles.timeAgo}>{timeAgo}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.amountText}>
          {isDeposit ? "+" : "-"}
          {parseFloat(amount).toFixed(8)} {currency}
        </Text>
        <Text style={
          [styles.statusText,
            status === "completed"
              ? styles.statusCompleted
              : status === "pending"
              ? styles.statusPending
              : styles.statusFailed
          ]
        }>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconCircle: {
    padding: 8,
    borderRadius: 999,
    marginRight: 8,
  },
  depositBg: {
    backgroundColor: "#bbf7d0",
  },
  withdrawalBg: {
    backgroundColor: "#fecaca",
  },
  titleText: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 2,
  },
  timeAgo: {
    fontSize: 12,
    color: "#6b7280",
  },
  rightSection: {
    alignItems: "flex-end",
  },
  amountText: {
    fontWeight: "500",
    fontSize: 16,
  },
  statusText: {
    fontSize: 12,
    marginTop: 2,
  },
  statusCompleted: {
    color: "#10b981",
  },
  statusPending: {
    color: "#f59e42",
  },
  statusFailed: {
    color: "#dc2626",
  },
});

export default TransactionItem;
