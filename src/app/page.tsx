import { HeroSection } from "@/components/home/HeroSection";
import { BrandIntroSection } from "@/components/home/BrandIntroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ProductShowcaseSection } from "@/components/home/ProductShowcaseSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ManufacturingSection } from "@/components/home/ManufacturingSection";
import { WhyVamshiSection } from "@/components/home/WhyVamshiSection";
import { QualitySection } from "@/components/home/QualitySection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { ClientTrustSection } from "@/components/home/ClientTrustSection";
import { FinalCta } from "@/components/FinalCta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandIntroSection />
      <ServicesSection />
      <ProductShowcaseSection />
      <StatsSection />
      <ManufacturingSection />
      <WhyVamshiSection />
      <QualitySection />
      <IndustriesSection />
      <ClientTrustSection />
      <FinalCta />
    </>
  );
}
