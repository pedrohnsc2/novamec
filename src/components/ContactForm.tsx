"use client";

import { useActionState } from "react";
import { Send, CheckCircle, MessageCircle } from "lucide-react";
import { submitContactForm } from "@/app/contato/actions";
import { SERVICES } from "@/lib/constants";
import type { ContactFormState } from "@/lib/schemas";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  if (state.success && state.whatsappUrl) {
    return (
      <div className="rounded-2xl border border-border-light bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-text">
          Mensagem Enviada!
        </h3>
        <p className="mt-2 text-text-light">{state.message}</p>
        <a
          href={state.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-whatsapp px-8 py-3 font-semibold text-white transition-colors hover:bg-green-600"
        >
          <MessageCircle className="h-5 w-5" />
          Abrir conversa no WhatsApp
        </a>
        <p className="mt-3 text-xs text-text-lighter">
          Clique no botão acima para enviar a mensagem pelo WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-border-light bg-white p-6 shadow-sm sm:p-8"
    >
      <h3 className="mb-6 font-serif text-xl font-bold text-text">
        Solicite um Orçamento
      </h3>

      {state.message && !state.success && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-text"
          >
            Nome completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full rounded-lg border border-border px-4 py-3 text-text transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            placeholder="Seu nome"
          />
          {state.errors?.name && (
            <p className="mt-1 text-xs text-red-600">{state.errors.name[0]}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-1 block text-sm font-medium text-text"
          >
            Telefone / WhatsApp *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full rounded-lg border border-border px-4 py-3 text-text transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            placeholder="(31) 99999-9999"
          />
          {state.errors?.phone && (
            <p className="mt-1 text-xs text-red-600">
              {state.errors.phone[0]}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-text"
          >
            E-mail{" "}
            <span className="text-text-lighter">(opcional)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-lg border border-border px-4 py-3 text-text transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            placeholder="seu@email.com"
          />
          {state.errors?.email && (
            <p className="mt-1 text-xs text-red-600">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        {/* Vehicle */}
        <div>
          <label
            htmlFor="vehicle"
            className="mb-1 block text-sm font-medium text-text"
          >
            Veículo (marca, modelo e ano) *
          </label>
          <input
            type="text"
            id="vehicle"
            name="vehicle"
            required
            className="w-full rounded-lg border border-border px-4 py-3 text-text transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            placeholder="Ex: Honda Civic 2020"
          />
          {state.errors?.vehicle && (
            <p className="mt-1 text-xs text-red-600">
              {state.errors.vehicle[0]}
            </p>
          )}
        </div>

        {/* Service */}
        <div>
          <label
            htmlFor="service"
            className="mb-1 block text-sm font-medium text-text"
          >
            Serviço desejado *
          </label>
          <select
            id="service"
            name="service"
            required
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-text transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            defaultValue=""
          >
            <option value="" disabled>
              Selecione o serviço
            </option>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Outro">Outro</option>
          </select>
          {state.errors?.service && (
            <p className="mt-1 text-xs text-red-600">
              {state.errors.service[0]}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="mb-1 block text-sm font-medium text-text"
          >
            Descrição do problema{" "}
            <span className="text-text-lighter">(opcional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full resize-none rounded-lg border border-border px-4 py-3 text-text transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            placeholder="Descreva o problema ou o serviço que precisa..."
          />
          {state.errors?.message && (
            <p className="mt-1 text-xs text-red-600">
              {state.errors.message[0]}
            </p>
          )}
        </div>

        {/* Honeypot */}
        <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
          <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3.5 font-semibold text-white transition-colors hover:bg-secondary-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Enviar Mensagem
          </>
        )}
      </button>
    </form>
  );
}
