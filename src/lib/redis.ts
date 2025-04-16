import { Redis } from '@upstash/redis'
import { env } from '@/config/env'

const redis = new Redis({
  url: env.UPSTASH_REDIS_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
})

export class RedisClient {
  private static instance: RedisClient
  private client: Redis

  private constructor() {
    this.client = redis
  }

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient()
    }
    return RedisClient.instance
  }

  async set(key: string, value: any, expireInSeconds?: number): Promise<void> {
    try {
      if (expireInSeconds) {
        await this.client.set(key, JSON.stringify(value), { ex: expireInSeconds })
      } else {
        await this.client.set(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error('Redis set error:', error)
      throw error
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.client.get(key)
      return value ? JSON.parse(value as string) : null
    } catch (error) {
      console.error('Redis get error:', error)
      throw error
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.client.del(key)
    } catch (error) {
      console.error('Redis delete error:', error)
      throw error
    }
  }

  async setUserSession(userId: string, sessionData: any, expireInSeconds = 86400): Promise<void> {
    await this.set(`session:${userId}`, sessionData, expireInSeconds)
  }

  async getUserSession<T>(userId: string): Promise<T | null> {
    return await this.get<T>(`session:${userId}`)
  }

  async deleteUserSession(userId: string): Promise<void> {
    await this.delete(`session:${userId}`)
  }

  async setCryptoPrice(symbol: string, price: number): Promise<void> {
    await this.set(`price:${symbol}`, price, 300) // Cache for 5 minutes
  }

  async getCryptoPrice(symbol: string): Promise<number | null> {
    return await this.get<number>(`price:${symbol}`)
  }

  async setUserAlert(userId: string, symbol: string, targetPrice: number): Promise<void> {
    const alertKey = `alert:${userId}:${symbol}`
    await this.set(alertKey, targetPrice)
  }

  async getUserAlerts(userId: string): Promise<Record<string, number>> {
    const alerts: Record<string, number> = {}
    const pattern = `alert:${userId}:*`
    
    try {
      const keys = await this.client.keys(pattern)
      for (const key of keys) {
        const symbol = key.split(':')[2]
        const price = await this.get<number>(key)
        if (price !== null) {
          alerts[symbol] = price
        }
      }
    } catch (error) {
      console.error('Get user alerts error:', error)
      throw error
    }

    return alerts
  }

  async deleteUserAlert(userId: string, symbol: string): Promise<void> {
    await this.delete(`alert:${userId}:${symbol}`)
  }
}

export const redisClient = RedisClient.getInstance()