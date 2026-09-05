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

      {/* Back to Top */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-24 left-6 z-50 p-3 bg-[rgba(0,191,255,0.1)] border border-primary/50 rounded-full text-primary hover:bg-primary hover:text-black shadow-[0_0_15px_rgba(0,191,255,0.3)] hover:shadow-[0_0_25px_rgba(0,191,255,0.6)] transition-all hover:scale-110"
            aria-label="Back to top"
            type="button"
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
              <button type="button" onClick={acceptCookies} className="px-6 py-2 rounded-lg text-sm font-bold bg-primary text-black hover:bg-primary/90 neon-btn">
                Accept
              </button>
              <button type="button" onClick={() => setShowCookie(false)} className="p-2 text-zinc-500 hover:text-white" aria-label="Dismiss cookie notice">
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
