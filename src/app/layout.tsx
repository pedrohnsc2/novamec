import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { BUSINESS } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";
import { headers } from "next/headers";

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

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const isValidGaId = GA_MEASUREMENT_ID && /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID);

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default:
      "NOVAMEC | Oficina Mecânica de Confiança em Contagem-MG",
    template: "%s | NOVAMEC Oficina Mecânica",
  },
  description:
    "Oficina mecânica em Contagem-MG. Revisão completa, mecânica geral para carros nacionais e importados. ⭐ 4.9 no Google. Agende pelo WhatsApp!",
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    title:
      "NOVAMEC | Oficina Mecânica de Confiança em Contagem-MG",
    description:
      "Oficina mecânica em Contagem-MG. Revisão completa, mecânica geral para carros nacionais e importados. 4.9 no Google.",
    images: [
      {
        url: "/images/fachada-porsche.png",
        width: 1200,
        height: 630,
        alt: "NOVAMEC Oficina Mecânica - Fachada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVAMEC | Oficina Mecânica de Confiança em Contagem-MG",
    description: "Oficina mecânica em Contagem-MG. Revisão completa, mecânica geral para carros nacionais e importados. 4.9 no Google.",
    images: ["/images/fachada-porsche.png"],
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
  priceRange: "$$",
  areaServed: [
    "Contagem",
    "Belo Horizonte",
    "Betim",
    "Região Metropolitana de BH",
  ],
  sameAs: [BUSINESS.social.instagram],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const nonce = headersList.get("x-csp-nonce") ?? "";

  return (
    <html lang="pt-BR" id="top">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {isValidGaId && (
          <>
            <Script
              nonce={nonce}
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script nonce={nonce} id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${dmSans.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-secondary focus:px-6 focus:py-3 focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
