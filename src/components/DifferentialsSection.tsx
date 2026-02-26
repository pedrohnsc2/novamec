"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Search, BadgeDollarSign, Star, Car } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DIFFERENTIALS } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";

const iconMap: Record<string, LucideIcon> = {
  Search,
  BadgeDollarSign,
  Star,
  Car,
};

function DifferentialItem({
  diff,
}: {
  diff: (typeof DIFFERENTIALS)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "-80px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Icon = iconMap[diff.icon];

  return (
    <div
      ref={ref}
      className="flex gap-4"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(30px)",
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
      }}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
        {Icon && <Icon className="h-6 w-6" />}
      </div>
      <div>
        <h3 className="font-serif text-lg font-bold text-text">
          {diff.title}
        </h3>
        <p className="mt-1 text-sm text-text-light">{diff.description}</p>
      </div>
    </div>
  );
}

export default function DifferentialsSection() {
  return (
    <section aria-labelledby="diferenciais-heading" className="bg-bg py-12 lg:py-20">
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
              <h2 id="diferenciais-heading" className="font-serif text-3xl font-bold text-text sm:text-4xl">
                Por que escolher a{" "}
                <span className="text-secondary">Novamec</span> em Contagem?
              </h2>
              <p className="mt-4 text-text-light">
                Nosso compromisso é oferecer um atendimento transparente, com
                qualidade técnica e preço justo para cada cliente.
              </p>
            </AnimatedSection>

            <div className="mt-8 space-y-6">
              {DIFFERENTIALS.map((diff) => (
                <DifferentialItem key={diff.title} diff={diff} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
