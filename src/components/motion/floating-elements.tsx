"use client";
import { useState, useEffect } from "react";
import { MessageCircle, ArrowUp, X, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingElements() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showCookie, setShowCookie] = useState(false);
  const [showWaTooltip, setShowWaTooltip] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookieConsent")) {
      setTimeout(() => setShowCookie(true), 2000);
    }

    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowCookie(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div 
        className="fixed bottom-6 right-6 z-50 flex items-center"
        onMouseEnter={() => setShowWaTooltip(true)}
        onMouseLeave={() => setShowWaTooltip(false)}
      >
        <AnimatePresence>
          {showWaTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full mr-4 whitespace-nowrap bg-[rgba(10,15,30,0.9)] backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl shadow-lg text-sm font-medium text-white flex items-center"
            >
              Chat with us! 👋
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-[rgba(10,15,30,0.9)] border-t border-r border-white/10 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <a
          href="https://wa.me/919342877474"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform group"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="flex items-center justify-center w-full h-full"
          >
            <MessageCircle className="w-8 h-8 relative z-10" />
            
            {/* Pulse Rings */}
            <div className="absolute inset-0 rounded-full border border-[#25D366] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-75" />
            <div className="absolute inset-0 rounded-full border border-[#25D366] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50" style={{ animationDelay: '1s' }} />
            
            {/* Notification Badge */}
            <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-[#0A0F1E] flex items-center justify-center animate-pulse">
              <span className="text-[8px] font-bold">1</span>
            </div>
          </motion.div>
        </a>
      </div>

      {/* Back to Top */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-50 p-3 bg-[rgba(0,191,255,0.1)] border border-primary/50 rounded-full text-primary hover:bg-primary hover:text-black shadow-[0_0_15px_rgba(0,191,255,0.3)] hover:shadow-[0_0_25px_rgba(0,191,255,0.6)] transition-all hover:scale-110"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cookie Consent */}
      <AnimatePresence>
        {showCookie && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-zinc-950/90 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
          >
            <p className="text-sm text-zinc-300">
              We use cookies to improve your experience and deliver personalized services.
            </p>
            <div className="flex gap-4">
              <button onClick={acceptCookies} className="px-6 py-2 rounded-lg text-sm font-bold bg-primary text-black hover:bg-primary/90 neon-btn">
                Accept
              </button>
              <button onClick={() => setShowCookie(false)} className="p-2 text-zinc-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
