"use client";

import { MapPin, Clock, Navigation } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";

export default function ConvenienceSection() {
  return (
    <section aria-labelledby="localizacao-heading" className="bg-bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection className="mb-12 text-center">
          <h2 id="localizacao-heading" className="font-serif text-3xl font-bold text-text sm:text-4xl">
            Localização da <span className="text-secondary">NOVAMEC</span> em Contagem
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-light">
            Estamos no bairro Três Barras, em Contagem-MG. Fácil acesso pela
            região metropolitana de Belo Horizonte.
          </p>
        </AnimatedSection>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Map */}
          <AnimatedSection className="lg:col-span-3">
            <div className="aspect-[16/10] overflow-hidden rounded-2xl shadow-lg">
              <iframe
                src={BUSINESS.maps.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da NOVAMEC Oficina Mecânica no Google Maps"
              />
            </div>
          </AnimatedSection>

          {/* Info Cards */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <AnimatedSection delay={0.1}>
              <div className="rounded-xl border border-border-light bg-white p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif font-bold text-text">Endereço</h3>
                </div>
                <p className="text-sm text-text-light">
                  {BUSINESS.address.street}
                </p>
                <p className="text-sm text-text-light">
                  {BUSINESS.address.neighborhood}, {BUSINESS.address.city} –{" "}
                  {BUSINESS.address.state}
                </p>
                <p className="text-sm text-text-light">
                  CEP: {BUSINESS.address.zip}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="rounded-xl border border-border-light bg-white p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif font-bold text-text">Horário</h3>
                </div>
                {BUSINESS.hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex justify-between text-sm text-text-light"
                  >
                    <span>{h.day}</span>
                    <span className="font-medium">{h.time}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <a
                href={BUSINESS.maps.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-3.5 font-semibold text-white transition-colors hover:bg-secondary-dark"
              >
                <Navigation className="h-5 w-5" />
                Abrir no Google Maps
              </a>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
