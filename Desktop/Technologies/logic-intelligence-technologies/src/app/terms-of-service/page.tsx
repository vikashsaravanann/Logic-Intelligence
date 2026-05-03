import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingElements from "@/components/FloatingElements";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Logic Intelligence Technologies Pvt. Ltd.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-32">
      <Navbar />
      <section className="py-20 px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-10">Terms of Service</h1>
        <div className="prose prose-invert max-w-none text-zinc-300">
          <p>Last updated: May 1, 2026</p>
          
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing or using the services provided by Logic Intelligence Technologies Pvt. Ltd., you agree to be bound by these Terms of Service.</p>
          
          <h3>2. Payment Terms</h3>
          <p>For most projects, we require a 50% advance payment to commence work. The remaining 50% is due upon project completion, prior to the final deployment or handover of source code.</p>

          <h3>3. Intellectual Property</h3>
          <p>Upon full payment, full ownership of the source code and intellectual property for custom software and websites is transferred to the client, unless otherwise specified in a separate agreement.</p>

          <h3>4. Refunds</h3>
          <p>Refunds are handled according to our Refund Policy. If work has not commenced, a full refund may be issued. Once work has started, partial refunds are determined on a case-by-case basis depending on the completed milestones.</p>

          <h3>5. Limitation of Liability</h3>
          <p>Logic Intelligence Technologies Pvt. Ltd. shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of or inability to use our services.</p>
        </div>
      </section>
      <Footer />
      <FloatingElements />
    </main>
  );
}
