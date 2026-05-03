import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactSection from "@/components/ContactSection";
import FloatingElements from "@/components/FloatingElements";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Logic Intelligence Technologies Pvt. Ltd.",
  description: "Get in touch with Logic Intelligence Technologies. We respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-20">
      <Navbar />
      <ContactSection />
      <Footer />
      <FloatingElements />
    </main>
  );
}
