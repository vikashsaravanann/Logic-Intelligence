"use client";
import { motion } from "framer-motion";
import { MapPin, Globe, Briefcase } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#0A0F1E] relative border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center md:text-left mb-16">
          <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">About Us</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white">About Logic Intelligence Technologies Pvt. Ltd.</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-6">
            <p className="text-lg text-zinc-300 leading-relaxed">
              <strong className="text-white">Logic Intelligence Technologies Pvt. Ltd.</strong> is a Coimbatore-based full stack development company passionate about building cutting-edge digital solutions for businesses of all sizes.
            </p>
            <p className="text-lg text-zinc-300 leading-relaxed">
              Whether you need a stunning business website, a smart hotel booking platform, a travel quotation portal, custom software, or a fully immersive game — we build it all with precision, creativity, and care.
            </p>
            <p className="text-lg text-zinc-300 leading-relaxed">
              We serve clients across Tamil Nadu, Kerala, and India — and we are expanding globally through Fiverr and Upwork.
            </p>
            <p className="text-xl font-medium text-white leading-relaxed pt-4 border-t border-white/10">
              Our mission is simple: Transform your vision into a powerful digital reality — on time, on budget, and beyond expectations.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-6">
            {/* Abstract Tech Illustration Placeholder */}
            <div className="aspect-[4/3] rounded-3xl glass-card border border-white/10 bg-black overflow-hidden relative flex items-center justify-center shadow-[0_0_30px_rgba(0,191,255,0.1)]">
              <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:40px_40px]" />
              <div className="absolute w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
              <div className="absolute w-48 h-48 bg-accent/20 rounded-full blur-[60px] translate-x-20" />
              <div className="relative z-10 w-32 h-32 border border-white/20 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                <div className="w-24 h-24 border border-primary/50 rounded-full flex items-center justify-center animate-[spin_5s_linear_infinite_reverse]">
                  <div className="w-16 h-16 bg-gradient-to-tr from-primary to-accent rounded-full animate-pulse-glow" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 flex flex-col items-center text-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                <span className="text-xs font-bold text-zinc-300">Based in Coimbatore, Tamil Nadu</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 flex flex-col items-center text-center gap-2">
                <Globe className="w-6 h-6 text-accent" />
                <span className="text-xs font-bold text-zinc-300">Serving clients globally</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 flex flex-col items-center text-center gap-2">
                <Briefcase className="w-6 h-6 text-primary" />
                <span className="text-xs font-bold text-zinc-300">Specialized Web & Software</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
