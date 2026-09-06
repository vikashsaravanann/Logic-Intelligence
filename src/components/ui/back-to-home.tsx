"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

/**
 * Sitewide "Back to Home" — white pill, black uppercase label, left chevron.
 * Matches the production reference control on every non-home page.
 */
export default function BackToHome({ className = "" }: { className?: string }) {
  return (
    <div className={`max-w-7xl mx-auto px-6 lg:px-8 pt-6 ${className}`}>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-black text-black uppercase tracking-[0.2em] bg-white hover:bg-zinc-100 active:scale-[0.98] transition-all shadow-[0_8px_24px_rgba(0,0,0,0.25)] select-none"
      >
        <ChevronLeft className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} />
        Back to Home
      </Link>
    </div>
  );
}
