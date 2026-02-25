import { Redis } from "@upstash/redis";

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;

  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    return redis;
  }

  return null;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  const client = getRedis();

  if (!client) {
    // Fallback permissive when Redis is not configured (dev)
    return { allowed: true, remaining: MAX_REQUESTS };
  }

  const key = `rate_limit:contact:${ip}`;
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  try {
    const pipeline = client.pipeline();
    pipeline.zremrangebyscore(key, 0, windowStart);
    pipeline.zadd(key, { score: now, member: `${now}-${Math.random()}` });
    pipeline.zcard(key);
    pipeline.expire(key, Math.ceil(WINDOW_MS / 1000));

    const results = await pipeline.exec();
    const count = results[2] as number;

    return {
      allowed: count <= MAX_REQUESTS,
      remaining: Math.max(0, MAX_REQUESTS - count),
    };
  } catch {
    // If Redis fails, allow the request (fail open)
    return { allowed: true, remaining: MAX_REQUESTS };
  }
}
