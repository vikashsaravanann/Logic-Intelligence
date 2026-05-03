"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingElements from "@/components/FloatingElements";
import PortfolioSection from "@/components/PortfolioSection";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-20">
      <Navbar />
      <PortfolioSection />
      <Footer />
      <FloatingElements />
    </main>
  );
}
