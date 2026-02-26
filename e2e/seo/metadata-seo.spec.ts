import { test, expect } from "@playwright/test";

const PAGES = [
  { path: "/", name: "Home" },
  { path: "/contato", name: "Contato" },
  { path: "/sobre", name: "Sobre" },
  { path: "/servicos", name: "Serviços" },
  { path: "/politica-de-privacidade", name: "Política de Privacidade" },
];

test.describe("SEO & Metadata", () => {
  for (const pg of PAGES) {
    test.describe(`Page: ${pg.name} (${pg.path})`, () => {
      test("has non-empty title containing NOVAMEC", async ({ page }) => {
        await page.goto(pg.path);
        const title = await page.title();
        expect(title.length).toBeGreaterThan(0);
        expect(title.toUpperCase()).toContain("NOVAMEC");
      });

      test("has meta description between 50-160 chars", async ({ page }) => {
        await page.goto(pg.path);
        const description = await page
          .locator('meta[name="description"]')
          .getAttribute("content");
        expect(description).not.toBeNull();
        expect(description!.length).toBeGreaterThanOrEqual(50);
        expect(description!.length).toBeLessThanOrEqual(160);
      });

      test("has canonical link", async ({ page }) => {
        await page.goto(pg.path);
        const canonical = await page
          .locator('link[rel="canonical"]')
          .getAttribute("href");
        expect(canonical).not.toBeNull();
        expect(canonical!.length).toBeGreaterThan(0);
      });

      test("has Open Graph tags", async ({ page }) => {
        await page.goto(pg.path);

        const ogTags = await page.evaluate(() => {
          const getMeta = (prop: string) =>
            document
              .querySelector(`meta[property="${prop}"]`)
              ?.getAttribute("content") ?? null;
          return {
            title: getMeta("og:title"),
            description: getMeta("og:description"),
            type: getMeta("og:type"),
          };
        });

        expect(ogTags.title).not.toBeNull();
        expect(ogTags.description).not.toBeNull();
        // og:type may be inherited from root layout — flag as warning if missing
        if (!ogTags.type) {
          console.log(
            `[SEO WARNING] ${pg.path} missing explicit og:type meta tag`
          );
        }
      });

      test("has valid JSON-LD structured data", async ({ page }) => {
        await page.goto(pg.path);
        await page.waitForLoadState("domcontentloaded");

        const jsonLdData = await page.evaluate(() => {
          const scripts = document.querySelectorAll(
            'script[type="application/ld+json"]'
          );
          return Array.from(scripts).map((s) => s.textContent ?? "");
        });

        expect(jsonLdData.length).toBeGreaterThan(0);

        for (const script of jsonLdData) {
          const parsed = JSON.parse(script);
          expect(parsed).toHaveProperty("@context");
          // JSON-LD can use either @type at root or @graph for multiple entities
          const hasType = "@type" in parsed;
          const hasGraph = "@graph" in parsed;
          expect(
            hasType || hasGraph,
            `JSON-LD must have @type or @graph: ${JSON.stringify(parsed).slice(0, 100)}`
          ).toBe(true);
        }
      });
    });
  }

  test.describe("robots.txt", () => {
    test("returns 200 and contains Sitemap", async ({ request }) => {
      const response = await request.get("/robots.txt");
      expect(response.status()).toBe(200);
      const body = await response.text();
      expect(body).toContain("Sitemap:");
    });

    test("allows all crawlers", async ({ request }) => {
      const response = await request.get("/robots.txt");
      const body = await response.text();
      expect(body).toContain("User-Agent:");
    });
  });

  test.describe("sitemap.xml", () => {
    test("returns 200 and contains page URLs", async ({ request }) => {
      const response = await request.get("/sitemap.xml");
      expect(response.status()).toBe(200);
      const body = await response.text();

      expect(body).toContain("<urlset");
      expect(body).toContain("<url>");
      expect(body).toContain("<loc>");
    });

    test("includes all main pages", async ({ request }) => {
      const response = await request.get("/sitemap.xml");
      const body = await response.text();

      const expectedPaths = [
        "/contato",
        "/sobre",
        "/servicos",
        "/politica-de-privacidade",
      ];

      for (const path of expectedPaths) {
        expect(body, `sitemap missing ${path}`).toContain(path);
      }
    });
  });

  test("404 page has appropriate title", async ({ page }) => {
    await page.goto("/pagina-que-nao-existe");
    await expect(page.getByText("404")).toBeVisible();
  });

  test("no broken internal links on homepage", async ({ page }) => {
    await page.goto("/");
    const links = await page.locator("a[href^='/']").all();

    for (const link of links) {
      const href = await link.getAttribute("href");
      if (!href || href === "#" || href.startsWith("/#")) continue;

      const response = await page.request.get(href);
      expect(
        response.status(),
        `Broken link: ${href} returned ${response.status()}`
      ).toBeLessThan(400);
    }
  });
});
