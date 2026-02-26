import { describe, it, expect } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

describe("checkRateLimit", () => {
  it("allows requests when Redis is not configured (in-memory fallback)", async () => {
    const result = await checkRateLimit("10.10.10.1");
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBeGreaterThanOrEqual(0);
  });

  it("returns correct remaining count after first request", async () => {
    const result = await checkRateLimit("10.10.10.2");
    expect(result.remaining).toBe(4);
  });

  it("blocks after exceeding max requests", async () => {
    const ip = "10.10.10.3";

    for (let i = 0; i < 5; i++) {
      const r = await checkRateLimit(ip);
      expect(r.allowed).toBe(true);
    }

    const blocked = await checkRateLimit(ip);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });
});
