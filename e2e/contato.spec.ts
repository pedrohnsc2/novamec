import { test, expect } from "@playwright/test";
import { ContatoPage } from "./pages/ContatoPage";

test.describe("Contact Page", () => {
  test("displays contact form", async ({ page }) => {
    const contatoPage = new ContatoPage(page);
    await contatoPage.goto();
    await contatoPage.expectFormVisible();
  });

  test("has correct page title", async ({ page }) => {
    await page.goto("/contato");
    await expect(page).toHaveTitle(/contato/i);
  });

  test("displays contact information sidebar", async ({ page }) => {
    const contatoPage = new ContatoPage(page);
    await contatoPage.goto();
    await expect(page.getByText("oficinanovamec@gmail.com")).toBeVisible();
    await expect(page.getByText("(31) 99731-3901").first()).toBeVisible();
  });

  test("displays breadcrumb navigation", async ({ page }) => {
    await page.goto("/contato");
    await expect(page.getByText("Início").first()).toBeVisible();
    await expect(page.getByText("Contato").first()).toBeVisible();
  });
});
