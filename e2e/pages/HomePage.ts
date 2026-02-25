import { type Page, type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly heroHeading: Locator;
  readonly servicesSection: Locator;
  readonly faqSection: Locator;

  constructor(page: Page) {
    super(page);
    this.heroHeading = page.getByRole("heading", {
      name: /mecânica e revisão/i,
    });
    this.servicesSection = page.locator("#servicos");
    this.faqSection = page.getByRole("heading", {
      name: /perguntas frequentes/i,
    });
  }

  async goto() {
    await this.navigateTo("/");
  }

  async expectHeroVisible() {
    await expect(this.heroHeading).toBeVisible();
  }

  async expectServicesVisible() {
    await expect(this.servicesSection).toBeVisible();
  }
}
