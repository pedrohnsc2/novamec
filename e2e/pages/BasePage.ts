import { type Page, type Locator, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly header: Locator;
  readonly footer: Locator;
  readonly whatsappButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator("header");
    this.footer = page.locator("footer");
    this.whatsappButton = page.locator('a[aria-label="Fale conosco pelo WhatsApp"]');
  }

  async expectHeaderVisible() {
    await expect(this.header).toBeVisible();
  }

  async expectFooterVisible() {
    await expect(this.footer).toBeVisible();
  }

  async expectWhatsAppButtonVisible() {
    await expect(this.whatsappButton).toBeVisible();
  }

  async navigateTo(path: string) {
    await this.page.goto(path);
  }
}
