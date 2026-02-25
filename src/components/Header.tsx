"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Clock } from "lucide-react";
import { BUSINESS, NAV_LINKS } from "@/lib/constants";
import Logo from "./Logo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden bg-primary-dark text-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-sm">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="flex items-center gap-2 transition-colors hover:text-secondary"
            >
              <Phone className="h-3.5 w-3.5" />
              {BUSINESS.phoneDisplay}
            </a>
            <span className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              Seg–Sex: 08h às 18h
            </span>
          </div>
          <a
            href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-secondary px-4 py-1 text-xs font-semibold text-white transition-colors hover:bg-secondary-dark"
          >
            Agende pelo WhatsApp
          </a>
        </div>
      </div>

      {/* Main Nav */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 shadow-md backdrop-blur-sm"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" aria-label="Ir para a página inicial">
            <Logo className="h-10 w-auto sm:h-12" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-text transition-colors hover:text-secondary"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-secondary px-6 py-2.5 font-semibold text-white transition-colors hover:bg-secondary-dark"
            >
              Agendar Serviço
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-text transition-colors hover:bg-gray-100 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <Logo className="h-10 w-auto" />
              <button
                className="flex h-10 w-10 items-center justify-center rounded-lg text-text hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col px-6 pt-8" aria-label="Menu mobile">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="block border-b border-border-light py-4 text-lg font-medium text-text"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 space-y-4"
              >
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg bg-secondary py-3 text-center font-semibold text-white transition-colors hover:bg-secondary-dark"
                >
                  Agendar pelo WhatsApp
                </a>
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="block rounded-lg border-2 border-primary py-3 text-center font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  Ligar: {BUSINESS.phoneDisplay}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
