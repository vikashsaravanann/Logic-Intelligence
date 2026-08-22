import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingElements from "@/components/FloatingElements";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Logic Intelligence Technologies Pvt. Ltd.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-32">
      <Navbar />
      <section className="py-20 px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-10">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-zinc-300">
          <p>Last updated: May 1, 2026</p>
          <p>At Logic Intelligence Technologies Pvt. Ltd., we take your privacy seriously. This policy describes what personal information we collect and how we use it.</p>
          
          <h3>1. Information We Collect</h3>
          <p>We collect information you provide directly to us when you fill out a contact form, request a quote, or apply for a job. This may include your name, email address, phone number, and project details.</p>
          
          <h3>2. How We Use Information</h3>
          <p>We use the information we collect to communicate with you, process your requests, and improve our services. We do not sell your personal data to third parties.</p>

          <h3>3. Data Security</h3>
          <p>We implement reasonable security measures to protect your personal information from unauthorized access or disclosure.</p>

          <h3>4. Contact Us</h3>
          <p>If you have any questions about this Privacy Policy, please contact us at startupwithvikashsaravanan@gmail.com.</p>
        </div>
      </section>
      <Footer />
      <FloatingElements />
    </main>
  );
}
