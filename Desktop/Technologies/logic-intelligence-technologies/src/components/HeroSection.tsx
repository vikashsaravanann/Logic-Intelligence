"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { MessageCircle, CheckCircle2, ChevronDown } from "lucide-react";
import { Typewriter } from 'react-simple-typewriter';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function HeroSection() {
  const [init, setInit] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  const shape1Y = useTransform(scrollY, [0, 500], [0, -150]);
  const shape2Y = useTransform(scrollY, [0, 500], [0, -100]);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0F1E] pt-20">
      {/* Layer 1: Particles Background */}
      {init && (
        <Particles
          id="tsparticles"
          className="absolute inset-0 z-0 pointer-events-none"
          options={{
            background: {
              color: { value: "transparent" },
            },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
              },
              modes: {
                repulse: { distance: 100, duration: 0.4 },
              },
            },
            particles: {
              color: { value: ["#00BFFF", "#7B2FBE", "#00FF88"] },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.15,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: true,
                speed: 0.5,
                straight: false,
              },
              number: {
                density: { enable: true, width: 800 },
                value: typeof window !== "undefined" && window.innerWidth < 768 ? 40 : 100,
              },
              opacity: {
                value: { min: 0.3, max: 0.7 },
              },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
          }}
        />
      )}

      {/* Layer 2: Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: "linear-gradient(rgba(0,191,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,0.05) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        perspective: "1000px",
        transform: "rotateX(20deg) scale(1.5)"
      }} />
      
      {/* Layer 3: Floating Geometric Shapes */}
      <motion.div style={{ y: shape1Y }} className="absolute top-20 right-10 w-[400px] h-[400px] rounded-full bg-[#00BFFF] opacity-5 blur-[100px] animate-float" />
      <motion.div style={{ y: shape2Y, animationDelay: "1s", animationDuration: "10s" } as any} className="absolute bottom-20 left-10 w-[500px] h-[500px] rounded-full bg-[#7B2FBE] opacity-[0.08] blur-[120px] animate-float" />
      <motion.div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] border border-[#00FF88] opacity-5 blur-[80px]" style={{ animation: "spin 30s linear infinite" }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
        
        <motion.div style={{ y: textY }} className="max-w-4xl flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="text-lg">🇮🇳</span>
            <span className="text-xs font-bold tracking-widest uppercase gradient-text-anim">Pvt. Ltd. Registered Company</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-[5rem] font-black text-white tracking-tight mb-6 leading-[1.1] whitespace-nowrap"
          >
            Where Logic Meets Innovation — <br />
            We Build What <span className="gradient-text-anim glitch-effect inline-block">Others Imagine</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-12 flex items-center justify-center mb-8"
          >
            <p className="text-xl md:text-3xl font-bold text-zinc-300">
              Expert in <span className="text-primary glow-text inline-block min-w-[300px] text-left">
                <Typewriter
                  words={["Full Stack Development", "Hotel Websites", "Travel Portals", "Software Solutions", "Game Development"]}
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
            className="text-lg md:text-2xl font-light italic text-zinc-400 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            We are a premier technology studio dedicated to designing, developing, and deploying high-performance digital platforms, enterprise software, and immersive web experiences that drive unparalleled business results. From the initial spark of an idea to the final global launch — we architect the future, engineering robust, scalable solutions tailored to elevate your brand to the next level.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 w-full sm:w-auto"
          >
            <a href="#services" className="px-8 py-4 rounded-xl text-base font-bold text-white neon-btn w-full sm:w-auto text-center flex items-center justify-center relative overflow-hidden group">
              <span className="relative z-10">View Our Services</span>
            </a>
            <a href="https://wa.me/919342877474" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white border border-white/20 bg-transparent hover:bg-white/5 hover:border-primary transition-all w-full sm:w-auto group">
              <MessageCircle className="w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors" /> WhatsApp Us Now
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm font-bold text-zinc-400 uppercase tracking-widest"
          >
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> 100% Custom Built</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> On-Time Delivery</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Affordable Pricing</span>
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
