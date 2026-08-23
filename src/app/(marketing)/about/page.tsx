import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FloatingElements from "@/components/FloatingElements";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Logic Intelligence Technologies Pvt. Ltd.",
  description: "Built in Coimbatore. Built for India. Built for the Future.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-32">
      <Navbar />
      
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">About Logic Intelligence Technologies Pvt. Ltd.</h1>
          <p className="text-xl text-primary font-bold tracking-widest uppercase">Built in Coimbatore. Built for India. Built for the Future.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Our Story</h2>
            <p className="text-zinc-300 leading-relaxed">
              Logic Intelligence Technologies Private Limited was founded in 2026 in Coimbatore, Tamil Nadu — the Manchester of South India.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              We started with one mission: to make premium, professional digital solutions accessible to every business in India — not just large corporations with massive budgets.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              Today we offer 18+ services including full stack web development, hotel websites, travel portals with quotation systems, custom software, game development, and digital marketing — all under one roof, all delivered with the same standard of excellence.
            </p>
            <p className="text-zinc-300 leading-relaxed font-bold">
              We are a registered Private Limited Company, operating with full transparency, legal compliance, and a genuine commitment to our clients' success.
            </p>
          </div>
          <div className="relative h-[400px] rounded-3xl overflow-hidden border border-white/10 glass-card">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 mix-blend-overlay" />
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Our Team" className="w-full h-full object-cover opacity-60" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-zinc-400">To transform every business idea into a powerful digital reality — on time, within budget, and beyond expectations.</p>
          </div>
          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-zinc-400">To become South India's most trusted technology partner for small and medium businesses — and to take Indian businesses global through technology.</p>
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Transparency", desc: "Honest pricing, honest timelines" },
              { title: "Quality", desc: "We don't ship work we're not proud of" },
              { title: "Innovation", desc: "We use the latest technology always" },
              { title: "Client First", desc: "Your success is our success" },
              { title: "Speed", desc: "Fast delivery without compromising quality" }
            ].map((v, i) => (
              <div key={i} className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl hover:bg-white/5 transition-colors">
                <h4 className="text-lg font-bold text-primary mb-2">{v.title}</h4>
                <p className="text-zinc-400 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="team" className="mb-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { role: "Founder & CEO", name: "Vikash Saravanan" },
              { role: "Lead Developer", name: "Join Us" },
              { role: "UI/UX Designer", name: "Join Us" },
              { role: "Customer Success", name: "Join Us" }
            ].map((member, i) => (
              <div key={i} className="space-y-4">
                <div className="w-32 h-32 mx-auto rounded-full bg-zinc-800 border-2 border-primary/30 flex items-center justify-center overflow-hidden">
                  <span className="text-4xl text-zinc-600">👤</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{member.name}</h4>
                  <p className="text-sm text-primary">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingElements />
    </main>
  );
}
