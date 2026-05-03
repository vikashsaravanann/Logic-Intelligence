import Navbar from "@/components/navbar";
import HeroSection from "@/components/HeroSection";
import ClientsMarqueeSection from "@/components/ClientsMarqueeSection";
import LiveStatsSection from "@/components/LiveStatsSection";
import ServicesSection from "@/components/ServicesSection";
import CalculatorSection from "@/components/CalculatorSection";
import PackagesSection from "@/components/PackagesSection";
import PortfolioSection from "@/components/PortfolioSection";
import WhyUsSection from "@/components/WhyUsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import AboutSection from "@/components/AboutSection";
import FreeDemoCTA from "@/components/FreeDemoCTA";
import ContactSection from "@/components/ContactSection";
import TrustBadgesSection from "@/components/TrustBadgesSection";
import Footer from "@/components/footer";
import FloatingElements from "@/components/FloatingElements";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white">
      <Navbar />
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Marquee */}
      <ClientsMarqueeSection />

      {/* 3. Live Stats */}
      <LiveStatsSection />

      {/* 4. Services Section */}
      <ServicesSection />

      {/* 5. Calculator Section */}
      <CalculatorSection />

      {/* 6. Packages Section */}
      <PackagesSection />

      {/* 7. Portfolio Section */}
      <PortfolioSection />

      {/* 8. Why Us */}
      <WhyUsSection />

      {/* 9. How It Works */}
      <HowItWorksSection />

      {/* 10. Testimonials */}
      <TestimonialsSection />

      {/* 11. Blog */}
      <BlogSection />

      {/* 12. About Section */}
      <AboutSection />

      {/* 13. Free Demo CTA */}
      <FreeDemoCTA />

      {/* 14. Contact Section */}
      <ContactSection />

      {/* 15. Trust Badges */}
      <TrustBadgesSection />

      {/* 16. Footer */}
      <Footer />

      {/* Floating Elements */}
      <FloatingElements />
    </main>
  );
}
