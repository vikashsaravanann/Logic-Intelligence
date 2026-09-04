"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { packagesData } from "@/data/packagesData";

export default function PackagesSection() {
  return (
    <section id="packages" className="py-16 md:py-24 bg-[#0A0F1E] relative border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">Our Service Packages</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">Transparent pricing. No hidden charges. Real value.</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {packagesData.map((pkg, i) => {
            const isPopular = pkg.slug === "business-pro-pack";
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-3xl p-8 md:p-6 md:p-10 flex flex-col h-full bg-zinc-900/60 backdrop-blur-xl border ${isPopular ? "lg:-mt-6 lg:mb-6 border-accent/50 shadow-[0_0_30px_rgba(123,47,190,0.15)]" : "border-white/10"}`}>
                
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-white bg-accent shadow-[0_0_15px_rgba(123,47,190,0.5)]">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="text-2xl font-black text-white mb-2">{pkg.title}</h4>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl text-zinc-400">Starting from</span>
                  </div>
                  <div className="mb-6">
                    <span className={`text-4xl font-black ${isPopular ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent" : "text-white"}`}>{pkg.price}</span>
                  </div>
                  <p className="text-sm font-medium text-zinc-400 bg-black/50 p-3 rounded-lg border border-white/5">
                    <span className="text-zinc-300 font-bold block mb-1">Best for:</span> {pkg.bestFor}
                  </p>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {pkg.inclusions.slice(0, 6).map((f, j) => (
                    <li key={j} className="flex gap-3 items-start text-sm text-zinc-300 leading-relaxed">
                      <Check className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                      <span>{f.title}</span>
                    </li>
                  ))}
                  {pkg.inclusions.length > 6 && (
                    <li className="text-sm text-primary font-bold ml-8">+ {pkg.inclusions.length - 6} more features</li>
                  )}
                </ul>

                <Link href={`/packages/${pkg.slug}`} 
                  className={`flex items-center justify-center w-full py-4 rounded-xl text-sm font-bold transition-all ${isPopular ? "bg-accent text-white hover:bg-accent/90 shadow-[0_0_15px_rgba(123,47,190,0.4)]" : "bg-white/10 text-white hover:bg-white/20"}`}>
                  View Details
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center max-w-2xl mx-auto p-6 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-md">
          <p className="text-zinc-300 font-medium">
            <span className="text-xl mr-2">💡</span>
            Not sure which package fits you? <a href="https://wa.me/919342877474" className="text-primary font-bold hover:underline" target="_blank" rel="noopener noreferrer">WhatsApp us</a> and we'll recommend the right one for your business — for free.
          </p>
        </div>
      </div>
    </section>
  );
}
