
import { env } from "@/config/env";

interface QuidaxConfig {
  apiKey: string;
  secretKey: string;
  apiUrl: string;
  webhookSecret: string;
}

interface SwapQuotation {
  from_currency: string;
  to_currency: string;
  from_amount: string;
}

interface MarketTicker {
  market: string;
  at: number;
  ticker: {
    buy: string;
    sell: string;
    low: string;
    high: string;
    last: string;
    vol: string;
  };
}

class QuidaxClient {

  private config: QuidaxConfig;

  constructor(config: QuidaxConfig) {
    this.config = config;
  }

  private getHeaders() {
    if (!this.config.apiKey) {
      console.error('[QuidaxClient] Missing API key! Set QUIDAX_PUBLIC_KEY in your environment.');
    }
    return {
      "Authorization": `Bearer ${this.config.apiKey}`,
      "Content-Type": "application/json",
    };
  }

  async getParentAccount() {
    try {
      const response = await fetch(`${this.config.apiUrl}/users/me`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error fetching parent account: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get parent account error:", error);
      throw error;
    }
  }

  async createSwapQuotation(params: SwapQuotation) {
    try {
      const response = await fetch(`${this.config.apiUrl}/users/me/swap_quotation`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`Error creating swap quotation: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create swap quotation error:", error);
      throw error;
    }
  }

  async confirmSwapQuotation(quotationId: string) {
    try {
      const response = await fetch(`${this.config.apiUrl}/users/me/swap_quotation/${quotationId}/confirm`, {
        method: "POST",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error confirming swap quotation: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Confirm swap quotation error:", error);
      throw error;
    }
  }

  async getSwapTransactions() {
    try {
      const response = await fetch(`${this.config.apiUrl}/users/me/swap_transactions`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error fetching swap transactions: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get swap transactions error:", error);
      throw error;
    }
  }

  async getMarketTickers() {
    try {
      const response = await fetch(`${this.config.apiUrl}/markets/tickers`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error fetching market tickers: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get market tickers error:", error);
      throw error;
    }
  }

  async getMarketTicker(market: string): Promise<MarketTicker> {
    try {
      const response = await fetch(`${this.config.apiUrl}/markets/tickers/${market}`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error fetching market ticker: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get market ticker error:", error);
      throw error;
    }
  }

  async getWalletsForUser(userId: string) {
    if (!this.config.apiUrl) {
      throw new Error('[QuidaxClient] Missing API URL! Set QUIDAX_API_URL in your environment.');
    }
    if (!this.config.apiKey) {
      throw new Error('[QuidaxClient] Missing API key! Set QUIDAX_PUBLIC_KEY in your environment.');
    }
    const url = `${this.config.apiUrl}/users/${userId}/wallets`;
    const headers = this.getHeaders();
    console.log('[Quidax] Fetching wallets for user', { url, headers });
    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });
      console.log('[Quidax] Response status', response.status);
      if (!response.ok) {
        const text = await response.text();
        console.error('[Quidax] Error response body:', text);
        throw new Error(`Error fetching wallets for user: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('[Quidax] Wallets data:', data);
      return data;
    } catch (error) {
      console.error("[Quidax] Get wallets for user error:", error, error?.stack);
      throw error;
    }
  }

  async getWallets() {
    // Deprecated: Only use for parent accounts
    // Use getWalletsForUser for sub-accounts
    
    const url = `${this.config.apiUrl}/users/me/wallets`;
    const headers = this.getHeaders();
    console.log('[Quidax] Fetching wallets', { url, headers });
    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });
      console.log('[Quidax] Response status', response.status);
      if (!response.ok) {
        const text = await response.text();
        console.error('[Quidax] Error response body:', text);
        throw new Error(`Error fetching wallets: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('[Quidax] Wallets data:', data);
      return data;
    } catch (error) {
      console.error("[Quidax] Get wallets error:", error, error?.stack);
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

  async getMarkets() {
    try {
      const response = await fetch(`${this.config.apiUrl}/markets`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error fetching markets: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get markets error:", error);
      throw error;
    }
  }

  // Remove the duplicate getMarketTicker implementation here
  
  async createOrder(market: string, side: 'buy' | 'sell', orderType: 'limit' | 'market', amount: string, price?: string) {
    try {
      const payload: any = {
        market,
        side,
        ord_type: orderType,
        amount,
      };

      if (price && orderType === 'limit') {
        payload.price = price;
      }

      const response = await fetch(`${this.config.apiUrl}/orders`, {
        method: "POST",
        headers: {
          ...this.getHeaders(),
          "Authorization": `Bearer ${this.config.secretKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error creating order: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create order error:", error);
      throw error;
    }
  }

  async getOrders(market: string, state: 'pending' | 'done' | 'cancel' = 'pending') {
    try {
      const response = await fetch(`${this.config.apiUrl}/orders?market=${market}&state=${state}`, {
        method: "GET",
        headers: {
          ...this.getHeaders(),
          "Authorization": `Bearer ${this.config.secretKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching orders: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get orders error:", error);
      throw error;
    }
  }

  async cancelOrder(id: string) {
    try {
      const response = await fetch(`${this.config.apiUrl}/orders/${id}/cancel`, {
        method: "POST",
        headers: {
          ...this.getHeaders(),
          "Authorization": `Bearer ${this.config.secretKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error canceling order: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Cancel order error:", error);
      throw error;
    }
  }
}

// NOTE: For production, QUIDAX_API_URL and QUIDAX_PUBLIC_KEY must be set in your environment variables or app config.
export const quidax = new QuidaxClient({
  apiKey: env.QUIDAX_SECRET_KEY, // Use secret key for Authorization
  secretKey: env.QUIDAX_SECRET_KEY,
  apiUrl: env.QUIDAX_API_URL,
  webhookSecret: env.QUIDAX_WEBHOOK_SECRET,
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
