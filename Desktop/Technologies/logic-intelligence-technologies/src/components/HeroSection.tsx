"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Code2, Globe2, Sparkles, Phone, ChevronDown, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0F1E] pt-24 pb-12">
      
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
        
        <motion.div style={{ y: textY, opacity }} className="max-w-4xl flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00BFFF]/30 bg-[#00BFFF]/5 backdrop-blur-md mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00BFFF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00BFFF]"></span>
            </span>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#00BFFF]">Logic Intelligence Technologies</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6"
          >
            Where Logic Meets <br className="hidden sm:block"/>
            <span className="inline-block gradient-text-anim pb-2">Innovation</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-3xl font-bold text-zinc-300 mb-6"
          >
            We Build What Others Imagine.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-base md:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            A premium full-stack development studio delivering world-class web applications, 
            mobile apps, and custom software for any business. From e-commerce to hospitality 
            and SaaS, we engineer digital solutions that scale, secure, and succeed.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto relative z-30 mb-16"
          >
            <a href="#services" className="neon-btn px-8 py-3.5 rounded-xl text-sm font-bold w-full sm:w-auto text-center flex items-center justify-center gap-2 group">
              View Our Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://wa.me/918072120016" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white border border-white/20 bg-transparent hover:bg-white/5 transition-all w-full sm:w-auto group">
              <Phone className="w-4 h-4 text-[#00BFFF] group-hover:text-white transition-colors" /> WhatsApp Us Now
            </a>
          </motion.div>

          {/* About Us At A Glance Widgets */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Widget 1 */}
            <div className="glass-card p-4 rounded-2xl flex items-start text-left gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-[#00BFFF]/10 flex items-center justify-center shrink-0 border border-[#00BFFF]/20 group-hover:bg-[#00BFFF]/20 transition-colors">
                <Code2 className="w-5 h-5 text-[#00BFFF]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Full Stack Studio</h3>
                <p className="text-[11px] text-zinc-400 leading-tight">End-to-end custom software & app development.</p>
              </div>
            </div>

            {/* Widget 2 */}
            <div className="glass-card p-4 rounded-2xl flex items-start text-left gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-[#7B2FBE]/10 flex items-center justify-center shrink-0 border border-[#7B2FBE]/20 group-hover:bg-[#7B2FBE]/20 transition-colors">
                <Globe2 className="w-5 h-5 text-[#7B2FBE]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Global Reach</h3>
                <p className="text-[11px] text-zinc-400 leading-tight">Based in Coimbatore, serving clients worldwide.</p>
              </div>
            </div>

            {/* Widget 3 */}
            <div className="glass-card p-4 rounded-2xl flex items-start text-left gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-[#00FF88]/10 flex items-center justify-center shrink-0 border border-[#00FF88]/20 group-hover:bg-[#00FF88]/20 transition-colors">
                <Sparkles className="w-5 h-5 text-[#00FF88]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Custom-Built</h3>
                <p className="text-[11px] text-zinc-400 leading-tight">No generic templates. 100% tailored solutions.</p>
              </div>
            </div>

            {/* Widget 4 */}
            <div className="glass-card p-4 rounded-2xl flex items-start text-left gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-[#FF2D78]/10 flex items-center justify-center shrink-0 border border-[#FF2D78]/20 group-hover:bg-[#FF2D78]/20 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-[#FF2D78]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Free Demo</h3>
                <p className="text-[11px] text-zinc-400 leading-tight">Experience your prototype before you pay.</p>
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
