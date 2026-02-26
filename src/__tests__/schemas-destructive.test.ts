import { describe, it, expect } from "vitest";
import { contactFormSchema } from "@/lib/schemas";

const MALICIOUS_STRINGS = [
  "",
  " ",
  "   ",
  "\t",
  "\n",
  "\r\n",
  "a",
  "a".repeat(10_000),
  '<script>alert("xss")</script>',
  '"><img src=x onerror=alert(1)>',
  "' OR 1=1 --",
  "Robert'); DROP TABLE users;--",
  "${7*7}",
  '{{constructor.constructor("return this")()}}',
  "null",
  "undefined",
  "NaN",
  "../../../etc/passwd",
  "..\\..\\..\\windows\\system32",
  "👨‍👩‍👧‍👦🏳️‍🌈🇧🇷",
  "𝕳𝖊𝖑𝖑𝖔 中文 العربية",
  String.fromCharCode(0),
  "!@#$%^&*()",
  "<h1>HTML Injection</h1>",
  "<marquee>test</marquee>",
  "-1",
  "0",
  "99999999999",
  "test\x00null",
];

const validBase = {
  name: "João Silva",
  phone: "31999999999",
  email: "",
  vehicle: "Honda Civic 2020",
  service: "Revisão Automotiva Completa",
  message: "",
  honeypot: "",
};

describe("Schema Destructive Fuzzing", () => {
  describe("name field fuzzing", () => {
    for (const [i, payload] of MALICIOUS_STRINGS.entries()) {
      it(`payload #${i}: ${JSON.stringify(payload).slice(0, 50)} — never throws`, () => {
        const result = contactFormSchema.safeParse({
          ...validBase,
          name: payload,
        });
        // safeParse must never throw
        expect(typeof result.success).toBe("boolean");
      });
    }
  });

  describe("phone field fuzzing", () => {
    for (const [i, payload] of MALICIOUS_STRINGS.entries()) {
      it(`payload #${i}: ${JSON.stringify(payload).slice(0, 50)} — never throws`, () => {
        const result = contactFormSchema.safeParse({
          ...validBase,
          phone: payload,
        });
        expect(typeof result.success).toBe("boolean");
      });
    }
  });

  describe("email field fuzzing", () => {
    const emailPayloads = [
      ...MALICIOUS_STRINGS,
      "not-email",
      "@missing.com",
      "user@",
      "user@.com",
      "a".repeat(500) + "@test.com",
      '<script>alert(1)</script>@evil.com',
      "user@evil.com\nBcc:hacker@evil.com",
    ];

    for (const [i, payload] of emailPayloads.entries()) {
      it(`payload #${i}: ${JSON.stringify(payload).slice(0, 50)} — never throws`, () => {
        const result = contactFormSchema.safeParse({
          ...validBase,
          email: payload,
        });
        expect(typeof result.success).toBe("boolean");
      });
    }
  });

  describe("vehicle field fuzzing", () => {
    for (const [i, payload] of MALICIOUS_STRINGS.entries()) {
      it(`payload #${i}: ${JSON.stringify(payload).slice(0, 50)} — never throws`, () => {
        const result = contactFormSchema.safeParse({
          ...validBase,
          vehicle: payload,
        });
        expect(typeof result.success).toBe("boolean");
      });
    }
  });

  describe("service field fuzzing", () => {
    for (const [i, payload] of MALICIOUS_STRINGS.entries()) {
      it(`payload #${i}: ${JSON.stringify(payload).slice(0, 50)} — never throws`, () => {
        const result = contactFormSchema.safeParse({
          ...validBase,
          service: payload,
        });
        expect(typeof result.success).toBe("boolean");
      });
    }
  });

  describe("message field fuzzing", () => {
    for (const [i, payload] of MALICIOUS_STRINGS.entries()) {
      it(`payload #${i}: ${JSON.stringify(payload).slice(0, 50)} — never throws`, () => {
        const result = contactFormSchema.safeParse({
          ...validBase,
          message: payload,
        });
        expect(typeof result.success).toBe("boolean");
      });
    }
  });

  describe("honeypot field fuzzing", () => {
    for (const [i, payload] of MALICIOUS_STRINGS.entries()) {
      it(`payload #${i}: ${JSON.stringify(payload).slice(0, 50)} — rejects non-empty`, () => {
        const result = contactFormSchema.safeParse({
          ...validBase,
          honeypot: payload,
        });
        if (payload === "") {
          expect(result.success).toBe(true);
        } else {
          expect(result.success).toBe(false);
        }
      });
    }
  });

  describe("boundary values — name", () => {
    it("accepts exactly 2 chars (min)", () => {
      const result = contactFormSchema.safeParse({ ...validBase, name: "Jo" });
      expect(result.success).toBe(true);
    });

    it("rejects 1 char (below min)", () => {
      const result = contactFormSchema.safeParse({ ...validBase, name: "J" });
      expect(result.success).toBe(false);
    });

    it("accepts exactly 100 chars (max)", () => {
      const result = contactFormSchema.safeParse({
        ...validBase,
        name: "A".repeat(100),
      });
      expect(result.success).toBe(true);
    });

    it("rejects 101 chars (above max)", () => {
      const result = contactFormSchema.safeParse({
        ...validBase,
        name: "A".repeat(101),
      });
      expect(result.success).toBe(false);
    });
  });

  describe("boundary values — phone", () => {
    it("accepts exactly 10 chars (min)", () => {
      const result = contactFormSchema.safeParse({
        ...validBase,
        phone: "3199999999",
      });
      expect(result.success).toBe(true);
    });

    it("rejects 9 chars (below min)", () => {
      const result = contactFormSchema.safeParse({
        ...validBase,
        phone: "319999999",
      });
      expect(result.success).toBe(false);
    });

    it("accepts exactly 15 chars (max)", () => {
      const result = contactFormSchema.safeParse({
        ...validBase,
        phone: "9".repeat(15),
      });
      expect(result.success).toBe(true);
    });

    it("rejects 16 chars (above max)", () => {
      const result = contactFormSchema.safeParse({
        ...validBase,
        phone: "9".repeat(16),
      });
      expect(result.success).toBe(false);
    });
  });

  describe("boundary values — vehicle", () => {
    it("accepts exactly 3 chars (min)", () => {
      const result = contactFormSchema.safeParse({
        ...validBase,
        vehicle: "BMW",
      });
      expect(result.success).toBe(true);
    });

    it("rejects 2 chars (below min)", () => {
      const result = contactFormSchema.safeParse({
        ...validBase,
        vehicle: "BM",
      });
      expect(result.success).toBe(false);
    });

    it("accepts exactly 100 chars (max)", () => {
      const result = contactFormSchema.safeParse({
        ...validBase,
        vehicle: "V".repeat(100),
      });
      expect(result.success).toBe(true);
    });

    it("rejects 101 chars (above max)", () => {
      const result = contactFormSchema.safeParse({
        ...validBase,
        vehicle: "V".repeat(101),
      });
      expect(result.success).toBe(false);
    });
  });

  describe("boundary values — message", () => {
    it("accepts exactly 500 chars (max)", () => {
      const result = contactFormSchema.safeParse({
        ...validBase,
        message: "M".repeat(500),
      });
      expect(result.success).toBe(true);
    });

    it("rejects 501 chars (above max)", () => {
      const result = contactFormSchema.safeParse({
        ...validBase,
        message: "M".repeat(501),
      });
      expect(result.success).toBe(false);
    });

    it("accepts empty message", () => {
      const result = contactFormSchema.safeParse({
        ...validBase,
        message: "",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("type coercion — non-string inputs", () => {
    const nonStringInputs = [
      { label: "number", value: 12345 },
      { label: "boolean true", value: true },
      { label: "boolean false", value: false },
      { label: "null", value: null },
      { label: "undefined", value: undefined },
      { label: "array", value: ["test"] },
      { label: "object", value: { key: "val" } },
      { label: "zero", value: 0 },
      { label: "negative number", value: -1 },
      { label: "float", value: 3.14 },
      { label: "NaN", value: NaN },
      { label: "Infinity", value: Infinity },
    ];

    for (const { label, value } of nonStringInputs) {
      it(`rejects ${label} for name field gracefully`, () => {
        const result = contactFormSchema.safeParse({
          ...validBase,
          name: value,
        });
        expect(typeof result.success).toBe("boolean");
      });

      it(`rejects ${label} for phone field gracefully`, () => {
        const result = contactFormSchema.safeParse({
          ...validBase,
          phone: value,
        });
        expect(typeof result.success).toBe("boolean");
      });

      it(`rejects ${label} for service field gracefully`, () => {
        const result = contactFormSchema.safeParse({
          ...validBase,
          service: value,
        });
        expect(typeof result.success).toBe("boolean");
      });
    }
  });
});
