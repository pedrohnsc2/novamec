import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart, Eye, Shield, Users } from "lucide-react";
import { BUSINESS, TEAM, DIFFERENTIALS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sobre a NOVAMEC | Oficina Mecânica em Contagem-MG",
  description:
    "Conheça a NOVAMEC: oficina mecânica em Contagem com atendimento transparente, preço justo e equipe qualificada liderada pelo Vinícius.",
  alternates: {
    canonical: `${BUSINESS.url}/sobre`,
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
      name: "Sobre Nós",
      item: `${BUSINESS.url}/sobre`,
    },
  ],
};

const values = [
  {
    icon: Heart,
    title: "Honestidade",
    description:
      "Trabalhamos com ética e integridade em cada diagnóstico e serviço realizado.",
  },
  {
    icon: Eye,
    title: "Transparência",
    description:
      "Você sabe exatamente o que será feito no seu veículo e quanto vai custar.",
  },
  {
    icon: Shield,
    title: "Qualidade Técnica",
    description:
      "Utilizamos equipamentos profissionais e peças de qualidade comprovada.",
  },
  {
    icon: Users,
    title: "Respeito ao Cliente",
    description:
      "Cada cliente é tratado com atenção, cuidado e respeito, independente do serviço.",
  },
];

export default function SobrePage() {
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
            <span className="text-white">Sobre Nós</span>
          </nav>
          <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Conheça a <span className="text-secondary">Novamec</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            Uma oficina mecânica construída sobre confiança, transparência e
            paixão por carros.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl font-bold text-text">
                Nossa <span className="text-secondary">História</span>
              </h2>
              <div className="mt-6 space-y-4 text-text-light">
                <p>
                  A NOVAMEC nasceu da paixão do {BUSINESS.owner} pela mecânica
                  automotiva e do desejo de oferecer um serviço diferente:
                  transparente, honesto e com preço justo.
                </p>
                <p>
                  Localizada no bairro Três Barras, em Contagem-MG, a oficina se
                  consolidou como referência na região pela qualidade técnica e
                  pelo atendimento humano, onde cada cliente é tratado com
                  respeito e clareza sobre os serviços realizados.
                </p>
                <p>
                  Hoje, a Novamec atende veículos nacionais e importados de
                  todas as marcas, com equipamentos profissionais de diagnóstico
                  e uma equipe comprometida com a excelência.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/oficina.png"
                alt="Interior da oficina NOVAMEC com carros em manutenção"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision/Values */}
      <section className="bg-bg py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-border-light bg-white p-8">
              <h3 className="font-serif text-xl font-bold text-secondary">
                Missão
              </h3>
              <p className="mt-3 text-text-light">
                Oferecer serviços mecânicos de qualidade com transparência,
                honestidade e preço justo para todos os clientes.
              </p>
            </div>
            <div className="rounded-2xl border border-border-light bg-white p-8">
              <h3 className="font-serif text-xl font-bold text-secondary">
                Visão
              </h3>
              <p className="mt-3 text-text-light">
                Ser a oficina de referência em confiança e qualidade na região
                de Contagem e Belo Horizonte.
              </p>
            </div>
            <div className="rounded-2xl border border-border-light bg-white p-8 sm:col-span-2 lg:col-span-1">
              <h3 className="font-serif text-xl font-bold text-secondary">
                Valores
              </h3>
              <ul className="mt-3 space-y-2 text-text-light">
                <li>Honestidade</li>
                <li>Transparência</li>
                <li>Qualidade Técnica</li>
                <li>Respeito ao Cliente</li>
              </ul>
            </div>
          </div>

          {/* Values Detail */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border-light bg-white p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <value.icon className="h-6 w-6" />
                </div>
                <h4 className="font-serif font-bold text-text">
                  {value.title}
                </h4>
                <p className="mt-2 text-sm text-text-light">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-text sm:text-4xl">
            Nossa <span className="text-secondary">Equipe</span>
          </h2>
          <div className="mx-auto max-w-md">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="overflow-hidden rounded-2xl border border-border-light bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 448px, 100vw"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-serif text-xl font-bold text-text">
                    {member.name}
                  </h3>
                  <p className="text-secondary">{member.role}</p>
                  <p className="mt-3 text-sm text-text-light">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="bg-bg py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-text sm:text-4xl">
            Nossos <span className="text-secondary">Diferenciais</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DIFFERENTIALS.map((diff) => (
              <div
                key={diff.title}
                className="rounded-xl border border-border-light bg-white p-6 text-center transition-shadow hover:shadow-lg"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <span className="text-xl font-bold">
                    {diff.title.charAt(0)}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-text">
                  {diff.title}
                </h3>
                <p className="mt-2 text-sm text-text-light">
                  {diff.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
