import { HomeHero } from "@/components/hero/home-hero";
import { AdvantageSection } from "@/components/home/advantage-section";
import { CompanyShowcase } from "@/components/home/company-showcase";
import { HowWeWorkSection } from "@/components/home/how-we-work";
import { PortfolioSection } from "@/components/home/portfolio";

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <AdvantageSection />
      <CompanyShowcase />
      <HowWeWorkSection />
      <PortfolioSection />
    </main>
  );
}
