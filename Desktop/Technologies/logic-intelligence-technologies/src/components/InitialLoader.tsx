"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InitialLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show loader once per session
    const hasLoaded = sessionStorage.getItem("lit_loaded");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    // Simulate progress 0 to 100 over 1.5 seconds
    const duration = 1500;
    const intervalTime = 15;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const p = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(p);
      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    const timeout = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("lit_loaded", "true");
    }, 2000); // Fast 2 second max duration

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (!loading) return null;

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15 + 0.2,
        duration: 0.6,
        ease: "easeOut" as any,
      },
    }),
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-[#0A0F1E] flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        >
          {/* Subtle animated background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,191,255,0.08)_0%,transparent_50%)] animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik00MCAwSDBWNDBIMzkuNUYwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,black_20%,transparent_80%)]" />
          </div>

          <div className="relative z-10 flex flex-col items-center mt-[-40px]">
            {/* LIT Letters */}
            <div className="flex gap-2 mb-3">
              {['L', 'I', 'T'].map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={letterVariants}
                  className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#7B2FBE] tracking-tighter"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            
            {/* Full Name */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              className="text-[10px] md:text-xs text-zinc-300 uppercase font-light"
            >
              Logic Intelligence Technologies
            </motion.p>
          </div>

          {/* Progress Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-20 w-48 flex flex-col items-center gap-3 z-10"
          >
            <div className="text-xs font-mono text-zinc-500">{progress}%</div>
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00BFFF] to-[#7B2FBE]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
