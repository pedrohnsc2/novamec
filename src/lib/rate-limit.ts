import { Redis } from "@upstash/redis";
import { logSecurityEvent } from "@/lib/security-logger";

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

// In-memory fallback store
const memoryStore = new Map<string, number[]>();
let lastCleanup = 0;

function cleanupMemoryStore(): void {
  const now = Date.now();
  if (now - lastCleanup < 60_000) return; // max once per minute
  lastCleanup = now;

  const windowStart = now - WINDOW_MS;
  for (const [key, timestamps] of memoryStore) {
    const valid = timestamps.filter((t) => t > windowStart);
    if (valid.length === 0) {
      memoryStore.delete(key);
    } else {
      memoryStore.set(key, valid);
    }
  }
}

function checkMemoryRateLimit(ip: string): RateLimitResult {
  cleanupMemoryStore();

  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const timestamps = (memoryStore.get(ip) ?? []).filter((t) => t > windowStart);
  timestamps.push(now);
  memoryStore.set(ip, timestamps);

  const count = timestamps.length;
  return {
    allowed: count <= MAX_REQUESTS,
    remaining: Math.max(0, MAX_REQUESTS - count),
  };
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  const client = getRedis();

  if (!client) {
    return checkMemoryRateLimit(ip);
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
  } catch (error) {
    logSecurityEvent("redis_failure", ip, {
      error: error instanceof Error ? error.message : String(error),
    });
    return checkMemoryRateLimit(ip);
  }
}
