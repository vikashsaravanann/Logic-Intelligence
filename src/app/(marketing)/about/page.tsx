import { Metadata } from "next";
import FloatingElements from "@/components/FloatingElements";
import BackToHome from "@/components/ui/back-to-home";
import { COMPANY } from "@/config/company";
import { CheckCircle2, ExternalLink, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: `About Us | Logic Intelligence Technologies`,
  description:
    "Learn about Logic Intelligence Technologies — a Coimbatore-based web and AI development studio founded by an AI & Data Science specialist. Transparent pricing, free demo before payment.",
  openGraph: {
    title: "About Us | Logic Intelligence Technologies",
    description:
      "Coimbatore-based AI-integrated development studio. Custom websites, e-commerce, and software with transparent pricing.",
    images: [{ url: COMPANY.bannerPath, width: 1200, height: 630, alt: "Logic Intelligence Technologies" }],
  },
};

const values = [
  { title: "Transparent Pricing", desc: "No hidden fees. You see the full scope and cost before we start." },
  { title: "Free Demo First", desc: "Experience a working prototype of your project before committing." },
  { title: "AI-Native Thinking", desc: "Founded by an AI & Data Science specialist — not a generic web shop." },
  { title: "Client Partnership", desc: "We work directly with you from discovery through launch and beyond." },
  { title: "Built to Last", desc: "Clean code, documented systems, and proper hosting so your site doesn't break." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-32">
      <BackToHome />

      {/* Header */}
      <section className="py-16 px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Who We Are</span>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          Built in Coimbatore.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Built for your business.
          </span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          Logic Intelligence Technologies is a registered software studio in Coimbatore, Tamil Nadu. We build custom
          websites, e-commerce platforms, and AI-integrated software for businesses that want modern technology without
          agency overhead.
        </p>
      </section>

      {/* Founder Section */}
      <section className="py-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-10 items-center">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-primary/30 bg-zinc-800 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(0,191,255,0.15)]">
                <img
                  src={COMPANY.founder.photoPath}
                  alt={`${COMPANY.founder.name} — ${COMPANY.founder.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-black text-white">{COMPANY.founder.name}</h2>
                <p className="text-primary font-bold text-sm uppercase tracking-widest mt-1">{COMPANY.founder.title}</p>
              </div>
              <div className="flex items-center gap-3">
                <a href={COMPANY.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-xs text-zinc-400 hover:text-white hover:border-white/30 transition-all">
                  <ExternalLink className="w-3 h-3" /> LinkedIn
                </a>
                <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-xs text-zinc-400 hover:text-[#e1306c] hover:border-[#e1306c]/30 transition-all">
                  <ExternalLink className="w-3 h-3" /> Instagram
                </a>
                <a href={`mailto:${COMPANY.email}`} aria-label="Email"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-xs text-zinc-400 hover:text-primary hover:border-primary/30 transition-all">
                  <Mail className="w-3 h-3" /> Email
                </a>
              </div>
            </div>

            <div className="md:col-span-2 space-y-5">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20">
                Founder's Note
              </span>
              <blockquote className="text-lg text-zinc-300 leading-relaxed">
                "{COMPANY.founder.bio}"
              </blockquote>
              <div className="pt-4 border-t border-white/10 grid sm:grid-cols-3 gap-4 text-center">
                {[
                  { label: "Founded", value: "2026" },
                  { label: "Location", value: "Coimbatore, TN" },
                  { label: "Company Type", value: "Pvt. Ltd." },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xl font-black text-white">{stat.value}</p>
                    <p className="text-xs text-zinc-500 font-medium mt-1 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Our Story</h2>
            <p className="text-zinc-300 leading-relaxed">
              Logic Intelligence Technologies was incorporated in 2026 in Coimbatore, Tamil Nadu — India's engineering city — with a straightforward purpose: give local businesses access to the same quality of software that large enterprises take for granted.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              Most small and mid-size businesses in India deal with expensive agencies, opaque pricing, and templates dressed up as custom work. We set out to change that — with a free demo before payment, fixed-scope contracts, and genuine AI capability built in from day one.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              We are a registered Private Limited Company (CIN: {COMPANY.cin}), operating with full legal compliance and a genuine commitment to our clients' growth.
            </p>
          </div>
          <div className="relative h-[380px] rounded-3xl overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 mix-blend-overlay" />
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Logic Intelligence Technologies team at work"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-bold text-sm">Coimbatore, Tamil Nadu</p>
              <p className="text-zinc-400 text-xs">India's Engineering City</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Mission</h3>
            <p className="text-zinc-400 leading-relaxed">
              Deliver modern, AI-integrated digital products to businesses of every size — with transparent costs, clear timelines, and measurable results.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Vision</h3>
            <p className="text-zinc-400 leading-relaxed">
              Become South India's most trusted technology partner for small and medium businesses — and help Indian businesses compete on a global stage through well-built software.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Stand For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div key={i} className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl hover:bg-white/5 transition-colors flex gap-4">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-base font-bold text-white mb-1">{v.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6 lg:px-8 max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Want to work together?</h2>
        <p className="text-zinc-400 mb-8">Request a free demo and see your idea come to life before you spend a rupee.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/free-demo" className="inline-flex px-8 py-4 rounded-xl text-sm font-bold text-white neon-btn">
            Request Free Demo
          </a>
          <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white border border-white/20 hover:bg-white/5 transition-colors">
            <Phone className="w-4 h-4" /> {COMPANY.phone}
          </a>
        </div>
      </section>

      <FloatingElements />
    </main>
  );
}
