import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Star } from "lucide-react";
import { BUSINESS, SERVICES, NAV_LINKS } from "@/lib/constants";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <Logo variant="dark" className="mb-4 h-10 w-auto" />
            <p className="text-sm leading-relaxed text-gray-400">
              {BUSINESS.tagline}
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={BUSINESS.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Novamec"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-secondary"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
            <a
              href={BUSINESS.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-secondary hover:text-white"
            >
              <Star className="h-4 w-4 fill-secondary text-secondary" />
              Avalie-nos no Google
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-serif text-sm font-bold uppercase tracking-wider text-white">
              Serviços
            </h3>
            <ul className="space-y-2">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href="/servicos"
                    className="text-sm text-gray-400 transition-colors hover:text-secondary"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-serif text-sm font-bold uppercase tracking-wider text-white">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="text-sm text-gray-400 transition-colors hover:text-secondary"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-serif text-sm font-bold uppercase tracking-wider text-white">
              Contato
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="flex items-start gap-2 text-sm text-gray-400 transition-colors hover:text-secondary"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="flex items-start gap-2 text-sm text-gray-400 transition-colors hover:text-secondary"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  {BUSINESS.email}
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.maps.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-gray-400 transition-colors hover:text-secondary"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  {BUSINESS.address.full}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  {BUSINESS.hours.map((h) => (
                    <div key={h.day}>
                      {h.day}: {h.time}
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-gray-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {BUSINESS.name}. Todos os direitos
            reservados.
          </p>
          <p>CNPJ: 23.619.120/0001-77</p>
        </div>
      </div>
    </footer>
  );
}
