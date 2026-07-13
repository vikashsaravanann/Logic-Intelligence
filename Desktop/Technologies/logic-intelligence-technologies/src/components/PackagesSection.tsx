"use client";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { packagesData } from "@/data/packagesData";

export default function PackagesSection() {
  const comparisonFeatures = [
    { name: "Pages Included", p1: "Up to 5", p2: "Up to 10", p3: "Unlimited" },
    { name: "Mobile Responsive", p1: true, p2: true, p3: true },
    { name: "SEO Setup", p1: "Basic", p2: "Advanced", p3: "Custom" },
    { name: "Admin Panel / CMS", p1: false, p2: true, p3: true },
    { name: "Blog Section", p1: false, p2: true, p3: true },
    { name: "Payment Gateway", p1: false, p2: true, p3: "Custom Integration" },
    { name: "Quotation System", p1: false, p2: "Yes (Hotel/Travel)", p3: "Custom Logic" },
    { name: "Custom Backend & DB", p1: false, p2: false, p3: true },
    { name: "Support Duration", p1: "1 Month", p2: "3 Months", p3: "6 Months" },
    { name: "Revisions", p1: "1 Round", p2: "2 Rounds", p3: "Unlimited" },
  ];

  const renderValue = (val: string | boolean) => {
    if (typeof val === "boolean") {
      return val ? <Check className="w-5 h-5 text-[#00FF88] mx-auto" /> : <X className="w-5 h-5 text-red-500/50 mx-auto" />;
    }
    return <span className="text-sm text-zinc-300 font-medium">{val}</span>;
  };

  return (
    <section id="packages" className="py-24 bg-[#0A0F1E] relative border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">Our Service Packages</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-6">Transparent pricing. No hidden charges. Real value.</h3>
        </div>

        {/* Mobile View: Stacked Cards */}
        <div className="lg:hidden grid grid-cols-1 gap-8 items-start mb-16">
          {packagesData.map((pkg, i) => {
            const isPopular = pkg.slug === "business-pro-pack";
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-3xl p-8 flex flex-col h-full bg-zinc-900/60 backdrop-blur-xl border ${isPopular ? "border-accent/50 shadow-[0_0_30px_rgba(123,47,190,0.15)]" : "border-white/10"}`}>
                
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-white bg-accent shadow-[0_0_15px_rgba(123,47,190,0.5)]">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="text-2xl font-black text-white mb-2">{pkg.title}</h4>
                  <div className="mb-6">
                    <span className={`text-3xl font-black ${isPopular ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent" : "text-white"}`}>{pkg.price}</span>
                  </div>
                  <p className="text-xs font-medium text-zinc-400 bg-black/50 p-3 rounded-lg border border-white/5">
                    <span className="text-zinc-300 font-bold block mb-1">Best for:</span> {pkg.bestFor}
                  </p>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {comparisonFeatures.map((f, j) => {
                    const val = f[`p${i+1}` as keyof typeof f];
                    if (val === false) return null; // Don't show missing features on mobile to save space
                    return (
                      <li key={j} className="flex gap-3 items-center text-sm text-zinc-300">
                        <Check className="h-4 w-4 shrink-0 text-primary" />
                        <span>{f.name}: <strong className="text-white">{typeof val === 'boolean' ? 'Included' : val}</strong></span>
                      </li>
                    );
                  })}
                </ul>

                <Link href={`/contact?package=${pkg.slug}`} 
                  className={`flex items-center justify-center w-full py-4 rounded-xl text-sm font-bold transition-all ${isPopular ? "bg-accent text-white shadow-[0_0_15px_rgba(123,47,190,0.4)]" : "bg-white/10 text-white"}`}>
                  Select Package
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop View: Comparison Table */}
        <div className="hidden lg:block overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-md mb-16 shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="w-1/4 p-8 border-b border-white/10 bg-black/20 align-bottom">
                  <h4 className="text-2xl font-bold text-white">Compare <br/>Packages</h4>
                </th>
                {packagesData.map((pkg, i) => {
                  const isPopular = pkg.slug === "business-pro-pack";
                  return (
                    <th key={i} className={`w-1/4 p-8 border-b border-white/10 text-center relative ${isPopular ? "bg-accent/10 border-t-4 border-t-accent" : "bg-black/20"}`}>
                      {isPopular && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-accent shadow-[0_0_15px_rgba(123,47,190,0.5)]">
                          Most Popular
                        </div>
                      )}
                      <h4 className="text-xl font-black text-white mb-2">{pkg.title}</h4>
                      <p className={`text-xl font-bold mb-4 ${isPopular ? "text-accent" : "text-zinc-300"}`}>{pkg.price}</p>
                      <Link href={`/contact?package=${pkg.slug}`} 
                        className={`inline-block w-full py-3 rounded-xl text-sm font-bold transition-all ${isPopular ? "bg-accent text-white hover:bg-accent/80" : "bg-white/10 text-white hover:bg-white/20"}`}>
                        Select
                      </Link>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, idx) => (
                <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 border-b border-white/5 text-sm font-medium text-zinc-400 bg-black/10">
                    {feature.name}
                  </td>
                  <td className="p-6 border-b border-white/5 text-center">
                    {renderValue(feature.p1)}
                  </td>
                  <td className="p-6 border-b border-white/5 text-center bg-accent/[0.02]">
                    {renderValue(feature.p2)}
                  </td>
                  <td className="p-6 border-b border-white/5 text-center">
                    {renderValue(feature.p3)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center max-w-2xl mx-auto p-6 rounded-2xl border border-[#00BFFF]/20 bg-[#00BFFF]/5 backdrop-blur-md">
          <p className="text-zinc-300 font-medium">
            <span className="text-xl mr-2">💡</span>
            Not sure which package fits you? <a href="https://wa.me/918072120016" className="text-[#00BFFF] font-bold hover:underline" target="_blank" rel="noopener noreferrer">WhatsApp us</a> and we'll recommend the right one for your business — for free.
          </p>
        </div>
      </div>
    </section>
  );
}
