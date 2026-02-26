"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/gtag";

export default function HeroSection() {
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    // Small delay to trigger entrance animation after mount
    const timer = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-accent"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/fachada-porsche.png"
          alt="Fachada da NOVAMEC Oficina Mecânica com Porsche 911"
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-accent/90 via-primary-dark/80 to-primary/70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
            }}
          >
            {/* Badge */}
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(-10px)",
                transition:
                  "opacity 0.5s ease-out 0.3s, transform 0.5s ease-out 0.3s",
              }}
            >
              <Star className="h-4 w-4 fill-secondary text-secondary" />
              <span>
                {BUSINESS.rating.value} no Google · {BUSINESS.rating.count}+
                avaliações
              </span>
            </div>

            <h1 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Mecânica e Revisão de{" "}
              <span className="text-secondary">Confiança</span> em Contagem
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-300">
              Transparência no diagnóstico, qualidade no serviço e preço justo.
              Cuidamos do seu carro nacional ou importado com a dedicação que
              ele merece.
            </p>

            <div className="mt-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("hero_cta")}
                className="inline-flex items-center justify-center rounded-lg bg-secondary px-8 py-3.5 font-semibold text-white transition-colors hover:bg-secondary-dark"
              >
                Agendar pelo WhatsApp
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className="hidden lg:block"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(30px)",
              transition:
                "opacity 0.7s ease-out 0.2s, transform 0.7s ease-out 0.2s",
            }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/fachada-porsche.png"
                alt="Fachada da oficina NOVAMEC com Porsche 911 preto estacionado na frente"
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
