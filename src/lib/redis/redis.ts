import { Redis } from '@upstash/redis'

let redisClient: Redis | null = null;

export const getRedisClient = (): Redis => {
  if (redisClient === null) {
    redisClient = Redis.fromEnv();
  }
  return redisClient;
}
