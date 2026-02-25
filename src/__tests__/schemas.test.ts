import { describe, it, expect } from "vitest";
import { contactFormSchema } from "@/lib/schemas";

describe("contactFormSchema", () => {
  const validData = {
    name: "João Silva",
    phone: "31999999999",
    email: "",
    vehicle: "Honda Civic 2020",
    service: "Revisão Automotiva Completa",
    message: "",
    honeypot: "",
  };

  it("accepts valid data", () => {
    const result = contactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("accepts valid data with email and message", () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      email: "joao@email.com",
      message: "Carro fazendo barulho no freio",
    });
    expect(result.success).toBe(true);
  });

  it("rejects name shorter than 2 characters", () => {
    const result = contactFormSchema.safeParse({ ...validData, name: "J" });
    expect(result.success).toBe(false);
  });

  it("rejects name longer than 100 characters", () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      name: "A".repeat(101),
    });
    expect(result.success).toBe(false);
  });

  it("rejects phone shorter than 10 digits", () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      phone: "123456789",
    });
    expect(result.success).toBe(false);
  });

  it("rejects phone longer than 15 digits", () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      phone: "1234567890123456",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("accepts empty email", () => {
    const result = contactFormSchema.safeParse({ ...validData, email: "" });
    expect(result.success).toBe(true);
  });

  it("rejects vehicle shorter than 3 characters", () => {
    const result = contactFormSchema.safeParse({ ...validData, vehicle: "AB" });
    expect(result.success).toBe(false);
  });

  it("rejects empty service", () => {
    const result = contactFormSchema.safeParse({ ...validData, service: "" });
    expect(result.success).toBe(false);
  });

  it("rejects message longer than 500 characters", () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      message: "A".repeat(501),
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-empty honeypot", () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      honeypot: "bot-value",
    });
    expect(result.success).toBe(false);
  });

  it("accepts empty honeypot", () => {
    const result = contactFormSchema.safeParse({ ...validData, honeypot: "" });
    expect(result.success).toBe(true);
  });
});
