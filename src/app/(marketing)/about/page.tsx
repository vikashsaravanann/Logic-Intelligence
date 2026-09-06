import { Metadata } from "next";
import Link from "next/link";
import FloatingElements from "@/components/motion/floating-elements";
import BackToHome from "@/components/ui/back-to-home";
import { COMPANY } from "@/config/company";
import {
  ExternalLink,
  Mail,
  Phone,
  Coins,
  PlayCircle,
  Sparkles,
  Handshake,
  ShieldCheck,
  MapPin,
  Rocket,
  Code2,
  Target,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Technology Startup in Coimbatore",
  description:
    "Logic Intelligence Technologies is a Coimbatore-based technology startup building production web apps, e-commerce, and practical AI systems — transparent pricing, free demo before you pay.",
  openGraph: {
    title: "About Logic Intelligence Technologies",
    description:
      "Coimbatore technology startup for custom websites, e-commerce, and AI-integrated software. Founded by Vikash Saravanan.",
    images: [
      {
        url: COMPANY.bannerPath,
        width: 1200,
        height: 630,
        alt: "Logic Intelligence Technologies",
      },
    ],
  },
};

const values = [
  {
    title: "Transparent pricing",
    desc: "Clear scope and cost before work begins — no surprise invoices mid-project.",
    icon: Coins,
  },
  {
    title: "Free demo first",
    desc: "See a working direction for your product before you commit budget.",
    icon: PlayCircle,
  },
  {
    title: "AI-native product thinking",
    desc: "Founded by an AI & Data Science specialist — we integrate AI only when it solves a real workflow.",
    icon: Sparkles,
  },
  {
    title: "Direct partnership",
    desc: "You work with the people building the product — from discovery through launch and support.",
    icon: Handshake,
  },
  {
    title: "Built for production",
    desc: "Clean architecture, documented handoff, and hosting practices that keep systems stable after go-live.",
    icon: ShieldCheck,
  },
  {
    title: "Startup speed, serious quality",
    desc: "We move fast without cutting corners on security, accessibility, or maintainability.",
    icon: Rocket,
  },
];

const focusAreas = [
  {
    icon: Code2,
    title: "Full-stack web products",
    body: "Next.js, React, TypeScript, and solid backends — sites and apps that are fast, secure, and easy to extend.",
  },
  {
    icon: Sparkles,
    title: "Practical AI systems",
    body: "RAG assistants, automation, and model workflows designed for business use — not demos that never ship.",
  },
  {
    icon: Target,
    title: "Fixed-scope delivery",
    body: "Packages and custom SOWs with milestones, so you always know what is in scope and what ships next.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-28 sm:pt-32">
      <BackToHome />

      {/* Hero */}
      <section className="py-14 sm:py-20 px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs sm:text-sm mb-5 px-3 py-1.5 rounded-full border border-primary/25 bg-primary/10">
          <Rocket className="w-3.5 h-3.5" />
          Coimbatore technology startup
        </span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
          A startup built to ship
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            real software for real businesses.
          </span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          {COMPANY.displayName} is a technology startup based in Coimbatore,
          Tamil Nadu. We design and build production websites, e-commerce
          platforms, and AI-integrated systems for teams that want modern
          software without traditional agency overhead.
        </p>
      </section>

      {/* Snapshot */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "Founded", value: "2026" },
            { label: "Type", value: COMPANY.entityLabel },
            { label: "HQ", value: "Coimbatore, TN" },
            { label: "Focus", value: "Web · AI · Product" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 text-center"
            >
              <p className="text-lg sm:text-xl font-black text-white">{item.value}</p>
              <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest mt-1 font-semibold">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section className="py-12 sm:py-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 p-6 sm:p-10 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 md:gap-10 items-center">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-primary/30 bg-zinc-800 shrink-0 shadow-[0_0_30px_rgba(0,191,255,0.15)]">
                <img
                  src={COMPANY.founder.photoPath}
                  alt={`${COMPANY.founder.name} — ${COMPANY.founder.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-black text-white">
                  {COMPANY.founder.name}
                </h2>
                <p className="text-primary font-bold text-sm uppercase tracking-widest mt-1">
                  {COMPANY.founder.title}
                </p>
                <p className="text-zinc-500 text-xs mt-2 flex items-center justify-center md:justify-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {COMPANY.address}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <a
                  href={COMPANY.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-xs text-zinc-400 hover:text-white hover:border-white/30 transition-all"
                >
                  <ExternalLink className="w-3 h-3" /> LinkedIn
                </a>
                <a
                  href={COMPANY.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-xs text-zinc-400 hover:text-[#e1306c] hover:border-[#e1306c]/30 transition-all"
                >
                  <ExternalLink className="w-3 h-3" /> Instagram
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-xs text-zinc-400 hover:text-primary hover:border-primary/30 transition-all"
                >
                  <Mail className="w-3 h-3" /> Email
                </a>
              </div>
            </div>

            <div className="md:col-span-2 space-y-5">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20">
                Founder&apos;s note
              </span>
              <blockquote className="text-base sm:text-lg text-zinc-300 leading-relaxed border-l-2 border-primary/40 pl-4">
                {COMPANY.founder.bio}
              </blockquote>
              <p className="text-sm text-zinc-500 leading-relaxed">
                The studio exists for founders and operators who need dependable
                engineering — not slide decks. Every engagement starts with clear
                scope, honest timelines, and a path to a working product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 sm:py-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Our story</h2>
            <p className="text-zinc-300 leading-relaxed">
              {COMPANY.displayName} started in 2026 in Coimbatore — India&apos;s
              engineering city — as a focused technology startup. The goal was
              simple: give local and pan-India businesses access to the same
              quality of product engineering that large enterprises expect, at a
              pace and price that startups and SMEs can actually use.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              Too many teams still face expensive agencies, vague proposals, and
              template sites sold as custom work. We work differently: free demo
              when the scope fits, fixed-scope packages, and real AI capability
              when it improves operations — not as a buzzword.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              We are an independent technology startup, not a private limited
              company. That keeps us lean, accountable, and close to the product —
              while we deliver with the same professional standards clients expect
              from any serious engineering partner.
            </p>
          </div>
          <div className="relative h-[320px] sm:h-[380px] rounded-3xl overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 mix-blend-overlay z-[1]" />
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85"
              alt="Modern software studio workspace — Logic Intelligence Technologies, Coimbatore"
              className="w-full h-full object-cover opacity-85"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-transparent z-[2]" />
            <div className="absolute bottom-6 left-6 right-6 z-[3]">
              <p className="text-white font-bold text-sm">Coimbatore, Tamil Nadu</p>
              <p className="text-zinc-400 text-xs">Startup studio · Web &amp; AI products</p>
            </div>
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="py-12 sm:py-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">What we build</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
            Product-minded engineering across web, commerce, and applied AI —
            tailored to the stage your business is in.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {focusAreas.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <item.icon className="w-7 h-7 text-primary mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-12 sm:py-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">Mission</h3>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Deliver modern, AI-aware digital products to businesses of every size
              — with transparent costs, clear timelines, and results you can measure
              after launch.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">Vision</h3>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Become the technology partner Coimbatore and India&apos;s growing
              businesses trust for software that ships — helping them compete with
              the same tools enterprises use, without enterprise friction.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
          What we stand for
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl hover:bg-white/5 transition-colors flex gap-4"
            >
              <v.icon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-base font-bold text-white mb-1">{v.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-6 lg:px-8 max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Want to build with us?
        </h2>
        <p className="text-zinc-400 mb-8 text-sm sm:text-base">
          Book a free demo and see a clear path for your product before you invest.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/free-demo"
            className="inline-flex px-8 py-4 rounded-xl text-sm font-bold text-black bg-primary hover:brightness-110 transition-all shadow-[0_0_24px_rgba(0,191,255,0.25)]"
          >
            Book free demo
          </Link>
          <a
            href={`tel:${COMPANY.phone}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white border border-white/20 hover:bg-white/5 transition-colors"
          >
            <Phone className="w-4 h-4" /> {COMPANY.phone}
          </a>
        </div>
      </section>

      <FloatingElements />
    </main>
  );
}
