"use client";

import Image from "next/image";
import { Search, BadgeDollarSign, Star, Car } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { DIFFERENTIALS } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";

const iconMap: Record<string, LucideIcon> = {
  Search,
  BadgeDollarSign,
  Star,
  Car,
};

export default function DifferentialsSection() {
  return (
    <section className="bg-bg py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <AnimatedSection>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/mecanico-checklist.png"
                alt="Vinícius fazendo checklist de revisão em Hyundai HB20 na oficina Novamec"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </AnimatedSection>

          {/* Content */}
          <div>
            <AnimatedSection>
              <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">
                Por que escolher a{" "}
                <span className="text-secondary">Novamec</span>?
              </h2>
              <p className="mt-4 text-text-light">
                Nosso compromisso é oferecer um atendimento transparente, com
                qualidade técnica e preço justo para cada cliente.
              </p>
            </AnimatedSection>

            <div className="mt-8 space-y-6">
              {DIFFERENTIALS.map((diff, index) => {
                const Icon = iconMap[diff.icon];
                return (
                  <motion.div
                    key={diff.title}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                      {Icon && <Icon className="h-6 w-6" />}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-text">
                        {diff.title}
                      </h3>
                      <p className="mt-1 text-sm text-text-light">
                        {diff.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
