import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";

test.describe("Homepage", () => {
  test("displays hero section with heading", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.expectHeroVisible();
  });

  test("displays services section", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.expectServicesVisible();
  });

  test("has correct page title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/NOVAMEC/i);
  });

  test("displays header and footer", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.expectHeaderVisible();
    await homePage.expectFooterVisible();
  });

  test("displays WhatsApp button", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    // Wait for the WhatsApp button animation
    await page.waitForTimeout(1500);
    await homePage.expectWhatsAppButtonVisible();
  });
});
