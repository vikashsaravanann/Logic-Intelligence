"use client";
import { motion } from "framer-motion";
import { MessageSquare, LayoutTemplate, Code, Rocket } from "lucide-react";

const steps = [
  { icon: MessageSquare, title: "Share Your Idea", desc: "Tell us what you need — business type, features, design preference. WhatsApp or fill our form." },
  { icon: LayoutTemplate, title: "We Design a Plan", desc: "We send you a detailed plan with timeline, features, and pricing within 24 hours." },
  { icon: Code, title: "We Build It", desc: "Our team builds your project with regular updates and your feedback at every stage." },
  { icon: Rocket, title: "We Launch It Live", desc: "We deploy, test, and hand over your fully live website or software with full support." }
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-[#0A0F1E] relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">How We Work</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white">Simple. Transparent. Fast.</h3>
        </div>

        <div className="relative">
          {/* Horizontal Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center">
                
                <div className="w-24 h-24 rounded-full bg-black border-2 border-primary/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,191,255,0.2)] relative group">
                  <div className="absolute inset-0 rounded-full bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <step.icon className="w-10 h-10 text-primary relative z-10" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold border border-black shadow-lg">
                    {i + 1}
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-white mb-3">Step {i + 1} &rarr; <br className="md:hidden" /> {step.title}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-[280px]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
