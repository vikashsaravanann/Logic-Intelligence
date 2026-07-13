"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, CheckCircle2, ChevronDown, ShieldCheck, Server, Activity } from "lucide-react";
import { Typewriter } from 'react-simple-typewriter';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, -50]);

  // Widget floating animations
  const widget1Y = useTransform(scrollY, [0, 500], [0, -80]);
  const widget2Y = useTransform(scrollY, [0, 500], [0, -40]);
  const widget3Y = useTransform(scrollY, [0, 500], [0, -120]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0F1E] pt-20">
      
      {/* Layer 1: Professional Floating Widgets */}
      <div className="absolute inset-0 max-w-7xl mx-auto w-full h-full pointer-events-none hidden lg:block z-10">
        {/* Widget 1: Architecture */}
        <motion.div 
          style={{ y: widget1Y }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute top-32 left-8 bg-[rgba(20,25,40,0.8)] backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-float"
        >
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-white/20">
            <Server className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Architecture</p>
            <p className="text-sm font-semibold text-white">Next-Gen Scalability</p>
          </div>
        </motion.div>

        {/* Widget 2: Security */}
        <motion.div 
          style={{ y: widget2Y, animationDelay: '1s' } as any}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute top-1/4 right-8 bg-[rgba(20,25,40,0.8)] backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-float"
        >
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-white/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Security Protocol</p>
            <p className="text-sm font-semibold text-white">Enterprise-Grade</p>
          </div>
        </motion.div>

        {/* Widget 3: Performance */}
        <motion.div 
          style={{ y: widget3Y, animationDelay: '2s' } as any}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="absolute bottom-1/4 left-1/4 bg-[rgba(20,25,40,0.8)] backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-float"
        >
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-white/20">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Uptime Metric</p>
            <p className="text-sm font-semibold text-white">99.99% Reliability</p>
          </div>
        </motion.div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
        
        <motion.div style={{ y: textY }} className="max-w-4xl flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="text-lg">🇮🇳</span>
            <span className="text-xs font-bold tracking-widest uppercase text-white">Pvt. Ltd. Registered Company</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-[5rem] font-black text-white tracking-tight mb-6 leading-[1.1]"
          >
            Engineering Digital <br />
            <span className="text-white inline-block relative">
              Excellence
              {/* Subtle underline accent */}
              <span className="absolute bottom-2 left-0 w-full h-2 bg-white/20 rounded-full blur-[2px]" />
            </span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-12 flex items-center justify-center mb-8"
          >
            <p className="text-xl md:text-3xl font-bold text-zinc-400">
              Enterprise <span className="text-white inline-block min-w-[300px] text-left">
                <Typewriter
                  words={["Web Development", "Software Solutions", "Mobile Applications", "Cloud Architectures"]}
                  loop={0}
                  cursor
                  cursorStyle='|'
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
            </p>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base md:text-xl font-light text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            We are a premium software engineering firm specializing in robust, highly scalable corporate platforms and digital systems. We transform complex business requirements into high-performance technology that drives measurable operational success.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto relative z-30"
          >
            <a href="#services" className="px-8 py-4 rounded-xl text-base font-bold text-black bg-white hover:bg-zinc-200 transition-colors w-full sm:w-auto text-center flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Explore Services
            </a>
            <a href="mailto:startupwithvikashsaravanan@gmail.com" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white border border-white/20 bg-transparent hover:bg-white/10 transition-all w-full sm:w-auto group">
              <MessageCircle className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" /> Contact Sales
            </a>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollY.get() < 50 ? 1 : 0 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 transition-opacity"
        >
          <span className="text-xs font-bold tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
