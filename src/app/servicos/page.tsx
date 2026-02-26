import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ClipboardCheck,
  Wrench,
  CircleDot,
  Cpu,
  Thermometer,
  Droplets,
  Cog,
  Zap,
  Target,
  Circle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BUSINESS, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Serviços de Mecânica Automotiva em Contagem | NOVAMEC",
  description:
    "Conheça todos os serviços da NOVAMEC: revisão automotiva, mecânica geral, suspensão, freios, injeção eletrônica, correia dentada, elétrica, alinhamento e mais.",
  alternates: {
    canonical: `${BUSINESS.url}/servicos`,
  },
  openGraph: {
    title: "Serviços de Mecânica Automotiva em Contagem | NOVAMEC",
    description:
      "Revisão automotiva, mecânica geral, suspensão, freios, injeção eletrônica e mais na NOVAMEC em Contagem-MG.",
    url: `${BUSINESS.url}/servicos`,
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
      name: "Serviços",
      item: `${BUSINESS.url}/servicos`,
    },
  ],
};

const iconMap: Record<string, LucideIcon> = {
  ClipboardCheck,
  Wrench,
  CircleDot,
  Cpu,
  Thermometer,
  Droplets,
  Cog,
  Zap,
  Target,
  Circle,
};

export default function ServicosPage() {
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
            <span className="text-white">Serviços</span>
          </nav>
          <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Serviços de{" "}
            <span className="text-secondary">Mecânica Automotiva</span> em Contagem
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            Atendemos veículos nacionais e importados com diagnóstico preciso,
            peças de qualidade e preço justo.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon];
              const hasImage = "image" in service && service.image;

              return (
                <div
                  key={service.id}
                  className="group overflow-hidden rounded-xl border border-border-light bg-white p-6 transition-shadow duration-300 hover:shadow-lg"
                >
                  {hasImage && (
                    <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={service.image as string}
                        alt={`${service.title} na oficina NOVAMEC em Contagem`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                  )}
                  {!hasImage && Icon && (
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-bg text-text-light transition-colors group-hover:bg-secondary/10 group-hover:text-secondary">
                      <Icon className="h-6 w-6" />
                    </div>
                  )}
                  <h3 className="font-serif text-lg font-bold text-text">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-light">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg py-12 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-2xl font-bold text-text sm:text-3xl">
            Precisa de um desses serviços?
          </h2>
          <p className="mt-4 text-text-light">
            Agende pelo WhatsApp ou entre em contato. Fazemos orçamento sem
            compromisso.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-whatsapp px-6 py-3 font-semibold text-white transition-colors hover:bg-green-600"
            >
              Agendar pelo WhatsApp
            </a>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 rounded-lg border border-secondary px-6 py-3 font-semibold text-secondary transition-colors hover:bg-secondary hover:text-white"
            >
              Formulário de Contato
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
