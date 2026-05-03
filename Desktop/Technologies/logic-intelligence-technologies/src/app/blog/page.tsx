"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingElements from "@/components/FloatingElements";
import BlogSection from "@/components/BlogSection";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-20">
      <Navbar />
      <BlogSection />
      <Footer />
      <FloatingElements />
    </main>
  );
}
