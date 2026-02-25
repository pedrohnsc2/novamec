import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock the server action
vi.mock("@/app/contato/actions", () => ({
  submitContactForm: vi.fn(),
}));

import ContactForm from "@/components/ContactForm";

describe("ContactForm", () => {
  it("renders all form fields", () => {
    render(<ContactForm />);

    expect(screen.getAllByLabelText(/nome completo/i).length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText(/telefone/i).length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText(/e-mail/i).length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText(/veículo/i).length).toBeGreaterThan(0);
    expect(
      screen.getAllByLabelText(/serviço desejado/i).length
    ).toBeGreaterThan(0);
    expect(screen.getAllByLabelText(/descrição/i).length).toBeGreaterThan(0);
  });

  it("renders submit button", () => {
    render(<ContactForm />);
    expect(
      screen.getAllByRole("button", { name: /enviar mensagem/i }).length
    ).toBeGreaterThan(0);
  });

  it("renders service options from constants", () => {
    render(<ContactForm />);
    expect(
      screen.getAllByText("Revisão Automotiva Completa").length
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("Mecânica Geral").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Outro").length).toBeGreaterThan(0);
  });

  it("renders form title", () => {
    render(<ContactForm />);
    expect(
      screen.getAllByText(/solicite um orçamento/i).length
    ).toBeGreaterThan(0);
  });
});
