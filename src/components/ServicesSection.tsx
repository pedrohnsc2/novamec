"use client";

import Image from "next/image";
import {
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
import { motion } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";

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

const highlightedServices = ["revisao", "alinhamento", "balanceamento"];

export default function ServicesSection() {
  return (
    <section id="servicos" className="bg-bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">
            Nossos <span className="text-secondary">Serviços</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-light">
            Atendemos veículos nacionais e importados com diagnóstico preciso e
            peças de qualidade. Confira nossos serviços.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon];
            const isHighlighted = highlightedServices.includes(service.id);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className={`group relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  isHighlighted
                    ? "border-secondary/30 bg-gradient-to-br from-secondary/5 to-transparent"
                    : "border-border-light bg-white"
                }`}
              >
                {isHighlighted && (
                  <span className="absolute right-3 top-3 rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-semibold text-secondary">
                    Destaque
                  </span>
                )}
                {"image" in service && service.image && (
                  <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                )}
                {!("image" in service && service.image) && (
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                      isHighlighted
                        ? "bg-secondary/10 text-secondary"
                        : "bg-bg text-text-light group-hover:bg-secondary/10 group-hover:text-secondary"
                    }`}
                  >
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                )}
                <h3 className="font-serif text-lg font-bold text-text">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-light">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
