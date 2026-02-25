"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS, BUSINESS } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  return (
    <section className="bg-bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">
            O que nossos <span className="text-secondary">clientes</span> dizem
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-light">
            {BUSINESS.rating.value} estrelas no Google com{" "}
            {BUSINESS.rating.count}+ avaliações reais de clientes satisfeitos.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="relative overflow-hidden rounded-2xl border border-border-light bg-white p-8 shadow-sm sm:p-12">
            <Quote className="absolute right-6 top-6 h-12 w-12 text-secondary/10" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: TESTIMONIALS[current].rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-secondary text-secondary"
                      />
                    )
                  )}
                </div>

                {/* Text */}
                <blockquote className="text-lg leading-relaxed text-text sm:text-xl">
                  &ldquo;{TESTIMONIALS[current].text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 font-serif font-bold text-secondary">
                    {TESTIMONIALS[current].name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-text">
                      {TESTIMONIALS[current].name}
                    </p>
                    <p className="text-sm text-text-light">
                      {TESTIMONIALS[current].service}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === current
                        ? "w-8 bg-secondary"
                        : "w-2.5 bg-border hover:bg-text-lighter"
                    }`}
                    aria-label={`Ver depoimento ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-light transition-colors hover:border-secondary hover:text-secondary"
                  aria-label="Depoimento anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-light transition-colors hover:border-secondary hover:text-secondary"
                  aria-label="Próximo depoimento"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
