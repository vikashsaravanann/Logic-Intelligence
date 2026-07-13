"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, CheckCircle2, ChevronDown, ShieldCheck, Server, Activity, ArrowRight, Zap } from "lucide-react";
import { Typewriter } from 'react-simple-typewriter';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Widget floating animations
  const widget1Y = useTransform(scrollY, [0, 500], [0, -100]);
  const widget2Y = useTransform(scrollY, [0, 500], [0, -50]);
  const widget3Y = useTransform(scrollY, [0, 500], [0, -130]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0F1E] pt-20 pb-20">
      
      {/* Dynamic Animated Background - Professional & Premium */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,191,255,0.05)_0%,rgba(10,15,30,1)_100%)]" />
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik00MCAwSDBWNDBIMzkuNUYwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      </div>
      
      {/* Layer 1: Professional Floating Widgets */}
      <div className="absolute inset-0 max-w-7xl mx-auto w-full h-full pointer-events-none hidden lg:block z-10">
        
        {/* Widget 1: Architecture Status */}
        <motion.div 
          style={{ y: widget1Y }}
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="absolute top-32 left-4 xl:left-0 glass-card p-5 rounded-2xl flex items-center gap-4 animate-float border border-white/5 shadow-2xl backdrop-blur-2xl"
        >
          <div className="flex flex-col gap-3 w-48">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Server className="w-3 h-3 text-[#00BFFF]" /> Cluster Status
              </span>
              <span className="w-2 h-2 rounded-full bg-[#00BFFF] animate-pulse shadow-[0_0_8px_#00BFFF]"></span>
            </div>
            <div>
              <p className="text-2xl font-bold text-white tracking-tight">99.99<span className="text-sm text-zinc-500 font-medium">%</span></p>
              <p className="text-[11px] text-[#00BFFF] mt-1 flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" /> All systems operational</p>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-1">
              <div className="w-[98%] bg-gradient-to-r from-[#00BFFF] to-[#7B2FBE] h-full rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* Widget 2: Security */}
        <motion.div 
          style={{ y: widget2Y, animationDelay: '1s' } as any}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="absolute top-1/4 right-4 xl:right-0 glass-card p-5 rounded-2xl flex items-center gap-4 animate-float border border-white/5 shadow-2xl backdrop-blur-2xl"
        >
          <div className="flex flex-col gap-3 w-48">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-[#00FF88]" /> Security
              </span>
              <div className="flex gap-1">
                <span className="w-1 h-3 bg-[#00FF88] rounded-full"></span>
                <span className="w-1 h-3 bg-[#00FF88] rounded-full"></span>
                <span className="w-1 h-3 bg-[#00FF88] rounded-full opacity-40"></span>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-sm font-bold text-white tracking-wide">AES-256 Encryption</p>
              <p className="text-[11px] text-[#00FF88] mt-1.5 flex items-center gap-1.5"><Zap className="w-3 h-3" /> Active Defense Mode</p>
            </div>
          </div>
        </motion.div>

        {/* Widget 3: Performance */}
        <motion.div 
          style={{ y: widget3Y, animationDelay: '2s' } as any}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          className="absolute bottom-1/4 left-[18%] glass-card p-5 rounded-2xl flex items-center gap-4 animate-float border border-white/5 shadow-2xl backdrop-blur-2xl"
        >
          <div className="flex flex-col gap-2 w-40">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-3 h-3 text-[#7B2FBE]" /> Latency
              </span>
              <span className="text-xs font-mono text-white bg-[#7B2FBE]/20 px-1.5 py-0.5 rounded text-[10px]">12ms</span>
            </div>
            <div className="flex items-end gap-1.5 h-10 mt-1">
              {[40, 70, 45, 90, 65, 85, 30, 50].map((h, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-[#7B2FBE]/10 to-[#7B2FBE]/80 rounded-t-sm transition-all duration-500 hover:h-full" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
        
        <motion.div style={{ y: textY, opacity }} className="max-w-5xl flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6 shadow-[0_0_30px_rgba(0,191,255,0.15)]"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00BFFF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00BFFF]"></span>
            </span>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-300">Logic Intelligence Pvt. Ltd.</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white tracking-tight mb-4 leading-[1.05]"
          >
            Engineering Digital <br />
            <span className="inline-block gradient-text-anim mt-2 pb-2">
              Excellence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-sm md:text-base text-zinc-400 uppercase tracking-[0.3em] font-semibold mb-8"
          >
            Innovate. Scale. Dominate.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="h-16 flex items-center justify-center mb-8 mt-2"
          >
            <p className="text-2xl md:text-4xl font-semibold text-zinc-400 flex items-center gap-3">
              Enterprise <span className="text-white inline-block min-w-[320px] text-left border-l-2 border-[#00BFFF] pl-4">
                <Typewriter
                  words={["Web Development", "Software Solutions", "Mobile Applications", "Cloud Architectures"]}
                  loop={0}
                  cursor
                  cursorStyle='_'
                  typeSpeed={60}
                  deleteSpeed={40}
                  delaySpeed={2500}
                />
              </span>
            </p>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="text-lg md:text-xl font-normal text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            We architect intelligent, high-performance digital ecosystems. Logic Intelligence delivers premium software solutions designed to scale, secure, and accelerate your enterprise operations.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto relative z-30"
          >
            <a href="#services" className="neon-btn px-10 py-4 text-base font-bold w-full sm:w-auto text-center flex items-center justify-center gap-2 group">
              Explore Services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="mailto:startupwithvikashsaravanan@gmail.com" className="flex items-center justify-center gap-2 px-10 py-4 rounded-xl text-base font-bold text-white border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all w-full sm:w-auto group shadow-lg">
              <MessageCircle className="w-5 h-5 text-[#00BFFF] group-hover:text-white transition-colors" /> Contact Sales
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
