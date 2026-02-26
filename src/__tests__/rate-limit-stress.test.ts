import { describe, it, expect } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

describe("Rate Limit Stress Tests", () => {
  it("allows exactly 5 requests then blocks (sequential)", async () => {
    const ip = `stress-seq-${Date.now()}`;

    for (let i = 0; i < 5; i++) {
      const result = await checkRateLimit(ip);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(4 - i);
    }

    const blocked = await checkRateLimit(ip);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it("concurrent requests — at most 5 succeed for same IP", async () => {
    const ip = `stress-concurrent-${Date.now()}`;

    const results = await Promise.all(
      Array.from({ length: 10 }, () => checkRateLimit(ip))
    );

    const allowed = results.filter((r) => r.allowed).length;
    const blocked = results.filter((r) => !r.allowed).length;

    expect(allowed).toBeLessThanOrEqual(5);
    expect(blocked).toBeGreaterThanOrEqual(5);
    expect(allowed + blocked).toBe(10);
  });

  it("different IPs are independent", async () => {
    const base = `stress-independent-${Date.now()}`;
    const ipA = `${base}-a`;
    const ipB = `${base}-b`;

    // Exhaust IP A
    for (let i = 0; i < 5; i++) {
      await checkRateLimit(ipA);
    }
    const blockedA = await checkRateLimit(ipA);
    expect(blockedA.allowed).toBe(false);

    // IP B should still be allowed
    const resultB = await checkRateLimit(ipB);
    expect(resultB.allowed).toBe(true);
    expect(resultB.remaining).toBe(4);
  });

  it("remaining count decrements correctly", async () => {
    const ip = `stress-decrement-${Date.now()}`;

    for (let i = 0; i < 5; i++) {
      const result = await checkRateLimit(ip);
      expect(result.remaining).toBe(4 - i);
    }

    const final = await checkRateLimit(ip);
    expect(final.remaining).toBe(0);
    expect(final.allowed).toBe(false);
  });

  it("many different IPs can each make requests", async () => {
    const results = await Promise.all(
      Array.from({ length: 20 }, (_, i) =>
        checkRateLimit(`stress-multi-${Date.now()}-${i}`)
      )
    );

    for (const result of results) {
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(4);
    }
  });
});
