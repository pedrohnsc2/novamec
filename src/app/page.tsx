import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";

const DifferentialsSection = dynamic(() => import("@/components/DifferentialsSection"));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));
const CTASection = dynamic(() => import("@/components/CTASection"));
const ConvenienceSection = dynamic(() => import("@/components/ConvenienceSection"));

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <DifferentialsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <ConvenienceSection />
    </>
  );
}
