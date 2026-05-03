"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingElements from "@/components/FloatingElements";

export default function FAQPage() {
  const faqs = [
    {
      category: "GENERAL",
      questions: [
        { q: "Is Logic Intelligence Technologies a registered company?", a: "Yes — we are a registered Private Limited Company in India with full legal compliance." },
        { q: "Where are you located?", a: "We are based in Coimbatore, Tamil Nadu, India. We work with clients across India and internationally." },
        { q: "Do you work with clients outside Coimbatore?", a: "Yes — we work remotely with clients across Tamil Nadu, Kerala, all of India, and internationally via WhatsApp, email, and video calls." }
      ]
    },
    {
      category: "SERVICES",
      questions: [
        { q: "How long does a website take to build?", a: "5–7 days for starter websites, 10–15 days for pro websites, 4–12 weeks for software and apps." },
        { q: "Do you provide source code after completion?", a: "Yes — full source code ownership is transferred to you." },
        { q: "Can you redesign my existing website?", a: "Yes — we take your existing website and redesign it completely or partially." },
        { q: "Do you work with WordPress or only custom code?", a: "We do both — custom React/Node.js development for maximum flexibility, or WordPress for faster delivery and easy self-updates." }
      ]
    },
    {
      category: "PRICING & PAYMENT",
      questions: [
        { q: "What is your payment process?", a: "50% advance to start the project. 50% on final delivery before going live. We accept UPI, bank transfer, and Razorpay." },
        { q: "Do you offer EMI options?", a: "For projects above ₹25,000 we can discuss a staged payment plan." },
        { q: "Do you give refunds?", a: "We have a clear refund policy. If we have not started work, full refund. If work is in progress, partial refund. See our Refund Policy page for details." }
      ]
    },
    {
      category: "SUPPORT",
      questions: [
        { q: "What support do you provide after delivery?", a: "Every package includes free support: Starter: 1 month | Pro: 3 months | Enterprise: 6 months. After that, paid maintenance plans are available." }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-32">
      <Navbar />
      
      <section className="py-20 px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-zinc-400">Everything you need to know about working with us.</p>
        </div>

        <div className="space-y-16">
          {faqs.map((group, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-bold text-primary mb-6">{group.category}</h2>
              <div className="space-y-4">
                {group.questions.map((faq, i) => (
                  <div key={i} className="p-6 rounded-2xl glass-card bg-zinc-900/60 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                    <p className="text-zinc-400">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <FloatingElements />
    </main>
  );
}
