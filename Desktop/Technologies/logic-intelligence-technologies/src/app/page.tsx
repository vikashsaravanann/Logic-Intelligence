import Navbar from "@/components/navbar";
import HeroSection from "@/components/HeroSection";
import TechStackMarqueeSection from "@/components/TechStackMarqueeSection";
import CredentialsStripSection from "@/components/CredentialsStripSection";
import ServicesSection from "@/components/ServicesSection";
import PackagesSection from "@/components/PackagesSection";
import WhyUsSection from "@/components/WhyUsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import AboutSection from "@/components/AboutSection";
import FreeDemoCTA from "@/components/FreeDemoCTA";
import ContactSection from "@/components/ContactSection";
import TrustBadgesSection from "@/components/TrustBadgesSection";
import Footer from "@/components/footer";
import FloatingElements from "@/components/FloatingElements";
import LiveChatWidget from "@/components/LiveChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white">
      <Navbar />
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Tech Stack Marquee */}
      <TechStackMarqueeSection />

      {/* 3. Credentials Strip */}
      <CredentialsStripSection />

      {/* 4. Architecture / Why Us */}
      <WhyUsSection />

      {/* 5. Services Section */}
      <ServicesSection />

      {/* 6. Packages Section */}
      <PackagesSection />

      {/* 7. How It Works Roadmap */}
      <HowItWorksSection />

      {/* 8. About Section */}
      <AboutSection />

      {/* 9. Free Demo CTA */}
      <FreeDemoCTA />

      {/* 10. Contact Section */}
      <ContactSection />

      {/* 11. Trust Badges */}
      <TrustBadgesSection />

      {/* 12. Footer */}
      <Footer />

      {/* Floating Elements */}
      <FloatingElements />
      
      {/* Live Chat */}
      <LiveChatWidget />
    </main>
  );
}
