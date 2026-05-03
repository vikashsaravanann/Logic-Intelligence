"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InitialLoader() {
  const [loading, setLoading] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    "Initializing...",
    "Loading Services...",
    "Preparing Experience...",
    "Almost Ready..."
  ];

  useEffect(() => {
    // Only show loader once per session
    const hasLoaded = sessionStorage.getItem("lit_loaded");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 600);

    const timeout = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("lit_loaded", "true");
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [texts.length]);

  if (!loading) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-[#0A0F1E] flex flex-col items-center justify-center text-center px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent glow-text">
              LIT
            </h1>
            <p className="text-sm md:text-lg text-zinc-400 tracking-[0.3em] uppercase mt-2">
              Logic Intelligence Technologies
            </p>
          </motion.div>

          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-6 relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </div>

          <motion.p
            key={textIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-primary font-medium tracking-widest uppercase"
          >
            {texts[textIndex]}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
