import { packagesData } from "@/data/packagesData";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import FloatingElements from "@/components/FloatingElements";
import BackToHome from "@/components/ui/back-to-home";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return packagesData.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const pkg = packagesData.find((p) => p.slug === params.slug);
  if (!pkg) return { title: "Not Found" };
  
  return {
    title: `${pkg.title} | Logic Intelligence Technologies Pvt. Ltd.`,
    description: pkg.subtitle,
  };
}

export default function PackageDetailPage({ params }: { params: { slug: string } }) {
  const pkg = packagesData.find((p) => p.slug === params.slug);
  
  if (!pkg) return notFound();

  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-32">
      <BackToHome />
      <section className="py-20 px-6 lg:px-8 max-w-5xl mx-auto text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[300px] opacity-[0.1] blur-[100px] bg-gradient-to-r from-primary to-accent pointer-events-none" />
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 relative z-10">{pkg.title}</h1>
        <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-6 relative z-10">{pkg.subtitle}</p>
        <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-10 relative z-10">{pkg.price}</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <Link href="/contact" className="px-8 py-4 rounded-xl font-bold text-black bg-primary neon-btn w-full sm:w-auto">Get Started</Link>
          <a href="https://wa.me/919342877474" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 transition-colors w-full sm:w-auto border border-white/10">WhatsApp Us</a>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="p-8 md:p-12 rounded-3xl glass-card bg-zinc-900/60 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-8">What's Included</h2>
          <div className="space-y-6">
            {pkg.inclusions.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-white">{item.title}</h4>
                  <p className="text-zinc-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {pkg.timeline && pkg.timeline.length > 0 && (
        <section className="py-16 px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Delivery Timeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pkg.timeline.map((item, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <strong className="text-primary block mb-1">{item.day}</strong>
                <span className="text-zinc-300">{item.desc}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {pkg.paymentTerms && pkg.paymentTerms.length > 0 && (
        <section className="py-16 px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Payment Terms</h2>
          <div className="inline-flex flex-col sm:flex-row gap-4 justify-center">
            {pkg.paymentTerms.map((term, i) => (
              <div key={i} className="px-6 py-3 rounded-full bg-zinc-900 border border-white/10 text-zinc-300">
                {term}
              </div>
            ))}
          </div>
        </section>
      )}

      <FloatingElements />
    </main>
  );
}
