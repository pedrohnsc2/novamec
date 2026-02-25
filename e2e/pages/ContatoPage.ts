import { type Page, type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ContatoPage extends BasePage {
  readonly heading: Locator;
  readonly form: Locator;
  readonly nameInput: Locator;
  readonly phoneInput: Locator;
  readonly vehicleInput: Locator;
  readonly serviceSelect: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole("heading", { name: /fale conosco/i });
    this.form = page.locator("form");
    this.nameInput = page.getByLabel(/nome completo/i);
    this.phoneInput = page.getByLabel(/telefone/i);
    this.vehicleInput = page.getByLabel(/veículo/i);
    this.serviceSelect = page.getByLabel(/serviço desejado/i);
    this.submitButton = page.getByRole("button", {
      name: /enviar mensagem/i,
    });
  }

  async goto() {
    await this.navigateTo("/contato");
  }

  async expectFormVisible() {
    await expect(this.form).toBeVisible();
    await expect(this.nameInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }
}
