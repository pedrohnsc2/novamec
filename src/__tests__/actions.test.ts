import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next/headers
vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue({
    get: vi.fn().mockReturnValue("127.0.0.1"),
  }),
}));

// Mock rate-limit
vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: vi.fn().mockResolvedValue({ allowed: true, remaining: 5 }),
}));

// Mock security-logger
vi.mock("@/lib/security-logger", () => ({
  logSecurityEvent: vi.fn(),
}));

import { submitContactForm } from "@/app/contato/actions";
import { checkRateLimit } from "@/lib/rate-limit";
import { logSecurityEvent } from "@/lib/security-logger";

function createFormData(data: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(data)) {
    fd.append(key, value);
  }
  return fd;
}

const validFormData = {
  name: "João Silva",
  phone: "31999999999",
  email: "",
  vehicle: "Honda Civic 2020",
  service: "Revisão Automotiva Completa",
  message: "",
  honeypot: "",
};

const initialState = { success: false, message: "" };

describe("submitContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(checkRateLimit).mockResolvedValue({
      allowed: true,
      remaining: 5,
    });
  });

  it("returns success with WhatsApp URL for valid data", async () => {
    const fd = createFormData(validFormData);
    const result = await submitContactForm(initialState, fd);

    expect(result.success).toBe(true);
    expect(result.whatsappUrl).toContain("wa.me");
    expect(result.whatsappUrl).toContain("Jo%C3%A3o");
    expect(logSecurityEvent).toHaveBeenCalledWith(
      "form_submission",
      "127.0.0.1",
      expect.any(Object)
    );
  });

  it("returns validation errors for invalid data", async () => {
    const fd = createFormData({ ...validFormData, name: "J", phone: "123" });
    const result = await submitContactForm(initialState, fd);

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(logSecurityEvent).toHaveBeenCalledWith(
      "validation_failure",
      "127.0.0.1",
      expect.any(Object)
    );
  });

  it("returns fake success when honeypot is filled", async () => {
    const fd = createFormData({ ...validFormData, honeypot: "bot-spam" });
    const result = await submitContactForm(initialState, fd);

    expect(result.success).toBe(true);
    expect(result.whatsappUrl).toBe("#");
    expect(logSecurityEvent).toHaveBeenCalledWith(
      "honeypot_triggered",
      "127.0.0.1",
      expect.any(Object)
    );
  });

  it("blocks when rate limited", async () => {
    vi.mocked(checkRateLimit).mockResolvedValue({
      allowed: false,
      remaining: 0,
    });
    const fd = createFormData(validFormData);
    const result = await submitContactForm(initialState, fd);

    expect(result.success).toBe(false);
    expect(result.message).toContain("Muitas tentativas");
    expect(logSecurityEvent).toHaveBeenCalledWith(
      "rate_limit_hit",
      "127.0.0.1"
    );
  });

  it("includes email in WhatsApp message when provided", async () => {
    const fd = createFormData({
      ...validFormData,
      email: "joao@email.com",
    });
    const result = await submitContactForm(initialState, fd);

    expect(result.success).toBe(true);
    expect(result.whatsappUrl).toContain("joao%40email.com");
  });
});
