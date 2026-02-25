import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  phone: z
    .string()
    .min(10, "Telefone inválido")
    .max(15, "Telefone inválido"),
  email: z
    .string()
    .email("E-mail inválido")
    .optional()
    .or(z.literal("")),
  vehicle: z
    .string()
    .min(3, "Informe o veículo (marca/modelo/ano)")
    .max(100, "Informação do veículo muito longa"),
  service: z.string().min(1, "Selecione o serviço desejado"),
  message: z
    .string()
    .max(500, "Mensagem muito longa (máx. 500 caracteres)")
    .optional()
    .or(z.literal("")),
  honeypot: z.string().max(0, ""),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof ContactFormData, string[]>>;
  whatsappUrl?: string;
};
