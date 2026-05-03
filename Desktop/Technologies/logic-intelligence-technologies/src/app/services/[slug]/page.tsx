import { servicesData } from "@/data/servicesData";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingElements from "@/components/FloatingElements";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = servicesData.find((s) => s.slug === params.slug);
  if (!service) return { title: "Not Found" };
  
  return {
    title: `${service.title} | Logic Intelligence Technologies Pvt. Ltd.`,
    description: service.subtitle,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = servicesData.find((s) => s.slug === params.slug);
  
  if (!service) return notFound();

  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-32">
      <Navbar />
      
      {/* Hero */}
      <section className="py-20 px-6 lg:px-8 max-w-5xl mx-auto text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[300px] opacity-[0.1] blur-[100px] bg-gradient-to-r from-primary to-accent pointer-events-none" />
        <p className="text-sm font-bold tracking-widest text-primary uppercase mb-4 relative z-10">
          Home &gt; Services &gt; {service.title}
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 relative z-10">{service.title}</h1>
        <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-10 relative z-10">{service.subtitle}</p>
        <div className="flex items-center justify-center gap-4 relative z-10">
          <Link href="/contact" className="px-8 py-4 rounded-xl font-bold text-black bg-primary neon-btn">Get a Free Quote</Link>
          <a href="https://wa.me/919342877474" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] transition-colors flex items-center gap-2">WhatsApp Us</a>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="p-8 md:p-12 rounded-3xl glass-card bg-zinc-900/60 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
          <div className="prose prose-invert max-w-none">
            {service.description.split('\n\n').map((p, i) => (
              <p key={i} className="text-lg text-zinc-300 mb-4">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build */}
      {service.whatWeBuild && service.whatWeBuild.length > 0 && (
        <section className="py-16 px-6 lg:px-8 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">What We Build</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.whatWeBuild.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <span className="text-zinc-300 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tech Stack */}
      {service.techStack && Object.keys(service.techStack).length > 0 && (
        <section className="py-16 bg-black border-y border-white/5">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Technologies We Use</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {Object.entries(service.techStack).flatMap(([cat, tools]) => tools).map((tool, i) => (
                <span key={i} className="px-6 py-3 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 text-sm font-bold shadow-[0_0_10px_rgba(0,191,255,0.1)]">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Timeline */}
      {service.process && service.process.length > 0 && (
        <section className="py-20 px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Development Process</h2>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
            {service.process.map((step, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-zinc-900 text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(0,191,255,0.2)] z-10">
                  {i + 1}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-zinc-900/60 border border-white/10">
                  <h3 className="font-bold text-white mb-2">{step.step}</h3>
                  <p className="text-sm text-zinc-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pricing */}
      {service.pricing && service.pricing.length > 0 && (
        <section className="py-20 px-6 lg:px-8 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Pricing Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.pricing.map((plan, i) => (
              <div key={i} className="p-8 rounded-3xl glass-card border border-white/10 hover:border-primary/50 transition-colors bg-zinc-900/60 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-4">{plan.tier}</h3>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-6">{plan.price}</p>
                {'details' in plan && plan.details && Array.isArray(plan.details) && (
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.details.map((d: string, j: number) => (
                      <li key={j} className="flex items-start gap-3 text-zinc-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> {d}
                      </li>
                    ))}
                  </ul>
                )}
                <Link href="/contact" className="w-full py-4 rounded-xl text-center font-bold text-white bg-white/5 border border-white/10 hover:bg-primary hover:text-black transition-colors mt-auto">
                  Select Plan
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-20 px-6 lg:px-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10">
                <h4 className="text-lg font-bold text-white mb-2">{faq.q}</h4>
                <p className="text-zinc-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
      <FloatingElements />
    </main>
  );
}
