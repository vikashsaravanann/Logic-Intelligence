"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Code2, Globe2, Sparkles, Phone, ChevronDown, CheckCircle2, Send } from "lucide-react";
import { COMPANY } from "@/config/company";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

export default function HeroSection() {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0F1E] pt-32 md:pt-48 pb-12">
      
      {/* Background - Tech Forward Abstract */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,191,255,0.08)_0%,rgba(10,15,30,1)_70%)]" />
        
        {/* Animated Blueprint Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik00MCAwSDBWNDBIMzkuNUYwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] opacity-60" />

        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-purple-500/10 rounded-full blur-[130px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-blue-500/10 rounded-full blur-[130px] mix-blend-screen" />
      </div>
      
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
        
        <motion.div className="max-w-4xl flex flex-col items-center mt-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-4 mb-8"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-primary/30 shadow-[0_0_30px_rgba(0,191,255,0.3)] bg-black animate-neon-pulse">
              <img src={COMPANY.logoIconPath} alt="Company Logo" className="w-full h-full object-cover" />
            </div>
            
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-[11px] font-semibold tracking-widest uppercase text-white">{COMPANY.legalName}</span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6"
          >
            {COMPANY.tagline.split(" ").slice(0, 3).join(" ")} <br className="hidden sm:block"/>
            <span className="inline-block text-white pb-2">{COMPANY.tagline.split(" ").slice(3).join(" ")}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-3xl font-bold text-white mb-6"
          >
            Web &amp; AI development for Coimbatore businesses.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Founded by an AI &amp; Data Science specialist, we build custom websites, e-commerce
            stores, and software with transparent pricing — and a free demo before you pay anything.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto relative z-30 mb-16"
          >
            <a href="#services" className="bg-white text-black px-8 py-3.5 rounded-xl text-sm font-bold w-full sm:w-auto text-center flex items-center justify-center gap-2 group hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              View Our Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={`https://wa.me/${COMPANY.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white border border-white/20 bg-transparent hover:bg-white/5 transition-all w-full sm:w-auto group">
              <Phone className="w-4 h-4 text-white transition-colors" /> WhatsApp Us Now
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="flex items-center justify-center gap-6 mb-16"
          >
            <a href={COMPANY.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-zinc-400 hover:text-[#0a66c2] hover:scale-110 transition-all">
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-zinc-400 hover:text-[#e1306c] hover:scale-110 transition-all">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href={COMPANY.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-zinc-400 hover:text-[#1877f2] hover:scale-110 transition-all">
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a href={COMPANY.telegramBotUrl} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-zinc-400 hover:text-[#2aabee] hover:scale-110 transition-all">
              <Send className="w-5 h-5" />
            </a>
          </motion.div>

          {/* About Us At A Glance Widgets */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="w-full glass-card rounded-3xl p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10"
          >
            {/* Widget 1 */}
            <div className="flex items-start text-left gap-4 group pt-4 sm:pt-0 sm:px-4 first:pt-0 first:pl-0">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white/10 transition-colors">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Full Stack Studio</h3>
                <p className="text-[11px] text-white/70 leading-tight">End-to-end custom software & app development.</p>
              </div>
            </div>

            {/* Widget 2 */}
            <div className="flex items-start text-left gap-4 group pt-4 sm:pt-0 sm:px-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white/10 transition-colors">
                <Globe2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Coimbatore-Based</h3>
                <p className="text-[11px] text-white/70 leading-tight">Local team, clear communication, on-site when needed.</p>
              </div>
            </div>

            {/* Widget 3 */}
            <div className="flex items-start text-left gap-4 group pt-4 sm:pt-0 sm:px-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white/10 transition-colors">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Custom-Built</h3>
                <p className="text-[11px] text-white/70 leading-tight">No generic templates. 100% tailored solutions.</p>
              </div>
            </div>

            {/* Widget 4 */}
            <div className="flex items-start text-left gap-4 group pt-4 sm:pt-0 sm:px-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white/10 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Free Demo</h3>
                <p className="text-[11px] text-white/70 leading-tight">Experience your prototype before you pay.</p>
              </div>
            </div>
          </motion.div>

        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
        >
          <span className="text-[9px] font-bold tracking-widest uppercase text-zinc-400">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
