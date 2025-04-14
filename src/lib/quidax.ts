
import { env } from "@/config/env";

interface QuidaxConfig {
  apiKey: string;
  apiUrl: string;
}

class QuidaxClient {
  private config: QuidaxConfig;

  constructor(config: QuidaxConfig) {
    this.config = config;
  }

  private getHeaders() {
    return {
      "Authorization": `Bearer ${this.config.apiKey}`,
      "Content-Type": "application/json",
    };
  }

  async getWallets(userId: string) {
    try {
      const response = await fetch(`${this.config.apiUrl}/users/${userId}/wallets`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error fetching wallets: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get wallets error:", error);
      throw error;
    }
  }

  async getWalletBalance(userId: string, currency: string) {
    try {
      const response = await fetch(`${this.config.apiUrl}/users/${userId}/wallets/${currency}`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error fetching wallet balance: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get wallet balance error:", error);
      throw error;
    }
  }

  async getTransactions(userId: string, walletId: string, page = 1, limit = 20) {
    try {
      const response = await fetch(
        `${this.config.apiUrl}/users/${userId}/wallets/${walletId}/transactions?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: this.getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching transactions: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get transactions error:", error);
      throw error;
    }
  }

  async createDepositAddress(userId: string, currency: string) {
    try {
      const response = await fetch(`${this.config.apiUrl}/users/${userId}/wallets/${currency}/addresses`, {
        method: "POST",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error creating deposit address: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create deposit address error:", error);
      throw error;
    }
  }

  async withdraw(userId: string, currency: string, amount: string, address: string, tag?: string) {
    try {
      const payload: any = {
        amount,
        address,
      };

      if (tag) {
        payload.tag = tag;
      }

      const response = await fetch(`${this.config.apiUrl}/users/${userId}/wallets/${currency}/withdrawals`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error withdrawing: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Withdraw error:", error);
      throw error;
    }
  }
}

export const quidax = new QuidaxClient({
  apiKey: env.QUIDAX_PUBLIC_KEY,
  apiUrl: env.QUIDAX_API_URL,
});

// Mock data for development
export const mockWallets = [
  {
    id: "btc-wallet",
    currency: "btc",
    balance: "0.00234500",
    name: "Bitcoin",
    symbol: "BTC",
    iconUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    fiatValue: 105.32,
  },
  {
    id: "eth-wallet",
    currency: "eth",
    balance: "0.05230000",
    name: "Ethereum",
    symbol: "ETH",
    iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    fiatValue: 142.76,
  },
  {
    id: "usdt-wallet",
    currency: "usdt",
    balance: "250.00000000",
    name: "Tether",
    symbol: "USDT",
    iconUrl: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    fiatValue: 250.00,
  },
];

export const mockTransactions = [
  {
    id: "tx123",
    type: "deposit",
    amount: "0.00050000",
    currency: "BTC",
    status: "completed",
    createdAt: "2025-04-10T15:30:00Z",
    fee: "0.00001000",
  },
  {
    id: "tx124",
    type: "withdrawal",
    amount: "0.00100000",
    currency: "BTC",
    status: "completed",
    createdAt: "2025-04-08T12:15:00Z",
    fee: "0.00001500",
  },
  {
    id: "tx125",
    type: "deposit",
    amount: "0.02500000",
    currency: "ETH",
    status: "completed",
    createdAt: "2025-04-07T09:45:00Z",
    fee: "0.00010000",
  },
  {
    id: "tx126",
    type: "withdrawal",
    amount: "50.00000000",
    currency: "USDT",
    status: "pending",
    createdAt: "2025-04-05T18:20:00Z",
    fee: "1.00000000",
  },
];
