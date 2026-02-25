"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="bg-bg py-12 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-6">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">
            Perguntas <span className="text-secondary">Frequentes</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-light">
            Tire suas dúvidas sobre nossos serviços, horários e formas de
            pagamento.
          </p>
        </AnimatedSection>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.05}>
              <div className="overflow-hidden rounded-xl border border-border-light bg-white">
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-bg"
                  aria-expanded={openIndex === index}
                >
                  <span className="pr-4 font-serif font-semibold text-text">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-text-light" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="border-t border-border-light px-6 py-4 text-sm leading-relaxed text-text-light">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
