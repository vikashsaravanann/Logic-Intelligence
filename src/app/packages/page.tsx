"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingElements from "@/components/FloatingElements";
import PackagesSection from "@/components/PackagesSection";

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-20">
      <Navbar />
      <PackagesSection />
      <Footer />
      <FloatingElements />
    </main>
  );
}
