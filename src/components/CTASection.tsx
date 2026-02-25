"use client";

import { Phone, MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";

export default function CTASection() {
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-accent to-primary-dark py-16 lg:py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-secondary blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <AnimatedSection>
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Seu carro precisa de{" "}
            <span className="text-secondary">atenção</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300">
            Agende uma avaliação sem compromisso. Nossa equipe está pronta para
            cuidar do seu veículo com transparência e qualidade.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-8 py-4 font-semibold text-white transition-colors hover:bg-secondary-dark sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" />
              Agendar pelo WhatsApp
            </a>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-8 py-4 font-semibold text-white transition-colors hover:border-white hover:bg-white/10 sm:w-auto"
            >
              <Phone className="h-5 w-5" />
              Ligar Agora
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
