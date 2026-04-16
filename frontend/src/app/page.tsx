import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/features/landing/HeroSection";
import { FeaturesSection } from "@/components/features/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/features/landing/HowItWorksSection";
import { CTASection } from "@/components/features/landing/CTASection";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
