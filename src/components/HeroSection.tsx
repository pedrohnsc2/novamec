"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { BUSINESS } from "@/lib/constants";

export default function HeroSection() {
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-accent">
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
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm"
            >
              <Star className="h-4 w-4 fill-secondary text-secondary" />
              <span>
                {BUSINESS.rating.value} no Google · {BUSINESS.rating.count}+
                avaliações
              </span>
            </motion.div>

            <h1 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Mecânica e Revisão de{" "}
              <span className="text-secondary">Confiança</span> em Contagem
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-300">
              Transparência no diagnóstico, qualidade no serviço e preço justo.
              Cuidamos do seu carro nacional ou importado com a dedicação que
              ele merece.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-secondary px-8 py-3.5 font-semibold text-white transition-colors hover:bg-secondary-dark"
              >
                Agendar pelo WhatsApp
              </a>
              <a
                href="/#servicos"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-8 py-3.5 font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Nossos Serviços
              </a>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
