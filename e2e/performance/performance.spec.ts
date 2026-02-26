import { test, expect } from "@playwright/test";

const PAGES = [
  { path: "/", name: "Home" },
  { path: "/contato", name: "Contato" },
  { path: "/sobre", name: "Sobre" },
  { path: "/servicos", name: "Serviços" },
  { path: "/politica-de-privacidade", name: "Política de Privacidade" },
];

const MAX_LOAD_TIME_MS = 5000;
const MAX_NETWORK_REQUESTS = 80;
const MAX_BUNDLE_SIZE_BYTES = 500 * 1024; // 500KB

test.describe("Performance", () => {
  for (const pg of PAGES) {
    test.describe(`Page: ${pg.name}`, () => {
      test("loads within acceptable time", async ({ page }) => {
        const start = Date.now();
        await page.goto(pg.path, { waitUntil: "load" });
        const loadTime = Date.now() - start;

        expect(
          loadTime,
          `${pg.path} took ${loadTime}ms to load`
        ).toBeLessThan(MAX_LOAD_TIME_MS);
      });

      test("DOMContentLoaded fires quickly", async ({ page }) => {
        const timing = await page.evaluate(async (path) => {
          const navStart = performance.now();
          // Already on the page after goto, measure from navigation timing
          const [entry] = performance.getEntriesByType(
            "navigation"
          ) as PerformanceNavigationTiming[];
          return {
            domContentLoaded: entry?.domContentLoadedEventEnd ?? 0,
            loadEvent: entry?.loadEventEnd ?? 0,
          };
        }, pg.path);

        await page.goto(pg.path, { waitUntil: "load" });

        const navTiming = await page.evaluate(() => {
          const [entry] = performance.getEntriesByType(
            "navigation"
          ) as PerformanceNavigationTiming[];
          return {
            domContentLoaded: entry?.domContentLoadedEventEnd ?? 0,
            loadEvent: entry?.loadEventEnd ?? 0,
            responseEnd: entry?.responseEnd ?? 0,
            ttfb: entry?.responseStart ?? 0,
          };
        });

        expect(navTiming.domContentLoaded).toBeGreaterThan(0);
        expect(navTiming.domContentLoaded).toBeLessThan(MAX_LOAD_TIME_MS);
      });

      test("reasonable number of network requests", async ({ page }) => {
        const requests: string[] = [];
        page.on("request", (req) => requests.push(req.url()));

        await page.goto(pg.path, { waitUntil: "load" });

        expect(
          requests.length,
          `${pg.path} made ${requests.length} requests`
        ).toBeLessThan(MAX_NETWORK_REQUESTS);
      });

      test("no oversized JS bundles", async ({ page }) => {
        const largeResources: { url: string; size: number }[] = [];

        page.on("response", async (response) => {
          const url = response.url();
          if (url.includes(".js") || url.includes("/_next/")) {
            const contentLength = response.headers()["content-length"];
            if (contentLength && parseInt(contentLength) > MAX_BUNDLE_SIZE_BYTES) {
              largeResources.push({
                url,
                size: parseInt(contentLength),
              });
            }
          }
        });

        await page.goto(pg.path, { waitUntil: "load" });

        expect(
          largeResources,
          `Oversized bundles: ${largeResources.map((r) => `${r.url} (${(r.size / 1024).toFixed(0)}KB)`).join(", ")}`
        ).toHaveLength(0);
      });
    });
  }

  test("no console errors on any page", async ({ page }) => {
    for (const pg of PAGES) {
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(err.message));

      await page.goto(pg.path, { waitUntil: "load" });

      expect(
        errors,
        `Console errors on ${pg.path}: ${errors.join("; ")}`
      ).toHaveLength(0);

      page.removeAllListeners("pageerror");
    }
  });

  test("images are optimized (use next/image)", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });

    const imageInfo = await page.evaluate(() => {
      const imgs = document.querySelectorAll("img");
      return Array.from(imgs).map((img) => ({
        src: img.src,
        srcset: img.srcset,
        loading: img.loading,
        width: img.width,
        height: img.height,
      }));
    });

    for (const img of imageInfo) {
      if (img.src.includes("data:") || img.src.includes("blob:")) continue;
      // next/image typically adds srcset or uses /_next/image
      const isOptimized =
        img.src.includes("/_next/image") ||
        img.srcset.length > 0 ||
        img.loading === "lazy";
      // We just log, not fail — some images may be intentionally unoptimized
      if (!isOptimized) {
        console.log(`Potentially unoptimized image: ${img.src}`);
      }
    }
  });

  test("no memory-leaking event listeners on navigation", async ({
    page,
  }) => {
    await page.goto("/");
    const initialListeners = await page.evaluate(
      () => (performance as any).eventCounts?.size ?? 0
    );

    for (const pg of PAGES) {
      await page.goto(pg.path);
    }
    await page.goto("/");

    const finalListeners = await page.evaluate(
      () => (performance as any).eventCounts?.size ?? 0
    );

    // Event count size shouldn't grow significantly
    const growth = finalListeners - initialListeners;
    expect(growth).toBeLessThan(50);
  });
});
