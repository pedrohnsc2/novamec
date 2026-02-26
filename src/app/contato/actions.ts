"use server";

import { headers } from "next/headers";
import { contactFormSchema } from "@/lib/schemas";
import type { ContactFormState } from "@/lib/schemas";
import { checkRateLimit } from "@/lib/rate-limit";
import { logSecurityEvent } from "@/lib/security-logger";
import { BUSINESS } from "@/lib/constants";

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  // Rate limit check
  const { allowed } = await checkRateLimit(ip);
  if (!allowed) {
    logSecurityEvent("rate_limit_hit", ip);
    return {
      success: false,
      message:
        "Muitas tentativas. Por favor, aguarde alguns minutos e tente novamente.",
      values: Object.fromEntries(formData) as Record<string, string>,
    };
  }

  const rawData = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    vehicle: formData.get("vehicle") as string,
    service: formData.get("service") as string,
    message: formData.get("message") as string,
    honeypot: formData.get("honeypot") as string,
  };

  // Honeypot check
  if (rawData.honeypot && rawData.honeypot.length > 0) {
    logSecurityEvent("honeypot_triggered", ip, {
      honeypotValue: rawData.honeypot,
    });
    // Return fake success to not alert bots
    return {
      success: true,
      message: "Mensagem enviada com sucesso!",
      whatsappUrl: "#",
    };
  }

  // Validation
  const result = contactFormSchema.safeParse(rawData);
  if (!result.success) {
    logSecurityEvent("validation_failure", ip, {
      errors: result.error.flatten().fieldErrors,
    });
    return {
      success: false,
      message: "Por favor, corrija os erros no formulário.",
      errors: result.error.flatten().fieldErrors,
      values: Object.fromEntries(formData) as Record<string, string>,
    };
  }

  logSecurityEvent("form_submission", ip, {
    service: result.data.service,
    hasEmail: Boolean(result.data.email),
    hasMessage: Boolean(result.data.message),
  });

  // Build WhatsApp URL
  const whatsappText = [
    `Olá! Gostaria de agendar um serviço na Novamec.`,
    ``,
    `*Nome:* ${result.data.name}`,
    `*Telefone:* ${result.data.phone}`,
    result.data.email ? `*E-mail:* ${result.data.email}` : null,
    `*Veículo:* ${result.data.vehicle}`,
    `*Serviço:* ${result.data.service}`,
    result.data.message ? `*Descrição:* ${result.data.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(whatsappText)}`;

  return {
    success: true,
    message:
      "Dados recebidos! Clique no botão abaixo para enviar pelo WhatsApp.",
    whatsappUrl,
  };
}
