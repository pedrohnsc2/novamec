import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
  { path: "/", name: "Home" },
  { path: "/contato", name: "Contato" },
  { path: "/sobre", name: "Sobre" },
  { path: "/servicos", name: "Serviços" },
  { path: "/politica-de-privacidade", name: "Política de Privacidade" },
];

test.describe("Accessibility (WCAG 2.1 AA)", () => {
  for (const pg of PAGES) {
    test(`${pg.name} — axe-core WCAG audit`, async ({ page }) => {
      await page.goto(pg.path);
      await page.waitForLoadState("domcontentloaded");

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      const critical = results.violations.filter(
        (v) => v.impact === "critical"
      );
      const serious = results.violations.filter(
        (v) => v.impact === "serious"
      );
      const all = [...critical, ...serious];

      if (all.length > 0) {
        const details = all
          .map(
            (v) =>
              `[${v.impact}] ${v.id}: ${v.description}\n  Targets: ${v.nodes.map((n) => n.target.join(" > ")).join(", ")}`
          )
          .join("\n");
        test.info().annotations.push({
          type: "a11y-violations",
          description: `${pg.path}:\n${details}`,
        });
        console.log(
          `[A11Y BUG] ${all.length} violation(s) on ${pg.path}:\n${details}`
        );
      }

      // Critical violations are hard failures
      expect(
        critical,
        `Found ${critical.length} critical a11y violation(s) on ${pg.path}`
      ).toHaveLength(0);

      // Serious violations are soft failures (reported but don't block)
      expect.soft(
        serious.length,
        `Found ${serious.length} serious a11y violation(s) on ${pg.path} — see annotations`
      ).toBe(0);
    });
  }

  test.describe("Keyboard navigation", () => {
    test("can tab through header nav links", async ({ page }) => {
      await page.goto("/");

      await page.keyboard.press("Tab");
      let focused = await page.evaluate(
        () => document.activeElement?.tagName
      );
      // After enough tabs we should reach a link or button
      let foundInteractive = false;
      for (let i = 0; i < 20; i++) {
        await page.keyboard.press("Tab");
        const tag = await page.evaluate(
          () => document.activeElement?.tagName
        );
        if (tag === "A" || tag === "BUTTON") {
          foundInteractive = true;
          break;
        }
      }
      expect(foundInteractive).toBe(true);
    });

    test("can tab through contact form fields", async ({ page }) => {
      await page.goto("/contato");

      const formFields = ["name", "phone", "email", "vehicle", "service", "message"];
      const focusedFields: string[] = [];

      // Tab until we hit the form or 30 tabs
      for (let i = 0; i < 40; i++) {
        await page.keyboard.press("Tab");
        const id = await page.evaluate(() => document.activeElement?.id);
        if (id && formFields.includes(id)) {
          focusedFields.push(id);
        }
      }

      expect(focusedFields.length).toBeGreaterThanOrEqual(4);
    });

    test("submit button is keyboard accessible", async ({ page }) => {
      await page.goto("/contato");

      for (let i = 0; i < 50; i++) {
        await page.keyboard.press("Tab");
        const tagName = await page.evaluate(
          () => document.activeElement?.tagName
        );
        const type = await page.evaluate(() =>
          document.activeElement?.getAttribute("type")
        );
        if (tagName === "BUTTON" && type === "submit") {
          return; // Found it
        }
      }
      expect(false, "Submit button was not reachable via Tab").toBe(true);
    });
  });

  test.describe("Images", () => {
    for (const pg of PAGES) {
      test(`${pg.name} — all images have alt text`, async ({ page }) => {
        await page.goto(pg.path);
        await page.waitForLoadState("domcontentloaded");

        const imagesWithoutAlt = await page.evaluate(() => {
          const imgs = document.querySelectorAll("img");
          return Array.from(imgs)
            .filter((img) => !img.hasAttribute("alt"))
            .map((img) => img.src);
        });

        expect(
          imagesWithoutAlt,
          `Images missing alt: ${imagesWithoutAlt.join(", ")}`
        ).toHaveLength(0);
      });
    }
  });

  test.describe("Form labels", () => {
    test("all contact form inputs have associated labels", async ({
      page,
    }) => {
      await page.goto("/contato");

      const unlabeledInputs = await page.evaluate(() => {
        const inputs = document.querySelectorAll(
          'form input:not([type="hidden"]):not([aria-hidden="true"]):not([tabindex="-1"]), form select, form textarea'
        );
        return Array.from(inputs)
          .filter((input) => {
            const id = input.id;
            if (!id) return true;
            const label = document.querySelector(`label[for="${id}"]`);
            return !label;
          })
          .map((input) => input.id || input.getAttribute("name") || "unknown");
      });

      expect(
        unlabeledInputs,
        `Inputs without labels: ${unlabeledInputs.join(", ")}`
      ).toHaveLength(0);
    });
  });

  test.describe("Color contrast (basic check)", () => {
    for (const pg of PAGES) {
      test(`${pg.name} — color-contrast audit`, async ({ page }) => {
        await page.goto(pg.path);
        await page.waitForLoadState("domcontentloaded");

        const results = await new AxeBuilder({ page })
          .withRules(["color-contrast"])
          .analyze();

        const violations = results.violations.filter(
          (v) => v.impact === "serious" || v.impact === "critical"
        );

        if (violations.length > 0) {
          const details = violations.flatMap((v) =>
            v.nodes.map((n) => {
              const data = n.any?.[0]?.data as Record<string, unknown> | undefined;
              return `  - ${n.target.join(" > ")}: fg=${data?.fgColor} bg=${data?.bgColor} ratio=${data?.contrastRatio}`;
            })
          );
          console.log(
            `[A11Y BUG] Color contrast on ${pg.path}:\n${details.join("\n")}`
          );
        }

        expect.soft(
          violations.length,
          `${violations.length} color contrast issue(s) on ${pg.path}`
        ).toBe(0);
      });
    }
  });
});
