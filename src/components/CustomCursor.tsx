"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isCardHovering, setIsCardHovering] = useState(false);

  useEffect(() => {
    // Disable on mobile
    if (window.innerWidth < 768) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
        setIsCardHovering(false);
      } else if (target.closest(".glass-card")) {
        setIsCardHovering(true);
        setIsHovering(false);
      } else {
        setIsHovering(false);
        setIsCardHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 border rounded-full pointer-events-none z-[9999] flex items-center justify-center text-[10px] font-bold text-primary"
        animate={{
          x: isHovering ? mousePosition.x - 30 : mousePosition.y ? mousePosition.x - 20 : -100,
          y: isHovering ? mousePosition.y - 30 : mousePosition.y ? mousePosition.y - 20 : -100,
          width: isHovering ? 60 : isCardHovering ? 80 : 40,
          height: isHovering ? 60 : isCardHovering ? 80 : 40,
          borderColor: isHovering ? "transparent" : isCardHovering ? "var(--neon-blue)" : "rgba(255,255,255,0.3)",
          backgroundColor: isHovering ? "rgba(0,191,255,0.2)" : isCardHovering ? "rgba(0,191,255,0.05)" : "transparent",
          boxShadow: isCardHovering ? "0 0 20px rgba(0,191,255,0.3)" : "none",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      >
        {isHovering ? "CLICK" : ""}
      </motion.div>
    </>
  );
}
