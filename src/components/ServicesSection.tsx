import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";

const featuredServices = SERVICES.filter(
  (s) => "image" in s && s.image
);

export default function ServicesSection() {
  return (
    <section id="servicos" aria-labelledby="servicos-heading" className="bg-bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection className="mb-12 text-center">
          <h2 id="servicos-heading" className="font-serif text-3xl font-bold text-text sm:text-4xl">
            Serviços de <span className="text-secondary">Mecânica</span> em Contagem
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-light">
            Atendemos veículos nacionais e importados com diagnóstico preciso e
            peças de qualidade. Confira nossos serviços em destaque.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-xl border border-border-light bg-white p-6 transition-shadow duration-300 hover:shadow-lg"
            >
              {"image" in service && service.image && (
                <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={service.image}
                    alt={`Serviço de ${service.title} na oficina NOVAMEC em Contagem`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              )}
              <h3 className="font-serif text-lg font-bold text-text">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-light">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/servicos"
            className="inline-flex items-center gap-2 font-semibold text-secondary transition-colors hover:text-secondary-dark"
          >
            Ver todos os serviços &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
