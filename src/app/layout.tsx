import type { Metadata } from "next";
import { DM_Sans, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { BUSINESS } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default:
      "NOVAMEC Oficina Mecânica em Contagem | Revisão e Mecânica de Confiança",
    template: "%s | NOVAMEC Oficina Mecânica",
  },
  description:
    "Oficina mecânica em Contagem-MG. Revisão completa, mecânica geral para carros nacionais e importados. ⭐ 4.9 no Google. Agende pelo WhatsApp!",
  keywords: [
    "oficina mecânica Contagem",
    "mecânico Contagem MG",
    "revisão automotiva Contagem",
    "oficina mecânica Três Barras Contagem",
    "mecânica de confiança Contagem",
    "mecânico carros importados Contagem",
    "melhor oficina mecânica Contagem",
  ],
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    title:
      "NOVAMEC Oficina Mecânica em Contagem | Revisão e Mecânica de Confiança",
    description:
      "Oficina mecânica em Contagem-MG. Revisão completa, mecânica geral para carros nacionais e importados. ⭐ 4.9 no Google.",
    images: [
      {
        url: "/images/fachada-porsche.png",
        width: 1200,
        height: 630,
        alt: "NOVAMEC Oficina Mecânica - Fachada",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BUSINESS.url,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: BUSINESS.name,
  image: `${BUSINESS.url}/images/fachada-porsche.png`,
  url: BUSINESS.url,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.state,
    postalCode: BUSINESS.address.zip,
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.geo.latitude,
    longitude: BUSINESS.geo.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(BUSINESS.rating.value),
    reviewCount: String(BUSINESS.rating.count),
  },
  priceRange: "$",
  areaServed: [
    "Contagem",
    "Belo Horizonte",
    "Betim",
    "Região Metropolitana de BH",
  ],
  sameAs: [BUSINESS.social.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
