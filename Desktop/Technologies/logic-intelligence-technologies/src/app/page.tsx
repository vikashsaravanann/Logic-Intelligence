import Navbar from "@/components/navbar";
import HeroSection from "@/components/HeroSection";
import TechStackMarqueeSection from "@/components/TechStackMarqueeSection";
import CredentialsStripSection from "@/components/CredentialsStripSection";
import PackagesSection from "@/components/PackagesSection";
import WhyUsSection from "@/components/WhyUsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import AboutSection from "@/components/AboutSection";
import FreeDemoCTA from "@/components/FreeDemoCTA";
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

      {/* 5. Packages Section */}
      <PackagesSection />

      {/* 6. How It Works Roadmap */}
      <HowItWorksSection />

      {/* 7. About Section */}
      <AboutSection />

      {/* 8. Free Demo CTA */}
      <FreeDemoCTA />

      {/* 9. Trust Badges */}
      <TrustBadgesSection />

      {/* 10. Footer */}
      <Footer />

      {/* Floating Elements */}
      <FloatingElements />
      
      {/* Live Chat */}
      <LiveChatWidget />
    </main>
  );
}
