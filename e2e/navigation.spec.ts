import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("navigates from home to about page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Sobre Nós" }).first().click();
    await expect(page).toHaveURL(/\/sobre/);
    await expect(
      page.getByRole("heading", { name: /conheça a novamec/i })
    ).toBeVisible();
  });

  test("navigates from home to contact page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Contato" }).first().click();
    await expect(page).toHaveURL(/\/contato/);
  });

  test("navigates back to home via logo", async ({ page }) => {
    await page.goto("/sobre");
    await page.getByLabel("Ir para a página inicial").click();
    await expect(page).toHaveURL("/");
  });

  test("404 page is displayed for unknown routes", async ({ page }) => {
    await page.goto("/pagina-inexistente");
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByText("Página não encontrada")).toBeVisible();
  });

  test("privacy policy page loads", async ({ page }) => {
    await page.goto("/politica-de-privacidade");
    await expect(page).toHaveTitle(/privacidade/i);
    await expect(
      page.getByRole("heading", { name: /política de privacidade/i })
    ).toBeVisible();
  });
});
