import { type Page, type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SobrePage extends BasePage {
  readonly heading: Locator;
  readonly historySection: Locator;
  readonly teamSection: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole("heading", { name: /conheça a novamec/i });
    this.historySection = page.getByRole("heading", {
      name: /nossa história/i,
    });
    this.teamSection = page.getByRole("heading", { name: /nossa equipe/i });
  }

  async goto() {
    await this.navigateTo("/sobre");
  }

  async expectContentVisible() {
    await expect(this.heading).toBeVisible();
    await expect(this.historySection).toBeVisible();
  }
}
