import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidade | NOVAMEC Oficina Mecânica",
  description:
    "Política de privacidade da NOVAMEC Oficina Mecânica, em conformidade com a LGPD.",
  alternates: {
    canonical: `${BUSINESS.url}/politica-de-privacidade`,
  },
};

export default function PoliticaDePrivacidadePage() {
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
        name: "Política de Privacidade",
        item: `${BUSINESS.url}/politica-de-privacidade`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark to-accent py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="transition-colors hover:text-white">
              Início
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Política de Privacidade</span>
          </nav>
          <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Política de Privacidade
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-gray max-w-none space-y-6 text-text-light [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-text [&_h3]:font-serif [&_h3]:font-bold [&_h3]:text-text">
            <p className="text-sm text-text-lighter">
              Última atualização: Fevereiro de 2026
            </p>

            <p>
              A <strong>{BUSINESS.name}</strong>, inscrita com endereço em{" "}
              {BUSINESS.address.full}, leva a sua privacidade a sério e se
              compromete com a proteção dos dados pessoais de seus clientes e
              visitantes, em conformidade com a Lei Geral de Proteção de Dados
              (LGPD — Lei nº 13.709/2018).
            </p>

            <h2>1. Dados Coletados</h2>
            <p>
              Coletamos os seguintes dados pessoais quando você utiliza nosso
              formulário de contato:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Nome completo</li>
              <li>Telefone / WhatsApp</li>
              <li>E-mail (opcional)</li>
              <li>Informações do veículo (marca, modelo e ano)</li>
              <li>Descrição do serviço desejado</li>
            </ul>

            <h2>2. Finalidade do Tratamento</h2>
            <p>
              Os dados coletados são utilizados exclusivamente para:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Responder solicitações de orçamento e agendamento</li>
              <li>Entrar em contato sobre serviços solicitados</li>
              <li>Melhorar nosso atendimento e serviços</li>
            </ul>

            <h2>3. Compartilhamento de Dados</h2>
            <p>
              Não compartilhamos, vendemos ou alugamos seus dados pessoais a
              terceiros, exceto quando necessário para o cumprimento de
              obrigação legal.
            </p>

            <h2>4. Armazenamento e Segurança</h2>
            <p>
              Seus dados são tratados com segurança, utilizando medidas técnicas
              e administrativas adequadas para proteger contra acesso não
              autorizado, perda ou destruição.
            </p>

            <h2>5. Seus Direitos</h2>
            <p>
              Em conformidade com a LGPD, você tem direito a:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Confirmar a existência de tratamento de seus dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Solicitar a correção de dados incompletos ou desatualizados</li>
              <li>Solicitar a exclusão de seus dados pessoais</li>
              <li>Revogar o consentimento a qualquer momento</li>
            </ul>

            <h2>6. Cookies e Tecnologias</h2>
            <p>
              Utilizamos ferramentas de análise (Vercel Analytics) para
              compreender o uso do site. Essas ferramentas podem coletar dados
              anônimos de navegação, como páginas visitadas e tempo de
              permanência. Nenhum dado pessoal identificável é coletado por
              essas ferramentas.
            </p>

            <h2>7. Contato</h2>
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre esta
              política, entre em contato:
            </p>
            <ul className="list-none space-y-1 pl-0">
              <li>
                <strong>E-mail:</strong>{" "}
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="text-secondary hover:underline"
                >
                  {BUSINESS.email}
                </a>
              </li>
              <li>
                <strong>Telefone:</strong>{" "}
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="text-secondary hover:underline"
                >
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li>
                <strong>Endereço:</strong> {BUSINESS.address.full}
              </li>
            </ul>

            <h2>8. Alterações nesta Política</h2>
            <p>
              Esta política poderá ser atualizada periodicamente. Recomendamos
              que visite esta página regularmente para se manter informado sobre
              como protegemos seus dados.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
