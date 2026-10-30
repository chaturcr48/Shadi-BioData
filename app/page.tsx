import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CategoryGrid } from "@/components/landing/CategoryGrid";
import { CtaBand } from "@/components/landing/CtaBand";
import { Faq } from "@/components/landing/Faq";
import { FeaturedTemplates } from "@/components/landing/FeaturedTemplates";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TrustStrip } from "@/components/landing/TrustStrip";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <TrustStrip />
        <CategoryGrid />
        <FeaturedTemplates />
        <HowItWorks />
        <Features />
        <CtaBand />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
