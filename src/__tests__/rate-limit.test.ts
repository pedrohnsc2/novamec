import { describe, it, expect } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

describe("checkRateLimit", () => {
  it("allows requests when Redis is not configured (dev fallback)", async () => {
    const result = await checkRateLimit("127.0.0.1");
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBeGreaterThan(0);
  });

  it("returns positive remaining count in dev mode", async () => {
    const result = await checkRateLimit("192.168.1.1");
    expect(result.remaining).toBe(5);
  });
});
