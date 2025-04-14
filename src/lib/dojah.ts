
import { env } from "@/config/env";

interface DojahConfig {
  apiKey: string;
  appId: string;
  apiUrl: string;
}

class DojahClient {
  private config: DojahConfig;

  constructor(config: DojahConfig) {
    this.config = config;
  }

  private getHeaders() {
    return {
      "Authorization": `${this.config.apiKey}`,
      "AppId": this.config.appId,
      "Content-Type": "application/json",
    };
  }

  async verifyId(type: string, idNumber: string, firstName?: string, lastName?: string, dob?: string) {
    try {
      const response = await fetch(`${this.config.apiUrl}/api/v1/kyc/id`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({
          id_type: type,
          id_number: idNumber,
          first_name: firstName,
          last_name: lastName,
          dob: dob,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error verifying ID: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("ID Verification error:", error);
      throw error;
    }
  }

  async verifyBVN(bvn: string) {
    try {
      const response = await fetch(`${this.config.apiUrl}/api/v1/kyc/bvn`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ bvn }),
      });

      if (!response.ok) {
        throw new Error(`Error verifying BVN: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("BVN Verification error:", error);
      throw error;
    }
  }

  async verifyAddress(address: string) {
    try {
      const response = await fetch(`${this.config.apiUrl}/api/v1/kyc/address`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        throw new Error(`Error verifying address: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Address Verification error:", error);
      throw error;
    }
  }

  async verifyFacialMatch(selfieImage: string, documentImage: string) {
    try {
      const response = await fetch(`${this.config.apiUrl}/api/v1/kyc/facial`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({
          selfie_image: selfieImage,
          document_image: documentImage,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error verifying facial match: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Facial Match error:", error);
      throw error;
    }
  }
}

export const dojah = new DojahClient({
  apiKey: env.DOJAH_API_KEY,
  appId: env.DOJAH_APP_ID,
  apiUrl: env.DOJAH_API_URL,
});
