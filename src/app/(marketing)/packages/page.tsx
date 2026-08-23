"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FloatingElements from "@/components/FloatingElements";
import PackagesSection from "@/features/home/components/packages-section";

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
