import { test, expect } from "@playwright/test";
import { SobrePage } from "./pages/SobrePage";

test.describe("About Page", () => {
  test("displays page content", async ({ page }) => {
    const sobrePage = new SobrePage(page);
    await sobrePage.goto();
    await sobrePage.expectContentVisible();
  });

  test("has correct page title", async ({ page }) => {
    await page.goto("/sobre");
    await expect(page).toHaveTitle(/sobre/i);
  });

  test("displays team section", async ({ page }) => {
    const sobrePage = new SobrePage(page);
    await sobrePage.goto();
    await expect(sobrePage.teamSection).toBeVisible();
  });

  test("displays mission, vision, values", async ({ page }) => {
    await page.goto("/sobre");
    await expect(page.getByText("Missão")).toBeVisible();
    await expect(page.getByText("Visão")).toBeVisible();
    await expect(page.getByText("Valores")).toBeVisible();
  });
});
