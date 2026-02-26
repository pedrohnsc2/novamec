import { test, expect } from "@playwright/test";

const PAGES = [
  "/",
  "/contato",
  "/sobre",
  "/servicos",
  "/politica-de-privacidade",
];

const EXPECTED_HEADERS: Record<string, string | RegExp> = {
  "content-security-policy": /default-src 'self'/,
  "strict-transport-security": /max-age=63072000/,
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "referrer-policy": "strict-origin-when-cross-origin",
  "cross-origin-opener-policy": "same-origin",
  "permissions-policy": /camera=\(\)/,
  "x-xss-protection": "0",
};

test.describe("Security Headers", () => {
  for (const pagePath of PAGES) {
    test.describe(`Page: ${pagePath}`, () => {
      for (const [header, expected] of Object.entries(EXPECTED_HEADERS)) {
        test(`has ${header}`, async ({ request }) => {
          const response = await request.get(pagePath);
          const value = response.headers()[header];
          expect(value).toBeDefined();

          if (expected instanceof RegExp) {
            expect(value).toMatch(expected);
          } else {
            expect(value).toBe(expected);
          }
        });
      }
    });
  }

  test("CSP nonce is unique per request", async ({ request }) => {
    const res1 = await request.get("/");
    const res2 = await request.get("/");

    const csp1 = res1.headers()["content-security-policy"] ?? "";
    const csp2 = res2.headers()["content-security-policy"] ?? "";

    const nonceMatch1 = csp1.match(/'nonce-([^']+)'/);
    const nonceMatch2 = csp2.match(/'nonce-([^']+)'/);

    expect(nonceMatch1).not.toBeNull();
    expect(nonceMatch2).not.toBeNull();
    expect(nonceMatch1![1]).not.toBe(nonceMatch2![1]);
  });

  test("X-Powered-By header is not exposed in production", async ({
    request,
  }) => {
    for (const pagePath of PAGES) {
      const response = await request.get(pagePath);
      const xPoweredBy = response.headers()["x-powered-by"];
      if (xPoweredBy) {
        console.log(
          `[SECURITY WARNING] ${pagePath} exposes X-Powered-By: ${xPoweredBy} (acceptable in dev, must be removed in production)`
        );
      }
    }
  });

  test("CSP blocks inline scripts", async ({ request }) => {
    const response = await request.get("/");
    const csp = response.headers()["content-security-policy"] ?? "";

    expect(csp).not.toContain("'unsafe-eval'");
    expect(csp).toContain("'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("form-action 'self'");
  });

  test("CSP includes upgrade-insecure-requests", async ({ request }) => {
    const response = await request.get("/");
    const csp = response.headers()["content-security-policy"] ?? "";
    expect(csp).toContain("upgrade-insecure-requests");
  });

  test("404 page also has security headers", async ({ request }) => {
    const response = await request.get("/nonexistent-page-12345");
    const csp = response.headers()["content-security-policy"];
    const hsts = response.headers()["strict-transport-security"];

    expect(csp).toBeDefined();
    expect(hsts).toBeDefined();
  });
});
