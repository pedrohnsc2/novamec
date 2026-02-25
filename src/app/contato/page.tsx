import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Phone, Mail, MapPin, Clock, Instagram } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contato e Agendamento | NOVAMEC Oficina Mecânica Contagem",
  description:
    "Agende sua revisão ou mecânica na NOVAMEC em Contagem-MG. WhatsApp, telefone e formulário online. Seg-Sex 08h–18h. Três Barras.",
  alternates: {
    canonical: `${BUSINESS.url}/contato`,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Início",
      item: BUSINESS.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contato",
      item: `${BUSINESS.url}/contato`,
    },
  ],
};

export default function ContatoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark to-accent py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="transition-colors hover:text-white">
              Início
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Contato</span>
          </nav>
          <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Fale <span className="text-secondary">Conosco</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            Agende um serviço, tire dúvidas ou solicite um orçamento. Estamos
            prontos para atender você.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-bg py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:col-span-2">
              {/* WhatsApp */}
              <div className="rounded-2xl border border-border-light bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-serif text-lg font-bold text-text">
                  Atendimento Rápido
                </h3>
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-whatsapp px-6 py-3 font-semibold text-white transition-colors hover:bg-green-600"
                >
                  WhatsApp: {BUSINESS.whatsappDisplay}
                </a>
              </div>

              {/* Contact Info */}
              <div className="rounded-2xl border border-border-light bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-serif text-lg font-bold text-text">
                  Informações de Contato
                </h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href={`tel:${BUSINESS.phone}`}
                      className="flex items-start gap-3 text-text-light transition-colors hover:text-secondary"
                    >
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                      <div>
                        <p className="font-medium text-text">Telefone</p>
                        <p>{BUSINESS.phoneDisplay}</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${BUSINESS.email}`}
                      className="flex items-start gap-3 text-text-light transition-colors hover:text-secondary"
                    >
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                      <div>
                        <p className="font-medium text-text">E-mail</p>
                        <p>{BUSINESS.email}</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href={BUSINESS.maps.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 text-text-light transition-colors hover:text-secondary"
                    >
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                      <div>
                        <p className="font-medium text-text">Endereço</p>
                        <p>{BUSINESS.address.full}</p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-text-light">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                    <div>
                      <p className="font-medium text-text">Horário</p>
                      {BUSINESS.hours.map((h) => (
                        <p key={h.day}>
                          {h.day}: {h.time}
                        </p>
                      ))}
                    </div>
                  </li>
                  <li>
                    <a
                      href={BUSINESS.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 text-text-light transition-colors hover:text-secondary"
                    >
                      <Instagram className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                      <div>
                        <p className="font-medium text-text">Instagram</p>
                        <p>@oficinanovamec</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Map */}
              <div className="overflow-hidden rounded-2xl border border-border-light shadow-sm">
                <iframe
                  src={BUSINESS.maps.embedUrl}
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da NOVAMEC Oficina Mecânica"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
