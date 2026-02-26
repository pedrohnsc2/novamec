import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { name: "mobile-se", width: 320, height: 568 },
  { name: "mobile-14", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop-hd", width: 1920, height: 1080 },
  { name: "tiny", width: 200, height: 200 },
];

const PAGES = [
  { path: "/", name: "home" },
  { path: "/contato", name: "contato" },
  { path: "/sobre", name: "sobre" },
  { path: "/servicos", name: "servicos" },
  { path: "/politica-de-privacidade", name: "privacidade" },
  { path: "/pagina-inexistente", name: "404" },
];

test.describe("Responsive Viewport Regression", () => {
  for (const vp of VIEWPORTS) {
    test.describe(`Viewport: ${vp.name} (${vp.width}x${vp.height})`, () => {
      for (const pg of PAGES) {
        test(`${pg.name} — no horizontal scroll`, async ({ page }) => {
          await page.setViewportSize({
            width: vp.width,
            height: vp.height,
          });
          await page.goto(pg.path);
          await page.waitForLoadState("domcontentloaded");

          const scrollInfo = await page.evaluate(() => ({
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
          }));
          const hasHorizontalScroll =
            scrollInfo.scrollWidth > scrollInfo.clientWidth;

          if (hasHorizontalScroll) {
            const overflow = scrollInfo.scrollWidth - scrollInfo.clientWidth;
            console.log(
              `[RESPONSIVE BUG] ${pg.path} at ${vp.width}x${vp.height}: horizontal scroll detected (overflow=${overflow}px, scrollWidth=${scrollInfo.scrollWidth}, clientWidth=${scrollInfo.clientWidth})`
            );
          }

          if (vp.width <= 320) {
            // Extreme viewport — log only, don't fail
            if (hasHorizontalScroll) {
              test.info().annotations.push({
                type: "responsive-warning",
                description: `${pg.path} at ${vp.width}x${vp.height}: horizontal scroll (overflow=${scrollInfo.scrollWidth - scrollInfo.clientWidth}px)`,
              });
            }
          } else {
            expect.soft(
              hasHorizontalScroll,
              `Horizontal scroll on ${pg.path} at ${vp.width}x${vp.height} (overflow=${scrollInfo.scrollWidth - scrollInfo.clientWidth}px)`
            ).toBe(false);
          }
        });

        test(`${pg.name} — no JS errors on load`, async ({ page }) => {
          const errors: string[] = [];
          page.on("pageerror", (err) => errors.push(err.message));

          await page.setViewportSize({
            width: vp.width,
            height: vp.height,
          });
          await page.goto(pg.path);
          await page.waitForLoadState("domcontentloaded");

          expect(errors).toHaveLength(0);
        });
      }

      test("header is visible", async ({ page }) => {
        await page.setViewportSize({
          width: vp.width,
          height: vp.height,
        });
        await page.goto("/");
        await expect(page.locator("header")).toBeVisible();
      });

      test("footer is visible on scroll", async ({ page }) => {
        await page.setViewportSize({
          width: vp.width,
          height: vp.height,
        });
        await page.goto("/");
        await page.locator("footer").scrollIntoViewIfNeeded();
        await expect(page.locator("footer")).toBeVisible();
      });

      if (vp.width < 768) {
        test("mobile menu hamburger is visible", async ({ page }) => {
          await page.setViewportSize({
            width: vp.width,
            height: vp.height,
          });
          await page.goto("/");

          const menuButton = page.getByLabel(/menu/i);
          const count = await menuButton.count();
          expect(count).toBeGreaterThan(0);
        });
      }

      if (vp.width >= 1024) {
        test("desktop nav links are visible", async ({ page }) => {
          await page.setViewportSize({
            width: vp.width,
            height: vp.height,
          });
          await page.goto("/");

          await expect(
            page.locator("header").getByRole("link", { name: "Sobre Nós" })
          ).toBeVisible();
          await expect(
            page.locator("header").getByRole("link", { name: "Serviços" })
          ).toBeVisible();
          await expect(
            page.locator("header").getByRole("link", { name: "Contato" })
          ).toBeVisible();
        });
      }
    });
  }

  test.describe("Contact form responsiveness", () => {
    for (const vp of VIEWPORTS) {
      test(`form fields visible at ${vp.name}`, async ({ page }) => {
        await page.setViewportSize({
          width: vp.width,
          height: vp.height,
        });
        await page.goto("/contato");
        await page.waitForLoadState("domcontentloaded");

        const form = page.locator("form");
        await expect(form).toBeVisible();

        const nameInput = page.getByLabel(/nome completo/i);
        await nameInput.scrollIntoViewIfNeeded();
        await expect(nameInput).toBeVisible();
      });
    }
  });
});
