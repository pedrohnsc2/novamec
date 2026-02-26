import { test, expect } from "@playwright/test";
import {
  fillContactForm,
  submitForm,
  gotoContactPage,
  assertNoPageCrash,
  assertNoXSS,
} from "../../tests/utils/form-helper";
import {
  MALICIOUS_STRINGS,
  MALICIOUS_PHONES,
  MALICIOUS_EMAILS,
} from "../../tests/fixtures/malicious-inputs";

test.describe("Input Fuzzing — Contact Form", () => {
  test.describe("Name field fuzzing", () => {
    for (const [i, payload] of MALICIOUS_STRINGS.entries()) {
      test(`name payload #${i}: ${JSON.stringify(payload).slice(0, 60)}`, async ({
        page,
      }) => {
        await gotoContactPage(page);
        await fillContactForm(page, { name: payload });
        await submitForm(page);
        await page.waitForTimeout(500);
        await assertNoPageCrash(page);
        await assertNoXSS(page);
      });
    }
  });

  test.describe("Phone field fuzzing", () => {
    for (const [i, payload] of MALICIOUS_PHONES.entries()) {
      test(`phone payload #${i}: ${JSON.stringify(payload).slice(0, 60)}`, async ({
        page,
      }) => {
        await gotoContactPage(page);
        await fillContactForm(page, { phone: payload });
        await submitForm(page);
        await page.waitForTimeout(500);
        await assertNoPageCrash(page);
        await assertNoXSS(page);
      });
    }
  });

  test.describe("Email field fuzzing", () => {
    for (const [i, payload] of MALICIOUS_EMAILS.entries()) {
      test(`email payload #${i}: ${JSON.stringify(payload).slice(0, 60)}`, async ({
        page,
      }) => {
        await gotoContactPage(page);
        await fillContactForm(page, { email: payload });
        await submitForm(page);
        await page.waitForTimeout(500);
        await assertNoPageCrash(page);
        await assertNoXSS(page);
      });
    }
  });

  test.describe("Vehicle field fuzzing", () => {
    for (const [i, payload] of MALICIOUS_STRINGS.entries()) {
      test(`vehicle payload #${i}: ${JSON.stringify(payload).slice(0, 60)}`, async ({
        page,
      }) => {
        await gotoContactPage(page);
        await fillContactForm(page, { vehicle: payload });
        await submitForm(page);
        await page.waitForTimeout(500);
        await assertNoPageCrash(page);
        await assertNoXSS(page);
      });
    }
  });

  test.describe("Message field fuzzing", () => {
    for (const [i, payload] of MALICIOUS_STRINGS.entries()) {
      test(`message payload #${i}: ${JSON.stringify(payload).slice(0, 60)}`, async ({
        page,
      }) => {
        await gotoContactPage(page);
        await fillContactForm(page, { message: payload });
        await submitForm(page);
        await page.waitForTimeout(500);
        await assertNoPageCrash(page);
        await assertNoXSS(page);
      });
    }
  });

  test.describe("XSS reflection checks", () => {
    const xssPayloads = [
      '<script>alert("xss")</script>',
      '"><img src=x onerror=alert(1)>',
      "<h1>HTML Injection</h1>",
      "<marquee>test</marquee>",
      '<svg onload="alert(1)">',
      "javascript:alert(1)",
    ];

    for (const payload of xssPayloads) {
      test(`XSS not reflected in DOM: ${payload.slice(0, 40)}`, async ({
        page,
      }) => {
        const alerts: string[] = [];
        page.on("dialog", (dialog) => {
          alerts.push(dialog.message());
          dialog.dismiss();
        });

        await gotoContactPage(page);
        await fillContactForm(page, {
          name: payload,
          vehicle: payload,
          message: payload,
        });
        await submitForm(page);
        await page.waitForTimeout(1000);

        expect(alerts, "XSS dialog was triggered").toHaveLength(0);

        const dangerousElements = await page.evaluate(() => {
          const marquees = document.querySelectorAll("marquee").length;
          const injectedH1s = Array.from(
            document.querySelectorAll("h1")
          ).filter((el) => el.textContent === "HTML Injection").length;
          const injectedSvgs = Array.from(
            document.querySelectorAll("svg")
          ).filter((el) => el.hasAttribute("onload")).length;
          return { marquees, injectedH1s, injectedSvgs };
        });

        expect(dangerousElements.marquees).toBe(0);
        expect(dangerousElements.injectedH1s).toBe(0);
        expect(dangerousElements.injectedSvgs).toBe(0);
      });
    }
  });
});
